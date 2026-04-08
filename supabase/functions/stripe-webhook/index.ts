import Stripe from 'https://esm.sh/stripe@14.25.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-04-10' });
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

Deno.serve(async (request) => {
  try {
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return new Response('Missing stripe-signature header', { status: 400 });
    }

    const body = await request.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
      const stripeSessionId = session.id;
      const amountTotal = session.amount_total ?? null;
      const currency = session.currency ?? 'eur';

      const lineItems = await stripe.checkout.sessions.listLineItems(stripeSessionId, { limit: 10 });
      const firstLine = lineItems.data[0];
      const stripePriceId = firstLine?.price?.id ?? null;

      if (!customerEmail || !stripePriceId) {
        return new Response('Missing email or price id', { status: 400 });
      }

      const { data: product } = await supabase
        .from('products')
        .select('id, slug, title')
        .eq('stripe_price_id', stripePriceId)
        .single();

      if (!product) {
        return new Response('Unknown price id', { status: 400 });
      }

      let profileId: string | null = null;

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', customerEmail)
        .maybeSingle();

      if (existingProfile?.id) {
        profileId = existingProfile.id;
      }

      if (!profileId) {
        const newProfileId = crypto.randomUUID();
        const { error: insertProfileError } = await supabase
          .from('profiles')
          .insert({ id: newProfileId, email: customerEmail });

        if (insertProfileError) {
          return new Response('Unable to create profile', { status: 500 });
        }
        profileId = newProfileId;
      }

      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id, stripe_session_id')
        .eq('stripe_session_id', stripeSessionId)
        .maybeSingle();

      if (!existingOrder?.id) {
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            profile_id: profileId,
            product_id: product.id,
            stripe_session_id: stripeSessionId,
            payment_status: 'paid',
            amount_cents: amountTotal,
            currency,
          });

        if (orderError) {
          return new Response('Unable to create order', { status: 500 });
        }
      }

      const { error: entitlementError } = await supabase
        .from('entitlements')
        .upsert({
          profile_id: profileId,
          product_id: product.id,
          access_status: 'active',
        }, { onConflict: 'profile_id,product_id' });

      if (entitlementError) {
        return new Response('Unable to grant entitlement', { status: 500 });
      }
    }

    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Webhook error', { status: 400 });
  }
});

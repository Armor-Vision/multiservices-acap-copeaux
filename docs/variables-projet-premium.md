# Variables projet premium

## Supabase
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_PROJECT_REF

## Stripe
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_ID_ANDROID_UTILE
- STRIPE_PRODUCT_ID_ANDROID_UTILE

## Front / URLs
- SITE_URL
- MAGIC_LINK_REDIRECT_URL
- PREMIUM_SPACE_URL
- PRODUCT_ANDROID_URL

## Règle importante
- Ne jamais exposer la service role key côté front.
- Le front ne doit utiliser que la clé anon.
- Les traitements sensibles restent côté webhook / backend / edge function.

## Premier remplissage recommandé
- commencer uniquement par Android utile au quotidien
- laisser les autres produits en attente
- valider le parcours avant duplication

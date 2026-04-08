(function(){
  window.AcapPremiumGate = {
    async getClient(){
      if(!window.AcapPremiumAuth) return null;
      const client = await window.AcapPremiumAuth.init();
      return client || null;
    },
    async getUser(){
      if(!window.AcapPremiumAuth) return null;
      const session = await window.AcapPremiumAuth.getSession();
      return session ? session.user : null;
    },
    async hasEntitlement(productSlug){
      const client = await this.getClient();
      const user = await this.getUser();
      if(!client || !user || !productSlug) return false;

      const { data: product } = await client
        .from('products')
        .select('id, slug')
        .eq('slug', productSlug)
        .single();

      if(!product) return false;

      const { data: entitlement } = await client
        .from('entitlements')
        .select('id, access_status, product_id')
        .eq('profile_id', user.id)
        .eq('product_id', product.id)
        .eq('access_status', 'active')
        .maybeSingle();

      return Boolean(entitlement && entitlement.id);
    },
    async protectPage(productSlug){
      const gate = document.getElementById('premiumGateMessage');
      const content = document.getElementById('premiumProtectedContent');
      if(!gate || !content) return;

      if(!window.AcapPremiumAuth || !window.AcapPremiumAuth.isConfigured || !window.AcapPremiumAuth.isConfigured()){
        gate.innerHTML = '<div class="error">Configuration Supabase absente. Impossible de vérifier les droits d\'accès.</div>';
        content.style.display = 'none';
        return;
      }

      const allowed = await this.hasEntitlement(productSlug);
      if(allowed){
        gate.innerHTML = '<div class="success">Accès premium validé.</div>';
        content.style.display = 'block';
      } else {
        gate.innerHTML = '<div class="error">Accès non validé pour ce module. Connectez-vous avec un compte disposant du bon droit d\'accès.</div>';
        content.style.display = 'none';
      }
    }
  };
})();

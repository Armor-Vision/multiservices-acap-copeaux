(function(){
  window.AcapPremiumAuth = {
    isConfigured(){
      return Boolean(window.ACAP_SUPABASE_CONFIG && window.ACAP_SUPABASE_CONFIG.url && window.ACAP_SUPABASE_CONFIG.anonKey);
    },
    async init(){
      if(!this.isConfigured()){
        console.warn('Supabase non configuré.');
        return null;
      }
      if(!window.supabase || !window.supabase.createClient){
        console.warn('SDK Supabase non chargé.');
        return null;
      }
      const { url, anonKey } = window.ACAP_SUPABASE_CONFIG;
      this.client = window.supabase.createClient(url, anonKey);
      return this.client;
    },
    async signInWithMagicLink(email, redirectTo){
      if(!this.client) await this.init();
      if(!this.client) throw new Error('Client Supabase indisponible');
      return this.client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo || window.location.origin + '/espace-client-pilote.html'
        }
      });
    },
    async getSession(){
      if(!this.client) await this.init();
      if(!this.client) return null;
      const { data } = await this.client.auth.getSession();
      return data.session || null;
    },
    async signOut(){
      if(!this.client) await this.init();
      if(!this.client) return null;
      return this.client.auth.signOut();
    }
  };
})();

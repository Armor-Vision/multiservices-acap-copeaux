(function(){
  const session = localStorage.getItem('acapPremiumDemoSession');
  const target = document.getElementById('demoSessionBlock');
  if(!target) return;
  if(!session){
    target.innerHTML = '<div class="card"><h3>Session absente</h3><p>Aucune session de démonstration détectée. Passez par la page de connexion démo.</p><div class="cta"><a class="btn primary" href="connexion.html">Aller à la connexion</a></div></div>';
    return;
  }
  try {
    const parsed = JSON.parse(session);
    target.innerHTML = `
      <div class="card">
        <span class="badge">Session démo</span>
        <h3>${parsed.fullName || 'Utilisateur démonstration'}</h3>
        <p><strong>Email :</strong> ${parsed.email || 'non renseigné'}</p>
        <p><strong>Module simulé :</strong> ${(parsed.entitlements || []).join(', ') || 'aucun'}</p>
        <div class="cta"><button class="btn" id="demoLogoutBtn" type="button">Effacer la session</button></div>
      </div>`;
    const btn = document.getElementById('demoLogoutBtn');
    if(btn){
      btn.addEventListener('click', function(){
        localStorage.removeItem('acapPremiumDemoSession');
        window.location.href = 'connexion.html';
      });
    }
  } catch (error) {
    target.innerHTML = '<div class="error">Impossible de lire la session de démonstration.</div>';
  }
})();

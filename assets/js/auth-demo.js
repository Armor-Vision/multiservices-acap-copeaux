(function(){
  const form = document.getElementById('demoLoginForm');
  const message = document.getElementById('loginMessage');
  if(!form || !message) return;

  form.addEventListener('submit', function(event){
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const fullName = String(formData.get('fullname') || '').trim();

    if(!email){
      message.innerHTML = '<div class="error">Email requis.</div>';
      return;
    }

    const session = {
      email,
      fullName,
      demoLoggedAt: new Date().toISOString(),
      entitlements: ['android-utile-au-quotidien']
    };

    localStorage.setItem('acapPremiumDemoSession', JSON.stringify(session));
    message.innerHTML = '<div class="success">Connexion de démonstration enregistrée. Redirection vers l\'espace client…</div>';
    setTimeout(() => {
      window.location.href = 'espace-client-demo.html';
    }, 900);
  });
})();

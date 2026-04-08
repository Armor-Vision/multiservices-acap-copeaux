(function(){
  const grid = document.getElementById('packagesGrid');
  if(!grid) return;

  const state = { filter: 'all', data: [] };

  function badgeLabel(type){
    return type === 'training' ? 'Formation' : 'Service';
  }

  function detailLine(label, value){
    if(!value) return '';
    return `<p><strong>${label} :</strong> ${value}</p>`;
  }

  function listBlock(title, items){
    if(!items || !items.length) return '';
    return `
      <div>
        <strong>${title}</strong>
        <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>`;
  }

  function cardTemplate(item){
    const highlights = item.highlights || item.outcomes || [];
    const audience = Array.isArray(item.audience) ? item.audience.join(', ') : '';
    return `
      <article class="card" data-type="${item.type}">
        <span class="badge">${badgeLabel(item.type)}</span>
        <h3>${item.title}</h3>
        <p>${item.tagline || ''}</p>
        ${detailLine('Public', audience)}
        ${detailLine('Format', item.format)}
        ${detailLine('Durée', item.duration)}
        ${detailLine('Accès', item.paid_access_model)}
        ${detailLine('Tarif', item.starting_price)}
        ${listBlock(item.type === 'training' ? 'Résultats visés' : 'Points forts', highlights)}
        <div class="cta">
          <a class="btn primary" href="contact.html">${item.cta_label || 'Demander des informations'}</a>
        </div>
      </article>`;
  }

  function filteredItems(){
    const items = [...(state.data.services || []), ...(state.data.trainings || [])];
    if(state.filter === 'all') return items;
    return items.filter(item => item.type === state.filter);
  }

  function render(){
    const items = filteredItems();
    if(!items.length){
      grid.innerHTML = '<article class="card"><h3>Aucune offre trouvée</h3><p>Le filtre sélectionné ne renvoie encore aucune offre.</p></article>';
      return;
    }
    grid.innerHTML = items.map(cardTemplate).join('');
  }

  async function load(){
    try {
      const response = await fetch('data/packages.json', { cache: 'no-store' });
      if(!response.ok) throw new Error('Chargement impossible');
      state.data = await response.json();
      render();
    } catch (error) {
      grid.innerHTML = '<article class="card"><h3>Catalogue indisponible</h3><p>Impossible de charger les packages pour le moment.</p></article>';
    }
  }

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      state.filter = button.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active-filter'));
      button.classList.add('active-filter');
      render();
    });
  });

  load();
})();

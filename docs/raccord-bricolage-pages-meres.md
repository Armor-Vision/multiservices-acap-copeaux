# Raccord bricolage dans les pages mères

## 1. Bloc à ajouter dans `formations-premium.html`
À placer dans une section dédiée ou à la suite du catalogue formation.

```html
<section class="container section">
  <h2>Focus formation</h2>
  <div class="grid cards">
    <a class="card" href="formation-bricolage-essentiel.html">
      <span class="badge">Pilote</span>
      <h3>Bricolage essentiel</h3>
      <p>Une formation claire pour apprendre les bases utiles : outils, sécurité, mesure, perçage, vissage, assemblage et premier projet simple.</p>
    </a>
    <a class="card" href="module-gratuit-bricolage-essentiel.html">
      <span class="badge">Gratuit</span>
      <h3>Module gratuit</h3>
      <p>Découvrir l'approche pédagogique avant de passer à la version complète.</p>
    </a>
    <a class="card" href="plan-tabouret-simple.html">
      <span class="badge">Produit</span>
      <h3>Plan tabouret simple</h3>
      <p>Produit annexe vendu seul ou intégré dans la formation complète.</p>
    </a>
  </div>
</section>
```

## 2. Bloc à ajouter dans `packages.html`
À placer dans le catalogue ou comme section dédiée “Pilote”.

```html
<section class="container section">
  <h2>Pilote bricolage</h2>
  <div class="grid cards">
    <a class="card" href="formation-bricolage-essentiel.html">
      <span class="badge">Formation</span>
      <h3>Bricolage essentiel</h3>
      <p>Produit principal : formation de base, rassurante, pratique et duplicable.</p>
    </a>
    <a class="card" href="module-gratuit-bricolage-essentiel.html">
      <span class="badge">Entrée de tunnel</span>
      <h3>Module gratuit</h3>
      <p>Version de découverte pour tester la pédagogie et nourrir la conversion.</p>
    </a>
    <a class="card" href="plan-tabouret-premium.html">
      <span class="badge">Upsell</span>
      <h3>Plan tabouret premium</h3>
      <p>Version détaillée, enrichie et plus complète du projet tabouret simple.</p>
    </a>
    <a class="card" href="offres-tarifs-bricolage.html">
      <span class="badge">Offres</span>
      <h3>Offres et tarifs</h3>
      <p>Lecture claire des formules, du gratuit au premium renforcé.</p>
    </a>
  </div>
</section>
```

## 3. Si nécessaire dans `assets/css/style.css`
Si les cartes ajoutées sont des liens, garder ou ajouter :

```css
.cards a.card{
  display:block;
  color:var(--text);
  text-decoration:none;
}
```

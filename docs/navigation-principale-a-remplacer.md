# Navigation principale — blocs prêts à remplacer

## Objectif
Reconnecter la navigation du site principal vers les nouvelles pages premium sans casser la structure actuelle.

## Bloc recommandé pour les pages principales
Remplacer le bloc `<nav id="nav" class="nav"> ... </nav>` existant par :

```html
<nav id="nav" class="nav">
  <a href="index.html">Accueil</a>
  <a href="services-premium.html">Services</a>
  <a href="formations-premium.html">Formations</a>
  <a href="packages.html">Packages</a>
  <a href="module-decouverte-android.html">Module gratuit</a>
  <a href="connexion-supabase.html">Connexion</a>
  <a href="espace-client-pilote.html">Espace client</a>
  <a href="avis.html">Avis</a>
  <a href="contact.html">Contact</a>
  <button id="themeSwitch" class="theme-switch" aria-label="Changer de thème">◐</button>
</nav>
```

## Variante plus courte si la navigation devient trop chargée
```html
<nav id="nav" class="nav">
  <a href="index.html">Accueil</a>
  <a href="services-premium.html">Services</a>
  <a href="formations-premium.html">Formations</a>
  <a href="packages.html">Packages</a>
  <a href="connexion-supabase.html">Connexion</a>
  <a href="contact.html">Contact</a>
  <button id="themeSwitch" class="theme-switch" aria-label="Changer de thème">◐</button>
</nav>
```

## Pages à mettre à jour en priorité
- index.html
- services.html
- formations.html
- domotique.html
- contact.html
- avis.html
- agenda.html

## Logique recommandée
- Les anciennes pages restent accessibles
- Les entrées principales pointent vers les nouvelles pages premium
- Le module gratuit et la connexion deviennent visibles
- L'espace client est accessible sans avoir à connaître l'URL directe

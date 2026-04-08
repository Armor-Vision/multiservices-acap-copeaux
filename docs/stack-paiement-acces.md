# Paiement et accès premium — plan d'implémentation

## Objectif
Transformer les pages premium du site en vraies offres vendables avec :
- paiement ;
- déblocage d'accès ;
- suivi client ;
- module gratuit + premium.

## Réalité technique
Un front GitHub Pages seul ne protège pas des contenus payants.
Le contrôle d'accès réel doit se faire via une couche externe.

## Stack recommandée
- Front public : GitHub Pages
- Authentification : Supabase Auth
- Base : Supabase Postgres
- Paiement : Stripe Payment Links ou Checkout
- Webhooks : Supabase Edge Functions ou backend léger
- Stockage éventuel ressources : Supabase Storage

## Flux recommandé
1. Le visiteur découvre la page publique
2. Il teste le module gratuit
3. Il clique sur acheter
4. Il paie via Stripe
5. Stripe déclenche un webhook
6. Le webhook crée / met à jour les droits d'accès
7. L'utilisateur se connecte
8. L'espace client affiche les modules achetés

## Tables minimales
### profiles
- id
- email
- full_name
- created_at

### products
- id
- slug
- title
- type
- active
- stripe_price_id

### orders
- id
- profile_id
- product_id
- stripe_session_id
- payment_status
- created_at

### entitlements
- id
- profile_id
- product_id
- access_status
- granted_at
- expires_at

## Routes/pages à prévoir
- /connexion
- /espace-client
- /mes-modules
- /formations/android-utile
- /formations/bricolage-essentiel
- /merci-achat

## Règles d'accès
- module gratuit : accès public
- page de vente : accès public
- contenu premium : accès authentifié + entitlement actif
- ressources bonus : accès authentifié + entitlement actif

## Étapes d'implémentation
### Phase 1
- créer les pages publiques de vente
- créer l'espace client statique de démonstration
- créer les slugs produits

### Phase 2
- créer Supabase projet
- créer tables
- créer auth email magic link
- brancher Stripe

### Phase 3
- sécuriser l'affichage des contenus premium
- gérer les erreurs d'accès
- ajouter l'historique d'achats

## Attention
Le plus gros risque n'est pas technique mais stratégique :
- vendre trop tôt un contenu trop maigre ;
- promettre un espace premium sans parcours clair ;
- mélanger prestations terrain et formation sans segmentation suffisante.

## Recommandation
Commencer par 1 offre formation vraiment solide et 1 tunnel simple :
- Android utile au quotidien
- module gratuit
- vente d'un module premium unique
- espace client simple

Puis dupliquer le modèle au reste du catalogue.

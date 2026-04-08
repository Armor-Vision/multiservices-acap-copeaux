# Flux webhook Stripe — produit pilote Android utile au quotidien

## But
Automatiser le passage suivant :
- paiement validé ;
- rattachement du paiement à un produit ;
- création du droit d'accès ;
- disponibilité dans l'espace client.

## Produit pilote
- slug : android-utile-au-quotidien
- type : training
- premier tunnel à stabiliser avant duplication

## Événements Stripe à traiter
### checkout.session.completed
À la réception :
1. récupérer l'email client
2. récupérer le price_id
3. retrouver le produit interne correspondant
4. créer ou retrouver le profil utilisateur
5. créer une commande avec statut paid
6. créer un entitlement actif

### charge.refunded ou payment_intent.payment_failed
Selon la stratégie choisie :
- marquer la commande en refunded ou failed
- révoquer ou suspendre l'entitlement

## Correspondances nécessaires
Le webhook doit s'appuyer sur :
- stripe_price_id
- slug produit
- titre produit

## Étapes recommandées du traitement
1. Vérifier la signature Stripe
2. Lire l'événement
3. Sortir les données utiles
4. Chercher le produit par price_id
5. Créer ou mettre à jour profile
6. Insérer order
7. Insérer entitlement
8. Retourner 200 rapidement

## Tables concernées
- profiles
- products
- orders
- entitlements

## Données minimales à stocker
### order
- profile_id
- product_id
- stripe_session_id
- payment_status
- amount_cents
- currency

### entitlement
- profile_id
- product_id
- access_status
- granted_at

## Risques à gérer
- double réception du même webhook
- email absent ou incohérent
- price_id inconnu
- produit inactif
- remboursement non synchronisé

## Mesures utiles
- contrainte unique sur stripe_session_id
- logs simples mais lisibles
- rejet clair des price_id inconnus
- logique idempotente

## Recommandation
Ne pas gérer plusieurs produits premium réels en parallèle tant que le pilote Android n'est pas stable de bout en bout.

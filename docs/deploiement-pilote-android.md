# Déploiement pilote Android utile au quotidien

## Objectif
Mettre en service un premier tunnel premium réel, simple et maîtrisé, avant duplication au reste du catalogue.

## Pré-requis
- repo propre
- page produit Android finalisée
- module gratuit public
- espace client pilote prêt
- Supabase projet créé
- compte Stripe prêt

## Étapes
### 1. Supabase
- créer le projet
- exécuter `supabase/schema.sql`
- renseigner l'URL et la clé anon dans `assets/js/supabase-config.example.js`
- renommer le fichier en configuration réelle si nécessaire
- activer Auth par email magic link
- définir l'URL de redirection vers `connexion-supabase.html` ou `espace-client-pilote.html`

### 2. Stripe
- créer le produit Android utile au quotidien
- créer le prix
- reporter `stripe_product_id` et `stripe_price_id` dans `data/stripe-products.example.json`
- créer le lien Checkout ou la session Checkout

### 3. Webhook
- créer une fonction Edge ou backend léger
- écouter `checkout.session.completed`
- mapper le `price_id` au produit interne
- créer profile, order et entitlement
- vérifier l'idempotence

### 4. Front
- utiliser `connexion-supabase.html`
- vérifier l'envoi du magic link
- vérifier la récupération de session
- afficher les modules selon les droits d'accès

### 5. Validation du pilote
- créer un compte test
- réaliser un achat test
- vérifier la création de la commande
- vérifier la création de l'entitlement
- vérifier l'affichage dans l'espace client
- vérifier le cas d'erreur et le cas sans droit

## Critères de réussite
- un utilisateur paie
- il reçoit ou ouvre son accès
- il se connecte
- il voit Android utile au quotidien dans son espace
- il n'accède pas aux autres modules non achetés

## Ce qu'il ne faut pas faire tout de suite
- lancer plusieurs produits payants en parallèle
- surcharger le tunnel de fonctionnalités secondaires
- mélanger accompagnement terrain et achat de module sans segmentation claire

## Recommandation
Geler le périmètre autour d'un seul produit premium réel jusqu'à obtention d'un flux stable de bout en bout.

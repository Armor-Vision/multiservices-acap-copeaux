# Refonte premium du site aCaP' Copeaux

## Objectif
Faire évoluer le site vitrine actuel vers une plateforme professionnelle plus convaincante, plus complète, et capable de :
- mieux vendre les prestations multiservices ;
- présenter des offres claires et différenciées ;
- proposer des formations structurées ;
- préparer une commercialisation réelle de modules payants ;
- conserver l'identité visuelle actuelle, le préchargeur d'ouverture, et l'esprit général du site.

## Constat sur l'existant
Le site actuel est propre, lisible, responsive et cohérent pour une vitrine simple.
En revanche, il reste insuffisant pour convertir sérieusement sur :
- les services détaillés ;
- la qualification du besoin ;
- les tarifs / fourchettes / process ;
- la preuve de sérieux ;
- les formations vendables ;
- l'autonomie après paiement.

## Limite technique à traiter sans faux-semblant
Le site actuel étant un site statique GitHub Pages, il ne peut pas, à lui seul, protéger réellement des contenus payants.
Une vraie vente avec blocage des modules nécessite au minimum :
- un paiement (Stripe, Lemon Squeezy, Gumroad, ou équivalent) ;
- une authentification ou des liens d'accès signés ;
- un backend / BaaS (Supabase, Firebase, ou backend custom) ;
- une logique de contrôle d'accès côté serveur.

## Architecture recommandée
### Niveau 1 — immédiat
- Refonte des pages publiques
- Catalogue clair des services
- Catalogue clair des formations
- CTA cohérents
- Pages d'offres détaillées
- FAQ, process, avis, garanties, zone d'intervention, cas d'usage

### Niveau 2 — vente simple et rapide
- Paiement via Stripe Payment Links ou Lemon Squeezy
- Confirmation automatique par email
- Livraison d'un lien privé ou espace client léger
- Module d'essai gratuit accessible publiquement

### Niveau 3 — vraie plateforme premium
- Authentification utilisateur
- Tableau de bord client
- Déblocage des modules achetés
- Progression / checklist / téléchargement ressources
- Suivi d'avancement formation
- Factures / historique / relances

## Pages à créer ou reprendre
1. Accueil premium
2. Services
3. Formations
4. Catalogue packages
5. Pages détail par service
6. Pages détail par formation
7. Module gratuit découverte
8. Espace client (phase 2/3)
9. FAQ
10. Process / devis / intervention
11. Preuves / réalisations / avis
12. Contact / qualification du besoin

## Fonctionnalités à reprendre du site emploi
- hiérarchie plus nette ;
- cartes plus riches ;
- navigation plus utile ;
- CTA visibles ;
- contenu exploitable immédiatement ;
- modules structurés plutôt que simples paragraphes ;
- blocs comparatifs ;
- logique d'évolution future ;
- rendu plus premium.

## Positionnement éditorial recommandé
Le site ne doit pas sonner comme un catalogue générique de bricoleur.
Il doit se placer sur une promesse plus solide :
- interlocuteur unique ;
- interventions propres et cadrées ;
- explications claires ;
- approche pédagogique ;
- solutions concrètes pour particuliers, indépendants et petites structures.

## Packages vendables à construire
### Services
- Diagnostic Habitat Express
- Intervention Multiservices Demi-journée
- Intervention Multiservices Journée
- Remise en état / nettoyage ciblé
- Pack Domotique Essentiel
- Pack Sécurité domestique de base
- Pack Assistance numérique utile

### Formations grand public
- Bricolage essentiel à domicile
- Sécurité domestique et prévention
- Smartphone Android utile au quotidien
- Numérique utile et confidentialité de base
- Domotique pratique sans jargon

### Formations pro / semi-pro
- Bases multiservices pour débuter proprement
- Organisation d'intervention terrain
- Nettoyage et remise en état : méthode et rigueur
- Accueil, prévention, sécurité et continuité de service
- Parcours sur mesure petits groupes

## Modèle pédagogique recommandé pour les formations
Chaque formation doit exister en 4 niveaux de contenu :
1. page publique de vente ;
2. module gratuit de découverte ;
3. module premium débloqué après paiement ;
4. ressources téléchargeables / checklist / support.

## Structure recommandée d'une page formation
- promesse claire ;
- pour qui ;
- prérequis ;
- objectifs ;
- programme détaillé ;
- format ;
- durée ;
- ce que l'on sait faire à la fin ;
- module gratuit ;
- offre payante ;
- FAQ ;
- CTA.

## Structure recommandée d'un module premium
- introduction ;
- leçon 1 ;
- leçon 2 ;
- leçon 3 ;
- quiz ou checklist ;
- fiche récap ;
- ressources ;
- contact / accompagnement.

## Priorités d'implémentation
### Sprint 1
- consolider l'arborescence ;
- créer les données packages ;
- créer les pages catalogue ;
- enrichir Services ;
- enrichir Formations.

### Sprint 2
- créer les pages détail ;
- créer les blocs FAQ / process / garanties ;
- créer le module gratuit de démonstration.

### Sprint 3
- brancher le paiement ;
- mettre en place le contrôle d'accès ;
- créer l'espace client.

## Stack recommandée
### Option pragmatique
- front : HTML/CSS/JS statique
- paiement : Stripe Payment Links
- accès : Supabase Auth + table achats + pages protégées
- hébergement : GitHub Pages pour le front, Supabase pour la logique

### Option simple mais moins robuste
- front : HTML/CSS/JS statique
- paiement : Gumroad ou Lemon Squeezy
- livraison : liens privés envoyés après achat

## Décision recommandée
Démarrer par une refonte front premium + catalogue packages + pages détaillées.
Ne pas simuler un faux verrouillage premium en pur GitHub Pages.
Préparer dès maintenant la structure compatible avec une future couche Supabase/Stripe.

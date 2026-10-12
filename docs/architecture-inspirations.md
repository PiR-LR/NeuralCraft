# Inspirations — architecture proposée

Statut : conception uniquement ; pages et démonstrations à implémenter.

## Objectif et navigation

Donner envie aux prospects en leur permettant de découvrir des sites fictifs crédibles et de comparer plusieurs directions visuelles. Nom de rubrique : **Inspirations**. Accroche : « Imaginez votre prochain site. »

Navigation : Services / Réalisations / Inspirations / Approche / Contact. Ajouter le lien dans les menus desktop, mobile et le footer de `src/layouts/Layout.astro`. Les réalisations existantes restent la preuve du travail effectué ; chaque inspiration porte la mention « Concept de démonstration — entreprise fictive ».

## Parcours

1. `/inspirations` : introduction courte et trois grands aperçus visuels, un par métier. Chaque carte montre un vrai extrait de la démo et propose « Explorer cet univers ».
2. `/inspirations/comptable`, `/inspirations/menuisier`, `/inspirations/decorateur` : page de présentation et configurateur avec un aperçu interactif.
3. Le visiteur choisit une direction puis une palette ; l'aperçu se met à jour immédiatement. La sélection reste visible et partageable.
4. « Voir le site en grand » ouvre la même combinaison dans une page de démonstration pleine largeur.
5. « Un site dans cet esprit ? Parlons-en » ouvre le contact NeuralCraft avec la référence du métier, de la direction et de la palette. La personne reste libre de décrire son projet.

## Trois univers, trois directions chacun

Les noms sont provisoires et fictifs.

| Univers | Marque | Direction 1 | Direction 2 | Direction 3 |
| --- | --- | --- | --- | --- |
| Cabinet comptable | Cabinet Accord | Essentiel : accroche claire, services, équipe, contact | Partenaire : portrait humain, accompagnement, étapes | Perspective : grands titres, composition graphique, expertise |
| Menuisier | Atelier Grain | Atelier : photographie du geste, matières, savoir-faire | Signature : grand projet d'ouverture, galerie, sur-mesure | Contemporain : grille structurée, détails techniques, réalisations |
| Décorateur | Maison Nuance | Éditorial : typographie expressive, photos asymétriques | Immersion : image panoramique, projets grand format | Galerie : mosaïque de pièces, filtres, détail d'un projet |

Chaque direction modifie réellement la composition, les proportions, la typographie et le rythme des sections. Une simple recoloration ne constitue pas une nouvelle version.

Chaque métier propose trois palettes compatibles avec les trois directions :

- Comptable : marine/ivoire, sauge/crème, graphite/cuivre.
- Menuisier : noyer/lin, forêt/sable, charbon/chêne.
- Décorateur : terracotta/crème, olive/pierre, encre/rose poudré.

Cela représente **neuf directions artistiques et vingt-sept combinaisons**. Les textes et images sont partagés au sein d'un métier pour permettre une comparaison utile.

## Interface de sélection

Deux groupes de choix : « Ambiance » (trois boutons nommés, avec miniature) et « Couleurs » (trois palettes nommées, avec pastilles). Un choix d'ambiance applique son agencement et ses typographies en conservant la palette sélectionnée. Les valeurs par défaut sont définies par métier.

Sur ordinateur : aperçu généreux et panneau de choix compact à côté ou au-dessus. Sur mobile : choix au-dessus d'un aperçu pleine largeur ; accès au site en grand pour une lecture confortable. Option « Ordinateur / Mobile » pour comparer les deux mises en page ; la vue ordinateur sur petit écran affiche une miniature signalée comme telle, et l'accès en grand utilise la largeur réelle du navigateur.

Les choix sont de vrais boutons accessibles au clavier, avec `aria-pressed`, focus visible et libellés écrits. Prévoir un état de chargement, un message discret annonçant le changement et un lien de secours vers la démo. Les animations respectent `prefers-reduced-motion`.

## Pages de démonstration

Chaque concept contient une page d'accueil aboutie : introduction, services ou projets, présentation, méthode et appel à l'action. Les liens internes ciblent des sections existantes. Les interactions de galerie fonctionnent réellement. Les coordonnées et les témoignages fictifs sont identifiés ; aucun formulaire ne prétend envoyer un message à l'entreprise imaginaire.

La démo conserve sa propre identité, distincte du fond sombre NeuralCraft. Une petite barre de retour rappelle qu'il s'agit d'un concept et donne accès à NeuralCraft et à son contact.

Les images sont des éléments majeurs du design : portraits et bureaux pour le cabinet, bois et gestes pour l'atelier, intérieurs pour la décoration. Prévoir des assets locaux optimisés, leurs sources/licences et des textes alternatifs ; aucun visuel définitif n'est inclus à cette étape.

## Architecture Astro

Le projet actuel est un site Astro statique avec Tailwind, Anime.js, Lenis et `ClientRouter`. Conserver cette base. Les pages de présentation utilisent le layout NeuralCraft ; les démos utilisent un layout autonome pour isoler les styles, les polices et le défilement.

```text
src/
  data/inspirations/
    types.ts                     # Contrats communs
    index.ts                     # Registre des trois métiers
    comptable.ts                 # Contenus, directions, palettes, images
    menuisier.ts
    decorateur.ts
  pages/
    inspirations/
      index.astro                # Galerie des trois univers
      [metier].astro             # Configurateur, 3 pages statiques
    demos/
      [metier]/[direction].astro # 9 démos statiques
  layouts/
    DemoLayout.astro             # Document autonome, styles isolés
  components/inspirations/
    InspirationCard.astro
    Configurator.astro           # Choix, URL et aperçu
    PreviewFrame.astro           # Iframe titrée + largeur de prévisualisation
    ContactInspiration.astro     # Appel à l'action contextualisé
    demos/
      comptable/                 # 3 compositions spécifiques
      menuisier/                 # 3 compositions spécifiques
      decorateur/                # 3 compositions spécifiques
      shared/                    # Seulement les éléments réellement communs
  scripts/inspirations/
    configurator.ts
    demo-theme.ts
  styles/inspirations/
    demo-base.css
    comptable.css
    menuisier.css
    decorateur.css
public/inspirations/
  comptable/
  menuisier/
  decorateur/
```

`getStaticPaths()` génère les métiers et directions depuis le registre. Le contenu est typé en TypeScript ; des fichiers de données simples suffisent à ce volume. Chaque métier définit `id`, `label`, `brand`, `content`, `assets`, `directions`, `palettes`, `defaults`. Chaque palette expose des couleurs sémantiques : fond, surface, texte, texte secondaire, accent et texte sur accent.

Les agencements restent propres aux métiers : partager le configurateur et les mécanismes, tout en gardant des compositions réellement distinctes.

## Actualisation au clic

État : `{ metier, direction, palette, viewport }`.

- URL du configurateur : `/inspirations/menuisier?direction=signature&palette=foret`.
- URL de la démo : `/demos/menuisier/signature?palette=foret`.
- Au chargement, valider les paramètres contre le registre ; une valeur inconnue revient au défaut.
- Changer de palette met à jour les variables CSS de la démo via un message à l'iframe, sans rechargement. Vérifier l'origine, la fenêtre source et les identifiants des messages.
- Changer de direction charge la route de démo correspondante dans la même iframe, en conservant la palette. Une transition légère et un état de chargement accompagnent ce changement.
- Synchroniser les paramètres avec `history.replaceState`, traiter les retours d'historique et proposer « Copier le lien » avec repli si le presse-papiers est indisponible.
- La page autonome applique aussi la palette issue de l'URL avant affichage pour limiter le flash du thème par défaut. Sans JavaScript, la démo reste lisible dans son thème initial ; les liens vers les directions restent accessibles.
- Initialiser le configurateur lors de `astro:page-load`, nettoyer les écouteurs avant remplacement de page et éviter les doublons avec le `ClientRouter` existant.

L'iframe isole les styles des concepts et permet d'utiliser exactement la même démo dans le configurateur et en grand. Elle a un titre explicite, une hauteur confortable et son propre défilement natif ; le parent doit laisser passer les gestes de défilement dans la prévisualisation.

## Contact et référencement

Étendre le composant `ContactModal.astro` avec un contexte facultatif et lisible : « Inspiration : Atelier Grain / Signature / Forêt ». Vérifier le fonctionnement actuel de la modale avant modification. Si le contexte est affiché dans un champ, le laisser modifiable.

Les pages Inspirations sont indexables avec titre et description propres. Les démos autonomes ont `noindex, follow` et sont exclues du sitemap ; les palettes ne génèrent pas vingt-sept pages indexables. Prévoir une image de partage par métier.

## Mise en œuvre et validation

1. Installer le registre, les routes, la galerie et le lien de navigation.
2. Réaliser un métier complet avec ses trois compositions et palettes pour valider le configurateur et le contact.
3. Décliner les deux autres métiers avec leurs compositions spécifiques et leurs assets.
4. Finaliser responsive, animations, partage et référencement.

Validation : build Astro ; clavier et mobile ; les neuf directions et les vingt-sept combinaisons ; contraste des palettes ; liens partagés et paramètres invalides ; retour depuis une démo ; changement de page avec `ClientRouter` ; contexte de contact ; absence de fuite des styles entre la démo et NeuralCraft.

Si un serveur local est nécessaire : `astro dev --background`, puis `astro dev status`, `astro dev logs` et `astro dev stop`, conformément à AGENTS.md.

## Références consultées

- https://docs.astro.build/en/guides/routing/
- https://docs.astro.build/en/basics/astro-components/

Cette étape prépare l'architecture ; elle ne publie pas de pages et n'ajoute pas de dépendances.

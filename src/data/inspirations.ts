export const inspirations = [
  {
    id: 'comptable', label: 'Expertise comptable', brand: 'accord', tag: 'Comptabilité. Fiscalité. Gestion sociale.',
    intro: 'Un cabinet comptable pour accompagner les sociétés dans leur comptabilité, leur fiscalité et leur gestion sociale.',
    headline: ['Votre société.', 'Bien accompagnée.'], note: 'Moins de complexité. Plus de perspectives.',
    image: 'https://images.pexels.com/photos/7681077/pexels-photo-7681077.jpeg', secondary: 'https://images.pexels.com/photos/8296970/pexels-photo-8296970.jpeg',
    imageAlt: 'Documents comptables et graphiques financiers sur une table',
    directions: [{id:'essentiel',label:'Classique',detail:'Présentation structurée & expertises détaillées'},{id:'partenaire',label:'Proximité',detail:'Cabinet à taille humaine & photographie généreuse'},{id:'perspective',label:'Précision',detail:'Composition sobre & organisation rigoureuse'}],
    palettes: [{"id":"marine","label":"Électrique","bg":"#f0f2ff","ink":"#182055","accent":"#2448ff","accentInk":"#ffffff"},{"id":"sauge","label":"Minuit","bg":"#101b2a","ink":"#f0f4ee","accent":"#c8ff60","accentInk":"#18251a"},{"id":"cuivre","label":"Sable","bg":"#f3e8d6","ink":"#48352a","accent":"#edd0a5","accentInk":"#48352a"}],
    services: ['Piloter votre activité','Créer votre entreprise','Construire la suite'],
    descriptions: ['Comptabilité, fiscalité et indicateurs : les bonnes informations pour décider sereinement.','Du premier choix de statut au lancement, un accompagnement à chaque étape.','Anticiper vos investissements et donner une direction claire à vos projets.'],
    projects: ['Un regard clair','Une relation directe','Un cap commun'],
  },
  {
    id: 'menuisier', label: 'Menuiserie & artisanat', brand: 'grain.', tag: 'La matière a une mémoire.',
    intro: 'Le geste juste, le bois vivant. Un atelier contemporain où chaque détail raconte le sur-mesure.',
    headline: ['Le bois.', 'Et vous.'], note: 'Des pièces singulières. Faites pour durer.',
    image: 'https://images.pexels.com/photos/5974239/pexels-photo-5974239.jpeg', secondary: 'https://images.pexels.com/photos/6790976/pexels-photo-6790976.jpeg',
    imageAlt: 'Mains d’un menuisier rabotant une planche de bois sur son établi',
    directions: [{id:'atelier',label:'Brut',detail:'Matière pleine page & lettrage radical'},{id:'signature',label:'Signature',detail:'Épure, asymétrie & détails de fabrication'},{id:'contemporain',label:'Collection',detail:'Index de projets & composition structurée'}],
    palettes: [{"id":"noyer","label":"Miel","bg":"#f3e6cd","ink":"#402b1e","accent":"#f0c56f","accentInk":"#402b1e"},{"id":"foret","label":"Forêt","bg":"#143c32","ink":"#f4edda","accent":"#d3ee85","accentInk":"#15392e"},{"id":"charbon","label":"Braise","bg":"#22201f","ink":"#f6eee5","accent":"#ff663b","accentInk":"#281b16"},{"id":"blanc","label":"Blanc","bg":"#ffffff","ink":"#253b32","accent":"#bc734c","accentInk":"#ffffff"}],
    services: ['Dessiner ensemble','Choisir la matière','Façonner chez nous'],
    descriptions: ['Une pièce, un usage, une idée : nous partons de votre quotidien pour dessiner le projet.','Chêne, noyer, frêne. Des textures et des finitions choisies pour votre intérieur.','Du premier tracé à la pose, chaque détail est travaillé dans notre atelier.'],
    projects: ['Le geste précis','La matière vivante','Le travail à l’établi'],
  },
  {
    id: 'decorateur', label: 'Décoration & intérieurs', brand: 'nuance', tag: 'Des lieux. Des émotions.',
    intro: 'Un studio d’intérieurs qui compose avec la lumière, les textures et votre façon de vivre.',
    headline: ['Habiter', 'autrement.'], note: 'L’espace se dessine. La vie s’y installe.',
    image: 'photo-1600210492486-724fe5c67fb0', secondary: 'photo-1600607687920-4e2a09cf159d',
    imageAlt: 'Salon contemporain aux tons naturels et à la lumière douce',
    directions: [{id:'editorial',label:'Éditorial',detail:'Esprit magazine & images décalées'},{id:'immersion',label:'Immersion',detail:'Photographie panoramique & titres flottants'},{id:'galerie',label:'Galerie',detail:'Mosaïque interactive & regard curatorial'}],
    palettes: [{"id":"terracotta","label":"Cocon","bg":"#f4e6d5","ink":"#563e30","accent":"#e8bd98","accentInk":"#563e30","swatches":["#fffaf4","#ad643f","#c9d2bc","#ddbcaa","#513d32"]},{"id":"olive","label":"Klein & craie","bg":"#f5f3ee","ink":"#24345e","accent":"#2445fa","accentInk":"#ffffff","swatches":["#f5f3ee","#2445fa","#becfca","#e9bb9e","#d8d0ed"]},{"id":"encre","label":"Rose & argile","bg":"#faf3ee","ink":"#513449","accent":"#e93691","accentInk":"#ffffff","swatches":["#faf3ee","#e93691","#d7c2e6","#b9cdc1","#d1a287"]}],
    services: ['Trouver votre fil','Composer les volumes','Donner vie au lieu'],
    descriptions: ['Nous explorons vos habitudes et vos envies pour définir une direction qui vous ressemble.','Couleurs, circulation, mobilier : un équilibre entre caractère et confort.','Une sélection de matières et d’objets pour transformer l’intention en intérieur.'],
    projects: ['Une maison au calme','L’appartement lumière','Une parenthèse urbaine'],
  },
];
export type Inspiration = typeof inspirations[number];
export const photo = (id: string, width = 1600) => id.startsWith("https://") ? `${id}?auto=compress&fit=crop&w=${width}&q=85` : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const grainGallery = [
  {image:'https://images.pexels.com/photos/6790976/pexels-photo-6790976.jpeg',alt:'Mains guidant un rabot sur une pièce de bois'},
  {image:'photo-1644931551533-02906718127f',alt:'Gros plan sur les veines et la texture du bois brut'},
  {image:'https://images.pexels.com/photos/5974239/pexels-photo-5974239.jpeg',alt:'Menuisier travaillant une planche à l’établi parmi les copeaux'},
];

export type Category = 'Football' | 'Amour' | 'Film d\'horreur' | 'Perso' | 'Argent' | 'Loyauté' | 'Style' | 'Maison' | 'Vices' | 'Talents' | 'Basket';

export const portraitDescriptions: Record<Category, { title: string; description: string }> = {
  'Football': { 
    title: "Le Ballon d'Or du Groupe", 
    description: "Pour toi, la vie est un match de 90 minutes. Tu simules les fautes dans tes relations et tu célèbres chaque petite victoire comme une finale de Coupe du Monde." 
  },
  'Amour': { 
    title: "Le Charmeur en Série", 
    description: "Ton cœur est un moulin. Tu tombes amoureux plus vite que ton ombre et tu es probablement déjà en train de stalker quelqu'un sur Insta en lisant ceci." 
  },
  'Film d\'horreur': { 
    title: "La Première Victime", 
    description: "Dans un film d'horreur, tu serais celui qui va voir 'ce qu'était ce bruit' au sous-sol sans lampe torche. Merci pour ton sacrifice héroïque mais inutile." 
  },
  'Perso': { 
    title: "Le Livre Ouvert", 
    description: "Tes émotions sont visibles depuis l'espace. Tu pleures devant des pubs de croquettes et tu racontes tes problèmes de couple à la caissière du Lidl." 
  },
  'Argent': { 
    title: "Le Futur Milliardaire (ou SDF)", 
    description: "Tu dépenses de l'argent que tu n'as pas pour impressionner des gens que tu n'aimes pas. Ton banquier fait des cauchemars où tu apparais en costume de luxe." 
  },
  'Loyauté': { 
    title: "Le Roc de l'Escouade", 
    description: "Tu es le genre de pote qui aiderait à enterrer un corps à 4h du matin sans poser de questions. Un pilier, un vrai, peut-être un peu trop têtu." 
  },
  'Style': { 
    title: "L'Icône de Mode (Incomprise)", 
    description: "Tu passes plus de temps devant le miroir que tout le groupe réuni. Tu achètes des sneakers au prix d'un loyer et tu portes des lunettes de soleil quand il pleut." 
  },
  'Maison': { 
    title: "Le Casanier Professionnel", 
    description: "Ta maison est ton sanctuaire (et souvent un champ de bataille). Tu pourrais vivre en autarcie avec Netflix et des pâtes pendant 3 ans sans sortir." 
  },
  'Vices': { 
    title: "L'Agent du Chaos", 
    description: "Où tu passes, le drama trépasse. Tu perds ton téléphone, tu oublies tes clés et tu es la raison pour laquelle le groupe a des histoires improbables à raconter." 
  },
  'Talents': { 
    title: "Le Génie Sous-Estimé", 
    description: "Tu as un potentiel énorme, mais tu l'utilises principalement pour convaincre les autres de faire des bêtises. Un talent gâché avec brio." 
  },
  'Basket': { 
    title: "Le All-Star de Quartier", 
    description: "Tu te prends pour LeBron même quand tu rates un panier à 1 mètre. Ta détente verticale est proportionnelle à ton ego sur le terrain." 
  }
};

export const getPortrait = (counts: Record<Category, number>) => {
  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat as Category);

  const top1 = sorted[0] || 'Vices';
  return portraitDescriptions[top1];
};

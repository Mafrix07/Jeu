export type Category = 'Ambition' | 'Social' | 'Chaos' | 'Cerveau' | 'Drôle' | 'Romantique' | 'Leader';

export const portraitDescriptions: Record<Category, Record<Category, { title: string; description: string }>> = {
  Ambition: {
    Ambition: { title: "Le Requin en Costume Pyjama", description: "Tu veux tout conquérir, même quand on joue juste à un jeu. Calme-toi Jeff Bezos, on sait que tu calcules déjà ton premier million en dormant." },
    Social: { title: "Le Ministre de l'Influence", description: "Tu as un plan pour conquérir le monde, et tu as déjà le carnet d'adresses pour le financer. Un mélange effrayant de charisme et de soif de pouvoir." },
    Chaos: { title: "L'Entrepreneur de l'Anarchie", description: "Tu veux bâtir un empire, mais tu perds tes clés trois fois par jour. Ton business plan est écrit sur une serviette de bar tachée." },
    Cerveau: { title: "Le Génie Maléfique", description: "Tu es trop intelligent pour ton propre bien. On sait tous que tu prépares un coup d'État technologique depuis ta chambre." },
    Drôle: { title: "Le PDG du Stand-up", description: "Tu veux réussir, mais tu ne peux pas t'empêcher de faire une blague pendant ton pitch. Au moins, on rira à tes funérailles de millionnaire." },
    Romantique: { title: "L'Amoureux de la Réussite", description: "Tu es marié à ta carrière, mais tu cherches quelqu'un pour partager ton jet privé. Un romantique avec un tableur Excel pour les sentiments." },
    Leader: { title: "Le Visionnaire Implacable", description: "Le groupe te voit comme celui qui tracera son chemin quoi qu'il arrive. Tu as un plan B, C et D quand les autres improvisent encore le plan A." }
  },
  Social: {
    Ambition: { title: "L'Opportuniste de Génie", description: "Tu connais tout le monde et tu sais exactement comment chaque personne peut t'aider à monter. Un vrai politicien en herbe." },
    Social: { title: "Le Papillon de Nuit", description: "Si tu n'es pas au centre de l'attention, est-ce que tu existes vraiment ? Tu es le ciment du groupe, ou juste le plus bruyant." },
    Chaos: { title: "La Bombe Sociale", description: "Tu es l'âme de la fête, mais personne ne sait comment tu rentres chez toi. Tu es partout et nulle part à la fois." },
    Cerveau: { title: "L'Analyste de Foule", description: "Tu observes tout le monde et tu sais exactement quoi dire pour plaire. C'est soit du talent, soit de la manipulation sociopathique." },
    Drôle: { title: "L'Aimant à Sourires", description: "Tout le monde t'aime parce que tu es drôle, mais personne ne te confierait ses secrets les plus sombres. Trop de risque que ça finisse en vanne." },
    Romantique: { title: "Le Dragueur de Compétition", description: "Tu charmes tout ce qui bouge. Ton réseau social est 50% d'amis et 50% d'ex qui attendent ton message à 2h du matin." },
    Leader: { title: "L'Influenceur Alpha", description: "Tu mènes le groupe par ton charisme. Les gens te suivent parce qu'ils ont peur de rater le moment où tu feras un truc légendaire." }
  },
  Chaos: {
    Ambition: { title: "Le Magnat du Désordre", description: "Tu as de grandes ambitions, mais ton bureau ressemble à une zone de guerre. Tu vas réussir, mais personne ne sait comment." },
    Social: { title: "L'Électron Libre", description: "Tu es invité partout parce qu'on ne sait jamais ce que tu vas faire. Tu es le 'wild card' qui peut transformer un dîner calme en projet de voyage au Tibet." },
    Chaos: { title: "L'Agent du Chaos Absolu", description: "Même toi tu ne sais pas ce que tu vas faire dans 5 minutes. Tu es imprévisible, épuisant, mais indispensable à la survie du groupe." },
    Cerveau: { title: "Le Savant Fou", description: "Ton cerveau fonctionne trop vite et dans des directions que la science ne peut pas expliquer. Tu es à deux doigts d'inventer la téléportation ou de mettre le feu à l'eau." },
    Drôle: { title: "Le Clown de l'Apocalypse", description: "Tes blagues sont aussi imprévisibles que tes plans. On rit de peur ou de joie, on ne sait plus trop." },
    Romantique: { title: "Le Cœur en Montagnes Russes", description: "Tu tombes amoureux comme on tombe dans les escaliers : bruyamment et sans aucune grâce. Une vie sentimentale digne d'un film de Tarantino." },
    Leader: { title: "Le Chef de Gang Anarchiste", description: "Tu mènes les autres vers des plans foireux avec une confiance aveugle. Et le pire, c'est que tout le monde te suit." }
  },
  Cerveau: {
    Ambition: { title: "L'Architecte du Futur", description: "Tu calcules tout. Ta vie est une partie d'échecs et on est juste des pions. On attend juste que tu deviennes notre suzerain." },
    Social: { title: "L'Encyclopédie Vivante", description: "Tu as une réponse à tout, même quand on n'a pas posé de question. Briller en société, c'est ton sport olympique." },
    Chaos: { title: "Le Paradoxe Ambulant", description: "Tu es capable de résoudre des équations complexes mais pas de faire cuire des pâtes sans déclencher l'alarme incendie." },
    Cerveau: { title: "La Bibliothèque d'Alexandrie", description: "Tu es le cerveau du groupe. Trop intelligent pour ton propre bien, tu finiras probablement par vivre dans une grotte pour échapper à la bêtise humaine." },
    Drôle: { title: "L'Humoriste Cynique", description: "Ton humour est tellement cérébral qu'il faut un dictionnaire pour comprendre tes vannes. Mais quand on comprend, c'est dévastateur." },
    Romantique: { title: "L'Amoureux Théorique", description: "Tu connais tout sur la psychologie de l'amour, mais tu paniques quand quelqu'un te touche le bras. Un génie sentimental en théorie uniquement." },
    Leader: { title: "Le Grand Stratège", description: "Tu ne parles pas beaucoup, mais quand tu le fais, tout le monde se tait. Tu diriges dans l'ombre comme un parrain de la mafia intellectuelle." }
  },
  Drôle: {
    Ambition: { title: "Le Comique de Carrière", description: "Tu veux réussir pour pouvoir enfin dire à tes profs qu'être le clown de la classe, ça paye. Un ambitieux qui rit de ses propres échecs." },
    Social: { title: "Le Roi de la Vanne", description: "Tu es le moteur comique du groupe. Sans toi, on se ferait chier comme à un enterrement sans buffet." },
    Chaos: { title: "Le Gaz Hilarant", description: "Tes blagues sortent de nulle part et frappent là où ça fait mal. Tu es un danger public pour les abdominaux des autres." },
    Cerveau: { title: "L'Esprit Acéré", description: "Ton humour est une arme de précision. Tu vois les failles des autres et tu les transformes en perles comiques." },
    Drôle: { title: "Le Juke-box à Vannes", description: "Tu es une usine à blagues. On se demande si tu as un bouton 'off' ou si tu vas continuer à faire des jeux de mots sur ton lit de mort." },
    Romantique: { title: "Le Charmeur Rigolo", description: "Tu fais rire les gens pour qu'ils ne voient pas à quel point tu es désespérément romantique. La technique du clown triste, version efficace." },
    Leader: { title: "Le Leader de la Rigolade", description: "Tu mènes le groupe par le rire. C'est une dictature de la bonne humeur et malheur à celui qui ne rit pas à tes blagues." }
  },
  Romantique: {
    Ambition: { title: "Le Chasseur de Cœurs de Luxe", description: "Tu veux le grand amour, mais avec un compte en banque bien rempli. Un romantique pragmatique qui rêve de noces à Monaco." },
    Social: { title: "Le Cupidon Social", description: "Tu es amoureux de l'amour et tu veux que tout le monde le sache. Tu es le genre à poster des poèmes sur LinkedIn." },
    Chaos: { title: "Le Désastre Sentimental", description: "Tu tombes amoureux d'une personne différente chaque semaine. Ta vie amoureuse est une série Netflix dont on a perdu le fil." },
    Cerveau: { title: "Le Poète Maudit", description: "Tu analyses tes sentiments jusqu'à ce qu'ils n'existent plus. Tu es le genre à écrire une thèse sur ton premier baiser." },
    Drôle: { title: "Le Romantique de Sitcom", description: "Ta vie amoureuse est une suite de quiproquos drôles. Tu es le Friends du groupe, mais version un peu plus tragique." },
    Romantique: { title: "L'Amoureux Ultime", description: "Tu es le dernier des romantiques. Tu attends ton prince charmant ou ta princesse avec une patience qui frise l'obsession." },
    Leader: { title: "Le Protecteur du Groupe", description: "Tu aimes tes amis comme ta propre famille. Tu es le pilier émotionnel, celui qui console tout le monde après une rupture." }
  },
  Leader: {
    Ambition: { title: "Le Napoléon Moderne", description: "Tu ne veux pas juste mener le groupe, tu veux conquérir les pays voisins. Ton ambition est seulement égalée par ton besoin de contrôle." },
    Social: { title: "Le Chef de Clan", description: "Tu es le centre de gravité du groupe. Tout le monde gravite autour de toi parce que tu sais où on va (même quand c'est faux)." },
    Chaos: { title: "Le Général de la Confusion", description: "Tu mènes les autres dans des situations impossibles avec une assurance totale. Un leader qui adore le danger." },
    Cerveau: { title: "Le Maître à Penser", description: "Tu diriges par l'intellect. On te suit parce que tu as toujours raison, et c'est agaçant à mourir." },
    Drôle: { title: "Le Capitaine Fracasse", description: "Tu mènes avec le sourire et une vanne prête à tout moment. Un leader qui sait que l'autorité, ça passe mieux avec un rire." },
    Romantique: { title: "Le Cœur de Lion", description: "Tu diriges pour protéger ceux que tu aimes. Un leader noble qui ferait n'importe quoi pour son groupe de potes." },
    Leader: { title: "Le Boss Final", description: "Tu es le leader né. Tu prends les décisions, tu gères les crises, et on se demande tous ce qu'on ferait sans toi (probablement dormir)." }
  }
};

export const getPortrait = (counts: Record<Category, number>) => {
  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat as Category);

  const top1 = sorted[0] || 'Chaos';
  const top2 = sorted[1] || top1;

  return portraitDescriptions[top1][top2];
};

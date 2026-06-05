export interface Question {
  id: number;
  text: string;
  category: 'Ambition' | 'Social' | 'Chaos' | 'Cerveau' | 'Drôle' | 'Romantique' | 'Leader';
}

export const questions: Question[] = [
  // Ambition (6)
  { id: 1, text: "Qui sera millionnaire à 30 ans ?", category: 'Ambition' },
  { id: 2, text: "Qui aura la carrière la plus impressionnante ?", category: 'Ambition' },
  { id: 3, text: "Qui créera une startup ?", category: 'Ambition' },
  { id: 4, text: "Qui va devenir riche en premier ? 💸", category: 'Ambition' },
  { id: 5, text: "Qui a le plus de chances d’être milliardaire ? 💰", category: 'Ambition' },
  { id: 6, text: "Qui peut lancer un business bizarre et réussir quand même ?", category: 'Ambition' },

  // Social (6)
  { id: 7, text: "Qui est le plus susceptible de devenir célèbre ? ⭐", category: 'Social' },
  { id: 8, text: "Qui peut parler pendant 4h sans se fatiguer ? 🗣️", category: 'Social' },
  { id: 9, text: "Qui a le meilleur style ? 👕", category: 'Social' },
  { id: 10, text: "Qui est le plus sociable ?", category: 'Social' },
  { id: 11, text: "Qui va finir influenceur TikTok ? 📱", category: 'Social' },
  { id: 12, text: "Qui est le plus susceptible de répondre “vu” seulement ?", category: 'Social' },

  // Cerveau (6)
  { id: 13, text: "Qui est le plus intelligent du groupe ? 🧠", category: 'Cerveau' },
  { id: 14, text: "Qui est le plus calme ?", category: 'Cerveau' },
  { id: 15, text: "Qui pourrait devenir prof ?", category: 'Cerveau' },
  { id: 16, text: "Qui est le plus sensible malgré les apparences ?", category: 'Cerveau' },
  { id: 17, text: "Qui résout les problèmes le plus vite ?", category: 'Cerveau' },
  { id: 18, text: "Qui a la meilleure mémoire ?", category: 'Cerveau' },

  // Leader (7)
  { id: 19, text: "Qui peut devenir président ? 🇹🇬", category: 'Leader' },
  { id: 20, text: "Qui est le plus têtu ? 🗿", category: 'Leader' },
  { id: 21, text: "Qui peut survivre seul sur une île ? 🌴", category: 'Leader' },
  { id: 22, text: "Qui pourrait ouvrir une église ou une secte sans faire exprès ? 💀", category: 'Leader' },
  { id: 23, text: "Qui est le plus fort mentalement ?", category: 'Leader' },
  { id: 24, text: "Qui va quitter le groupe en premier après un débat ?", category: 'Leader' },
  { id: 25, text: "Qui prend les décisions pour le groupe ?", category: 'Leader' },

  // Chaos (8)
  { id: 26, text: "Qui est le plus fort au basket ? 🏀", category: 'Chaos' },
  { id: 27, text: "Qui est le plus paresseux ? 🛌", category: 'Chaos' },
  { id: 28, text: "Qui peut oublier son propre anniversaire ? 💀", category: 'Chaos' },
  { id: 29, text: "Qui est le plus mystérieux ? 🌑", category: 'Chaos' },
  { id: 30, text: "Qui est le plus dangereux quand il s’ennuie ? ⚠️", category: 'Chaos' },
  { id: 31, text: "Qui mange le plus ? 🍗", category: 'Chaos' },
  { id: 32, text: "Qui est le plus en retard ? ⏰", category: 'Chaos' },
  { id: 33, text: "Qui est le plus susceptible de disparaître pendant 3 jours sans nouvelles ? 😭", category: 'Chaos' },

  // Drôle (6)
  { id: 34, text: "Qui est le plus drôle ? 😂", category: 'Drôle' },
  { id: 35, text: "Qui est le plus susceptible de finir chauve ? 😭", category: 'Drôle' },
  { id: 36, text: "Qui a le pire humour ? 😭", category: 'Drôle' },
  { id: 37, text: "Qui fait le plus rire ?", category: 'Drôle' },
  { id: 38, text: "Qui a les meilleures blagues ?", category: 'Drôle' },
  { id: 39, text: "Qui est le plus sarcastique ?", category: 'Drôle' },

  // Romantique (6)
  { id: 40, text: "Qui est le plus djandjou ? 😭", category: 'Romantique' },
  { id: 41, text: "Qui aura le plus d’enfants ? 👶", category: 'Romantique' },
  { id: 42, text: "Qui va se marier en premier ? 💍", category: 'Romantique' },
  { id: 43, text: "Qui est le plus romantique ? ❤️", category: 'Romantique' },
  { id: 44, text: "Qui est le plus chanceux avec les filles ?", category: 'Romantique' },
  { id: 45, text: "Qui est le plus susceptible d’avoir des jumeaux ? 👶👶", category: 'Romantique' },
];

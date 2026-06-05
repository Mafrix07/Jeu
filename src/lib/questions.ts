export interface Question {
  id: number;
  text: string;
  category: 'Ambition' | 'Social' | 'Chaos' | 'Cerveau' | 'Drôle' | 'Romantique' | 'Leader';
}

export const questions: Question[] = [
  // --- NOUVELLES QUESTIONS (50 TOTAL) ---
  
  // Ambition (7)
  { id: 1, text: "Qui sacrifierait son sommeil pour l'argent ?", category: 'Ambition' },
  { id: 2, text: "Qui sera le plus grand requin en affaires ?", category: 'Ambition' },
  { id: 3, text: "Qui aura la plus grosse villa ?", category: 'Ambition' },
  { id: 4, text: "Qui ne prendra jamais sa retraite ?", category: 'Ambition' },
  { id: 5, text: "Qui est capable de vendre du sable dans le désert ?", category: 'Ambition' },
  { id: 6, text: "Qui finira dans le classement Forbes ?", category: 'Ambition' },
  { id: 7, text: "Qui travaillera même le jour de son mariage ?", category: 'Ambition' },

  // Social (8)
  { id: 8, text: "Qui a le meilleur football avec les go ? ⚽", category: 'Social' },
  { id: 9, text: "Qui connaît tout le monde en soirée ?", category: 'Social' },
  { id: 10, text: "Qui est le plus 'm'as-tu-vu' ?", category: 'Social' },
  { id: 11, text: "Qui changera de personnalité devant une fille ?", category: 'Social' },
  { id: 12, text: "Qui sera invité à toutes les galas ?", category: 'Social' },
  { id: 13, text: "Qui est le plus gros charognard en soirée ?", category: 'Social' },
  { id: 14, text: "Qui finira avec le plus de followers ?", category: 'Social' },
  { id: 15, text: "Qui est le plus susceptible de gratter une invitation partout ?", category: 'Social' },

  // Cerveau (7)
  { id: 16, text: "Qui est le plus susceptible de gagner une partie d'échecs ?", category: 'Cerveau' },
  { id: 17, text: "Qui connaît des faits inutiles sur tout ?", category: 'Cerveau' },
  { id: 18, text: "Qui serait le meilleur en cryptographie ?", category: 'Cerveau' },
  { id: 19, text: "Qui lit les conditions générales d'utilisation ?", category: 'Cerveau' },
  { id: 20, text: "Qui a toujours une citation pour tout ?", category: 'Cerveau' },
  { id: 21, text: "Qui est le plus philosophe après minuit ?", category: 'Cerveau' },
  { id: 22, text: "Qui corrigera tes fautes d'orthographe en plein débat ?", category: 'Cerveau' },

  // Leader (7)
  { id: 23, text: "Qui serait le meilleur capitaine de bateau ?", category: 'Leader' },
  { id: 24, text: "Qui ne s'excuse jamais même quand il a tort ?", category: 'Leader' },
  { id: 25, text: "Qui gère le mieux le stress ?", category: 'Leader' },
  { id: 26, text: "Qui serait le chef d'une rébellion ?", category: 'Leader' },
  { id: 27, text: "Qui a le plus d'autorité naturelle ?", category: 'Leader' },
  { id: 28, text: "Qui serait le parrain d'une mafia ?", category: 'Leader' },
  { id: 29, text: "Qui est capable de convaincre tout le groupe de faire une bêtise ?", category: 'Leader' },

  // Chaos (7)
  { id: 30, text: "Lequel mourrait en premier si on était dans un film d'horreur ? 😱", category: 'Chaos' },
  { id: 31, text: "Qui ferait un braquage pour le frisson ?", category: 'Chaos' },
  { id: 32, text: "Qui est le plus susceptible de finir en garde à vue ?", category: 'Chaos' },
  { id: 33, text: "Qui partirait à l'autre bout du monde sur un coup de tête ?", category: 'Chaos' },
  { id: 34, text: "Qui supprimerait tous ses réseaux sociaux sans prévenir ?", category: 'Chaos' },
  { id: 35, text: "Qui est capable de dormir pendant 24h ?", category: 'Chaos' },
  { id: 36, text: "Qui finit toujours ses soirées dans des endroits improbables ?", category: 'Chaos' },

  // Drôle (7)
  { id: 37, text: "Qui rira à un moment inapproprié ?", category: 'Drôle' },
  { id: 38, text: "Qui est le plus grand gaffeur ?", category: 'Drôle' },
  { id: 39, text: "Qui ferait un malaise pour attirer l'attention ?", category: 'Drôle' },
  { id: 40, text: "Qui a le rire le plus bizarre ?", category: 'Drôle' },
  { id: 41, text: "Qui est capable de faire une blague à ses propres funérailles ?", category: 'Drôle' },
  { id: 42, text: "Qui a le plus de dossiers sur les autres ?", category: 'Drôle' },
  { id: 43, text: "Qui imite le mieux les profs ?", category: 'Drôle' },

  // Romantique (7)
  { id: 44, text: "Qui serait le plus content quand sa meuf va le tromper ? 🦌", category: 'Romantique' },
  { id: 45, text: "Qui est le plus grand canard du groupe ? 🦆", category: 'Romantique' },
  { id: 46, text: "Qui pleurera le plus devant un film romantique ?", category: 'Romantique' },
  { id: 47, text: "Qui est capable de pardonner l'impardonnable ?", category: 'Romantique' },
  { id: 48, text: "Qui a le plus d'ex ?", category: 'Romantique' },
  { id: 49, text: "Qui est le plus susceptible de se marier à Las Vegas ?", category: 'Romantique' },
  { id: 50, text: "Qui écrira un poème pour s'excuser ?", category: 'Romantique' },
];

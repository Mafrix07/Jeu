# 🌌 Vibe Check — Le portrait craché de ton groupe

Une application full-stack interactive pour voter anonymement sur des questions humoristiques entre amis et générer des portraits de personnalité basés sur les résultats.

## 🚀 Technologies
- **Frontend :** React + TypeScript (Vite)
- **Animations :** Framer Motion
- **Styles :** Tailwind CSS
- **Backend :** Supabase (Realtime DB + Auth + RLS)
- **Déploiement :** Vercel

## 🛠️ Installation et Configuration

### 1. Cloner le projet
```bash
git clone <url-de-ton-depot-github>
cd Jeu
npm install
```

### 2. Configuration Supabase
1. Crée un projet sur [Supabase](https://supabase.com).
2. Va dans l'onglet **SQL Editor** et exécute le contenu du fichier `supabase_migration.sql` situé à la racine du projet.
3. Active le **Realtime** sur la table `progress` (Database -> Replication -> Tables -> progress).

### 3. Variables d'environnement
Crée un fichier `.env` à la racine et remplis-le :
```env
VITE_SUPABASE_URL=ton_url_supabase
VITE_SUPABASE_ANON_KEY=ta_cle_public_anon
VITE_SECRET_SALT=une_phrase_secrete_au_choix
```

### 4. Lancer en local
```bash
npm run dev
```

## 📦 Déploiement sur Vercel
1. Connecte ton compte GitHub à Vercel.
2. Importe ce dépôt.
3. Ajoute les **Environment Variables** (les mêmes que dans ton `.env`) dans les paramètres du projet sur Vercel.
4. Clique sur **Deploy**.

## 🔒 Sécurité et Anonymat
- Les votes sont anonymisés via un hachage SHA-256 (`session_id` + `player_name` + `salt`).
- Le Row Level Security (RLS) de Supabase garantit que personne ne peut voir qui a voté pour qui.

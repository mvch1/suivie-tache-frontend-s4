# 📋 Suivi de Tâches

Application web moderne de gestion de projets et de suivi de tâches en équipe.

**Suivi de Tâches** est une plateforme collaborative qui permet à des utilisateurs de créer des projets, d'y inviter des membres, de répartir des tâches, de suivre leur avancement et de recevoir des notifications en temps réel sur toute l'activité (demandes d'adhésion, tâches terminées, etc.).

Elle s'adresse aussi bien à des équipes qui veulent piloter leurs projets qu'à des administrateurs qui supervisent l'ensemble de la plateforme depuis un tableau de bord dédié.

---

## 🔎 Aperçu rapide

| Icône | Domaine | Rôle |
|------|---------|------|
| 🔐 | Authentification | Connexion par identifiants, GitHub ou Google, session JWT sécurisée par cookie. |
| 📁 | Projets | Création, édition, suppression, partage et recherche de projets. |
| ✅ | Tâches | Création, assignation à plusieurs membres, suivi et validation de complétion. |
| 👥 | Membres | Invitation, demandes d'adhésion, approbation/rejet, gestion des rôles. |
| 🔔 | Notifications | Notifications générales et demandes (approbation en un clic). |
| 🖼️ | Profil | Édition du profil utilisateur et upload d'avatar. |
| 📊 | Dashboard | Vue d'administration réservée aux comptes ADMIN. |

---

## ✨ Fonctionnalités principales

### 🔐 Authentification & Onboarding
- Connexion via **Credentials** (identifiant/mot de passe), **GitHub** et **Google** (NextAuth).
- Session gérée par un token JWT stocké en cookie et validée dans un middleware Next.js.
- Parcours d'inscription (`/register`) et d'onboarding guidé pour les nouveaux utilisateurs.
- Protection des routes : redirection automatique vers `/login` si non authentifié, et vers `/forbidden` pour les routes réservées aux administrateurs (`/dashboard`).

### 📁 Gestion de projets
- Création de projets avec titre, description et date limite (deadline).
- Recherche et partage de projets.
- Gestion des membres : liste des utilisateurs, demandes de participation, rôles par projet.
- Suppression et sortie (« quitter ») d'un projet.

### ✅ Gestion de tâches
- Création de tâches rattachées à un projet.
- Assignation d'une ou plusieurs personnes par tâche.
- Marquage des tâches comme terminées et suivi de progression (barre de progression circulaire).

### 🔔 Notifications
- Notifications générales (informations, mises à jour) et notifications de type demande (adhésion à un projet).
- Approbation ou rejet direct des demandes depuis la liste de notifications.
- Statuts de suivi : `PENDING`, `APPROVED`, `REJECTED`.

### 👤 Profil utilisateur
- Modification des informations personnelles.
- Upload et changement de photo de profil.

### 📊 Dashboard administrateur
- Espace réservé aux utilisateurs ayant le rôle `ADMIN`, protégé par le middleware.

---

## 🏗️ Architecture

```
🌐 Navigateur
     |
     v
⚛️ Next.js App Router (React 19 + Server/Client Components)
     |
     +--> 🛡️ Middleware (auth JWT, protection des routes)
     |
     +--> 🔌 API Routes internes (app/api/*)
     |         - auth (NextAuth)
     |         - projects, tasks, notifications, user, signup, upload
     |
     v
🗄️ Prisma ORM
     |
     v
🐬 Base de données MySQL
```

---

## 🗂️ Structure du projet

```
projet-web-app/
├── app/
│   ├── (auth)/           # Login, register, onboarding
│   ├── (root)/(home)/    # Dashboard, projets, notifications, profil
│   └── api/               # Routes API (auth, projects, tasks, notifications, upload, webhooks...)
├── components/
│   ├── cards/             # Cartes UI (projet, utilisateur, notification...)
│   ├── lists/              # Listes (membres, notifications, demandes)
│   ├── modals/             # Modales (création/édition projet, tâches, profil)
│   └── ui/                 # Composants UI réutilisables (shadcn/ui)
├── lib/
│   ├── actions/             # Actions serveur (projets, tâches, utilisateurs)
│   ├── prisma.ts            # Client Prisma
│   └── session.ts           # Gestion de session
├── prisma/
│   └── schema.prisma        # Modèle de données (User, Projet, Task, Notification...)
├── middleware.ts             # Protection des routes et vérification JWT
└── public/                   # Assets statiques et fichiers uploadés
```

---

## 🛠️ Technologies utilisées

| Couche | Outils |
|--------|--------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router, Turbopack), [React 19](https://react.dev) |
| **Langage** | TypeScript |
| **UI / Style** | Tailwind CSS 4, Radix UI, shadcn/ui, Lucide Icons, next-themes |
| **Formulaires** | React Hook Form, Zod |
| **Authentification** | NextAuth.js (Credentials, GitHub, Google), JWT |
| **Base de données** | MySQL, Prisma ORM |
| **Notifications UI** | Sonner, React Toastify |
| **Autres** | date-fns, bcrypt, Svix (webhooks) |
| **Tunneling (dev)** | ngrok |

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org) ≥ 18
- [Yarn](https://yarnpkg.com) ou npm
- Une base de données **MySQL** accessible

---

## 🚀 Installation

1. **Cloner le projet**

   ```bash
   git clone <url-du-repo>
   cd projet-web-app
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env` à la racine avec les variables suivantes :

   ```env
   # Base de données
   DATABASE_URL="mysql://user:password@localhost:3306/suivi_tache"

   # NextAuth
   NEXTAUTH_SECRET="votre-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Providers OAuth
   GITHUB_ID="..."
   GITHUB_SECRET="..."
   GOOGLE_ID="..."
   GOOGLE_SECRET="..."
   ```

4. **Générer le client Prisma et synchroniser la base de données**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Lancer le serveur de développement**

   ```bash
   yarn dev
   # ou
   npm run dev
   ```

   L'application est accessible sur [http://localhost:3000](http://localhost:3000).

6. **(Optionnel) Exposer l'application via ngrok**

   ```bash
   yarn ngrok
   ```

---

## 📜 Scripts disponibles

| Commande | Description |
|----------|--------------|
| `yarn dev` | Lance le serveur de développement (Turbopack) |
| `yarn build` | Compile l'application pour la production |
| `yarn start` | Démarre l'application en mode production |
| `yarn lint` | Vérifie le code avec ESLint |
| `yarn ngrok` | Expose le port 3000 via un tunnel ngrok |

---

## 🗄️ Modèle de données (Prisma)

| Modèle | Description |
|--------|--------------|
| `User` | Utilisateurs de la plateforme (nom, identifiant, e-mail, avatar). |
| `Projet` | Projets créés par un propriétaire, avec titre, description et deadline. |
| `Task` | Tâches rattachées à un projet, avec statut de complétion. |
| `User_Project` | Association utilisateur ↔ projet avec un rôle. |
| `User_Task` | Association utilisateur ↔ tâche (assignation). |
| `Notification` | Notifications générales ou demandes (adhésion), avec statut `PENDING` / `APPROVED` / `REJECTED`. |

---

## 📌 Notes de développement

- Ne jamais commiter le fichier `.env` ni les fichiers dans `public/uploads`.
- Le middleware (`middleware.ts`) protège toutes les routes sauf `/login`, `/register`, `/Onbording` et `/api/upload`.
- L'accès à `/dashboard` est réservé aux utilisateurs avec le rôle `ADMIN`.
- Après toute modification du schéma Prisma, exécuter `npx prisma migrate dev` pour synchroniser la base de données.

---

## ✅ Statut actuel

Le projet est fonctionnel et couvre l'ensemble du parcours : authentification, création et gestion de projets, assignation de tâches, notifications et administration. Les prochaines améliorations porteront sur le renforcement des tests, la validation des données et l'optimisation des performances.

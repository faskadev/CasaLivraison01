CasaLivraison - Plateforme de Logistique Premium
CasaLivraison est une application mobile de livraison de repas ultra-rapide située au cœur de Casablanca. Ce projet inclut une API REST Backend, une base de données PostgreSQL, et une application mobile React Native (Expo).

🚀 Technologies Utilisées
Backend: Node.js, Express, Sequelize (PostgreSQL)
Frontend: React Native (Expo)
DevOps: Docker, Docker Compose
Tests: Jest, Supertest
📦 Structure du Projet
backend/: Code source de l'API et logique métier via Sequelize.
mobile/: Code source de l'application mobile React Native.
docker-compose.yml: Orchestration des services Backend et Database.
🛠️ Installation et Démarrage Local
Prérequis
Node.js (v18+)
Docker & Docker Compose
Expo CLI (npm install -g expo-cli)
1. Démarrer le Backend et la Base de Données (Docker)
Pour lancer l'environnement complet (API + Base de Données) :

docker-compose up --build
L'API sera accessible sur http://localhost:5000.

2. Initialiser la Base de Données
Une fois le conteneur api lancé, le seed (données de test) peut être exécuté manuellement si nécessaire (bien qu'il ne soit pas automatiquement lancé par défaut pour éviter d'écraser les données à chaque démarrage).

Pour réinitialiser et peupler la base de données :

# Entrer dans le conteneur API
docker-compose exec api npm run seed
3. Démarrer l'Application Mobile
Dans un nouveau terminal :

cd mobile
npm install
npx expo start
Scannez le QR code avec l'application Expo Go sur votre téléphone.
Ou appuyez sur a pour lancer l'émulateur Android.
Note: Assurez-vous que votre téléphone est sur le même réseau Wi-Fi que votre ordinateur. L'API est configurée par défaut pour pointer vers votre IP locale (vérifiez mobile/src/context/AuthContext.js pour ajuster API_URL si nécessaire, par défaut 10.0.2.2 pour l'émulateur Android ou voir instructions pour IP locale).

🔑 Variables d'Environnement (.env)
Backend (backend/.env)
Le fichier .env.example est fourni. Créez un fichier .env :

PORT=5000
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=casalivraison
DB_PORT=5432
JWT_SECRET=votre_secret_jwt

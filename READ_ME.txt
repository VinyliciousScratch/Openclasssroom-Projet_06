## Installation et lancement du projet

Après téléchargement du projet, ouvrez deux terminaux distincts :

### 1. Frontend
Dans le dossier "frontend", lancez la commande :
npm start

### 2. Backend
Dans le dossier "backend", lancez la commande :
nodemon server

## Configuration

Un fichier ".env" doit être ajouté à la racine du dossier "backend".

Dans le cas où le projet est fourni sous forme de livrable, le fichier ".env" sera inclus.

Ce fichier doit suivre le modèle du fichier ".env.example" en remplaçant les valeurs :

- "MONGO_URI" : URI de connexion à la base de données MongoDB
- "AUTH_KEY" : clé secrète utilisée pour les tokens (JWT)




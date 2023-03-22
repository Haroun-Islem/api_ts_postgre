API TypeScript PostgreSQL
Ceci est un projet de démarrage d'une API RESTful avec TypeScript et PostgreSQL.

Prérequis
Pour pouvoir exécuter ce projet, vous devez installer les logiciels suivants sur votre machine :

Node.js
npm
Installation
Clonez ce dépôt de code source
Installez les dépendances avec la commande npm install
Créez un fichier .env à la racine du projet en vous basant sur le fichier .env.example fourni. Ce fichier contiendra les informations sensibles de configuration de votre base de données PostgreSQL.
Compilez le code TypeScript avec la commande npm run build
Démarrez le serveur avec la commande npm start
Vous pouvez également utiliser la commande npm run dev pour lancer le serveur en mode développement, avec redémarrage automatique à chaque modification du code.

Structure du projet
Le projet est organisé de la manière suivante :

.
├── dist
├── node_modules
├── src
│ ├── controllers
│ ├── database
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── app.ts
│ └── server.ts
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json

Le dossier dist contient le code JavaScript compilé à partir du code TypeScript.
Le dossier src contient le code TypeScript de l'API, organisé en différents dossiers selon la fonctionnalité.
Le fichier .env.example est un exemple de fichier de configuration pour les variables d'environnement utilisées dans le projet.

Les fichiers .eslintignore, .eslintrc.js, .gitignore, package.json, README.md, tsconfig.json, et tslint.json sont des fichiers de configuration pour les outils utilisés dans le projet.
Contributeurs
Islem Haroun

Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.

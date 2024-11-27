# GroceryList Pro - Test Application SaaS

## 📋 Description

L'exemple de SaaS est GroceryList Pro, une application SaaS innovante qui permet aux utilisateurs de créer et gérer des listes de courses avec un accès en temps réel aux stocks des magasins. Cette application offre une expérience utilisateur fluide et des fonctionnalités avancées pour simplifier la planification des achats.

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js (version 18 ou supérieure)
- npm ou yarn
- MySQL (version 8.0 ou supérieure)
- Un compte Stripe pour le traitement des paiements

## 🛠️ Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-username/saas-test.git
   cd saas-test

   ```

2. Installez les dépendances :

```shellscript
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```plaintext
# Configuration MySQL
SQL_HOST= nom_host
SQL_USER= nom_utilisateur
SQL_PASSWORD= mot_de_passe
SQL_DATABASE= nom_de_la_database

# Configuration du serveur
PORT=0000

# Clés Stripe
STRIPE_SECRET_KEY=clé
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=clé

# Configuration JWT
JWT_SECRET=secret
JWT_EXPIRE=24h
```

4. Configurez la base de données MySQL :

```sql
CREATE DATABASE saastest;
```

## 🔧 Configuration

### Base de données MySQL

La base de données est déjà configurée dans le fichier `.env`. Assurez-vous que MySQL est en cours d'exécution et que les informations de connexion sont correctes.

### Stripe

Les clés API Stripe sont incluses dans le fichier `.env`. Vérifiez qu'elles correspondent à votre compte Stripe.

### JWT (JSON Web Tokens)

Le secret JWT et la durée d'expiration sont définis dans le fichier `.env`. Vous pouvez ajuster ces paramètres selon vos besoins de sécurité.

## 💻 Lancement en local

1. Démarrez le serveur de développement :

```shellscript
npm run dev
# ou
yarn dev
```

2. Ouvrez votre navigateur et accédez à [http://localhost:1000](http://localhost:1000)

## 📱 Fonctionnalités principales

- Création et gestion de listes de courses
- Consultation en temps réel des stocks des magasins
- Système d'abonnement (Gratuit, Premium, Business)
- Paiements sécurisés via Stripe
- Interface utilisateur responsive
- Authentification sécurisée avec JWT

## 🔐 Routes protégées

Les routes suivantes nécessitent une authentification :

- `/dashboard` - Tableau de bord principal
- `/dashboard/mes-listes` - Gestion des listes de courses
- `/dashboard/stock-magasins` - Consultation des stocks
- `/dashboard/parametres` - Paramètres du compte utilisateur

## 🧪 Tests

### Test des paiements

Utilisez les cartes de test Stripe suivantes :

- Paiement réussi : 4242 4242 4242 4242
- Authentification requise : 4000 0025 0000 3155
- Paiement refusé : 4000 0000 0000 9995

Pour toutes les cartes de test :

- Date d'expiration : Une date future (ex: 12/25)
- CVC : N'importe quel nombre à 3 chiffres
- Code postal : N'importe quel code postal valide

## 🛠️ Structure du projet

```plaintext
grocerylist-pro/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── create-payment-intent/
│   ├── dashboard/
│   │   ├── mes-listes/
│   │   ├── stock-magasins/
│   │   └── parametres/
│   ├── success/
│   └── canceled/
├── components/
│   └── ui/
├── lib/
│   ├── db.js
│   └── stripe.js
├── public/
└── .env
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes ou avez des questions :

- Ouvrez une issue sur GitHub
- Contactez notre support à [support@grocerylist-pro.com](mailto:support@grocerylist-pro.com)

---

Développé avec ❤️ par l'équipe GroceryList Pro

```plaintext

Ce README réécrit fournit une vue d'ensemble complète du projet GroceryList P
```

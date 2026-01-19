# Dashboard Admin E-commerce 🚀

Un dashboard d'administration e-commerce professionnel et moderne avec design glassmorphique, animations fluides et sécurité avancée.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Design Glassmorphique** - Interface moderne avec effets de verre et transparence
- **Animations Fluides** - Transitions et animations avec Framer Motion
- **Responsive Design** - Compatible mobile, tablette et desktop
- **Dark Mode** - Interface optimisée pour les yeux

### 📊 Gestion E-commerce
- **Dashboard Analytics** - Statistiques en temps réel (revenus, commandes, clients)
- **Gestion Produits** - CRUD complet avec catégories, variants, images
- **Gestion Commandes** - Suivi des commandes avec statuts et historique
- **Gestion Clients** - Base de données clients avec historique d'achats
- **Gestion Coupons** - Codes promo et réductions
- **Avis Clients** - Modération et gestion des reviews
- **Rapports** - Génération de rapports détaillés

### 🔒 Sécurité Avancée
- **Authentification JWT** - Tokens sécurisés avec refresh tokens
- **Protection SQL Injection** - Requêtes paramétrées
- **Protection XSS** - Sanitisation des entrées
- **Protection CSRF** - Tokens anti-CSRF
- **Rate Limiting** - Protection contre les attaques DDoS
- **Password Hashing** - Bcrypt pour les mots de passe
- **Encryption** - AES-256-GCM pour les données sensibles
- **Activity Logs** - Traçabilité complète des actions
- **Account Locking** - Blocage après tentatives échouées
- **Security Headers** - Headers HTTP sécurisés

### 🐳 Docker & Déploiement
- **Docker Compose** - Environnement complet (PostgreSQL, Redis, Next.js)
- **Base de données PostgreSQL** - Avec migrations et seed data
- **Redis** - Cache et sessions
- **Adminer** - Interface de gestion de base de données

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+ 
- Docker & Docker Compose
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/johnson-ad/Dashboard-admin.git
cd Dashboard-admin
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration
```bash
cp .env.example .env.local
# Éditez .env.local avec vos configurations
```

### 4. Lancer avec Docker (Recommandé)
```bash
# Démarrer tous les services
docker-compose up -d

# La base de données sera automatiquement initialisée
```

Services disponibles :
- **Dashboard**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Adminer**: http://localhost:8080

### 5. Lancer en mode développement (sans Docker)
```bash
# Assurez-vous que PostgreSQL et Redis sont installés localement
npm run dev
```

## 📁 Structure du Projet

```
Dashboard-admin/
├── src/
│   ├── app/                    # Pages Next.js App Router
│   │   ├── api/               # API Routes sécurisées
│   │   ├── dashboard/         # Pages du dashboard
│   │   └── globals.css        # Styles globaux
│   ├── components/            # Composants React
│   │   ├── ui/               # Composants UI réutilisables
│   │   ├── layout/           # Layout components
│   │   └── dashboard/        # Composants dashboard
│   ├── lib/                   # Utilitaires
│   │   ├── auth.ts           # Authentification JWT
│   │   ├── db.ts             # Connexion database
│   │   ├── security.ts       # Sécurité avancée
│   │   └── utils.ts          # Fonctions utilitaires
│   ├── types/                 # Types TypeScript
│   └── config/                # Configuration
├── database/
│   └── init.sql              # Script d'initialisation DB
├── docker-compose.yml         # Configuration Docker
├── Dockerfile                 # Image Docker Next.js
├── package.json              # Dépendances
└── README.md                 # Documentation

```

## 🔐 Sécurité

### Authentification
```typescript
// Login avec protection rate limiting
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "Admin123!"
}

// Response avec tokens JWT
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { ... }
}
```

### Protection Implémentée
- ✅ Rate Limiting (100 req/15min par défaut)
- ✅ SQL Injection Prevention
- ✅ XSS Protection
- ✅ CSRF Tokens
- ✅ Password Hashing (Bcrypt)
- ✅ Data Encryption (AES-256-GCM)
- ✅ Security Headers
- ✅ Input Validation & Sanitization
- ✅ Account Locking (5 tentatives)
- ✅ Activity Logging

## 📊 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Refresh token

### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Commandes
- `GET /api/orders` - Liste des commandes
- `GET /api/orders/:id` - Détails commande
- `PUT /api/orders/:id` - Mettre à jour statut

### Clients
- `GET /api/customers` - Liste des clients
- `GET /api/customers/:id` - Détails client

## 🎨 Composants UI

### Carte Glassmorphique
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card hover>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
  <CardContent>
    Contenu
  </CardContent>
</Card>
```

### Boutons avec Animations
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" loading={false}>
  Cliquez-moi
</Button>
```

## 🔧 Configuration

### Variables d'Environnement
Voir `.env.example` pour toutes les variables disponibles.

### Personnalisation des Couleurs
Modifiez `tailwind.config.ts` pour personnaliser les couleurs du thème.

### Configuration de Sécurité
Ajustez les paramètres dans `src/lib/security.ts` :
- Rate limiting
- Durée de blocage
- Règles de mot de passe

## 🧪 Base de Données

### Schema
- **users** - Utilisateurs admin
- **customers** - Clients du site
- **products** - Produits
- **categories** - Catégories
- **orders** - Commandes
- **order_items** - Lignes de commande
- **reviews** - Avis clients
- **coupons** - Codes promo
- **activity_logs** - Logs d'activité

### Credentials par Défaut
- Email: `admin@example.com`
- Password: `Admin123!`

⚠️ **Changez ces credentials en production !**

## 📦 Scripts NPM

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Démarrer en production
npm run lint         # Linter
npm run type-check   # Vérification TypeScript

# Docker
npm run docker:up    # Démarrer Docker Compose
npm run docker:down  # Arrêter Docker Compose
npm run docker:build # Rebuild images
```

## 🚀 Déploiement Production

### 1. Build l'application
```bash
npm run build
```

### 2. Variables d'environnement
Configurez les variables pour la production (JWT secrets, DB credentials, etc.)

### 3. Déploiement Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Plateformes supportées
- Vercel
- Docker/Kubernetes
- AWS/GCP/Azure
- VPS Linux

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Next.js 14
- Framer Motion
- Tailwind CSS
- PostgreSQL
- TypeScript

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Email: support@example.com

---

**Fait avec ❤️ pour faciliter la gestion de vos sites e-commerce**

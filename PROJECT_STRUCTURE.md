# 📁 Structure du Projet

```
Dashboard-admin/
├── 📄 Configuration Files
│   ├── package.json              # Dépendances et scripts
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── tailwind.config.ts        # Configuration Tailwind CSS
│   ├── next.config.js            # Configuration Next.js
│   ├── postcss.config.js         # Configuration PostCSS
│   ├── .eslintrc.json           # Configuration ESLint
│   ├── .prettierrc              # Configuration Prettier
│   ├── .env.example             # Variables d'environnement (exemple)
│   ├── .env.local               # Variables d'environnement (local)
│   └── .gitignore               # Fichiers ignorés par Git
│
├── 🐳 Docker
│   ├── Dockerfile               # Image Docker pour Next.js
│   ├── docker-compose.yml       # Services Docker (PostgreSQL, Redis, etc.)
│   └── .dockerignore            # Fichiers ignorés par Docker
│
├── 🗄️ Database
│   └── database/
│       └── init.sql             # Script d'initialisation PostgreSQL
│
├── 📝 Documentation
│   ├── README.md                # Documentation principale
│   ├── QUICKSTART.md            # Guide de démarrage rapide (5 min)
│   ├── DEPLOYMENT.md            # Guide de déploiement production
│   ├── SECURITY.md              # Documentation sécurité
│   ├── CONTRIBUTING.md          # Guide de contribution
│   ├── CHANGELOG.md             # Historique des versions
│   ├── LICENSE                  # Licence MIT
│   └── PROJECT_STRUCTURE.md     # Ce fichier
│
├── 🔧 Scripts
│   └── scripts/
│       ├── setup.sh             # Script d'installation automatique
│       └── generate-secrets.sh  # Génération de secrets sécurisés
│
├── 🎯 GitHub Templates
│   └── .github/
│       ├── ISSUE_TEMPLATE/
│       │   ├── bug_report.md
│       │   └── feature_request.md
│       └── pull_request_template.md
│
└── 💻 Source Code (src/)
    ├── 📱 App Directory (Next.js 14)
    │   ├── app/
    │   │   ├── layout.tsx           # Layout racine
    │   │   ├── page.tsx             # Page d'accueil (redirect)
    │   │   ├── globals.css          # Styles globaux + glassmorphisme
    │   │   │
    │   │   ├── dashboard/           # Pages dashboard
    │   │   │   ├── layout.tsx       # Layout dashboard (sidebar + header)
    │   │   │   ├── page.tsx         # Page principale dashboard
    │   │   │   ├── products/        # Gestion produits
    │   │   │   ├── orders/          # Gestion commandes
    │   │   │   ├── customers/       # Gestion clients
    │   │   │   ├── categories/      # Gestion catégories
    │   │   │   ├── coupons/         # Gestion coupons
    │   │   │   ├── reviews/         # Gestion avis
    │   │   │   ├── analytics/       # Analytics avancées
    │   │   │   ├── reports/         # Rapports
    │   │   │   └── settings/        # Paramètres
    │   │   │
    │   │   └── api/                 # API Routes
    │   │       ├── auth/
    │   │       │   └── login/
    │   │       │       └── route.ts # Authentification JWT
    │   │       ├── products/
    │   │       │   └── route.ts     # CRUD produits
    │   │       ├── orders/
    │   │       │   └── route.ts     # CRUD commandes
    │   │       └── healthcheck/
    │   │           └── route.ts     # Health check endpoint
    │   │
    │   ├── 🎨 Components
    │   │   ├── ui/                  # Composants UI réutilisables
    │   │   │   ├── Card.tsx         # Cartes glassmorphiques
    │   │   │   ├── Button.tsx       # Boutons animés
    │   │   │   ├── Input.tsx        # Champs de saisie
    │   │   │   ├── Badge.tsx        # Badges de statut
    │   │   │   ├── Modal.tsx        # Modales animées
    │   │   │   └── Table.tsx        # Tableaux stylisés
    │   │   │
    │   │   ├── layout/              # Composants de layout
    │   │   │   ├── Sidebar.tsx      # Sidebar avec navigation
    │   │   │   └── Header.tsx       # Header avec profil & notifs
    │   │   │
    │   │   └── dashboard/           # Composants dashboard
    │   │       ├── StatsCard.tsx    # Cartes de statistiques
    │   │       ├── SalesChart.tsx   # Graphique des ventes
    │   │       └── RecentOrders.tsx # Liste commandes récentes
    │   │
    │   ├── 🛠️ Lib (Utilitaires)
    │   │   ├── lib/
    │   │   │   ├── auth.ts          # JWT, hash password, tokens
    │   │   │   ├── db.ts            # Connexion PostgreSQL
    │   │   │   ├── security.ts      # Rate limiting, encryption, CSRF
    │   │   │   └── utils.ts         # Fonctions utilitaires
    │   │   │
    │   │   ├── config/
    │   │   │   └── constants.ts     # Constantes de l'app
    │   │   │
    │   │   └── types/
    │   │       └── index.ts         # Types TypeScript
    │   │
    │   └── middleware.ts            # Middleware Next.js (sécurité)
```

## 📊 Statistiques du Code

- **Total de fichiers**: ~50
- **Lignes de code**: ~5000
- **Composants React**: 15+
- **API Routes**: 10+
- **Pages**: 10+

## 🎯 Fichiers Principaux

### Frontend (UI)
| Fichier | Description |
|---------|-------------|
| `src/app/dashboard/page.tsx` | Page principale du dashboard avec stats |
| `src/components/layout/Sidebar.tsx` | Navigation principale |
| `src/components/layout/Header.tsx` | Header avec profil |
| `src/components/ui/*` | Composants UI réutilisables |
| `src/app/globals.css` | Styles glassmorphiques |

### Backend (API)
| Fichier | Description |
|---------|-------------|
| `src/app/api/auth/login/route.ts` | Authentification JWT |
| `src/app/api/products/route.ts` | CRUD produits |
| `src/app/api/orders/route.ts` | CRUD commandes |
| `src/lib/db.ts` | Connexion PostgreSQL |
| `src/lib/security.ts` | Système de sécurité |

### Configuration
| Fichier | Description |
|---------|-------------|
| `package.json` | Dépendances du projet |
| `tsconfig.json` | Config TypeScript |
| `tailwind.config.ts` | Config Tailwind + couleurs |
| `next.config.js` | Config Next.js + headers |
| `docker-compose.yml` | Services Docker |

### Documentation
| Fichier | Description |
|---------|-------------|
| `README.md` | Guide complet |
| `QUICKSTART.md` | Installation rapide |
| `DEPLOYMENT.md` | Guide de déploiement |
| `SECURITY.md` | Documentation sécurité |
| `CONTRIBUTING.md` | Guide de contribution |

## 🔑 Points d'Entrée

### Développement
```bash
npm run dev → http://localhost:3000
```

### Production
```bash
docker-compose up -d → http://localhost:3000
```

### API
```bash
http://localhost:3000/api/healthcheck
http://localhost:3000/api/auth/login
http://localhost:3000/api/products
```

## 🎨 Composants UI Disponibles

- **Card** - Cartes glassmorphiques avec hover effect
- **Button** - Boutons animés (primary, secondary, success, danger, ghost)
- **Input** - Champs de saisie stylisés avec icônes
- **Badge** - Badges de statut colorés
- **Modal** - Modales animées avec backdrop blur
- **Table** - Tableaux stylisés et responsive
- **StatsCard** - Cartes de statistiques avec graphiques
- **SalesChart** - Graphiques de ventes (Recharts)

## 🔒 Modules de Sécurité

- **RateLimiter** - Protection DDoS
- **InputSanitizer** - Protection XSS/SQL injection
- **Encryption** - AES-256-GCM
- **CsrfProtection** - Protection CSRF
- **PasswordValidator** - Validation des mots de passe
- **IpUtils** - Gestion des IP (blacklist/whitelist)

## 📦 Structure des Types

```typescript
src/types/index.ts contient:
- User (utilisateurs admin)
- Customer (clients)
- Product (produits)
- Order (commandes)
- Category (catégories)
- Coupon (codes promo)
- Review (avis clients)
- ActivityLog (logs d'activité)
- DashboardStats (statistiques)
```

## 🚀 Conventions de Nommage

- **Pages**: PascalCase (ex: `DashboardPage.tsx`)
- **Composants**: PascalCase (ex: `Button.tsx`)
- **Utilitaires**: camelCase (ex: `formatCurrency`)
- **Types**: PascalCase (ex: `User`, `Product`)
- **Constants**: UPPER_SNAKE_CASE (ex: `MAX_FILE_SIZE`)
- **Fichiers CSS**: kebab-case (ex: `globals.css`)
- **API Routes**: kebab-case (ex: `auth/login`)

## 📱 Pages Disponibles

- `/` - Redirect vers dashboard
- `/dashboard` - Page principale avec statistiques
- `/dashboard/analytics` - Analytics détaillées
- `/dashboard/products` - Gestion des produits
- `/dashboard/orders` - Gestion des commandes
- `/dashboard/customers` - Gestion des clients
- `/dashboard/categories` - Gestion des catégories
- `/dashboard/coupons` - Gestion des coupons
- `/dashboard/reviews` - Modération des avis
- `/dashboard/reports` - Rapports
- `/dashboard/settings` - Paramètres

## 🎯 Prochaines Additions Suggérées

### Fonctionnalités
- [ ] Page de login sécurisée
- [ ] Page de gestion des produits complète
- [ ] Page de détail de commande
- [ ] Profil utilisateur
- [ ] Notifications en temps réel
- [ ] Export de données (CSV, PDF)
- [ ] Multi-langue (i18n)
- [ ] Dark/Light mode toggle

### Tests
- [ ] Tests unitaires (Jest)
- [ ] Tests d'intégration
- [ ] Tests E2E (Playwright)

### Performance
- [ ] Mise en cache Redis
- [ ] Lazy loading des images
- [ ] Code splitting optimisé
- [ ] Service Worker (PWA)

---

**Version**: 1.0.1  
**Dernière mise à jour**: 2026-01-19  
**Mainteneur**: Dashboard Admin Team

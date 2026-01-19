# 🚀 Guide de Démarrage Rapide

Lancez votre Dashboard Admin E-commerce en 5 minutes !

## ⚡ Installation Express

### 1️⃣ Cloner le Projet (1 minute)

```bash
git clone https://github.com/johnson-ad/Dashboard-admin.git
cd Dashboard-admin
```

### 2️⃣ Installer les Dépendances (2 minutes)

```bash
npm install
```

### 3️⃣ Lancer avec Docker (1 minute)

```bash
# Démarrer tous les services
docker-compose up -d

# Attendre que tout soit prêt...
```

### 4️⃣ Accéder au Dashboard (1 minute)

Ouvrez votre navigateur: **http://localhost:3000**

**Credentials par défaut:**
- Email: `admin@example.com`
- Password: `Admin123!`

✅ **C'est tout ! Votre dashboard est prêt !**

---

## 🎯 Services Disponibles

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 Dashboard | http://localhost:3000 | Interface admin |
| 🗄️ PostgreSQL | localhost:5432 | Base de données |
| 🔴 Redis | localhost:6379 | Cache & sessions |
| 💻 Adminer | http://localhost:8080 | Gestion DB |

---

## 📦 Alternative: Sans Docker

Si vous préférez sans Docker:

```bash
# 1. Installer PostgreSQL et Redis localement
brew install postgresql redis  # macOS
# ou
sudo apt-get install postgresql redis-server  # Linux

# 2. Démarrer les services
brew services start postgresql redis  # macOS
# ou
sudo systemctl start postgresql redis  # Linux

# 3. Créer la base de données
createdb ecommerce_admin
psql ecommerce_admin < database/init.sql

# 4. Lancer l'application
npm run dev
```

---

## 🔧 Commandes Utiles

```bash
# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start

# Vérifier le code
npm run lint
npm run type-check

# Docker
npm run docker:up      # Démarrer
npm run docker:down    # Arrêter
npm run docker:build   # Rebuild
```

---

## 📝 Première Configuration

### 1. Changer le mot de passe admin

Après la première connexion:
1. Aller dans **Settings** → **Profile**
2. Changer votre mot de passe
3. Mettre à jour votre email

### 2. Ajouter vos produits

1. Aller dans **Products**
2. Cliquer sur **Add Product**
3. Remplir les informations
4. Upload des images
5. Sauvegarder

### 3. Configurer les catégories

1. Aller dans **Categories**
2. Créer vos catégories principales
3. Ajouter des sous-catégories si nécessaire

---

## 🎨 Personnalisation Rapide

### Changer les couleurs

Éditez `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#VotreCouleur',
    // ...
  }
}
```

### Changer le logo

Remplacez dans `src/components/layout/Sidebar.tsx`:

```tsx
<h1 className="text-xl font-bold">Votre Nom</h1>
```

### Modifier le texte de bienvenue

Dans `src/app/dashboard/page.tsx`:

```tsx
<h1>Welcome back, Votre Nom! 👋</h1>
```

---

## 🐛 Problèmes Courants

### Port 3000 déjà utilisé

```bash
# Changer le port dans package.json
"dev": "next dev -p 3001"
```

### Docker ne démarre pas

```bash
# Vérifier que Docker est en cours d'exécution
docker ps

# Redémarrer Docker Desktop
```

### Erreur de connexion à la base de données

```bash
# Vérifier les logs
docker-compose logs postgres

# Recréer la base de données
docker-compose down -v
docker-compose up -d
```

---

## 📚 Prochaines Étapes

1. ✅ **Installation** - Terminé !
2. 📖 Lire le [README.md](README.md) complet
3. 🔒 Consulter [SECURITY.md](SECURITY.md)
4. 🚀 Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour la production
5. 🤝 Lire [CONTRIBUTING.md](CONTRIBUTING.md) pour contribuer

---

## 💡 Astuces Pro

### Utiliser le mode développement

```bash
# Hot reload automatique
npm run dev
```

### Accéder à la base de données

Via Adminer: http://localhost:8080
- System: `PostgreSQL`
- Server: `postgres`
- Username: `admin`
- Password: `admin123`
- Database: `ecommerce_admin`

### Logs en temps réel

```bash
# Voir tous les logs
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f dashboard
```

---

## 🆘 Besoin d'Aide ?

- 📖 [Documentation complète](README.md)
- 🐛 [Créer une issue](https://github.com/johnson-ad/Dashboard-admin/issues)
- 💬 [Discussions](https://github.com/johnson-ad/Dashboard-admin/discussions)
- 📧 Email: support@example.com

---

## 🎉 Félicitations !

Vous avez maintenant un dashboard admin professionnel prêt à l'emploi !

**Prochaine étape**: Explorez les fonctionnalités et personnalisez selon vos besoins.

---

**Temps total**: ~5 minutes ⚡
**Difficulté**: Facile 🟢
**Version**: 1.0.0

# 🚀 Guide de Déploiement

Ce guide vous aidera à déployer le Dashboard Admin E-commerce en production.

## 📋 Prérequis

- Serveur avec Docker & Docker Compose installés
- Nom de domaine (recommandé)
- Certificat SSL (Let's Encrypt recommandé)
- Base de données PostgreSQL (ou utiliser Docker)
- Redis (ou utiliser Docker)

## 🔧 Options de Déploiement

### Option 1: Déploiement avec Docker (Recommandé)

#### 1. Préparer le Serveur

```bash
# Se connecter au serveur
ssh user@your-server.com

# Installer Docker et Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Cloner le Projet

```bash
git clone https://github.com/johnson-ad/Dashboard-admin.git
cd Dashboard-admin
```

#### 3. Configuration de Production

```bash
# Copier le fichier d'environnement
cp .env.example .env.production

# Éditer avec vos credentials de production
nano .env.production
```

**Variables importantes à changer:**

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://admin.votre-domaine.com

# Database (Générer des mots de passe forts)
DATABASE_URL=postgresql://admin:VOTRE_MOT_DE_PASSE_FORT@postgres:5432/ecommerce_admin
POSTGRES_PASSWORD=VOTRE_MOT_DE_PASSE_FORT

# JWT (Générer des secrets uniques de 32+ caractères)
JWT_SECRET=votre-secret-jwt-tres-complexe-et-unique-32-chars-minimum
REFRESH_TOKEN_SECRET=votre-secret-refresh-token-unique-32-chars
ENCRYPTION_KEY=votre-cle-encryption-exactement-32-caracteres

# Admin
DEFAULT_ADMIN_EMAIL=votre-email@domaine.com
DEFAULT_ADMIN_PASSWORD=VotreMotDePasseTresSecurise123!
```

#### 4. Créer un docker-compose.prod.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - ecommerce_network

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - ecommerce_network

  dashboard:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    depends_on:
      - postgres
      - redis
    networks:
      - ecommerce_network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - dashboard
    networks:
      - ecommerce_network

networks:
  ecommerce_network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

#### 5. Configuration NGINX

Créer `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream dashboard {
        server dashboard:3000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name admin.votre-domaine.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name admin.votre-domaine.com;

        ssl_certificate /etc/nginx/ssl/certificate.crt;
        ssl_certificate_key /etc/nginx/ssl/private.key;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security Headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        location / {
            proxy_pass http://dashboard;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

#### 6. Obtenir un Certificat SSL (Let's Encrypt)

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install certbot

# Générer le certificat
sudo certbot certonly --standalone -d admin.votre-domaine.com

# Copier les certificats
sudo cp /etc/letsencrypt/live/admin.votre-domaine.com/fullchain.pem ./ssl/certificate.crt
sudo cp /etc/letsencrypt/live/admin.votre-domaine.com/privkey.pem ./ssl/private.key
```

#### 7. Déployer

```bash
# Build et démarrer
docker-compose -f docker-compose.prod.yml up -d --build

# Vérifier les logs
docker-compose -f docker-compose.prod.yml logs -f

# Vérifier le statut
docker-compose -f docker-compose.prod.yml ps
```

### Option 2: Déploiement sur Vercel

#### 1. Préparer le Projet

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login
```

#### 2. Configuration

Créer `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "ENCRYPTION_KEY": "@encryption_key"
  }
}
```

#### 3. Ajouter les Variables d'Environnement

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add REFRESH_TOKEN_SECRET
vercel env add ENCRYPTION_KEY
```

#### 4. Déployer

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Option 3: Déploiement sur AWS/GCP/Azure

#### AWS (Elastic Beanstalk)

1. Créer un fichier `.ebextensions/01_environment.config`
2. Configurer RDS pour PostgreSQL
3. Configurer ElastiCache pour Redis
4. Déployer avec `eb deploy`

#### GCP (Cloud Run)

1. Build l'image Docker
2. Push vers Google Container Registry
3. Déployer sur Cloud Run
4. Configurer Cloud SQL pour PostgreSQL

#### Azure (App Service)

1. Créer une Web App
2. Configurer PostgreSQL Database
3. Déployer via GitHub Actions ou Azure CLI

## 🔒 Sécurité en Production

### 1. Checklist de Sécurité

- [ ] Changer tous les secrets par défaut
- [ ] Utiliser HTTPS uniquement
- [ ] Activer les Security Headers
- [ ] Configurer les CORS appropriés
- [ ] Limiter les accès à la base de données
- [ ] Activer les logs de sécurité
- [ ] Configurer le monitoring
- [ ] Activer les backups automatiques
- [ ] Restreindre les ports ouverts
- [ ] Utiliser un firewall
- [ ] Activer 2FA pour les admins

### 2. Génération de Secrets Sécurisés

```bash
# Générer un secret JWT
openssl rand -base64 32

# Générer une clé d'encryption
openssl rand -hex 32

# Générer un mot de passe fort
openssl rand -base64 24
```

### 3. Configuration du Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable
```

## 📊 Monitoring

### 1. Logs

```bash
# Logs Docker
docker-compose logs -f

# Logs spécifiques
docker-compose logs -f dashboard
docker-compose logs -f postgres
```

### 2. Monitoring avec Prometheus (Optionnel)

Ajouter à `docker-compose.prod.yml`:

```yaml
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    depends_on:
      - prometheus
```

## 🔄 Mise à Jour

```bash
# Pull les derniers changements
git pull origin main

# Rebuild et redémarrer
docker-compose -f docker-compose.prod.yml up -d --build

# Vérifier
docker-compose -f docker-compose.prod.yml ps
```

## 💾 Backups

### Backup Automatique PostgreSQL

```bash
# Script de backup
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
docker exec postgres pg_dump -U admin ecommerce_admin > $BACKUP_DIR/backup_$DATE.sql
# Garder seulement les 7 derniers jours
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
EOF

chmod +x backup.sh

# Ajouter au crontab (tous les jours à 2h)
crontab -e
0 2 * * * /path/to/backup.sh
```

## 🆘 Troubleshooting

### Problème: L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs dashboard

# Vérifier les variables d'environnement
docker-compose config

# Redémarrer
docker-compose restart dashboard
```

### Problème: Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL est démarré
docker-compose ps postgres

# Tester la connexion
docker exec -it postgres psql -U admin -d ecommerce_admin
```

### Problème: Performance lente

```bash
# Vérifier les ressources
docker stats

# Augmenter les limites de ressources
# Éditer docker-compose.yml et ajouter:
services:
  dashboard:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

## 📞 Support

Pour toute aide sur le déploiement:
- 📧 Email: support@example.com
- 💬 GitHub Issues
- 📚 Documentation: README.md

---

**Dernière mise à jour**: 2026-01-19

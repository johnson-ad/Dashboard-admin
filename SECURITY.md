# Security Policy

## 🔒 Mesures de Sécurité Implémentées

Ce dashboard implémente plusieurs couches de sécurité pour protéger vos données et votre système.

### 1. Authentification & Autorisation

#### JWT (JSON Web Tokens)
- **Access Tokens**: Durée de vie courte (7 jours par défaut)
- **Refresh Tokens**: Stockés en base de données, durée de vie longue (30 jours)
- **Signature**: HS256 avec secrets configurables
- **Rotation**: Les refresh tokens sont révoqués après utilisation

#### Protection des Comptes
- **Blocage automatique**: 5 tentatives échouées = 15 minutes de blocage
- **Password Hashing**: Bcrypt avec salt de 10 rounds
- **Password Policy**: Minimum 8 caractères, majuscules, minuscules, chiffres, caractères spéciaux
- **Session Management**: Timeout automatique après inactivité

### 2. Protection contre les Attaques

#### SQL Injection
- ✅ Requêtes paramétrées exclusivement
- ✅ Validation des inputs
- ✅ ORM/Query Builder sécurisé
- ✅ Sanitisation des données

#### XSS (Cross-Site Scripting)
- ✅ Sanitisation HTML automatique
- ✅ Content Security Policy (CSP)
- ✅ Échappement des données utilisateur
- ✅ Validation côté serveur et client

#### CSRF (Cross-Site Request Forgery)
- ✅ Tokens CSRF pour les requêtes sensibles
- ✅ Vérification de l'origine
- ✅ SameSite cookies

#### DDoS & Brute Force
- ✅ Rate Limiting (100 req/15min par défaut)
- ✅ IP Blocking après tentatives suspectes
- ✅ Request throttling
- ✅ Connection pooling pour la DB

#### XXE (XML External Entity)
- ✅ Pas d'utilisation de XML non sécurisé
- ✅ Validation stricte des uploads
- ✅ Content-Type verification

### 3. Sécurité des Données

#### Encryption
- **En transit**: HTTPS/TLS 1.3
- **Au repos**: AES-256-GCM pour données sensibles
- **Base de données**: PostgreSQL avec encryption
- **Passwords**: Bcrypt (irreversible)

#### Données Sensibles
```typescript
// Les données suivantes sont chiffrées:
- Tokens de refresh
- Informations de paiement (si applicable)
- Données PII (Personally Identifiable Information)
```

### 4. Headers de Sécurité

```http
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: [voir next.config.js]
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 5. Audit & Logging

#### Activity Logs
Toutes les actions sensibles sont enregistrées:
- Connexions/Déconnexions
- Modifications de données
- Tentatives d'accès non autorisées
- Actions administratives

```sql
-- Structure du log
activity_logs (
  user_id,
  action,
  entity_type,
  entity_id,
  ip_address,
  user_agent,
  metadata,
  created_at
)
```

### 6. Validation des Entrées

#### Côté Serveur
```typescript
// Email validation
InputSanitizer.isValidEmail(email)

// UUID validation
InputSanitizer.isValidUuid(id)

// SQL sanitization
InputSanitizer.sanitizeSql(input)

// HTML sanitization
InputSanitizer.sanitizeHtml(content)

// File name sanitization
InputSanitizer.sanitizeFileName(name)
```

### 7. Configuration Sécurisée

#### Variables d'Environnement
```bash
# JAMAIS de credentials en dur dans le code
# Utiliser .env.local (ignoré par Git)
JWT_SECRET=votre-secret-complexe-de-32-chars-minimum
ENCRYPTION_KEY=votre-cle-encryption-32-chars
```

#### Secrets Management
- Utiliser des gestionnaires de secrets (Vault, AWS Secrets Manager)
- Rotation régulière des secrets
- Accès limité aux secrets en production

### 8. Sécurité Docker

```dockerfile
# Non-root user
USER nextjs

# Minimal base image
FROM node:18-alpine

# Security scanning
RUN apk --no-cache add dumb-init
```

## 🚨 Reporting des Vulnérabilités

Si vous découvrez une vulnérabilité de sécurité, merci de:

1. **NE PAS** créer une issue publique
2. Envoyer un email à: security@example.com
3. Inclure:
   - Description détaillée
   - Steps pour reproduire
   - Impact potentiel
   - Suggestions de correction

### Bug Bounty
Nous n'avons pas de programme bug bounty actif pour le moment.

## ✅ Checklist de Sécurité pour la Production

Avant de déployer en production:

- [ ] Changer tous les secrets par défaut
- [ ] Activer HTTPS/SSL
- [ ] Configurer les CORS appropriés
- [ ] Activer les logs de sécurité
- [ ] Configurer le monitoring
- [ ] Restreindre l'accès à la base de données
- [ ] Activer les backups automatiques
- [ ] Configurer le rate limiting
- [ ] Tester les endpoints avec des outils de sécurité
- [ ] Mettre à jour les dépendances
- [ ] Activer le 2FA pour les comptes admin
- [ ] Configurer les alertes de sécurité

## 🔍 Outils de Test Recommandés

### Scanning de Sécurité
```bash
# NPM audit
npm audit

# OWASP Dependency Check
npm install -g dependency-check
dependency-check --project Dashboard --scan .

# Snyk
npx snyk test
```

### Penetration Testing
- OWASP ZAP
- Burp Suite
- SQLMap (pour tester SQL injection)
- Postman (pour tester les APIs)

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

## 🔄 Mises à Jour de Sécurité

Vérifier régulièrement:
```bash
npm outdated
npm audit
```

Mettre à jour les dépendances:
```bash
npm update
npm audit fix
```

## 📞 Contact

Pour toute question de sécurité:
- Email: security@example.com
- PGP Key: [votre-clé-publique]

---

**Dernière mise à jour**: 2026-01-19
**Version**: 1.0.0

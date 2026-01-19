# Guide de Contribution

Merci de votre intérêt pour contribuer au Dashboard Admin E-commerce ! 🎉

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Structure des Commits](#structure-des-commits)
- [Standards de Code](#standards-de-code)
- [Pull Requests](#pull-requests)
- [Reporting de Bugs](#reporting-de-bugs)
- [Suggestions de Fonctionnalités](#suggestions-de-fonctionnalités)

## 🤝 Code de Conduite

### Notre Engagement

Nous nous engageons à créer un environnement accueillant et inclusif pour tous.

### Comportements Attendus

- Utiliser un langage accueillant et inclusif
- Respecter les points de vue différents
- Accepter les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté

## 💡 Comment Contribuer

### 1. Fork & Clone

```bash
# Fork le repo sur GitHub
git clone https://github.com/votre-username/Dashboard-admin.git
cd Dashboard-admin
```

### 2. Créer une Branche

```bash
# Créer une branche pour votre feature/fix
git checkout -b feature/nom-de-la-feature
# ou
git checkout -b fix/nom-du-bug
```

### 3. Faire vos Changements

```bash
# Installer les dépendances
npm install

# Lancer en mode dev
npm run dev

# Faire vos modifications...
```

### 4. Tester

```bash
# Vérifier le type checking
npm run type-check

# Lancer le linter
npm run lint

# Tester votre build
npm run build
```

### 5. Commit

Suivez notre [convention de commits](#structure-des-commits).

```bash
git add .
git commit -m "feat: ajouter la fonctionnalité X"
```

### 6. Push & PR

```bash
git push origin feature/nom-de-la-feature
# Ouvrir une Pull Request sur GitHub
```

## 📝 Structure des Commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <description>

[corps optionnel]

[footer(s) optionnel(s)]
```

### Types

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **docs**: Documentation seulement
- **style**: Changements de style (formatage, etc.)
- **refactor**: Refactoring de code
- **perf**: Amélioration de performance
- **test**: Ajout ou modification de tests
- **chore**: Tâches de maintenance
- **ci**: Changements CI/CD
- **build**: Changements du système de build

### Exemples

```bash
# Feature
feat(products): ajouter la pagination des produits

# Fix
fix(auth): corriger la validation du token JWT

# Documentation
docs(readme): mettre à jour les instructions d'installation

# Style
style(dashboard): améliorer l'espacement des cartes

# Refactor
refactor(api): simplifier la logique de validation

# Performance
perf(database): optimiser les requêtes produits

# Test
test(auth): ajouter tests pour le login

# Chore
chore(deps): mettre à jour les dépendances

# Breaking change
feat(api)!: changer le format de réponse des produits

BREAKING CHANGE: Le format de réponse a changé de { products } à { data }
```

## 💻 Standards de Code

### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string;
  email: string;
  role: UserRole;
}

function getUser(id: string): Promise<User | null> {
  return query<User>('SELECT * FROM users WHERE id = $1', [id]);
}

// ❌ Mauvais
function getUser(id: any) {
  return query('SELECT * FROM users WHERE id = ' + id);
}
```

### React Components

```tsx
// ✅ Bon - Composant avec types explicites
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn('btn', variant)}>
      {children}
    </button>
  );
}

// ❌ Mauvais - Pas de types
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### Naming Conventions

```typescript
// Variables & Functions: camelCase
const userName = 'John';
function getUserById() {}

// Components & Classes: PascalCase
class UserService {}
function UserProfile() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Private properties: _prefixe
class Service {
  private _apiKey: string;
}
```

### File Structure

```typescript
// 1. Imports (groupés)
import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

// 2. Types/Interfaces
interface Props {
  user: User;
}

// 3. Component
export function UserCard({ user }: Props) {
  // 4. Hooks
  const [loading, setLoading] = useState(false);
  
  // 5. Functions
  const handleClick = () => {
    // ...
  };
  
  // 6. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

## 🔍 Pull Requests

### Checklist

Avant de soumettre une PR, vérifiez:

- [ ] Le code compile sans erreurs
- [ ] Le type checking passe (`npm run type-check`)
- [ ] Le linter passe (`npm run lint`)
- [ ] Les tests passent (si applicable)
- [ ] La documentation est mise à jour
- [ ] Les commits suivent la convention
- [ ] La PR a un titre descriptif
- [ ] La PR a une description claire

### Template de PR

```markdown
## Description
Décrivez brièvement vos changements

## Type de Changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment Tester
1. Étape 1
2. Étape 2
3. ...

## Screenshots (si applicable)
[Ajoutez des screenshots]

## Checklist
- [ ] Mon code suit les standards du projet
- [ ] J'ai testé mes changements
- [ ] J'ai mis à jour la documentation
```

## 🐛 Reporting de Bugs

### Template d'Issue

```markdown
**Describe the bug**
Description claire du bug

**To Reproduce**
Étapes pour reproduire:
1. Aller à '...'
2. Cliquer sur '....'
3. Scroll down to '....'
4. Voir l'erreur

**Expected behavior**
Ce qui devrait se passer

**Screenshots**
Si applicable, ajoutez des screenshots

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]
 - Node version: [e.g. 18.0.0]

**Additional context**
Tout contexte supplémentaire
```

## 💡 Suggestions de Fonctionnalités

### Template d'Issue

```markdown
**Is your feature request related to a problem?**
Description claire du problème

**Describe the solution you'd like**
Description de la solution souhaitée

**Describe alternatives you've considered**
Alternatives considérées

**Additional context**
Screenshots, mockups, etc.
```

## 🏗️ Zones de Contribution

Nous recherchons de l'aide sur:

### 🚀 Fonctionnalités
- [ ] Export de données (CSV, Excel, PDF)
- [ ] Notifications en temps réel
- [ ] Support multi-langue (i18n)
- [ ] Dark/Light mode toggle
- [ ] Advanced filtering
- [ ] Bulk operations
- [ ] Email templates

### 🐛 Bugs Connus
- [ ] Performance sur mobile
- [ ] Safari compatibility issues

### 📚 Documentation
- [ ] Tutoriels vidéo
- [ ] Guide de déploiement détaillé
- [ ] API documentation avec Swagger
- [ ] Exemples d'intégration

### 🧪 Tests
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Tests E2E avec Playwright
- [ ] Tests de sécurité

## 🎨 Design System

Respectez le design system existant:

### Couleurs
```typescript
// Primaire: Blue-Purple gradient
primary: '#667eea' → '#764ba2'

// Status
success: '#10b981'
warning: '#f59e0b'
danger: '#ef4444'
info: '#06b6d4'
```

### Spacing
```typescript
// Utiliser les classes Tailwind
gap-2, gap-4, gap-6
p-2, p-4, p-6
m-2, m-4, m-6
```

## 📞 Questions ?

- 💬 Discussions GitHub
- 📧 Email: dev@example.com
- 🐦 Twitter: @dashboard_admin

## 🙏 Merci !

Toute contribution, grande ou petite, est appréciée ! 🎉

---

**Happy Coding!** 🚀

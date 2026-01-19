# 🧪 Guide de Test CRUD Complet

## 📋 Tests à Effectuer

### 1️⃣ Products (Produits)

#### Test CREATE:
1. Ouvrir http://localhost:3000/dashboard/products
2. Cliquer sur le bouton "Add Product"
3. Remplir le formulaire:
   - Name: "Mon Super Produit"
   - SKU: "SKU-TEST-001"
   - Price: 149.99
   - Stock: 25
   - Catégorie: Sélectionner une catégorie
   - Description: "Description de test"
   - ✓ Cocher "Active"
4. Cliquer "Create Product"
5. ✅ Vérifier que le produit apparaît dans la liste

#### Test UPDATE:
1. Trouver le produit créé
2. Cliquer sur "Edit"
3. Modifier le prix: 199.99
4. Modifier le stock: 50
5. Cliquer "Update Product"
6. ✅ Vérifier que les modifications sont visibles

#### Test DELETE:
1. Cliquer sur "Delete"
2. Confirmer la suppression
3. ✅ Vérifier que le produit a disparu de la liste

---

### 2️⃣ Customers (Clients)

#### Test CREATE:
1. Ouvrir http://localhost:3000/dashboard/customers
2. Cliquer "Add Customer"
3. Remplir:
   - First Name: "Jean"
   - Last Name: "Dupont"
   - Email: "jean.dupont@test.com"
   - Phone: "+33 6 12 34 56 78"
   - ✓ Active
4. Cliquer "Create Customer"
5. ✅ Vérifier l'ajout dans la liste

#### Test UPDATE:
1. Cliquer "Edit" sur le client créé
2. Modifier le téléphone
3. Cliquer "Update Customer"
4. ✅ Vérifier les modifications

#### Test DELETE:
1. Cliquer "Delete"
2. Confirmer
3. ✅ Vérifier la suppression

---

### 3️⃣ Categories

#### Test CREATE:
1. Ouvrir http://localhost:3000/dashboard/categories
2. Cliquer "Add Category"
3. Remplir:
   - Name: "Test Category"
   - Description: "Catégorie de test"
   - ✓ Active
4. Cliquer "Create Category"
5. ✅ Vérifier l'ajout

#### Test UPDATE:
1. Cliquer l'icône "Edit" sur la carte
2. Modifier le nom et la description
3. Cliquer "Update Category"
4. ✅ Vérifier les modifications

#### Test DELETE:
1. Cliquer l'icône "Delete"
2. Confirmer
3. ✅ Vérifier la suppression

---

### 4️⃣ Coupons

#### Test CREATE:
1. Ouvrir http://localhost:3000/dashboard/coupons
2. Cliquer "Create Coupon"
3. Remplir:
   - Code: "TESTCRUD20"
   - Discount Type: "Percentage"
   - Discount: 20
   - Minimum Order: 50
   - Usage Limit: 100
   - Description: "Test coupon"
   - ✓ Active
4. Cliquer "Create Coupon"
5. ✅ Vérifier l'ajout

#### Test UPDATE:
1. Cliquer "Edit"
2. Modifier la réduction à 25%
3. Cliquer "Update Coupon"
4. ✅ Vérifier les modifications

#### Test DELETE:
1. Cliquer "Delete"
2. Confirmer
3. ✅ Vérifier la suppression

---

## 🔧 Tests API Directs (via curl)

### Créer un Produit:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Product",
    "slug": "api-test-product",
    "sku": "API-001",
    "price": 79.99,
    "stock_quantity": 100,
    "is_active": true
  }'
```

### Créer un Client:
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api.test@example.com",
    "first_name": "API",
    "last_name": "Test",
    "phone": "+1234567890",
    "is_active": true
  }'
```

### Créer une Catégorie:
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Category",
    "slug": "api-test-category",
    "description": "Created via API",
    "is_active": true
  }'
```

### Créer un Coupon:
```bash
curl -X POST http://localhost:3000/api/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "APITEST30",
    "description": "API test coupon",
    "discount_type": "percentage",
    "discount_value": 30,
    "minimum_order_amount": 100,
    "usage_limit": 50,
    "is_active": true
  }'
```

---

## ✅ Checklist de Test Complet

- [ ] Products: CREATE ✓
- [ ] Products: READ ✓
- [ ] Products: UPDATE ✓
- [ ] Products: DELETE ✓
- [ ] Customers: CREATE ✓
- [ ] Customers: UPDATE ✓
- [ ] Customers: DELETE ✓
- [ ] Categories: CREATE ✓
- [ ] Categories: UPDATE ✓
- [ ] Categories: DELETE ✓
- [ ] Coupons: CREATE ✓
- [ ] Coupons: UPDATE ✓
- [ ] Coupons: DELETE ✓
- [ ] Validation des formulaires ✓
- [ ] Messages d'erreur ✓
- [ ] Loading states ✓
- [ ] Confirmation de suppression ✓
- [ ] Rafraîchissement des données ✓

---

## 🎯 Résultat Attendu

Toutes les opérations doivent:
✅ Fonctionner sans erreur
✅ Mettre à jour la base de données
✅ Rafraîchir l'interface automatiquement
✅ Afficher des messages de confirmation
✅ Valider les données correctement
✅ Gérer les erreurs gracieusement

---

**Tout est prêt pour une utilisation en production !** 🚀

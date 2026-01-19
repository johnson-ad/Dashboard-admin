-- Script pour insérer des données de test complètes
-- À exécuter après init.sql

-- Nettoyer les données existantes (sauf l'admin)
TRUNCATE TABLE activity_logs, reviews, order_items, orders, coupons, customers, products, categories RESTART IDENTITY CASCADE;

-- Insertion de données de test pour les catégories
INSERT INTO categories (name, slug, description, is_active, display_order) VALUES
('Electronics', 'electronics', 'Electronic devices, computers, and accessories', true, 1),
('Clothing', 'clothing', 'Fashion apparel for men and women', true, 2),
('Home & Garden', 'home-garden', 'Home improvement and garden supplies', true, 3),
('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', true, 4),
('Books & Media', 'books-media', 'Books, music, movies and games', true, 5),
('Toys & Games', 'toys-games', 'Toys, games and hobbies', true, 6),
('Beauty & Health', 'beauty-health', 'Beauty products and health supplies', true, 7),
('Automotive', 'automotive', 'Car parts and accessories', true, 8),
('Food & Beverages', 'food-beverages', 'Food, drinks and groceries', true, 9),
('Pet Supplies', 'pet-supplies', 'Pet food, toys and accessories', true, 10);

-- Insertion de produits de test (50 produits)
DO $$
DECLARE
    category_ids UUID[];
    i INTEGER;
    cat_id UUID;
    product_names TEXT[] := ARRAY[
        'Wireless Headphones Pro', 'Smart Watch Ultra', 'Laptop Stand Premium', 'USB-C Hub 7-in-1',
        'Mechanical Keyboard RGB', 'Gaming Mouse Wireless', 'Webcam 4K HD', 'Portable SSD 1TB',
        'Men T-Shirt Cotton', 'Women Dress Summer', 'Jeans Slim Fit', 'Hoodie Pullover',
        'Running Shoes Pro', 'Yoga Mat Premium', 'Water Bottle Steel', 'Backpack Travel',
        'LED Desk Lamp', 'Wall Clock Modern', 'Picture Frame Set', 'Throw Pillow Velvet',
        'Basketball Official', 'Tennis Racket Pro', 'Fitness Tracker Band', 'Camping Tent 4P',
        'Mystery Novel Bestseller', 'Cookbook Healthy', 'Bluetooth Speaker', 'Vinyl Record Classic',
        'Board Game Strategy', 'Puzzle 1000 Pieces', 'Action Figure Collectible', 'RC Car Racing',
        'Face Cream Anti-Aging', 'Shampoo Organic', 'Vitamin C Serum', 'Protein Powder Vanilla',
        'Car Phone Mount', 'Floor Mats All-Weather', 'LED Headlights Kit', 'Dash Cam HD',
        'Coffee Beans Organic', 'Green Tea Premium', 'Olive Oil Extra Virgin', 'Protein Bars Pack',
        'Dog Food Premium 15kg', 'Cat Toys Set', 'Fish Tank Filter', 'Bird Cage Large', 'Pet Bed Luxury', 'Dog Leash Retractable'
    ];
BEGIN
    -- Récupérer les IDs des catégories
    SELECT ARRAY_AGG(id) INTO category_ids FROM categories;
    
    -- Insérer 50 produits
    FOR i IN 1..50 LOOP
        -- Sélectionner une catégorie aléatoire
        cat_id := category_ids[1 + floor(random() * array_length(category_ids, 1))];
        
        INSERT INTO products (
            name, 
            slug, 
            description, 
            short_description,
            sku, 
            price, 
            compare_at_price,
            cost_price,
            category_id, 
            stock_quantity,
            low_stock_threshold,
            is_active,
            is_featured,
            weight,
            images,
            meta_title,
            meta_description
        ) VALUES (
            product_names[i],
            'product-' || i || '-' || lower(replace(product_names[i], ' ', '-')),
            'High-quality ' || product_names[i] || ' with excellent features and durability. Perfect for everyday use. Made with premium materials and backed by our satisfaction guarantee. Free shipping on orders over $50.',
            'Premium quality ' || product_names[i] || ' - Best seller!',
            'SKU-' || LPAD(i::TEXT, 6, '0'),
            (50 + (random() * 450))::DECIMAL(12,2),
            (100 + (random() * 500))::DECIMAL(12,2),
            (30 + (random() * 200))::DECIMAL(12,2),
            cat_id,
            (10 + floor(random() * 190))::INTEGER,
            10,
            true,
            (random() > 0.7),
            (0.5 + (random() * 4.5))::DECIMAL(10,2),
            '["https://placehold.co/600x400/667eea/ffffff?text=Product"]',
            product_names[i] || ' - Buy Online',
            'Shop ' || product_names[i] || ' at the best price. Fast shipping and excellent customer service.'
        );
    END LOOP;
END $$;

-- Insertion de clients de test (30 clients)
INSERT INTO customers (email, first_name, last_name, phone, is_active, total_orders, total_spent) VALUES
('john.smith@email.com', 'John', 'Smith', '+12025551001', true, 0, 0),
('emma.johnson@email.com', 'Emma', 'Johnson', '+12025551002', true, 0, 0),
('michael.williams@email.com', 'Michael', 'Williams', '+12025551003', true, 0, 0),
('sophia.brown@email.com', 'Sophia', 'Brown', '+12025551004', true, 0, 0),
('william.jones@email.com', 'William', 'Jones', '+12025551005', true, 0, 0),
('olivia.garcia@email.com', 'Olivia', 'Garcia', '+12025551006', true, 0, 0),
('james.miller@email.com', 'James', 'Miller', '+12025551007', true, 0, 0),
('ava.davis@email.com', 'Ava', 'Davis', '+12025551008', true, 0, 0),
('robert.rodriguez@email.com', 'Robert', 'Rodriguez', '+12025551009', true, 0, 0),
('isabella.martinez@email.com', 'Isabella', 'Martinez', '+12025551010', true, 0, 0),
('david.hernandez@email.com', 'David', 'Hernandez', '+12025551011', true, 0, 0),
('mia.lopez@email.com', 'Mia', 'Lopez', '+12025551012', true, 0, 0),
('richard.gonzalez@email.com', 'Richard', 'Gonzalez', '+12025551013', true, 0, 0),
('charlotte.wilson@email.com', 'Charlotte', 'Wilson', '+12025551014', true, 0, 0),
('joseph.anderson@email.com', 'Joseph', 'Anderson', '+12025551015', true, 0, 0),
('amelia.thomas@email.com', 'Amelia', 'Thomas', '+12025551016', true, 0, 0),
('thomas.taylor@email.com', 'Thomas', 'Taylor', '+12025551017', true, 0, 0),
('harper.moore@email.com', 'Harper', 'Moore', '+12025551018', true, 0, 0),
('charles.jackson@email.com', 'Charles', 'Jackson', '+12025551019', true, 0, 0),
('evelyn.martin@email.com', 'Evelyn', 'Martin', '+12025551020', true, 0, 0),
('daniel.lee@email.com', 'Daniel', 'Lee', '+12025551021', true, 0, 0),
('abigail.white@email.com', 'Abigail', 'White', '+12025551022', true, 0, 0),
('matthew.harris@email.com', 'Matthew', 'Harris', '+12025551023', true, 0, 0),
('emily.clark@email.com', 'Emily', 'Clark', '+12025551024', true, 0, 0),
('anthony.lewis@email.com', 'Anthony', 'Lewis', '+12025551025', true, 0, 0),
('elizabeth.robinson@email.com', 'Elizabeth', 'Robinson', '+12025551026', true, 0, 0),
('mark.walker@email.com', 'Mark', 'Walker', '+12025551027', true, 0, 0),
('sofia.young@email.com', 'Sofia', 'Young', '+12025551028', true, 0, 0),
('donald.allen@email.com', 'Donald', 'Allen', '+12025551029', true, 0, 0),
('avery.king@email.com', 'Avery', 'King', '+12025551030', true, 0, 0);

-- Insertion de commandes de test (100 commandes)
DO $$
DECLARE
    customer_ids UUID[];
    product_ids UUID[];
    i INTEGER;
    j INTEGER;
    order_id UUID;
    cust_id UUID;
    prod_id UUID;
    num_items INTEGER;
    item_quantity INTEGER;
    item_price DECIMAL(12,2);
    order_subtotal DECIMAL(12,2);
    order_shipping DECIMAL(12,2);
    order_discount DECIMAL(12,2);
    order_statuses TEXT[] := ARRAY['pending', 'processing', 'shipped', 'delivered', 'delivered', 'delivered'];
    payment_statuses TEXT[] := ARRAY['pending', 'paid', 'paid', 'paid'];
BEGIN
    SELECT ARRAY_AGG(id) INTO customer_ids FROM customers;
    SELECT ARRAY_AGG(id) INTO product_ids FROM products;
    
    FOR i IN 1..100 LOOP
        cust_id := customer_ids[1 + floor(random() * array_length(customer_ids, 1))];
        order_subtotal := 0;
        order_shipping := (5 + (random() * 20))::DECIMAL(12,2);
        order_discount := (random() * 30)::DECIMAL(12,2);
        
        -- Créer la commande
        INSERT INTO orders (
            order_number,
            customer_id,
            status,
            payment_status,
            subtotal,
            tax,
            shipping_cost,
            discount,
            total,
            currency,
            shipping_address,
            billing_address,
            created_at
        ) VALUES (
            'ORD-' || TO_CHAR(NOW() - (i || ' days')::INTERVAL, 'YYYYMMDD') || '-' || LPAD(i::TEXT, 4, '0'),
            cust_id,
            order_statuses[1 + floor(random() * array_length(order_statuses, 1))],
            payment_statuses[1 + floor(random() * array_length(payment_statuses, 1))],
            0,
            0,
            order_shipping,
            order_discount,
            0,
            'USD',
            '{"firstName": "John", "lastName": "Doe", "address1": "123 Main St", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA", "phone": "+1234567890"}',
            '{"firstName": "John", "lastName": "Doe", "address1": "123 Main St", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA", "phone": "+1234567890"}',
            NOW() - (i || ' days')::INTERVAL
        ) RETURNING id INTO order_id;
        
        -- Ajouter 1-5 produits à la commande
        num_items := 1 + floor(random() * 4)::INTEGER;
        
        FOR j IN 1..num_items LOOP
            prod_id := product_ids[1 + floor(random() * array_length(product_ids, 1))];
            item_quantity := 1 + floor(random() * 3)::INTEGER;
            
            SELECT price INTO item_price FROM products WHERE id = prod_id;
            
            INSERT INTO order_items (
                order_id,
                product_id,
                product_name,
                sku,
                quantity,
                price,
                total
            ) SELECT
                order_id,
                id,
                name,
                sku,
                item_quantity,
                price,
                (price * item_quantity)
            FROM products WHERE id = prod_id;
            
            order_subtotal := order_subtotal + (item_price * item_quantity);
        END LOOP;
        
        -- Mettre à jour le total de la commande
        UPDATE orders SET
            subtotal = order_subtotal,
            tax = (order_subtotal * 0.08)::DECIMAL(12,2),
            total = (order_subtotal + (order_subtotal * 0.08) + order_shipping - order_discount)::DECIMAL(12,2)
        WHERE id = order_id;
    END LOOP;
END $$;

-- Mettre à jour les statistiques des clients
UPDATE customers c SET
    total_orders = (SELECT COUNT(*) FROM orders WHERE customer_id = c.id),
    total_spent = (SELECT COALESCE(SUM(total), 0) FROM orders WHERE customer_id = c.id AND payment_status = 'paid');

-- Insertion de coupons de test
INSERT INTO coupons (code, description, discount_type, discount_value, minimum_order_amount, maximum_discount, usage_limit, usage_count, valid_from, valid_until, is_active) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10.00, 50.00, 20.00, 100, 15, NOW() - INTERVAL '30 days', NOW() + INTERVAL '60 days', true),
('SUMMER25', 'Summer sale - 25% off', 'percentage', 25.00, 100.00, 50.00, 500, 78, NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', true),
('FREESHIP', 'Free shipping on all orders', 'fixed', 15.00, 75.00, 15.00, 1000, 234, NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', true),
('SAVE50', 'Save $50 on orders over $200', 'fixed', 50.00, 200.00, 50.00, 200, 45, NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', true),
('FLASH20', 'Flash sale - 20% off everything', 'percentage', 20.00, 0.00, 100.00, 300, 156, NOW() - INTERVAL '5 days', NOW() + INTERVAL '10 days', true);

-- Insertion de reviews de test
DO $$
DECLARE
    customer_ids UUID[];
    product_ids UUID[];
    i INTEGER;
    cust_id UUID;
    prod_id UUID;
    ratings INTEGER[] := ARRAY[5, 5, 5, 4, 4, 4, 3, 3];
    review_titles TEXT[] := ARRAY[
        'Excellent product!', 'Great quality', 'Highly recommend', 'Worth every penny',
        'Amazing purchase', 'Very satisfied', 'Perfect for my needs', 'Outstanding quality',
        'Good value for money', 'Exceeded expectations', 'Love it!', 'Best purchase ever'
    ];
    review_comments TEXT[] := ARRAY[
        'This product exceeded all my expectations. The quality is outstanding and it works perfectly.',
        'Great value for money. It arrived on time and works exactly as described. Very happy!',
        'I am very satisfied with this product. The quality is excellent and exactly what I needed.',
        'Fantastic product! It is well-made, durable, and performs excellently. Worth every penny.',
        'This is an amazing product. The quality is top-notch and exceeded my expectations.',
        'Very good product. It works well and the quality is good. Shipping was fast.',
        'I am impressed with the quality and functionality. Exactly what I was looking for.'
    ];
BEGIN
    SELECT ARRAY_AGG(id) INTO customer_ids FROM customers LIMIT 20;
    SELECT ARRAY_AGG(id) INTO product_ids FROM products LIMIT 30;
    
    FOR i IN 1..50 LOOP
        cust_id := customer_ids[1 + floor(random() * array_length(customer_ids, 1))];
        prod_id := product_ids[1 + floor(random() * array_length(product_ids, 1))];
        
        INSERT INTO reviews (
            product_id,
            customer_id,
            rating,
            title,
            comment,
            is_verified,
            is_approved,
            created_at
        ) VALUES (
            prod_id,
            cust_id,
            ratings[1 + floor(random() * array_length(ratings, 1))],
            review_titles[1 + floor(random() * array_length(review_titles, 1))],
            review_comments[1 + floor(random() * array_length(review_comments, 1))],
            (random() > 0.3),
            (random() > 0.1),
            NOW() - (floor(random() * 90) || ' days')::INTERVAL
        );
    END LOOP;
END $$;

-- Afficher le résumé des données insérées
SELECT 
    'Data Inserted Successfully' as status,
    (SELECT COUNT(*) FROM categories) as categories,
    (SELECT COUNT(*) FROM products) as products,
    (SELECT COUNT(*) FROM customers) as customers,
    (SELECT COUNT(*) FROM orders) as orders,
    (SELECT COUNT(*) FROM order_items) as order_items,
    (SELECT COUNT(*) FROM coupons) as coupons,
    (SELECT COUNT(*) FROM reviews) as reviews;

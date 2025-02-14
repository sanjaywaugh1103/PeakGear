<?php
include('db.php');
session_start();

// Fetch available products from the database
$query = "SELECT * FROM products WHERE stock > 0";
$result = $conn->query($query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>
    <link rel="stylesheet" href="css/styles.css">
    <script>
        function addToCart(productId) {
            fetch('add_to_cart.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId, quantity: 1 })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = 'cart.php'; // Redirect to cart page
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    </script>
</head>
<body>
    <h1>Products</h1>
    <div class="product-list">
        <?php while ($product = $result->fetch_assoc()): ?>
            <div class="product-card">
                <h3><?= htmlspecialchars($product['name']) ?></h3>
                <p><?= htmlspecialchars($product['description']) ?></p>
                <p>₹<?= number_format($product['price'], 2) ?></p>
                <button 
                    onclick="addToCart(<?= $product['product_id'] ?>)">Add to Cart</button>
            </div>
        <?php endwhile; ?>
    </div>
</body>
</html>

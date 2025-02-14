<?php
include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON input
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (!isset($input["name"]) || !isset($input["email"]) || !isset($input["password"])) {
        echo json_encode(["success" => false, "message" => "Invalid input data."]);
        exit;
    }

    $name = $conn->real_escape_string($input["name"]);
    $email = $conn->real_escape_string($input["email"]);
    $password = $conn->real_escape_string($input["password"]);

    // Check if the email already exists
    $check_query = "SELECT * FROM users WHERE email = '$email'";
    $check_result = $conn->query($check_query);

    if ($check_result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email is already registered."]);
        exit;
    }

    // Hash the password and insert user data
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $insert_query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password')";

    if ($conn->query($insert_query) === TRUE) {
        echo json_encode(["success" => true, "message" => "Registration successful! You can now log in."]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed. Please try again."]);
    }
    exit;
}

// Render the registration form (for GET requests)
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav>
        <div class="logo">
            <a href="index.html"><img src="images/mini logo.png" alt="Decathlon India Logo"></a>
        </div>
        
    </nav>
    <!-- Registration Form -->
    <div class="login-container">
        <h1>Register</h1>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required>
            
            <button type="submit" class="btn">Register</button>
        </form>
        <p>Already have an account? <a href="login.php">Login here</a>.</p>
    </div>
<script src="js/register.js"></script>
</body>
</html>

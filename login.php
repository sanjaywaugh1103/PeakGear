<?php
// Include database connection
include('db.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!isset($input["email"]) || !isset($input["password"])) {
        echo json_encode(["success" => false, "message" => "Invalid input data."]);
        exit;
    }
    // Decode JSON input
    $email = $conn->real_escape_string($input["email"]);
    $password = $conn->real_escape_string($input["password"]);

    // Query to check if the user exists
    $query = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
    $result = $conn->query($query);

 
    if (!$result || $result->num_rows == 0) {
        echo json_encode(["success" => false, "message" => "User not found.Please register!!."]);
        exit;
    }

    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = $email;
        echo json_encode(["success" => true, "message" => "Yayyyy..Login successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "oh!oh! Invalid password."]);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
     <!-- Navigation Bar -->
     <nav>
        <div class="logo">
            <a href="index.html"><img src="images/mini logo.png" alt="Decathlon India Logo"></a>
        </div>
        
    </nav>
    <div class="login-container">
        <h1>Login</h1>
        <?php
        if (isset($error_message)) {
            echo "<p class='error-message'>$error_message</p>";
        }
        ?>
        <form>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required>
            
            <button type="submit" class="btn">Login</button>
        </form>
        <p>Don't have an account? <a href="register.php">Register here</a>.</p>
    </div>
<script src="js/login.js"></script>
</body>
</html>

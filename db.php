<?php

$servername = "localhost";  // Database server (e.g., localhost)
$username = "root";         // Database username
$password = "";             // Database password
$database = "user_manage";    // Database name

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The $conn variable can now be used in other files to interact with the database.
?>

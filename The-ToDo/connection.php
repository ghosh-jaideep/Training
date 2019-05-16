<?php
$servername = "127.0.0.1";
$username = "root";
$password = "Admin@123";
$dbname = "todo";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    echo json_encode(
        array(
            "status"    =>  false,
            "message"   =>  "DB Connection failed.".mysqli_connect_error()
        )
    );
    exit;
}
?>
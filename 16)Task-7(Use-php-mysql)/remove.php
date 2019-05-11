<?php
require_once("connection.php");


if(isset($_GET["index"]) && $_GET["index"]!=""){
    $i=$_REQUEST['index'];
    $sql = "DELETE FROM Tododata WHERE id=$i";
    $conn->query($sql);    
}

header("Location: {$_SERVER['HTTP_REFERER']}");
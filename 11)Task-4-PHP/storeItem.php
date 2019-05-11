<?php 
session_start(); 
if(!isset($_SESSION['todoCollection']))
    $_SESSION['todoCollection'] = [];

if(isset($_POST["item"]) && !empty($_POST["item"])){
    array_push($_SESSION['todoCollection'], ['caption' => $_POST['item'], 'isCompleted' => false]);
}
header("Location: {$_SERVER['HTTP_REFERER']}")
?>
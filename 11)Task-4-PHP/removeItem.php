<?php 
session_start(); 
if(!isset($_SESSION['todoCollection']))
    $_SESSION['todoCollection'] = [];

if(isset($_GET["index"]) && $_GET["index"]!=""){
    array_splice($_SESSION['todoCollection'],$_GET["index"],1);
    // unset($_SESSION['todoCollection'][$_GET["index"]]);
}
header("Location: {$_SERVER['HTTP_REFERER']}")
?>
<?php
$fileFromSystem = file_get_contents('data.txt');
$todoCollection = unserialize($fileFromSystem);
if(gettype($todoCollection)!="array"){
    $todoCollection = array();
}

if(isset($_GET["index"]) && $_GET["index"]!=""){
    array_splice($todoCollection,$_GET["index"],1);
}

$fileFromSystem = serialize($todoCollection);
file_put_contents('data.txt',$fileFromSystem);

header("Location: {$_SERVER['HTTP_REFERER']}")
?>
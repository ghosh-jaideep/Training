<?php
$fileFromSystem = file_get_contents('data.txt');
$todoCollection = unserialize($fileFromSystem);
if(gettype($todoCollection)!="array"){
    $todoCollection = array();
}

if(isset($_POST["item"]) && !empty($_POST["item"])){
    array_push($todoCollection , ['caption' => $_POST['item'] , 'isCompleted' => false]);
}

$fileFromSystem = serialize($todoCollection);
file_put_contents('data.txt',$fileFromSystem);

header("Location: {$_SERVER['HTTP_REFERER']}")
?>
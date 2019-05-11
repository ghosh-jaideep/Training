<?php
$fileFromSystem = file_get_contents('user-input.txt');
$inputs = unserialize($fileFromSystem);
if(gettype($inputs)!="array"){
    $inputs = array();
}

if(isset($_POST["input"]) && !empty($_POST["input"])){
    array_push($inputs,$_POST['input']);
}

$fileFromSystem = serialize($inputs);
file_put_contents('user-input.txt',$fileFromSystem);

header("Location: {$_SERVER['HTTP_REFERER']}")
?>
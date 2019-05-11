<?php
$fileFromSystem = file_get_contents('session-like.txt');
$fromFile = unserialize($fileFromSystem);
if(gettype($fromFile)!="array"){
    $fromFile = array();
}

$fromFile['x'] = 'something';
$stringFromFile = serialize($fromFile);
file_put_contents("session-like.txt", $stringFromFile);
<?php

header("Content-Type: application/json");

$users = [
    [
        "username" => "Sanket",
        "id" => 1,
         "list" => ['id' => 1]
    ],
    [
        "username" => "Jasbir",
        "id" => 2
    ]
];

echo (json_encode($users));

?>
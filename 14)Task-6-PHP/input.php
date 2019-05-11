<?php

$fileFromSystem = file_get_contents('user-input.txt');
$inputs = unserialize($fileFromSystem);
if(gettype($inputs)!="array"){
    $inputs = array();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>11)Task-4-PHP - ToDo</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="d-flex justify-content-center align-items-center">
        <div class="card">
            <div class="card-body">
                <form class="form-inline" action="save.php" method="post">
                    <input type="text" name="input" class="form-control mb-2 mr-sm-2">
                    <button type="submit" class="btn btn-primary mb-2">Add</button>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>
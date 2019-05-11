<?php

$fileFromSystem = file_get_contents('data.txt');
$todoCollection = unserialize($fileFromSystem);
if(gettype($todoCollection)!="array"){
    $todoCollection = array();
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
                <form class="form-inline" action="submit.php" method="post">
                    <input type="text" name="item" class="form-control mb-2 mr-sm-2">
                    <button type="submit" class="btn btn-primary mb-2">Add</button>
                </form>
            </div>
        </div>
    </div>
    <br>
    <div class="d-flex justify-content-center align-items-center">
                    
        <table class="table table-borderless table-hover">
            <tbody>
            <?php for($i = 0; $i < count($todoCollection); $i++) { ?>
                <tr>
                    <td><?=$i+1?></td>
                    <td><?=$todoCollection[$i]['caption']?></td>
                    <td>
                        <a class="btn btn-danger" href="removeItem.php?index=<?=$i?>">Delete</a>
                    </td>
                </tr>
            <?php } ?>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>

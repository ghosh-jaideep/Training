<!DOCTYPE html>
<html lang="en">
<head>
  <title>9 > Task 2 PHP ( Here it is )</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
<div class="jumbotron text-center">
    <?php
    if(isset($_REQUEST["name"]) && !empty($_REQUEST["name"])){
        echo "<h1>Hey ".$_REQUEST["name"].", nice to meet you. I am PHP</h1>";
    }
    ?>
</div>

</body>
</html>

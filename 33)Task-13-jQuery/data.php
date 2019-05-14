<?php
header("Content-Type: application/json");
require_once("connection.php");
$response = array(
    "status"    =>  false,
    "message"   =>  "",
    "data"      =>  array()
);
if(isset($_REQUEST["method"]) && !empty($_REQUEST["method"])){
    $method = $_REQUEST["method"];
    switch ($method) {
        case 'get':
            $result = mysqli_query($conn,"SELECT * FROM Tododata");
            while($row = mysqli_fetch_assoc($result)) {
                $item = array(
                    "id"        =>  $row["id"],
                    "caption"   =>  $row["caption"],
                    "isCompleted"    =>  $row["isCompleted"]
                );
                $response["status"] =   true;
                $response["data"][] =   $item;
            }
            break;
        case 'save':
            if(isset($_REQUEST["item"]) && !empty($_REQUEST["item"])){
                $sql = "INSERT INTO Tododata (caption, isCompleted) VALUES ('".$_REQUEST['item']."', '0')";

                if ($conn->query($sql) === TRUE) //conn is the connection varible
                {
                    $response["status"] =   true;
                    $response["message"] = "Item saved Successfully.";
                } else {
                    $response["message"] = "An error occurred while saving. ".$conn->error;
                }
                $conn->close();
            }else{
                //
            }
            break;
        default:
            $response["message"] = "Invalid method.";
            break;
    }
}else{
    $response["message"] = "method is required.";
}
echo json_encode($response);
?>
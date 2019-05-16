<?php
header("Content-Type: application/json");
require_once("connection.php");

$request = json_decode(file_get_contents("php://input"),true);
$_REQUEST = (!empty($request))?$request:$_REQUEST;
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
                    "isCompleted"    =>  (bool)$row["isCompleted"]
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
                $response["message"] = "Task Caption is Required";
            }
            break;
        case 'delete':
            if(isset($_REQUEST["id"]) && !empty($_REQUEST["id"])){
                $sql = "DELETE FROM Tododata WHERE id=".$_REQUEST["id"];
                if ($conn->query($sql) === TRUE) {
                    $response["status"] = true;
                    $response["message"] = "Task Deleted Successfully.";
                }else{
                    $response["message"] = "An error occurred while deleting the task.";
                }
            }else{
                $response["message"] = "Task ID is required.";
            }
            break;
        case 'update':
            if(isset($_REQUEST["id"]) && !empty($_REQUEST["id"]) && isset($_REQUEST["data"])){
                //Build query
                $updateQuery = "";
                foreach($_REQUEST["data"] as $key=>$value){
                    // $value = ($key=="isCompleted")?(bool)$value:$value;
                    if($key == "isCompleted"){
                        $value = ($value == 1)?1:0;
                    }
                    if(gettype($value)=="boolean" || gettype($value)=="integer")
                        $updateQuery .= $key."=".$value." ";
                    else
                        $updateQuery .= $key."='".$value."' ";
                    $updateQuery .= ",";
                }
                $updateQuery = rtrim($updateQuery,',');
                $sql = "UPDATE Tododata SET ".$updateQuery." WHERE id=".$_REQUEST["id"];
                if ($conn->query($sql) === TRUE) {
                    $response["status"] = true;
                    $response["message"] = "Task updated.";
                }else{
                    $response["message"] = "An error occurred while updating the task.".$conn->error;
                }
                
            }else{
                $response["message"] = "Task ID is required for updating any task.";
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
<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once (__DIR__."/globals.php");
session_start();

$db = _db();

try {

    $token = $_GET["token"];

    $q=$db->prepare("UPDATE users SET verified = :verified WHERE token = :token");
    $q->bindValue(":token", $token);
    $q->bindValue("verified", true);
    $q->execute();

    echo '<script>window.location.href = "http://localhost:3000/accountconfirmed?token=' . $token . '"</script>';
    exit();

    if($q->rowCount() > 0){
        $new_token = bin2hex(random_bytes(16));
        $user_id = $_SESSION["user_id"];

        $new_q = $db->prepare("UPDATE users SET token = :token WHERE user_id = :user_id");
        $new_q->bindValue(":user_id", $user_id);
        $new_q->bindValue(":token", $new_token);
        $new_q->execute();
        $row = $q->fetch();
 
        $user = array(
            "user_id" => $user_id,
            "first_name" => $_SESSION["first_name"] = $row["first_name"],
            "last_name" => $_SESSION["last_name"] = $row["last_name"],
            "email" => $_SESSION["email"] = $row["email"],
            "company" => $_SESSION["company"] = $row["company"],
            "phone_number" => $_SESSION["phone_number"] = $row["phone_number"],
            "verified" => $_SESSION["verified"] = $row["verified"],
            "token" => $_SESSION["token"] = $row["token"],
        );

        header("Content-type: application/json");
        http_response_code(200);
        echo json_encode($user);
        exit();

    } else {

        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Something went wrong");
        exit();
    }

} catch (Exception $ex){
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}
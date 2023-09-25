<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

//get ready to fetch the users from the database

$db = _db();

try {

    $user_id = $_SESSION["user_id"];

    $q = $db->prepare("SELECT * FROM users WHERE user_id = :user_id");
    $q->bindValue(":user_id", $user_id);
    $q->execute();
    $user = $q->fetch(PDO::FETCH_OBJ);

    header("Content-type: application/json");
    http_response_code(200);
    echo json_encode($user);
    exit();
} catch (Exception $ex) {
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode("System not working");
    echo "Debug info:" . $ex->getMessage();
    exit();
}

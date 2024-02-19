<?php

header("Access-Control-Allow-Origin: https://the-other-nuub.netlify.app/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

$db = _db();

try {

    $user_id = $_SESSION["user_id"];

    $q = $db->prepare("SELECT * FROM meetings WHERE user_id = :user_id");
    $q->bindValue(":user_id", $user_id);
    $q->execute();
    $meetings = $q->fetchAll(PDO::FETCH_OBJ);

    header("Content-type: application/json");
    http_response_code(200);
    echo json_encode($meetings);
    exit();
} catch (Exception $ex) {
    header("Content-type: application/json");
    http_response_code(500);
    echo "Debug info:" . $ex->getMessage();
    exit();
}

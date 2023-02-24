<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

if (isset($_SESSION["user_id"])) {
    header("Content-type: application/json");
    http_response_code(200);
    echo json_encode("You're logged in");
    exit();
} else {
    header("Content-type: application/json");
    http_response_code(200);
    echo json_encode("You're not logged in");
    exit();
}

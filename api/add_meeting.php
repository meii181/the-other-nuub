<?php

error_reporting(E_ALL);
ini_set('display_errors','1');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once (__DIR__."/globals.php");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {

    $request = json_decode($data, true);

    
}
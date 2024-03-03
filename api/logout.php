<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

header("Access-Control-Allow-Origin: https://the-other-nuub.netlify.app/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

session_start();
session_destroy();

http_response_code(200);
echo "<script>window.location.href = 'http://localhost:3000/login'</script>";
exit();

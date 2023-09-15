<?php

define("_NAME_MIN_LEN", 2);
define("_NAME_MAX_LEN", 25);
define("_PASSWORD_MIN_LEN", 8);
define("_PASSWORD_MAX_LEN", 30);

function _db()
{
    $database_user_name = "br40bydeekvpezoo";
    $database_password = "svhfaucc71hp9hdg";
    $database_connection = "mysql:host=eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com; dbname=mhh8wu2upii1rq06; charset=utf8mb4";

    $database_options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    return new PDO($database_connection, $database_user_name, $database_password, $database_options);
}

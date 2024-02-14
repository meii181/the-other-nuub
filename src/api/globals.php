<?php

define("_NAME_MIN_LEN", 2);
define("_NAME_MAX_LEN", 25);
define("_PASSWORD_MIN_LEN", 8);
define("_PASSWORD_MAX_LEN", 30);

function _db()
{
    $database_user_name = "root";
    $database_password = "";
    $database_connection = "mysql:host=127.0.0.1; dbname=bachelor_exam; charset=utf8mb4";

    $database_options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    return new PDO($database_connection, $database_user_name, $database_password, $database_options);
}

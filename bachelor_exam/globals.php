<?php

function _db(){
    $database_user_name = "root";
    $database_password = "";
    $database_connection = "mysql:host=localhost; dbname=bachelor_exam; charset=utf8mb4";

    $database_options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        return new PDO($database_connection, $database_user_name, $database_password, $database_options);
}
<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data, true);

    if (empty($_POST["first_name"]) || empty($_POST["last_name"]) || empty($_POST["email"]) || empty($_POST["phone_number"]) || empty($_POST["password"]) || empty($_POST["confirm_password"])) {
        http_response_code(400);
        echo json_encode("All fields must be filled in");
        exit();
    }

    if (strlen($_POST["first_name"]) < _NAME_MIN_LEN) {
        http_response_code(400);
        echo json_encode("The first name must be longer than 2 characters");
        exit();
    }

    if (strlen($_POST["first_name"]) > _NAME_MAX_LEN) {
        http_response_code(400);
        echo json_encode("The first name cannot be longer than 25 characters");
        exit();
    }

    if (strlen($_POST["last_name"]) < _NAME_MIN_LEN) {
        http_response_code(400);
        echo json_encode("The last name must be longer than 2 characters");
        exit();
    }

    if (strlen($_POST["last_name"]) > _NAME_MAX_LEN) {
        http_response_code(400);
        echo json_encode("The last name cannot be longer than 25 characters");
        exit();
    }


    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    if (strlen($_POST["password"]) < _PASSWORD_MIN_LEN) {
        http_response_code(400);
        echo json_encode("The password is not strong enough, it must be at least 8 characters");
        exit();
    }

    if (strlen($_POST["password"]) > _PASSWORD_MAX_LEN) {
        http_response_code(400);
        echo json_encode("The password has exceeded the maximum of 30 characters");
        exit();
    }

    if (strlen($_POST["phone_number"]) !== 8) {
        http_response_code(400);
        echo json_encode("Danish phone number must be provided");
        exit();
    }

    if ($_POST["password"] !== $_POST["confirm_password"]) {
        http_response_code(400);
        echo json_encode("The passwords does not match");
        exit();
    }

    $db = _db();

    try {

        if (isset($_SESSION["user_id"])) {

            $db->beginTransaction();

            //the user changes their first name
            $q = $db->prepare("UPDATE users SET first_name = :first_name WHERE user_id = :user_id");
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":first_name", $_POST["first_name"]);
            $q->execute();

            //the user changes their last name
            $q = $db->prepare("UPDATE users SET last_name = :last_name WHERE user_id = :user_id");
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":last_name", $_POST["last_name"]);
            $q->execute();

            //the user changes their email
            $q = $db->prepare("UPDATE users SET email = :email WHERE user_id = :user_id");
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":email", $_POST["email"]);
            $q->execute();

            //the user changes their phone number
            $q = $db->prepare("UPDATE users SET phone_number = :phone_number WHERE user_id = :user_id");
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":phone_number", $_POST["phone_number"]);
            $q->execute();

            //the user changes their password
            $q = $db->prepare("UPDATE users SET password = :password WHERE user_id = :user_id");
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":password", $updatePassHash);
            $q->execute();

            $db->commit();

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("Your profile has been updated successfully!");
            exit();
        } else {

            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("Something went wrong with the update");
            exit();
        }
    } catch (Exception $ex) {
        $db->rollback();
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }
}

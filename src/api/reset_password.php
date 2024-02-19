<?php

header("Access-Control-Allow-Origin: https://the-other-nuub.netlify.app/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data, true);

    // checking the GET password key
    if (!isset($_GET["password_key"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The key is missing");
        exit();
    }

    if (strlen($_GET["password_key"]) !== 32) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The key does not consist of 32 characters");
        exit();
    }

    // checking the POST user's password data

    if (empty($_POST["password"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Please type your password");
        exit();
    }

    if (empty($_POST["confirm_password"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Please confirm your password");
        exit();
    }


    if (strlen($_POST["password"]) < _PASSWORD_MIN_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password must be at least 8 characters");
        exit();
    }

    if (strlen($_POST["password"]) > _PASSWORD_MAX_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password cannot be longer than 30 characters");
        exit();
    }

    $db = _db();

    try {

        $password_key = $_GET["password_key"];
        $new_password = $_POST["password"];
        $new_hashed_password = password_hash($_POST["password"], PASSWORD_DEFAULT);
        $password_confirmation = $_POST["confirm_password"];

        if ($new_password === $password_confirmation) {
            $q = $db->prepare("UPDATE users SET password = :new_password WHERE forgot_password = :old_forgot_password");
            $q->bindValue(":old_forgot_password", $password_key);
            $q->bindValue(":new_password", $new_hashed_password);
            $q->execute();

            if ($q->rowCount() > 0) {
                $new_password_key = bin2hex(random_bytes(16));

                $update_q = $db->prepare("UPDATE users SET forgot_password = :new_password_key WHERE forgot_password = :old_forgot_password");
                $update_q->bindValue(":new_password_key", $new_password_key);
                $update_q->bindValue(":old_forgot_password", $password_key);
                $update_q->execute();

                header("Content-type: application/json");
                http_response_code(200);
                echo json_encode("Succesfully updated the password");
                exit();
            } else {
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("Failed to verify the key");
                exit();
            }
        } else {

            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The password do not match");
            exit();
        }
    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }
}

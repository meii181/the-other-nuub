<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {

    $request = json_decode($data, true);


    // empty input 
    if (empty($_POST["email"]) || empty($_POST["password"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("All fields must be filled in");
        exit();
    }

    // email validation
    else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    // password validation
    else if (strlen($_POST["password"]) < _PASSWORD_MIN_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password is not strong");
        exit();
    } else if (strlen($_POST["password"]) > _PASSWORD_MAX_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password has reached the maximum characters");
        exit();
    }

    $db = _db();

    try {

        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $_POST["email"]);
        $q->execute();
        $rows = $q->fetchAll();

        if (!empty($rows)) {

            foreach ($rows as $row) {

                if (!$row["verified"]) {
                    header("Content-type: application/json");
                    http_response_code(401);
                    echo json_encode("Unable to login, you must verify your account first");
                } else {

                    if (password_verify($_POST["password"], $row["password"])) {

                        session_start();
                        $_SESSION["user_id"] = $row["user_id"];

                        header("Content-type: application/json");
                        http_response_code(200);
                        echo json_encode($row);
                        exit();
                    } else {
                        header("Content-type: application/json");
                        http_response_code(400);
                        echo json_encode("Wrong email or password");
                        exit();
                    }
                }
            }
        } else {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("User does not exist");
            exit();
        }
    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode("System not working");
        echo "Debug info:" . $ex->getMessage();
        exit();
    }
}

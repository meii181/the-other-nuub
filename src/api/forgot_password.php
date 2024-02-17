<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$db = _db();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data, true);

    //check for email

    if (empty($_POST["email"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("This field must be filled in");
    }

    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The email is not valid");
    }

    $db = _db();

    try {
        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $_POST["email"]);
        $q->execute();

        $row = $q->fetch();

        $password_key = $row["forgot_password"];

        //validate the key of forgotten password

        if (empty($row["forgot_password"])) {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The key could not be found");
            exit();
        }

        if (strlen($row["forgot_password"]) !== 32) {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The key does not contain 32 characters");
            exit();
        }

        $to_email = $_POST["email"];
        $subject = "Nuub - Recover your password";
        $message = "<h4>Dear " . $row["first_name"] . ",</h4>
        <p>We are sorry to hear that you have forgotten your password, but worry no more, as by accessing the following link down below, you will be taken to a magical path where
        you will be able to recover your password.</p>
        <p><a href='http://localhost:5173/recoverpassword?password_key=$password_key'>Recover your password here!</a></p>
        <br></br>
        <h4>Best regards,</h4>
        <h3>The Nuub Team.</h3>";

        require_once(__DIR__ . "/emailVerification/send_email.php");
        header("Content-type: application/json");
        http_response_code(200);
        echo json_encode("The link with password recovery has been sent to your email address.");
        exit();
    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }
}

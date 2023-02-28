<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {

    $request = json_decode($data, true);

    if (empty($_POST["first_name"]) || empty($_POST["last_name"]) || empty($_POST["company"]) || empty($_POST["email"]) || empty($_POST["phone_number"]) || empty($_POST["password"]) || empty($_POST["confirm_password"])) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("All fields must be filled in");
        exit();
    }

    if (strlen($_POST["first_name"]) < _NAME_MIN_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The first name must be longer than 2 characters");
        exit();
    }

    if (strlen($_POST["first_name"]) > _NAME_MAX_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The first name cannot be longer than 25 characters");
        exit();
    }

    if (strlen($_POST["last_name"]) < _NAME_MIN_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The last name must be longer than 2 characters");
        exit();
    }

    if (strlen($_POST["last_name"]) > _NAME_MAX_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The last name cannot be longer than 25 characters");
        exit();
    }


    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    if (strlen($_POST["password"]) < _PASSWORD_MIN_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password is not strong enough");
        exit();
    }

    if (strlen($_POST["password"]) > _PASSWORD_MAX_LEN) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password has exceeded the maximum of characters");
        exit();
    }

    if (strlen($_POST["phone_number"]) !== 8) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Danish phone number must be provided");
        exit();
    }

    if ($_POST["password"] !== $_POST["confirm_password"]) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The passwords does not match");
        exit();
    }

    $db = _db();


    try {

        $passwordHash = password_hash($_POST["password"], PASSWORD_DEFAULT);
        $token = bin2hex(random_bytes(16));
        $forgotPass = bin2hex(random_bytes(16));

        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $_POST["email"]);
        $q->execute();
        if ($q->rowCount() > 0) {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The email has already been registered");
            exit();
        } else {
            $q = $db->prepare("SELECT * FROM users WHERE phone_number = :phone_number");
            $q->bindValue(":phone_number", $_POST["phone_number"]);
            $q->execute();

            if ($q->rowCount() > 0) {
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("The phone number has already been registered");
                exit();
            } else {
                $q = $db->prepare("INSERT INTO users(user_id, first_name, last_name, company, email, phone_number, password, forgot_password, token, verified) VALUES(:user_id, :first_name, :last_name, :company, :email, :phone_number, :password, :forgot_password, :token, :verified)");
                $q->bindValue(":user_id", null);
                $q->bindValue(":first_name", $_POST["first_name"]);
                $q->bindValue(":last_name", $_POST["last_name"]);
                $q->bindValue(":company", $_POST["company"]);
                $q->bindValue(":email", $_POST["email"]);
                $q->bindValue(":phone_number", $_POST["phone_number"]);
                $q->bindValue(":password", $passwordHash);
                $q->bindValue(":forgot_password", $forgotPass);
                $q->bindValue(":token", $token);
                $q->bindValue(":verified", false);
                $q->execute();

                $user_id = $db->lastInsertId();

                $to_email = $_POST["email"];
                $subject = "Nuub - Account Confirmation";
                $message = "<h4>Dear " . $_POST["first_name"] . ",</h4>
            <p>We wish you a warm welcome to Nuub and we're happy you chose to work with us on your future and exciting project.</p>
            <p>However, there's one more thing that you have to do in order to have access into scheduling new appointments with us,
            that being verification of your account, which will happen in the link down below, that is your path to your verified account.</p>
            <p><a href='http://localhost/api/confirm_account.php?token=$token'>Verify your account</a></p>
            <p>Remember that if you don't verify your account, you will not be able to log in the Nuub portal.</p>
            <br></br>
            <h4>Best regards,</h4>
            <h3>The Nuub Team.</h3>";

                require_once(__DIR__ . "/emailVerification/send_email.php");


                header("Content-type: application/json");
                http_response_code(200);
                echo json_encode("A verification link has been sent to your email address.");
                exit();
            }
        }
    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode("System not working");
        echo "Debug info: " . $ex->getMessage();
        exit();
    }
}

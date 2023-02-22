<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once (__DIR__."/globals.php");
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)){

    $request = json_decode($data);

    $firstName = $request->first_name;
    $lastName = $request->last_name;
    $company = $request->company;
    $email = $request->email;
    $phoneNumber = $request->phone_number;
    $password = $request->password;
    $confirmPassword = $request->confirm_password;

        if(empty($firstName) || empty($lastName) || empty($company) || empty($email) || empty($password) || empty($confirmPassword)){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("All fields must be filled in");
            exit();
        }

        if(strlen($firstName) < _NAME_MIN_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The first name must be longer than 2 characters");
            exit();
        }

        if(strlen($firstName) > _NAME_MAX_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The first name cannot be longer than 12 characters");
            exit();
        }

        if(strlen($lastName) < _NAME_MIN_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The last name must be longer than 2 characters");
            exit();
        }

        if(strlen($lastName) > _NAME_MAX_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The last name cannot be longer than 12 characters");
            exit();
        }
        

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The email is not valid");
            exit();
        }

        if(strlen($password) < _PASSWORD_MIN_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The password is not strong enough");
            exit();
        }

        if(strlen($password) > _PASSWORD_MAX_LEN){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The password has exceeded the maximum of characters");
            exit();
        }

        if(strlen($phoneNumber) !== 8){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("Danish phone number must be provided");
            exit();
        }

        if($password !== $confirmPassword){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The passwords does not match");
            exit();
        }
        
        $db = _db();


    try {

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $token = bin2hex(random_bytes(16));
        $forgotPass = bin2hex(random_bytes(16));

        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $email);
        $q->execute();
        if($q->rowCount() > 0){
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("The email has already been registered");
            exit();

        } else {
            $q = $db->prepare("SELECT * FROM users WHERE phone_number = :phone_number");
            $q->bindValue(":phone_number", $phoneNumber);
            $q->execute();

            if($q->rowCount() > 0){
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("The phone number has already been registered");
                exit();

        } else {
            $q=$db->prepare("INSERT INTO users(user_id, first_name, last_name, company, email, phone_number, password, forgot_password, token, verified) VALUES(:user_id, :first_name, :last_name, :company, :email, :phone_number, :password, :forgot_password, :token, :verified)");
            $q->bindValue(":user_id", null);
            $q->bindValue(":first_name", $firstName);
            $q->bindValue(":last_name", $lastName);
            $q->bindValue(":company", $company);
            $q->bindValue(":email", $email);
            $q->bindValue(":phone_number", $phoneNumber);
            $q->bindValue(":password", $passwordHash);
            $q->bindValue(":forgot_password", $forgotPass);
            $q->bindValue(":token", $token);
            $q->bindValue(":verified", false);
            $q->execute();

            $user_id = $db->lastInsertId();

            $to_email = $email;
            $subject = "Nuub - Account Confirmation";
            $message = "Welcome to Nuub, click on the following link to verify your account:
                <a href='http://localhost/bachelor_exam/confirm_account.php?token=$token'>Confirm your account</a>";

            require_once(__DIR__."/emailVerification/send_email.php");

            $user = array(
                "user_id" => $_SESSION["user_id"] = $row["user_id"],
                "first_name" => $_SESSION["first_name"] = $row["first_name"],
                "last_name" => $_SESSION["last_name"] = $row["last_name"],
                "email" => $_SESSION["email"] = $row["email"],
                "company" => $_SESSION["company"] = $row["company"],
                "phone_number" => $_SESSION["phone_number"] = $row["phone_number"],
                "verified" => $_SESSION["verified"] = $row["verified"],
                "token" => $_SESSION["token"] = $row["token"],
            );
    

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode($user);
            exit();
        }
    }

} catch (Exception $ex){
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode("System not working");
    echo "Debug info: " . $ex->getMessage();
    exit();
}
}

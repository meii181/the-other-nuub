<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$json = file_get_contents("php://input");

if (isset($json) && !empty($json)) {
    $data = json_decode($json);

    try {
        $firstName = $data->first_name;
        $lastName = $data->last_name;
        $company = $data->company;
        $email = $data->email;
        $phoneNumber = $data->phone_number;
        $password = $data->password;
        // $confirmPassword = $request->confirm_password;

        $db = _db();

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $key_verification = bin2hex(random_bytes(16));
        $forgotten_password_key = bin2hex(random_bytes(16));

        $q=$db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $email);
        $q->execute();
        $row = $q->fetch();

        if($row > 0){
            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("The email has already been registered");
            exit();

        } else {
            $q=$db->prepare("SELECT * FROM users WHERE phone_number = :phone_number");
            $q->bindValue(":phone_number", $phoneNumber);
            $row=$q->fetch();

            if($row > 0){
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("The phone number has already been registered");
                exit();
        } else {
            $q=$db->prepare("INSERT INTO users(user_id, first_name, last_name, company, email, phone_number, password, forgotten_password, key_verification) VALUES(:user_id, :first_name, :last_name, :company, :email, :phone_number, :password, :forgotten_password, :key_verification)");
            $q->bindValue(":user_id", null);
            $q->bindValue(":first_name", $firstName);
            $q->bindValue(":last_name", $lastName);
            $q->bindValue(":company", $company);
            $q->bindValue(":email", $email);
            $q->bindValue(":phone_number", $phoneNumber);
            $q->bindValue(":password", $password);
            $q->bindValue(":forgotten_password", $forgotten_password);
            $q->bindValue(":key_verification", $key_verification);
            $q->execute();

            $id = $db->lastInsertId();

            session_start();
            $_SESSION["first_name"] = $firstName;

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("Success");
            exit();
        }
    }

} catch (Exception $ex){
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}

}
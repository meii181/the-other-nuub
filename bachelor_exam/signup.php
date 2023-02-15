<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "globals.php";
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)){

    $request = json_decode($data);


    try {

        $firstName = $request->first_name;
        $lastName = $request->last_name;
        $company = $request->company;
        $email = $request->email;
        $phoneNumber = $request->phone_number;
        $password = $request->password;
        
        $db = _db();

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

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
            $q=$db->prepare("INSERT INTO users(user_id, first_name, last_name, company, email, phone_number, password) VALUES(:user_id, :first_name, :last_name, :company, :email, :phone_number, :password)");
            $q->bindValue(":user_id", null);
            $q->bindValue(":first_name", $firstName);
            $q->bindValue(":last_name", $lastName);
            $q->bindValue(":company", $company);
            $q->bindValue(":email", $email);
            $q->bindValue(":phone_number", $phoneNumber);
            $q->bindValue(":password", $passwordHash);
            $q->execute();

            $id = $db->lastInsertId();

            $_SESSION["user"] = [
                "user_id" => $id,
                "first_name" => $firstName,
                "last_name" => $lastName,
                "company" => $company,
                "email" => $email,
                "phone_number" => $phoneNumber,
            ];

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode($_SESSION["user"]);
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

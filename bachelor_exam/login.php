<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data);

    try {

        $email = $request->email;
        $passwordCheck = $request->password;  

        $db = _db();

        $q=$db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $email);
        $q->execute();
        $row = $q->fetch();

        if($q->rowCount() > 0){

            if (password_verify($passwordCheck, $row["password"])) {
                
                $_SESSION["user"] = [
                    "email" => $email,
                    "first_name" => $row["first_name"],
                    "last_name" => $row["last_name"],
                    "company" => $row["company"],
                    "phone_number" => $row["phone_number"],
                    "user_id" => $row["user_id"],
                ];

                http_response_code(200);
                echo json_encode($_SESSION["user"]);
                exit();

            } else {
                http_response_code(400);
                echo json_encode("Wrong email or password");
                exit();
            }
            
            } else {
                http_response_code(400);
                echo json_encode("User does not exist");
                exit();
            }
        

    } catch(Exception $ex){
        http_response_code(500);
        echo json_encode("System not working");
        echo "Debug info:" . $ex->getMessage();
    }
}
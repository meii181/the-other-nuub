<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once (__DIR__."/globals.php");
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data);

    $email = $request->email;
    $passwordCheck = $request->password; 

    // empty input 
    if (empty($email) || empty($passwordCheck)){
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("All fields must be filled in");
        exit();
    }

    // email validation
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    // password validation
    else if (strlen($passwordCheck) < _PASSWORD_MIN_LEN){
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password is not strong");
        exit();
    }

    else if (strlen($passwordCheck) > _PASSWORD_MAX_LEN){
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("The password has reached the maximum characters");
        exit();
    }

    $db = _db();

    try {

        $q=$db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $email);
        $q->execute();
        $row = $q->fetch();

        if(!empty($row)){

            if (password_verify($passwordCheck, $row["password"])) {

                if(isset($row["user_id"])){
                
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

                } else {
                    header("Content-type: application/json");
                    http_response_code(400);
                    echo json_encode("Failed to login, user ID has not been set");
                    exit();
                }


            } else {
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("Wrong email or password");
                exit();
            }
            
            } else {
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("User does not exist");
                exit();
            }
        

    } catch(Exception $ex){
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode("System not working");
        echo "Debug info:" . $ex->getMessage();
    }
}
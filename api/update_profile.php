<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once (__DIR__."/globals.php");
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data);

    $changedFirstName = $request->first_name;
    $changedLastName = $request->last_name;
    $changedEmail = $request->email;
    $changedPhoneNumber = $request->phone_number;
    $changedPassword = $request->password;
    $changedPasswordConfirm = $request->confirm_password;

    $db = _db();

    if(empty($changedFirstName) || empty($changedLastName) || empty($changedEmail) || empty($changedPhoneNumber) || empty($changedPassword) || empty($changedPasswordConfirm)){
        http_response_code(400);
        echo json_encode("All fields must be filled in");
        exit();
    }

    if(strlen($changedFirstName) < _NAME_MIN_LEN){
        http_response_code(400);
        echo json_encode("The first name must be longer than 2 characters");
        exit();
    }

    if(strlen($changedFirstName) > _NAME_MAX_LEN){
        http_response_code(400);
        echo json_encode("The first name cannot be longer than 12 characters");
        exit();
    }

    if(strlen($changedLastName) < _NAME_MIN_LEN){
        http_response_code(400);
        echo json_encode("The last name must be longer than 2 characters");
        exit();
    }

    if(strlen($changedLastName) > _NAME_MAX_LEN){
        http_response_code(400);
        echo json_encode("The last name cannot be longer than 12 characters");
        exit();
    }
    

    if(!filter_var($changedEmail, FILTER_VALIDATE_EMAIL)){
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    if(strlen($changedPassword) < _PASSWORD_MIN_LEN){
        http_response_code(400);
        echo json_encode("The password is not strong enough");
        exit();
    }

    if(strlen($changedPassword) > _PASSWORD_MAX_LEN){
        http_response_code(400);
        echo json_encode("The password has exceeded the maximum of characters");
        exit();
    }

    if(strlen($changedPhoneNumber) !== 8){
        http_response_code(400);
        echo json_encode("Danish phone number must be provided");
        exit();
    }

    if($changedPassword !== $changedPasswordConfirm){
        http_response_code(400);
        echo json_encode("The passwords does not match");
        exit();
    }

    try {

        $user_id = $_SESSION["user_id"];
        $updatePassHash = password_hash($changedPassword, PASSWORD_DEFAULT);

        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->bindValue(":email", $changedEmail);
        $q->execute();
        $rowCheckEmail = $q->fetch();

        if($rowCheckEmail > 0){
            http_response_code(400);
            echo json_encode("The email is already taken");
            exit();

        } else {

           $db->beginTransaction(); 

           //the user changes their first name
           $q = $db->prepare("UPDATE users SET first_name = :first_name WHERE user_id = :user_id");
           $q->bindValue(":user_id", $user_id);
           $q->bindValue(":first_name", $changedFirstName);
           $q->execute();   

           //the user changes their last name
           $q = $db->prepare("UPDATE users SET last_name = :last_name WHERE user_id = :user_id");
           $q->bindValue(":user_id", $user_id);
           $q->bindValue(":last_name", $changedLastName);
           $q->execute();

           //the user changes their email
           $q = $db->prepare("UPDATE users SET email = :email WHERE user_id = :user_id");
           $q->bindValue(":user_id", $user_id);
           $q->bindValue(":email", $changedEmail);
           $q->execute();

           //the user changes their phone number
           $q = $db->prepare("UPDATE users SET phone_number = :phone_number WHERE user_id = :user_id");
           $q->bindValue(":user_id", $user_id);
           $q->bindValue(":phone_number", $changedPhoneNumber);
           $q->execute();

           //the user changes their password
           $q = $db->prepare("UPDATE users SET password = :password WHERE user_id = :user_id");
           $q->bindValue(":user_id", $user_id);
           $q->bindValue(":password", $updatePassHash);
           $q->execute();

           $db->commit();

           http_response_code(200);
           echo json_encode("Your profile has been updated successfully!");
           exit();
        }

} catch(Exception $ex){
    $db->rollback();
    http_response_code(500);
    echo json_encode("Failed updating your profile");
    echo "Debug info:" . $ex->getMessage();
}
}
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

        $db = _db();

        $changedFirstName = $request->first_name;
        $changedLastName = $request->last_name;
        $changedEmail = $request->email;
        $changedPhoneNumber = $request->phone_number;
        $changedPassword = $request->password;
        
        $id = $_SESSION["user"];
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
           $q->bindValue(":user_id", $id);
           $q->bindValue(":first_name", $changedFirstName);
           $q->execute();

           //the user changes their last name
           $q = $db->prepare("UPDATE users SET last_name = :last_name WHERE user_id = :user_id");
           $q->bindValue(":user_id", $id);
           $q->bindValue(":last_name", $changedLastName);
           $q->execute();

           //the user changes their email
           $q = $db->prepare("UPDATE users SET email = :email WHERE user_id = :user_id");
           $q->bindValue(":user_id", $id);
           $q->bindValue(":email", $changedEmail);
           $q->execute();

           //the user changes their phone number
           $q = $db->prepare("UPDATE users SET phone_number = :phone_number WHERE user_id = :user_id");
           $q->bindValue(":user_id", $id);
           $q->bindValue(":phone_number", $changedPhoneNumber);
           $q->execute();

           //the user changes their password
           $q = $db->prepare("UPDATE users SET password = :password WHERE user_id = :user_id");
           $q->bindValue(":user_id", $id);
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
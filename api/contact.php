<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once (__DIR__."/globals.php");

$json = file_get_contents("php://input");

if (isset($json) && !empty($json)) {
    $request = json_decode($json);

    $fullName = $request->full_name;
    $email = $request->email;
    $inquiryDescription = $request->inquiry_description;

    if(empty($fullName) || empty($email) || empty($inquiryDescription)){
        http_response_code(400);
        echo json_encode("All fields must be filled");
        exit();
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    if(strlen($fullName) < 8){
        http_response_code(400);
        echo json_encode("The full name must be at least 8 characters");
        exit();
    }

    if(strlen($fullName) > 20){
        http_response_code(400);
        echo json_encode("The full name cannot be more 20 characters");
        exit();
    }

    if(strlen($inquiryDescription) > 200){
        http_response_code(400);
        echo json_encode("Maximum 200 characters allowed");
        exit();
    }



        $db = _db();

    try {

            $q = $db->prepare("SELECT * FROM contact_form WHERE email = :email");
            $q->bindValue(":email", $email);
            $q->execute();
            $row = $q->fetch();

            if ($row > 0) {
                header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("The email has already been registered");
                exit();

            } else {

                $q = $db->prepare("INSERT INTO contact_form(contact_id, full_name, email, inquiry_description) VALUES (:contact_id, :full_name, :email, :inquiry_description)");
                $q->bindValue(":contact_id", null);
                $q->bindValue(":full_name", $fullName);
                $q->bindValue(":email", $email);
                $q->bindValue(":inquiry_description", $inquiryDescription);
                $q->execute();

                $id = $db->lastInsertId();

                header("Content-type: application/json");
                http_response_code(200);
                echo json_encode("Your contact details has been registered, we'll get in touch as fast as you say fish! ;D");
                exit();
            }

    } catch (Exception $ex){
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }

}








































// $json = file_get_contents("php://input");
// $_POST = json_decode($json, true);

//     // if(!isset($_POST["full_name"])){
//     //     header("Content-type: application/json");
//     //     http_response_code(400);
//     //     echo "Please fill this field!";
//     //     exit();
//     // }

//     // if(!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
//     //     header("Content-type: application/json");
//     //     http_response_code(400);
//     //     echo "Invalid email";
//     //     exit();
//     // }

//     $db = _db();

// try {

//     $q = $db->prepare("INSERT INTO contact_form VALUES (:full_name, :email, :type_of_inquiry, :inquiry_description)");
//     $q->bindValue(":full_name", $_POST["full_name"]);
//     $q->bindValue(":email", $_POST["email"]);
//     $q->bindValue(":type_of_inquiry", $_POST["type_of_inquiry"]);
//     $q->bindValue(":inquiry_description", $_POST["inquiry_description"]);
//     $q->execute();

//     header("Content-type: application/json");
//     echo "Success";

//     exit();

// } catch (Exception $ex){
//     header("Content-type: application/json");
//     http_response_code(500);
//     echo "System not working";
//     exit();
// }

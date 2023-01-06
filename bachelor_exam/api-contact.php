<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include "globals.php";

$json = file_get_contents("php://input");

if (isset($json) && !empty($json)) {
    $request = json_decode($json);


    try {
        $fullName = $request->full_name;
        $email = $request->email;
        $typeInquiry = $request->type_of_inquiry;
        $inquiryDescription = $request->inquiry_description;

        $db = _db();


                $q = $db->prepare("SELECT * FROM contact_form WHERE email = :email");
                $q->bindValue(":email", $email);
                $q->execute();
                $row = $q->fetch();

                if ($row > 0) {
                    header("Content-type: application/json");
                    http_response_code(400);
                    echo "The email has already been registered!";
                    exit();

                } else {

                    $q = $db->prepare("INSERT INTO contact_form(contact_id, full_name, email, type_of_inquiry, inquiry_description) VALUES (:contact_id, :full_name, :email, :type_of_inquiry, :inquiry_description)");
                    $q->bindValue(":contact_id", null);
                    $q->bindValue(":full_name", $fullName);
                    $q->bindValue(":email", $email);
                    $q->bindValue(":type_of_inquiry", $typeInquiry);
                    $q->bindValue(":inquiry_description", $inquiryDescription);
                    $q->execute();

                    $id = $db->lastInsertId();

                    header("Content-type: application/json");
                    http_response_code(200);
                    echo "Success!";
                    exit();
                }

    } catch (Exception $ex){
        header("Content-type: application/json");
        http_response_code(500);
        echo "Not working";
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

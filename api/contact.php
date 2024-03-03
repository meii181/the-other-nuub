<?php
header("Access-Control-Allow-Origin: https://the-other-nuub.netlify.app/");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data, true);

    if (empty($_POST["full_name"]) || empty($_POST["email"]) || empty($_POST["inquiry_description"])) {
        http_response_code(400);
        echo json_encode("All fields must be filled");
        exit();
    }

    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode("The email is not valid");
        exit();
    }

    if (strlen($_POST["full_name"]) < 8) {
        http_response_code(400);
        echo json_encode("The full name must be at least 8 characters");
        exit();
    }

    if (strlen($_POST["full_name"]) > 20) {
        http_response_code(400);
        echo json_encode("The full name cannot be more 20 characters");
        exit();
    }

    if (strlen($_POST["inquiry_description"]) > 200) {
        http_response_code(400);
        echo json_encode("Maximum 200 characters allowed");
        exit();
    }



    $db = _db();

    try {

        $q = $db->prepare("SELECT * FROM contact_form WHERE email = :email");
        $q->bindValue(":email", $_POST["email"]);
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
            $q->bindValue(":full_name", $_POST["full_name"]);
            $q->bindValue(":email", $_POST["email"]);
            $q->bindValue(":inquiry_description", $_POST["inquiry_description"]);
            $q->execute();

            $id = $db->lastInsertId();

            $to_email = $_POST["email"];
            $subject = "Nuub - Contact Information";
            $message = "<h4>Dear " . $_POST["full_name"] . ",</h4>
        <p>Thank you for reaching to us, here is a resume of the inquiry information you have submitted through our form:
        <p><b>Inquiry Description: </b>" . $_POST["inquiry_description"] . "</p>
        <p>We will reply to your inquiry as soon as we can, remember that it takes 3 business days to get an answer to your inquiry, until then, we wish you have a great time!</p>
        <br></br>
        <h4>Best regards,</h4>
        <h3>The Nuub Team.</h3>";

            require_once(__DIR__ . "/emailVerification/send_email.php");

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("Your contact details has been registered, we'll get in touch as fast as you say fish! ;D");
            exit();
        }
    } catch (Exception $ex) {
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

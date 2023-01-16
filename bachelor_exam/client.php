<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$json = file_get_contents("php://input");

if (isset($json) && !empty($json)) {
    $request = json_decode($json);

    try {

        $clientFullName = $request->full_name;
        $clientEmail = $request->email;
        $clientPhoneNumber = $request->phone_number;

        $db = _db();

        $check_query = $db->prepare("SELECT * FROM clients WHERE email = :email");
        $check_query->bindValue(":email", $clientEmail);
        $check_query->execute();
        $existingClient = $check_query->fetch();

        if ($existingClient > 0){
            header("Content-type: application/json");
                http_response_code(400);
                echo json_encode("The email has been registered already");
                exit();

        } else {

            $q = $db->prepare("INSERT INTO clients(client_id, full_name, email, phone_number) VALUES(:client_id, :full_name, :email, :phone_number)");
            $q->bindValue(":client_id", null);
            $q->bindValue(":full_name", $clientFullName);
            $q->bindValue(":email", $clientEmail);
            $q->bindValue(":phone_number", $clientPhoneNumber);
            $q->execute();

            $client_id = $db->lastInsertId();

            header("Content-type: application/json");
                http_response_code(200);
                echo json_encode("Success");
                exit();
        }

    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();

    }
}
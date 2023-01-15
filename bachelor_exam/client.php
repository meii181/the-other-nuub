<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

// $json = file_get_contents("php://input");

// if (isset($json) && !empty($json)) {
//     $request = json_decode($json);

    try {

        $db = _db();

        $check_query = $db->prepare("SELECT * FROM clients");
        $check_query->execute();
        $existingClient = $check_query->fetchAll();

        if (empty($existingClient)) {

        $client_full_name = "Bianca Grecu";
        $client_email = "babanca2000@gmail.com";
        $client_phone_number = "45678957";


        // $clientFullName = $request->client_full_name;
        // $clientEmail = $request->client_email;
        // $clientPhoneNumber = $request->client_phone_number;

            $q = $db->prepare("INSERT INTO clients(client_id, full_name, email, phone_number) VALUES(:client_id, :full_name, :email, :phone_number)");
            $q->bindValue(":client_id", null);
            $q->bindValue(":full_name", $client_full_name);
            $q->bindValue(":email", $client_email);
            $q->bindValue(":phone_number", $client_phone_number);
            $q->execute();

            $client_id = $db->lastInsertId();

        }

        $q = $db->prepare("SELECT * FROM clients");
        $q->execute();
        $clients = $q->fetchAll();

        echo json_encode($clients);
 
    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);;
        exit();

    }
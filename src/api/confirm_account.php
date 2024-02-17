<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");

$db = _db();

try {

    $token = $_GET["token"];

    if (isset($token)) {

        $q = $db->prepare("UPDATE users SET verified = :verified WHERE token = :token");
        $q->bindValue(":token", $token);
        $q->bindValue("verified", true);
        $q->execute();

        echo '<script>window.location.href = "http://localhost:3000/accountconfirmed?token=' . $token . '"</script>';
        exit();

        if ($q->rowCount() > 0) {
            $new_token = bin2hex(random_bytes(16));

            $new_q = $db->prepare("UPDATE users SET token = :token");
            $new_q->bindValue(":token", $new_token);
            $new_q->execute();

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("New token has been assigned");
            exit();
        } else {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("Something went wrong");
            exit();
        }
    }
} catch (Exception $ex) {
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}

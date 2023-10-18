<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {

    $request = json_decode($data, true);

    $date = strtotime($_POST["meeting_date"]);
    $weekend = array(6, 7);
    $day_of_week = date("N", strtotime($date));
    $start_time = strtotime("10:00:00");
    $end_time = strtotime("15:00:00");
    $meeting_time = strtotime($_POST["meeting_time"]);


    if (empty($date)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("You must choose a date");
        exit();
    }

    if (empty($meeting_time)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("You must choose a time");
        exit();
    }

    if (in_array($day_of_week, $weekend)) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Meetings are not available on weekends");
        exit();
    }

    if ($meeting_time < $start_time || $meeting_time > $end_time) {
        header("Content-type: application/json");
        http_response_code(400);
        echo json_encode("Meetings are available between " . date('h:i A', $start_time) . " and " . date('h:i A', $end_time));
        exit();
    }

    $db = _db();

    try {

        if (isset($_SESSION["user_id"])) {

            $user_id = $_SESSION["user_id"];
            $formatted_time = date("H:i:s", $meeting_time);
            $formatted_start_time = date("H:i:s", $start_time);
            $formatted_end_time = date("H:i:s", $end_time);
            $formatted_date = date("m-d-Y", $date);
            $meeting_id = $_GET["meeting_id"];

            $db->beginTransaction();

            $q = $db->prepare("UPDATE meetings SET meeting_date = :meeting_date WHERE meeting_id = :meeting_id AND user_id = :user_id");
            $q->bindValue("meeting_id", $meeting_id);
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":meeting_date", $formatted_date);
            $q->execute();

            $q = $db->prepare("UPDATE meetings SET meeting_time = :meeting_time WHERE meeting_id = :meeting_id AND user_id = :user_id");
            $q->bindValue("meeting_id", $meeting_id);
            $q->bindValue(":user_id", $user_id);
            $q->bindValue(":meeting_time", $formatted_time);
            $q->execute();


            $fetch_user_q = $db->prepare("SELECT email, first_name FROM users WHERE user_id = :user_id");
            $fetch_user_q->bindValue(":user_id", $user_id);
            $fetch_user_q->execute();
            $row = $fetch_user_q->fetch();

            $to_email = $row["email"];
            $subject = "Nuub - Changed Appointment Confirmation";
            $message = "<h4>Dear " . $row["first_name"] . ",</h4>
        <p>You are receiving this email as a confirmation that your appointment has been changed to " . $formatted_date . ", " . $formatted_time . ".
        <p>In case the situation is changing, therefore not being able to attend, the cancellation can be done through the following link:</p>
        <p><a href='http://localhost:3000/appointmentlist'>Manage your appointment</a></p>
        <p>We are looking forward into meeting you and discuss about your exciting project!</p>
        <br></br>
        <h4>Best regards,</h4>
        <h3>The Nuub Team.</h3>";

            require_once(__DIR__ . "/emailVerification/send_email.php");

            $db->commit();

            header("Content-type: application/json");
            http_response_code(200);
            echo json_encode("Meeting successfully updated!");
            exit();
        } else {
            header("Content-type: application/json");
            http_response_code(400);
            echo json_encode("Something went wrong");
            exit();
        }
    } catch (Exception $ex) {
        $db->rollBack();
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }
}

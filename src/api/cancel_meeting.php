<?php

header("Access-Control-Allow-Origin: https://the-other-nuub.netlify.app/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once(__DIR__ . "/globals.php");
session_start();

$db = _db();

try {

    $user_id = $_SESSION["user_id"];
    $meeting_id = $_GET["meeting_id"];

    $q = $db->prepare("DELETE FROM meetings WHERE meeting_id = :meeting_id AND user_id = :user_id");
    $q->bindValue(":meeting_id", $meeting_id);
    $q->bindValue(":user_id", $user_id);
    $q->execute();

    //fetching user's data to send the email
    $fetch_user_q = $db->prepare("SELECT email, first_name FROM users WHERE user_id = :user_id");
    $fetch_user_q->bindValue(":user_id", $user_id);
    $fetch_user_q->execute();
    $row = $fetch_user_q->fetch();

    $to_email = $row["email"];
    $subject = "Nuub - Cancelled Appointment Confirmation";
    $message = "<h4>Dear " . $row["first_name"] . ",</h4>
        <p>You are receiving this email as a confirmation that your appointment has been cancelled. 
        <p>In case you would like to re-schedule for an another time, or cancelling the appointment was not intended, it can be done through the following link:</p>
        <p><a href='http://localhost:3000/appointmentlist'>Manage your appointment</a></p>
        <p>We are looking forward into meeting you and discuss about your exciting project next time.</p>
        <br></br>
        <h4>Best regards,</h4>
        <h3>The Nuub Team.</h3>";

    require_once(__DIR__ . "/emailVerification/send_email.php");

    header("Content-type: application/json");
    http_response_code(200);
    echo '<script>window.location.href = "http://localhost:3000/cancelledappointmentconfirm?meeting_id=' . $meeting_id . '"</script>';
    exit();
} catch (Exception $ex) {
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}

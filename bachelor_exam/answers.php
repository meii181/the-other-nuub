<?php 
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$answers = array(
    array("question_id" => 1, "text" => "1 (Individual)"),
    array("question_id" => 1, "text" => "Less than 10"),
    array("question_id" => 1, "text" => "Between 10 and 50"),
    array("question_id" => 1, "text" => "Between 50 and 100"),
    array("question_id" => 1, "text" => "More than 100"),
    array("question_id" => 3, "text" => "Simple Solution"),
    array("question_id" => 3, "text" => "Strategic Tool"),
    array("question_id" => 5, "text" => "Yes"),
    array("question_id" => 5, "text" => "No"),
    array("question_id" => 6, "text" => "Homepage"),
    array("question_id" => 6, "text" => "Webshop"),
    array("question_id" => 7, "text" => "Between 1-5 pages"),
    array("question_id" => 7, "text" => "Between 5-10 pages"),
    array("question_id" => 7, "text" => "More than 10 pages"),
    array("question_id" => 7, "text" => "None"),
    array("question_id" => 9, "text" => "Yes"),
    array("question_id" => 9, "text" => "No"),
    array("question_id" => 10, "text" => "Yes"),
    array("question_id" => 10, "text" => "No"),
    array("question_id" => 11, "text" => "Yes"),
    array("question_id" => 11, "text" => "No"),
    array("question_id" => 12, "text" => "Social Media Advertising/Management"),
    array("question_id" => 12, "text" => "Implementation of Chat Bot"),
    array("question_id" => 12, "text" => "Payment System"),
    array("question_id" => 12, "text" => "Website Hosting"),
    array("question_id" => 12, "text" => "Website Security"),
    array("question_id" => 13, "text" => "Yes"),
    array("question_id" => 13, "text" => "No"),
);

try {

    foreach ($answers as $answer) {

        $db = _db();

        $check_answers = $db->prepare("SELECT * FROM answers WHERE question_id = :question_id AND text = :text");
        $check_answers->bindValue(":question_id", $answer["question_id"]);
        $check_answers->bindValue(":text", $answer["text"]);
        $check_answers->execute();
        $existingAnswer = $check_answers->fetch();

        if (!$existingAnswer) {

            $q = $db->prepare("INSERT INTO answers(answer_id, text, question_id) VALUES(:answer_id, :text, :question_id)");
            $q->bindValue(":answer_id", null);
            $q->bindValue(":text", $answer["text"]);
            $q->bindValue("question_id", $answer["question_id"]);
            $q->execute();

            if ($q->rowCount() > 0) {
                echo json_encode("Success");
            }
        }
    }

    $q = $db->prepare("SELECT * FROM answers");
    $q->execute();
    $answers = $q->fetchAll();

    echo json_encode($answers);

} catch (Exception $ex) {
    header("Content-type: application/json");
    http_response_code(500);
    echo json_encode(["error" => $ex->getMessage()]);
    exit();
}
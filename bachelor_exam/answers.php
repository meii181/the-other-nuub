<?php 
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$answers = array(
    array("question_id" => 1, "text" => "Yes"),
    array("question_id" => 1, "text" => "No"),
    array("question_id" => 2, "text" => "Homepage"),
    array("question_id" => 2, "text" => "Webshop"),
    array("question_id" => 3, "text" => "Between 1-5 pages"),
    array("question_id" => 3, "text" => "Between 5-10 pages"),
    array("question_id" => 3, "text" => "More than 10 pages"),
    array("question_id" => 3, "text" => "None"),
    array("question_id" => 4, "text" => "Yes"),
    array("question_id" => 4, "text" => "No"),
    array("question_id" => 5, "text" => "Yes"),
    array("question_id" => 5, "text" => "No"),
    array("question_id" => 6, "text" => "Yes"),
    array("question_id" => 6, "text" => "No"),
    array("question_id" => 7, "text" => "Yes"),
    array("question_id" => 7, "text" => "No"),
    array("question_id" => 8, "text" => "Yes"),
    array("question_id" => 8, "text" => "No, already have implemented/don't need to"),
    array("question_id" => 9, "text" => "Yes"),
    array("question_id" => 9, "text" => "No"),
    array("question_id" => 10, "text" => "Yes"),
    array("question_id" => 10, "text" => "No"),
    array("question_id" => 11, "text" => "Yes"),
    array("question_id" => 11, "text" => "No"),
    array("question_id" => 11, "text" => "Social Media Advertising/Management"),
    array("question_id" => 11, "text" => "Implementation of Chat Bot"),
    array("question_id" => 11, "text" => "Payment System"),
    array("question_id" => 11, "text" => "Blog Feature"),
    array("question_id" => 11, "text" => "Website Security"),
    array("question_id" => 12, "text" => "Yes"),
    array("question_id" => 12, "text" => "No"),
);

try {

    foreach ($answers as $answer) {

        $db = _db();

        $check_answers = $db->prepare("SELECT * FROM answers_choices WHERE question_id = :question_id AND text = :text");
        $check_answers->bindValue(":question_id", $answer["question_id"]);
        $check_answers->bindValue(":text", $answer["text"]);
        $check_answers->execute();
        $existingAnswer = $check_answers->fetch();

        if (!$existingAnswer) {

            $q = $db->prepare("INSERT INTO answer_choices(answer_text_id, text, question_id) VALUES(:answer_text_id, :text, :question_id)");
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
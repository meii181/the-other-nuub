<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$questions = array(
"Do you have a website?" =>  "Choose down below if you have a website and looking for an update or not",
"What kind of website would you like/is your current website?" =>  "Choose the type of the website, whether existent and needs a refreshment, or not",
"How many pages do you need for the website?" => "Choose the desired number of pages for your future website, choose 'None' if you already have a website",
"Do you have pictures to use for the website or any other solution to achieve them?" => "For example, if you can achieve photos through a photographer or a stock photo",
"Are you in need of changing something to the/getting help with the visual identity of your brand?" => "For example, if we can help you with choosing the colors, font, logo or the style of the website, or to make changes in case you already have one", 
"Would you like to help you with integrating your web solution in the market?" =>  "For example, we can help you with search engine optimization to grow traffic to the website", 
"Would you like to help you with integrating your web solution with other software?" =>  "For example, if you wish to have a contact form to your website, or update the purchase system, having the website integrated with other software would be useful in this case",
"Would you like to have security implemented on your website?" => "For example, to provide security to the users through providing validation and sanitization of various forms to avoid possible virtual attacks",
"Is your website responsive?" => "If not, we'll help you with offering a responsive design to the website",
"Would you like to have your website hosted?" => "Choose whether you would like to get your website hosted or not",
"What kind of additional services would you like to have implemented to the website?" =>  "Choose down whether what kind of services would you like to have implemented",
"Would you like to have the website available in english as well?" =>  "Choose whether you wish to have a second language for your website or not"
);


    try {

    foreach ($questions as $text => $description) {

        $db = _db();

        $check_questions = $db->prepare("SELECT * FROM questions WHERE text = :text");
        $check_questions->bindValue(":text", $text);
        $check_questions->execute();
        $existingQuestion = $check_questions->fetchAll();

        if (empty($existingQuestion)) {

            $question_type = "";
            
            if ($text === "Do you have a website?") {
                $question_type = "true_false";

            } else if ($text === "What kind of website would you like/is your current website?") {
                $question_type = "multiple_choice";

            } else if ($text === "How many pages do you need for the website?") {
                $question_type = "multiple_choice";

            } else if ($text === "Do you have pictures to use for the website or any other solution to achieve them?") {
                $question_type = "true_false";

            } else if ($text === "Are you in need of changing something to the/getting help with the visual identity of your brand?") {
                $question_type = "true_false";

            } else if ($text === "Would you like to help you with integrating your web solution in the market?") {
                $question_type = "true_false";

            } else if ($text === "Would you like to help you with integrating your web solution with other software?") {
                $question_type = "true_false";

            } else if ($text === "Would you like to have security implemented on your website?") {
                $question_type = "true_false";

            } else if ($text === "Is your website responsive?") {
                $question_type = "true_false";

            } else if ($text === "Would you like to have your website hosted?") {
                $question_type = "true_false";

            } else if ($text === "What kind of additional services would you like to have implemented to the website?") {
                $question_type = "multiple_choice";

            } else if ($text === "Would you like to have the website available in english as well?") {
                $question_type = "true_false";
            } else {
                $question_type = "multiple_choice";
            }

            $q = $db->prepare("INSERT INTO questions(question_id, text, description, question_type) VALUES(:question_id, :text, :description, :question_type)");
            $q->bindValue(":question_id", null);
            $q->bindValue(":text", $text);
            $q->bindValue(":description", $description);
            $q->bindValue(":question_type", $question_type);
            $q->execute();
            
        }
    }
        $q = $db->prepare("SELECT * FROM questions");
        $q->execute();
        $questions = $q->fetchAll();

        echo json_encode($questions);

    } catch (Exception $ex) {
        header("Content-type: application/json");
        http_response_code(500);
        echo json_encode(["error" => $ex->getMessage()]);
        exit();
    }
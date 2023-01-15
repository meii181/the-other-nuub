<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "globals.php";

$questions = array(
"How big is the company?" => "Choose down below the number of staff that are in your company",
"Would you like to make a short description about the company/you?" =>  "You can write down what you do, what are your goals, and what are you exactly looking for",
"Which is your target goal for the website solution?" =>  "Please select if your website solution should work as a simple online representation, or it should be part of a bigger strategy", 
"How much is your budget?" => "Write down the budget, annual or monthly", 
"Do you have a website?" =>  "Choose down below if you already have a website or not",
"What kind of website would you like/is your current website?" =>  "Choose the type of the website, whether existent and needs a refreshment, or not",
"How many pages do you need for the website?" => "Choose the desired number of pages for your future website, choose 'None' if you already have a website",
"What works well on the website, and what not and would like to get fixed?" =>  "Mention down below what would you like to have fixed to your website, choose 'None' if you don't have a website", 
"Would you like to help you with integrating your web solution in the market?" =>  "For example, we can help you with search engine optimization to grow traffic to the website", 
"Would you like to help you with integrating your web solution with other software?" =>  "For example, if you wish to have a contact form to your website, or update the purchase system, having the website integrated with other software would be useful in this case",
"Is your website responsive?" =>  "If not, we'll help you with offering a responsive design to the website",
"What kind of additional services would you like to have implemented to the website?" =>  "Choose down whether what kind of services would you like to have implemented",
"Would you like to have the website available in english as well?" =>  "Choose whether you wish to have a second language for your website or not"
);


    try {

    foreach ($questions as $text => $description) {

        $db = _db();

        $check_query = $db->prepare("SELECT * FROM questions WHERE text = :text");
        $check_query->bindValue(":text", $text);
        $check_query->execute();
        $existingQuestion = $check_query->fetchAll();

        if (empty($existingQuestion)) {

            $question_type = "";
            if ($text === "How big is the company?") {
                $question_type = "multiple_choice";

            } else if ($text === "Would you like to make a short description about the company/you?") {
                $question_type = "input_field";

            } else if ($text === "Which is your target goal for the website solution?") {
                $question_type = "multiple_choice";

            } else if ($text === "How much is your budget?") {
                $question_type = "input_field";

            } else if ($text === "Do you have a website?") {
                $question_type = "true_false";

            } else if ($text === "What kind of website would you like/is your current website?") {
                $question_type = "multiple_choice";

            } else if ($text === "How many pages do you need for the website?") {
                $question_type = "multiple_choice";

            } else if ($text === "What works well on the website, and what not and would like to get fixed?") {
                $question_type = "input_field";

            } else if ($text === "Would you like to help you with integrating your web solution in the market?") {
                $question_type = "true_false";

            } else if ($text === "Would you like to help you with integrating your web solution with other software?") {
                $question_type = "true_false";

            } else if ($text === "Is your website responsive?") {
                $question_type = "true_false";

            } else if ($text === "What kind of additional services would you like to have implemented to the website?") {
                $question_type = "multiple_choice";

            } else if ($text === "Would you like to have the website available in english as well?") {
                $question_type = "true_false";
            } else {
                $question_type = "input_field";
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
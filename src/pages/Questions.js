import axios from "axios";
import React from "react";
// import axios from "axios";

const Questions = () => {
  //   const [questions, setQuestions] = useState("");
  //   const [questionType, setQuestionType] = useState("");
  axios
    .get("http://localhost/bachelor_exam/questions.php")
    .then((response) => console.log(response));
};

export default Questions;

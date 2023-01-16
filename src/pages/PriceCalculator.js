import React, { useState, useEffect } from "react";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const PriceCalculator = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/bachelor_exam/questions.php")
      .then((response) => {
        setQuestionList(response.data);
        setCurrentStep(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentStep]);

  useEffect(() => {
    if (questionList.length && currentStep !== -1) {
      axios
        .get(
          `http://localhost/bachelor_exam/answers.php?question_id=${questionList[currentStep].question_id}`
        )
        .then((response) => {
          const answers = response.data.filter(
            (answer) =>
              answer.question_id === questionList[currentStep].question_id
          );
          setCurrentQuestionAnswers(answers);
          setCurrentStep(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentStep, questionList]);

  const handleNextSection = (event) => {
    event.preventDefault();
    if (!inputValue && currentStep === -1) {
      alert("Please select an answer!");
      return;
    }
    if (inputValue === "" && questionList[currentStep].question_type === "input_field") {
      alert("Please enter a value!");
      return;
    }
    if (currentStep !== -1 && currentStep < questionList.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousSection = (event) => {
    event.preventDefault();
    if (currentStep !== -1 && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <NavigationPriceCalculator
      currentStep = {currentStep}
      handleNextSection = {handleNextSection}
      handlePreviousSection = {handlePreviousSection}
      />
      <Container
        fluid
        style={{
          borderTop: "4px solid black",
          borderBottom: "4px solid black",
          textAlign: "center",
          marginTop: "3rem",
        }}
      >
        {currentStep === -1 || !questionList.length ? (
          <p>Please wait...</p>
        ) : (
          <>
            <h1 className="question_title">{questionList[currentStep].text}</h1>
            <h3 className="question_description">
              {questionList[currentStep].description}
            </h3>
            {questionList[currentStep].question_type &&
            questionList[currentStep].question_type === "multiple_choice" ? (
              <>
                {currentQuestionAnswers.map((answer) => (
                    <div
                      key={`${answer.answer_id} - ${questionList[currentStep].question_id}`}
                    >
                      <input
                        type="radio"
                        id={answer.answer_id}
                        name={questionList[currentStep].question_id}
                        onChange={(event) => setInputValue(event.target.id)}
                        value={answer.answer_id}
                      />
                      <label htmlFor={answer.answer_id}>{answer.text}</label>
                    </div>
                  ))}
              </>
            ) : questionList[currentStep].question_type &&
              questionList[currentStep].question_type === "true_false" ? (
              <>
                {currentQuestionAnswers.map((answer) => (
                    <div
                      key={`${answer.answer_id} - ${questionList[currentStep].question_id}`}
                    >
                      <input
                        type="radio"
                        id={answer.answer_id}
                        name={questionList[currentStep].question_id}
                        onChange={(event) => setInputValue(event.target.id)}
                        value={answer.text}
                      />
                      <label htmlFor={answer.answer_id}>{answer.text}</label>
                    </div>
                ))}
              </>
            ) : questionList[currentStep].question_type &&
              questionList[currentStep].question_type === "input_field" ? (
              <>
                    <div
                      key={`${questionList[currentStep].question_id}`}
                    >
                      <input
                        type="textarea"
                        className="input_value_style"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.id)}
                        name={questionList[currentStep].question_id}
                      />
                    </div>
              </>
            ) : null }
            <div>
              {currentStep > 0 && (
                <Button onClick={handlePreviousSection}>Back</Button>
              )}
              {currentStep < questionList.length - 1 && (
                <Button onClick={handleNextSection}>
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PriceCalculator;

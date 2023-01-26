import React, { useState, useEffect} from "react";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const PriceCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);
  const [inputValue, setInputValue] = useState(false);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    axios
      .get("http://localhost/bachelor_exam/questions.php")
      .then((response) => {
        setQuestionList(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentStep]);

  useEffect(() => {
    if (questionList.length) {
      axios
        .get(
          `http://localhost/bachelor_exam/answer_choices.php?question_id=${questionList[currentStep].question_id}`
        )
        .then((response) => {
          const answers = response.data.filter(
            (answer) =>
              answer.question_id === questionList[currentStep].question_id
          );
          setCurrentQuestionAnswers(answers);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentStep, questionList]);


  const lastQuestion = questionList.length - 1;

  const handleNextSection = () => {
    if (currentStep === lastQuestion){
    window.location.href = "/final";
  } else {
    setCurrentStep(currentStep + 1);
  }
};

  const handlePreviousSection = () => {
    setCurrentStep(currentStep - 1);
  };
  
  return (
    <div>
      <NavigationPriceCalculator
      />
      <Container
        fluid
        style={{
          borderTop: "4px solid black",
          borderBottom: "4px solid black",
          textAlign: "center",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        {!questionList.length ? (
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
                {currentQuestionAnswers.map((answers) => (
                    <div style={{fontFamily: "secondary-font", fontSize: 20, padding: "0.5rem"}}
                      key={`${answers.answer_choice_id} - ${questionList[currentStep].question_id}`}
                    >
                      <input
                        type="radio"
                        id={answers.answer_choice_id}
                        name={questionList[currentStep].question_id}
                        value={answers.answer_choice_id}
                        onChange={handleInputValue}
                        
                      />
                      <label htmlFor={answers.answer_choice_id}>{answers.text}</label>
                    </div>
                  ))}
              </>
            ) : questionList[currentStep].question_type &&
              questionList[currentStep].question_type === "true_false" ? (
              <>
                {currentQuestionAnswers.map((answers) => (
                    <div style={{fontFamily: "secondary-font", fontSize: 20, padding: "0.5rem"}}
                      key={`${answers.answer_choice_id} - ${questionList[currentStep].question_id}`}
                    >
                      <input
                        type="radio"
                        id={answers.answer_choice_id}
                        name={questionList[currentStep].question_id}
                        value={answers.text}
                        onChange={handleInputValue}
                        
                      />
                      <label htmlFor={answers.answer_choice_id}>{answers.text}</label>
                    </div>
                ))}
              </>
            ) : null }
            <div>
              {currentStep > 0 && (
                <Button style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  backgroundColor: "#FF629A",
                  color: "whitesmoke",
                  borderBottom: "4px solid black",
                  marginTop: "3rem",
                }} onClick={handlePreviousSection}>Back</Button>
              )}
              
              {currentStep <= lastQuestion && (
                <Button style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  backgroundColor: "#FF629A",
                  color: "whitesmoke",
                  borderBottom: "4px solid black",
                  marginTop: "3rem",
                  marginLeft: "3rem",
                }} active type="button" onClick={handleNextSection} disabled={!inputValue}>
                  {currentStep === lastQuestion ? "Finish" : "Next"}
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

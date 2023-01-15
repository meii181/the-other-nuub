import React, { useState, useEffect } from "react";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const PriceCalculator = () => {

  const [currentStep, setCurrentStep] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/bachelor_exam/questions.php")
    .then(response => { 
    setQuestions(response.data);
    setCurrentStep(0)
  })  .catch(error => {
        console.log(error);
      });
}, [currentStep]);

useEffect(() => {
  axios.get(`http://localhost/bachelor_exam/answers.php?question_id=${questions.id}`)
  .then(response => {
    setAnswers(response.data);
  })
  .catch(error => {
    console.log(error);
  })
}, [currentStep, questions]);


const handleNextSection = () => {
  if(currentStep !== -1 && currentStep + 1 < questions.length) {
  setCurrentStep(currentStep + 1);
  }
};

const handlePreviousSection = () => {
  if(currentStep !== -1 && currentStep > 0){
  setCurrentStep(currentStep - 1);
  }
};


  return (
    <div className="background">
      <NavigationPriceCalculator 
      currentStep={currentStep}
      handleNextSection={handleNextSection}
      handlePreviousSection={handlePreviousSection}
      />
      <Container fluid style={{
        borderTop: "4px solid black",
        borderBottom: "4px solid black",

      }}>
        {currentStep === -1 || !questions.length ? (
          <p>Please wait...</p>
        ) : (
          <>
        <h1 className="question_title">{questions[currentStep].text}</h1>
        <h3 className="question_description">{questions[currentStep].description}</h3>
        {questions[currentStep].question_type === "multiple_choice" ? (
          <>
          {answers.map((answer) => (
            <div key={answer.id}>
              <input type="radio" id={answer.id} name={questions[currentStep].question_id} value={answer.id} />
              <label htmlFor={answer.id}>{answer.text}</label>
              </div>
          ))}
              </>
              ) : questions[currentStep].question_type === "true_false" ? (
                <>
                {answers.map((answer) => (
                  <div key={answer.id}>
                    <input type="radio" id={answer.id} name={questions[currentStep].question_id} value={answer.text} />
                    <label htmlFor={answer.id}>{answer.text}</label>
                    </div>
                    ))}
                    </>
                    ) : questions[currentStep].question_type === "input_field" (
                <>
                {answers.map((answer) => (
                  <div key={answer.id}>
                    <label htmlFor={answer.id}>{answer.text}</label>
                    <input type="text" id={answer.id} name={questions[currentStep].question_id} /> />
                    </div>
                ))}
                <div>
                {currentStep > 0 && <Button onClick={handlePreviousSection}>Back</Button>}
                {currentStep < questions.length - 1 && <Button onClick={handleNextSection}>Next</Button>}
                </div>
                </>
              )}
              </>
        )}
          </Container>
              </div>
  );
                };
           

export default PriceCalculator;

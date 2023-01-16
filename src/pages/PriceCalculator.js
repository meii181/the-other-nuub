import React, { useState, useEffect, useRef } from "react";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const PriceCalculator = (props) => {

  const [currentStep, setCurrentStep] = useState(-1);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);

  const {inputRef} = props;

  useEffect(() => {
    axios.get("http://localhost/bachelor_exam/questions.php")
    .then(response => { 
    setQuestionList(response.data);
    setCurrentStep(0)
  })  .catch(error => {
        console.log(error);
      });
}, [currentStep]);

useEffect(() => {
  if(questionList.length && currentStep !== -1){
  axios.get(`http://localhost/bachelor_exam/answers.php?question_id=${questionList[currentStep].question_id}`)
  .then(response => {
    setCurrentQuestionAnswers(response.data);
  })
  .catch(error => {
    console.log(error);
  })
}
}, [currentStep, questionList]);


const handleNextSection = (inputRef) => {
  console.log("next button called");
  console.log(inputRef);

  if(questionList && currentStep !== undefined && questionList[currentStep].question_type === "input_field" && !inputRef.current.value){
    alert("Please enter info!");
    return;
  }

  if(currentStep !== -1 && currentStep + 1 < questionList.length) {
  setCurrentStep(currentStep + 1);
  }
};

const handlePreviousSection = () => {
  if(currentStep !== -1 && currentStep > 0){
  setCurrentStep(currentStep - 1);
  }
};

console.log(currentStep);

  return (
    <div>
      <NavigationPriceCalculator 
      currentStep={currentStep}
      handleNextSection={handleNextSection}
      handlePreviousSection={handlePreviousSection}
      inputRef={inputRef}
      />
      <Container fluid style={{
        borderTop: "4px solid black",
        borderBottom: "4px solid black",
        textAlign: "center",

      }}>
        {currentStep === -1 || !questionList.length ? (
          <p>Please wait...</p>
        ) : (
          <>
        <h1 className="question_title">{questionList[currentStep].text}</h1>
        <h3 className="question_description">{questionList[currentStep].description}</h3>
        { questionList[currentStep].question_type && questionList[currentStep].question_type === "multiple_choice" ? (
          console.log(questionList[currentStep].question_type),
          <>
          { currentQuestionAnswers.map((answer) => (
            <div key={`${answer.answer_id} - ${questionList[currentStep].question_id}`}>
              <input type="radio" id={answer.answer_id} name={questionList[currentStep].id} value={answer.answer_id} />
              <label htmlFor={answer.answer_id}>{answer.text}</label>
              </div>
          ))}
              </>
              ) : questionList[currentStep].question_type && questionList[currentStep].question_type === "true_false" ? (
                console.log(questionList[currentStep].question_type),
                <>
                {currentQuestionAnswers.map((answer) => (
                  <div key={`${answer.answer_id} - ${questionList[currentStep].question_id}`}>
                    <input type="radio" id={answer.answer_id} name={questionList[currentStep].question_id} value={answer.text} />
                    <label htmlFor={answer.answer_id}>{answer.text}</label>
                    </div>
                    ))}
                    </>
                    ) : questionList[currentStep].question_type && questionList[currentStep].question_type === "input_field" ? (
                      console.log(questionList[currentStep].question_type),
                <>
                {currentQuestionAnswers.map((answer) => (
                  <div key={`${answer.answer_id} - ${questionList[currentStep].question_id}`}>
                    <label htmlFor={answer.answer_id}>{answer.text}</label>
                    <input type="text" ref={props.inputRef} id={answer.answer_id} name={questionList[currentStep].question_id} />
                    </div>
                ))}
                </>
                    ) : null }
              <div>
              {currentStep > 0 && <Button onClick={() => handlePreviousSection()}>Back</Button>}
              {currentStep < questionList.length - 1 && <Button onClick={() => handleNextSection(inputRef)}>Next</Button>}
              </div>
              </>
        )}
          </Container>
              </div>
  );
                };
           

export default PriceCalculator;

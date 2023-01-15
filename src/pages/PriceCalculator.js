import React, { useState, useEffect } from "react";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import { Container } from "react-bootstrap";

const PriceCalculator = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [questionsBySection, setQuestionsBySection] = useState({});

  useEffect(()=>{
    fetch("http://localhost/bachelor_exam/questions_fetch.php")
    .then(response => {
        return response.json()
    })
    .then((result)=>{ 
        const sections = {};
        result.forEach((question) => {
            if(!sections[question.section]) {
                sections[question.section] = [];
            }
            sections[question.section].push(question);
        });
        setQuestionsBySection(sections);
    });
}, []);


const handleNextSection = () => {
  setCurrentStep(currentStep + 1);
};

const handlePreviousSection = () => {
  setCurrentStep(currentStep - 1);
};


  return (
    <div>
      <NavigationPriceCalculator 
      currentStep={currentStep}
      handleNextSection={handleNextSection}
      handlePreviousSection={handlePreviousSection}
      />
      <Container>
      {Object.keys(questionsBySection).map((section, index) => (
          <div key={index}>
            <h2>{section}</h2>
            {questionsBySection[section].map((question, index) => (
              <div key={question.id}>
                {currentStep === index && (
                  <>
                    <h1>{question.text}</h1>
                    <h3>{question.description}</h3>
                    {question.answers.map((answer) => (
                      <div key={answer.id}>
                        {question.question_type === "multiple_choice" ? (
                          <>
                            <input type="radio" id={answer.id} name={question.id} value={answer.id} />
                            <label htmlFor={answer.id}>{answer.text}</label>
                          </>
                        ) : (
                          <>
                            <label htmlFor={answer.id}>{answer.text}</label>
                            <input type="text" id={answer.id} name={question.id} />
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PriceCalculator;

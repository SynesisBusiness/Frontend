import React, { useState } from "react";
import {
  Container,
  Main,
  Title,
  Form,
  Question,
  Button,
  Action,
  Logo,
} from "./styles/FormAnalyticsOwnerStyles";
import logo from "../../assets/logos/logo.svg";
import { RocketLaunch } from "phosphor-react";
import { QuestionaryData } from "../../utils/FormAnalytics/Questionary";

interface Question {
  question: string;
  answer: string;
  input_type: "text" | "textarea" | "multiple_choice";
  loading: boolean;
  options?: string[];
}

interface QuestionarySection {
  section: string;
  questions: Question[];
}

const FormAnalyticsOwner: React.FC = () => {
  const [formData, setFormData] =
    useState<QuestionarySection[]>(QuestionaryData);

  const handleInputChange = (
    sectionIndex: number,
    questionIndex: number,
    value: string
  ) => {
    const newFormData = [...formData];
    newFormData[sectionIndex].questions[questionIndex].answer = value;
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <Container>
      <Main>
        <Logo>
          <img src={logo} alt="Logo synesis" />
        </Logo>
        <Title>
          <h1>Not long!</h1>
          <p>
            Answer the questionnaire below and your complete report will be
            generated at the end.
          </p>
        </Title>
        <Form onSubmit={handleSubmit}>
          {formData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3>{section.section}</h3>
              {section.questions.map((question, questionIdx) => (
                <Question key={questionIdx}>
                  <label>{`${question.question}`}</label>
                  {question.input_type === "text" && (
                    <input
                      type="text"
                      value={question.answer}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          questionIdx,
                          e.target.value
                        )
                      }
                      placeholder="Type here..."
                    />
                  )}
                  {question.input_type === "textarea" && (
                    <textarea
                      value={question.answer}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          questionIdx,
                          e.target.value
                        )
                      }
                      placeholder="Type here..."
                    />
                  )}
                  {question.input_type === "multiple_choice" && (
                    <div className="buttonGroup">
                      {question.options?.map((option, optionIndex) => (
                        <Button
                          type="button"
                          key={optionIndex}
                          onClick={() =>
                            handleInputChange(sectionIndex, questionIdx, option)
                          }
                          selected={question.answer === option}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </Question>
              ))}
            </div>
          ))}
          <Action>
            <button type="submit">
              Submit <RocketLaunch size={20} className="icon__rocket" />
            </button>
          </Action>
        </Form>
      </Main>
    </Container>
  );
};

export default FormAnalyticsOwner;

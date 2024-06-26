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
} from "./styles/FormClientStyles";

import logo from "../../assets/logos/logo.svg";
import { RocketLaunch } from "phosphor-react";

const questions = [
  {
    question: "What is your age group?",
    input_type: "multiple_choice",
    options: [
      "Under 18",
      "18-24",
      "25-34",
      "35-44",
      "45-54",
      "55-64",
      "65 and over",
    ],
  },
  {
    question: "What is your gender?",
    input_type: "multiple_choice",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    question: "Where do you live? City, State/Province, Country",
    input_type: "text",
  },
  {
    question: "What are your main interests and hobbies? Select all that apply",
    input_type: "multiple_choice",
    options: ["Reading", "Sports", "Travel", "Technology"],
  },
  {
    question:
      "What values are most important to you when choosing a product or service? Select all that apply",
    input_type: "multiple_choice",
    options: ["Quality", "Price", "Brand reputation", "Environmental Impact"],
  },
  {
    question:
      "How do you usually interact with our company? Select all that apply",
    input_type: "multiple_choice",
    options: ["Website", "Social Media", "In-store", "Customer Service"],
  },
  {
    question: "How often do you visit our website or app? Select one",
    input_type: "multiple_choice",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
  },
  {
    question: "How often do you purchase our products/services? Select one",
    input_type: "multiple_choice",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly",
      "Yearly",
      "First-time purchase",
    ],
  },
  {
    question: "What is your typical purchase amount? Select one",
    input_type: "multiple_choice",
    options: ["Less than $50", "$50-$100", "$100-$200", "Over $200"],
  },
  {
    question:
      "What are the main reasons you choose our products/services? Select all that apply",
    input_type: "multiple_choice",
    options: [
      "High Quality",
      "Good customer service",
      "Competitive pricing",
      "Innovate features",
    ],
  },
  {
    question: "What expectations do you have from our products/services?",
    input_type: "textarea",
    description:
      "Describe your expectations (e.x., Reliability, ease of use, durability, performance)",
  },
  {
    question:
      "What challenges do you face that our product/service helps to solve?",
    input_type: "textarea",
    description: "Describe the challenges.",
  },
  {
    question:
      "Have you encountered any issues with our products/services? If so, please describe.",
    input_type: "textarea",
    description: "Describe any issues encountered.",
  },
  {
    question: "How satisfied are you with our products/services?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Dissatisfied - Very Satisfied",
  },
  {
    question: "What do you like most about our products/services?",
    input_type: "textarea",
    description: "Provide specific feedback.",
  },
  {
    question:
      "How likely are you to recommend our products/services to others?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Unlikely - Very Likely",
  },
  {
    question:
      "How likely are you to continue using our products/services in the future?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Unlikely - Very Likely",
  },
];

const FormClient: React.FC = () => {
  const [formData, setFormData] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleInputChange = (index: number, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = value;
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
          <h1>Questionnaire for customers</h1>
          <p>Your opinion is important to us!</p>
        </Title>

        <Form onSubmit={handleSubmit}>
          <h3>Information about you</h3>
          <p>17 questions</p>

          {questions.map((question, index) => (
            <Question key={index}>
              <label
                className={!question.description ? "margin__bottom" : ""}
              >{`${index + 1}. ${question.question}`}</label>
              {question.description && <p>{question.description}</p>}
              {question.input_type === "text" && (
                <input
                  type="text"
                  value={formData[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Type here..."
                />
              )}
              {question.input_type === "textarea" && (
                <textarea
                  value={formData[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Type here..."
                />
              )}
              {question.input_type === "multiple_choice" && (
                <>
                  <div className="buttonGroup">
                    {question.options?.map((option, optionIndex) => (
                      <Button
                        type="button"
                        key={optionIndex}
                        onClick={() => handleInputChange(index, option)}
                        selected={formData[index] === option}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {question.range === "Very Unlikely - Very Likely" && (
                    <div
                      style={{
                        display: "flex",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "220px",
                          marginTop: "5px",
                          color: "#555",
                          fontSize: "0.85rem",
                        }}
                      >
                        Very Unlikely
                      </span>
                      <span
                        style={{
                          marginRight: "220px",
                          marginTop: "5px",
                          color: "#555",
                          fontSize: "0.85rem",
                        }}
                      >
                        Very Likely
                      </span>
                    </div>
                  )}
                  {question.range === "Very Dissatisfied - Very Satisfied" && (
                    <div
                      style={{
                        display: "flex",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "180px",
                          marginTop: "5px",
                          color: "#555",
                          fontSize: "0.85rem",
                        }}
                      >
                        Very Dissatisfied
                      </span>
                      <span
                        style={{
                          marginRight: "180px",
                          marginTop: "5px",
                          color: "#555",
                          fontSize: "0.85rem",
                        }}
                      >
                        Very Satisfied
                      </span>
                    </div>
                  )}
                </>
              )}
            </Question>
          ))}

          <Action>
            <button type="submit">
              Submit <RocketLaunch size={20} className="icon__rocket" />{" "}
            </button>
          </Action>
        </Form>
      </Main>
    </Container>
  );
};

export default FormClient;

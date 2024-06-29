import React, { useEffect, useState } from "react";
import { CheckCircle, RocketLaunch, Warning } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

import {
  Container,
  Main,
  Title,
  Form,
  Question,
  Button,
  Action,
  Logo,
  Error,
} from "./styles/FormClientStyles";

import logo from "../../assets/logos/logo.svg";

import { useContextApi } from "../../context/Api";

interface Question {
  question: string;
  input_type: "multiple_choice" | "text" | "textarea";
  options?: string[];
  answer: string | string[];
  description?: string;
  range?: string;
}

const questions: Question[] = [
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
    answer: "",
  },
  {
    question: "What is your gender?",
    input_type: "multiple_choice",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
    answer: "",
  },
  {
    question: "Where do you live? City, State/Province, Country",
    input_type: "text",
    answer: "",
  },
  {
    question: "What are your main interests and hobbies? Select all that apply",
    input_type: "multiple_choice",
    options: ["Reading", "Sports", "Travel", "Technology"],
    answer: [],
  },
  {
    question:
      "What values are most important to you when choosing a product or service? Select all that apply",
    input_type: "multiple_choice",
    options: ["Quality", "Price", "Brand reputation", "Environmental Impact"],
    answer: [],
  },
  {
    question:
      "How do you usually interact with our company? Select all that apply",
    input_type: "multiple_choice",
    options: ["Website", "Social Media", "In-store", "Customer Service"],
    answer: [],
  },
  {
    question: "How often do you visit our website or app? Select one",
    input_type: "multiple_choice",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
    answer: "",
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
    answer: "",
  },
  {
    question: "What is your typical purchase amount? Select one",
    input_type: "multiple_choice",
    options: ["Less than $50", "$50-$100", "$100-$200", "Over $200"],
    answer: "",
  },
  {
    question:
      "What are the main reasons you choose our products/services? Select all that apply",
    input_type: "multiple_choice",
    options: [
      "High Quality",
      "Good customer service",
      "Competitive pricing",
      "Innovative features",
    ],
    answer: [],
  },
  {
    question: "What expectations do you have from our products/services?",
    input_type: "textarea",
    description:
      "Describe your expectations (e.x., Reliability, ease of use, durability, performance)",
    answer: "",
  },
  {
    question:
      "What challenges do you face that our product/service helps to solve?",
    input_type: "textarea",
    description: "Describe the challenges.",
    answer: "",
  },
  {
    question:
      "Have you encountered any issues with our products/services? If so, please describe.",
    input_type: "textarea",
    description: "Describe any issues encountered.",
    answer: "",
  },
  {
    question: "How satisfied are you with our products/services?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Dissatisfied - Very Satisfied",
    answer: "",
  },
  {
    question: "What do you like most about our products/services?",
    input_type: "textarea",
    description: "Provide specific feedback.",
    answer: "",
  },
  {
    question:
      "How likely are you to recommend our products/services to others?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Unlikely - Very Likely",
    answer: "",
  },
  {
    question:
      "How likely are you to continue using our products/services in the future?",
    input_type: "multiple_choice",
    options: ["01", "02", "03", "04", "05"],
    range: "Very Unlikely - Very Likely",
    answer: "",
  },
];

interface Company {
  id: string;
  name: string;
}

const FormClient: React.FC = () => {
  const { backendClient } = useContextApi();
  const { path_company } = useParams<{ path_company: string }>();

  const [unknownForm, setUnknownForm] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<Company>();
  const [questionsState, setQuestionsState] = useState(questions);
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newQuestionsState = [...questionsState];
    const currentAnswer = newQuestionsState[questionIndex].answer;

    if (Array.isArray(currentAnswer)) {
      if (currentAnswer.includes(answer)) {
        // Remove the answer if it's already selected
        newQuestionsState[questionIndex].answer = currentAnswer.filter(
          (ans) => ans !== answer
        );
      } else {
        // Add the answer if it's not selected
        newQuestionsState[questionIndex].answer = [...currentAnswer, answer];
      }
    } else {
      newQuestionsState[questionIndex].answer = answer;
    }

    setQuestionsState(newQuestionsState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check that all answers have been completed
    const allAnswered = questionsState.every((question) => {
      if (Array.isArray(question.answer)) {
        return question.answer.length > 0;
      }
      return question.answer !== "";
    });

    if (!allAnswered) {
      toast("Please answer all the questions.", {
        type: "warning",
        autoClose: 2500,
      });
      return;
    }

    setLoadingRequest(true);

    try {
      await backendClient?.collection("form_responses_clients").create({
        company: companyData?.id,
        responses: JSON.stringify(questionsState),
      });

      setFormSent(true);
    } catch (e) {
      toast(`Error submitting form. Please contact whoever sent this link`);
    }

    setLoadingRequest(false);
  };

  const getInfoCompany = async () => {
    try {
      const response = await backendClient
        ?.collection("companies")
        .getFullList({
          filter: `path="${path_company}"`,
          requestKey: null,
        });

      console.log(response);

      if (!response || response?.length === 0) {
        setUnknownForm(true);
      } else {
        setUnknownForm(false);
        setCompanyData(response[0] as unknown as Company);
      }
    } catch (e) {
      console.log(`error get company: ${e}`);
    }
  };

  useEffect(() => {
    if (backendClient) {
      getInfoCompany();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendClient]);

  return (
    <Container>
      <Main>
        <Logo>
          <img src={logo} alt="Logo synesis" />
        </Logo>

        {!unknownForm && !formSent && (
          <>
            <Title>
              <h1>
                Questionnaire for customers of{" "}
                <span>{companyData?.name || "..."}</span>
              </h1>
              <p>Your opinion is important to us!</p>
            </Title>

            <Form onSubmit={handleSubmit}>
              <h3>Information about you</h3>
              <p>17 questions</p>

              {questionsState.map((question, index) => (
                <Question key={index}>
                  <label
                    className={!question.description ? "margin__bottom" : ""}
                  >{`${index + 1}. ${question.question}`}</label>
                  {question.description && <p>{question.description}</p>}
                  {question.input_type === "text" && (
                    <input
                      type="text"
                      placeholder="Type here..."
                      value={question.answer as string}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  )}
                  {question.input_type === "textarea" && (
                    <textarea
                      placeholder="Type here..."
                      value={question.answer as string}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  )}
                  {question.input_type === "multiple_choice" && (
                    <>
                      <div className="buttonGroup">
                        {question.options?.map((option, optionIndex) => (
                          <Button
                            type="button"
                            key={optionIndex}
                            selected={
                              Array.isArray(question.answer)
                                ? question.answer.includes(option)
                                : question.answer === option
                            }
                            onClick={() => handleAnswerChange(index, option)}
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
                      {question.range ===
                        "Very Dissatisfied - Very Satisfied" && (
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
                  {loadingRequest && "Wait..."}

                  {!loadingRequest && (
                    <>
                      Submit <RocketLaunch size={20} className="icon__rocket" />{" "}
                    </>
                  )}
                </button>
              </Action>
            </Form>
          </>
        )}

        {unknownForm && (
          <Error>
            <Warning size={50} color="#333" className="icon__warning" />

            <h2>This form cannot be accessed</h2>

            <p>
              An error occurred while trying to access the form, please check
              that the URL matches the company you want to respond to The form
            </p>
          </Error>
        )}

        {formSent && (
          <Error>
            <CheckCircle size={50} color="#78d2e5" className="icon__warning" />

            <h2>Responses sent successfully</h2>

            <p>Thanks for your time</p>
          </Error>
        )}
      </Main>

      <ToastContainer />
    </Container>
  );
};

export default FormClient;

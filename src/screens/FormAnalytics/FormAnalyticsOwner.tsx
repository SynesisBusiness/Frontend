/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { RocketLaunch } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  Container,
  Main,
  Title,
  Form,
  Question,
  Button,
  Action,
  Logo,
  HasDiagnosis,
  BackRedirect,
} from "./styles/FormAnalyticsOwnerStyles";

import logo from "../../assets/logos/logo.svg";

import { QuestionaryData } from "../../utils/FormAnalytics/Questionary";
import { useContextApi } from "../../context/Api";

interface Question {
  question: string;
  answer: string | string[];
  input_type: "text" | "textarea" | "multiple_choice";
  loading: boolean;
  options?: string[];
}

interface QuestionarySection {
  section: string;
  questions: Question[];
}

const FormAnalyticsOwner: React.FC = () => {
  const navigate = useNavigate();
  const { backendClient } = useContextApi();

  const [formData, setFormData] =
    useState<QuestionarySection[]>(QuestionaryData);
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [hasDiagnosis, setHasDiagnosis] = useState<boolean>(false);

  const handleInputChange = (
    sectionIndex: number,
    questionIndex: number,
    value: string
  ) => {
    const newFormData = [...formData];
    const currentAnswer =
      newFormData[sectionIndex].questions[questionIndex].answer;

    if (Array.isArray(currentAnswer)) {
      if (currentAnswer.includes(value)) {
        // Remove the answer if it's already selected
        newFormData[sectionIndex].questions[questionIndex].answer =
          currentAnswer.filter((ans) => ans !== value);
      } else {
        // Add the answer if it's not selected
        newFormData[sectionIndex].questions[questionIndex].answer = [
          ...currentAnswer,
          value,
        ];
      }
    } else {
      newFormData[sectionIndex].questions[questionIndex].answer = value;
    }

    setFormData(newFormData);
  };

  const isFormComplete = () => {
    for (const section of formData) {
      for (const question of section.questions) {
        if (Array.isArray(question.answer)) {
          if (question.answer.length === 0) {
            return false;
          }
        } else {
          if (question.answer.trim() === "") {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete()) {
      toast("Please answer all the questions.", {
        type: "warning",
      });
      return;
    }

    setLoadingRequest(true);

    try {
      const token = localStorage.getItem("tokenJWT");
      if (!token) throw new Error("Token not found");

      const decoded: { id: string } = jwtDecode(token);

      const forms = await backendClient
        ?.collection("form_responses_business_owner")
        .getFullList({
          filter: `user="${decoded.id}"`,
        });

      if (!forms || forms.length === 0) {
        throw new Error("Form not found");
      }

      const formID = forms[0].id;

      await backendClient
        ?.collection("form_responses_business_owner")
        .update(formID, {
          responses_form2: JSON.stringify(formData),
        });

      toast("Form submitted successfully!");

      navigate("/diagnosis");
    } catch (error) {
      toast("There was an error submitting the form. Please try again.", {
        type: "error",
      });
    } finally {
      setLoadingRequest(false);
    }
  };

  const verifyDiagnosis = async () => {
    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const responses = await backendClient
        ?.collection("form_responses_business_owner")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      console.log(responses);
      if (responses && responses[0].responses_form2) {
        setHasDiagnosis(true);
      } else {
        setHasDiagnosis(false);
      }
    } catch (e) {
      console.log(`error verify diagnosis: ${e}`);
    }
  };

  useEffect(() => {
    if (backendClient) {
      verifyDiagnosis();
    }
  }, [backendClient]);

  return (
    <Container>
      <Main>
        <Logo>
          <img src={logo} alt="Logo synesis" />
        </Logo>

        {!hasDiagnosis && (
          <>
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
                                handleInputChange(
                                  sectionIndex,
                                  questionIdx,
                                  option
                                )
                              }
                              selected={
                                Array.isArray(question.answer)
                                  ? question.answer.includes(option)
                                  : question.answer === option
                              }
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
                  {loadingRequest ? (
                    "Wait..."
                  ) : (
                    <>
                      Submit <RocketLaunch size={20} className="icon__rocket" />
                    </>
                  )}
                </button>
              </Action>
            </Form>
          </>
        )}

        {hasDiagnosis && (
          <HasDiagnosis>
            <h2>
              Hello{" "}
              {
                JSON.parse(localStorage.getItem("pocketbase_auth") as string)
                  .model.name
              }
            </h2>

            <p>
              You have already answered the questionnaire and can now generate
              your growth diagnosis
            </p>

            <BackRedirect onClick={() => navigate("/diagnosis")}>
              Experiment now <RocketLaunch size={20} className="icon__rocket" />
            </BackRedirect>
          </HasDiagnosis>
        )}
      </Main>

      <ToastContainer />
    </Container>
  );
};

export default FormAnalyticsOwner;

import React, { useEffect, useState } from "react";
import { RocketLaunch } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import * as styles from "./styles/FormOwnerStyles";

import logo from "../../assets/logos/logo.svg";

import { QuestionnaireData } from "../../utils/FormOwner/Questionnaire";
import { useContextApi } from "../../context/Api";

interface Question {
  question: string;
  answer: string | string[];
  input_type: "text" | "textarea" | "multiple_choice";
  loading: boolean;
  options?: string[];
  range?: string;
}

interface QuestionnaireSection {
  section: string;
  questions: Question[];
}

const FormOwner: React.FC = () => {
  const navigate = useNavigate();
  const { backendClient } = useContextApi();

  const [formData, setFormData] =
    useState<QuestionnaireSection[]>(QuestionnaireData);
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

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD") // Normalize the string using NFD (Canonical Decomposition)
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "") // Remove spaces
      .replace(/[^a-z0-9]/g, ""); // Remove any non-alphanumeric characters
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      toast("Please answer all the questions.", {
        type: "warning",
      });
      return;
    }

    setLoadingRequest(true);

    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      // make sure path field is gonna be in rules
      const normalizedFormData = [...formData];
      normalizedFormData[0].questions[0].answer = normalizeString(
        normalizedFormData[0].questions[0].answer as string
      );

      await backendClient?.collection("form_responses_business_owner").create(
        {
          user: decoded.id,
          responses_form1: JSON.stringify(formData),
        },
        { requestKey: null }
      );

      const companyCreated = await backendClient
        ?.collection("companies")
        .create(
          {
            user: decoded.id,
            name: formData[0].questions[0].answer,
            path: normalizedFormData[0].questions[0].answer,
          },
          { requestKey: null }
        );

      await backendClient?.collection("diagnosis").create({
        user: decoded.id,
        company: companyCreated?.id,
        questionary_data: JSON.stringify(formData),
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
        ?.collection("diagnosis")
        .getFullList({
          filter: `user="${decoded.id}"`,
        });

      if (responses && responses.length >= 1) {
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
    <styles.Container>
      <styles.Main>
        <styles.Logo>
          <img src={logo} alt="Logo synesis" />
        </styles.Logo>

        {!hasDiagnosis && (
          <>
            <styles.Title>
              <h1>Let's find out the maturity level of your business</h1>

              <p>
                At the end, you will have access to the comprehensive report.
              </p>
            </styles.Title>

            {formData.map((section, sectionIndex) => (
              <styles.Section key={sectionIndex}>
                <styles.SectionTitle>{section.section}</styles.SectionTitle>

                {section.questions.map((question, questionIndex) => (
                  <styles.Question key={questionIndex}>
                    <styles.QuestionTitle>
                      {question.question}
                    </styles.QuestionTitle>
                    {question.input_type === "text" && (
                      <styles.Input
                        type="text"
                        value={question.answer}
                        onChange={(e) =>
                          handleInputChange(
                            sectionIndex,
                            questionIndex,
                            e.target.value
                          )
                        }
                        placeholder="Type here..."
                      />
                    )}
                    {question.input_type === "textarea" && (
                      <styles.Textarea
                        value={question.answer}
                        onChange={(e) =>
                          handleInputChange(
                            sectionIndex,
                            questionIndex,
                            e.target.value
                          )
                        }
                        placeholder="Type here..."
                      />
                    )}
                    {question.input_type === "multiple_choice" && (
                      <>
                        <styles.Options>
                          {question.options?.map((option, optionIndex) => (
                            <styles.Option
                              type="button"
                              key={optionIndex}
                              selected={
                                Array.isArray(question.answer)
                                  ? question.answer.includes(option)
                                  : question.answer === option
                              }
                              onClick={() =>
                                handleInputChange(
                                  sectionIndex,
                                  questionIndex,
                                  option
                                )
                              }
                            >
                              {option}
                            </styles.Option>
                          ))}
                        </styles.Options>

                        {question.range === "Very poor - Excellent" && (
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
                              Very poor
                            </span>
                            <span
                              style={{
                                marginRight: "180px",
                                marginTop: "5px",
                                color: "#555",
                                fontSize: "0.85rem",
                              }}
                            >
                              Excellent
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </styles.Question>
                ))}
              </styles.Section>
            ))}

            <styles.Button>
              <button onClick={() => handleSubmit()}>
                {loadingRequest ? (
                  "Wait..."
                ) : (
                  <>
                    Generate diagnosis{" "}
                    <RocketLaunch size={20} className="icon__rocket" />
                  </>
                )}
              </button>
            </styles.Button>
          </>
        )}

        {hasDiagnosis && (
          <styles.HasDiagnosis>
            <h2>
              Hello{" "}
              {
                JSON.parse(localStorage.getItem("pocketbase_auth") as string)
                  .model.name
              }
            </h2>

            <p>
              you have already generated your diagnosis, view it by clicking the
              button below
            </p>

            <styles.Button>
              <button onClick={() => navigate("/diagnosis")}>
                See diagnosis{" "}
                <RocketLaunch size={20} className="icon__rocket" />
              </button>
            </styles.Button>
          </styles.HasDiagnosis>
        )}
      </styles.Main>

      <ToastContainer />
    </styles.Container>
  );
};

export default FormOwner;

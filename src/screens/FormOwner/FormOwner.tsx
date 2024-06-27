import React, { useState } from "react";
import { RocketLaunch } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";

import * as styles from "./styles/FormOwnerStyles";

import logo from "../../assets/logos/logo.svg";

import { QuestionnaireData } from "../../utils/FormOwner/Questionnaire";
import { useContextApi } from "../../context/Api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  answer: string;
  input_type: "text" | "textarea" | "multiple_choice";
  loading: boolean;
  options?: string[];
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

  const handleInputChange = (
    sectionIndex: number,
    questionIndex: number,
    value: string
  ) => {
    const newFormData = [...formData];
    newFormData[sectionIndex].questions[questionIndex].answer = value;
    setFormData(newFormData);
  };

  const isFormComplete = () => {
    for (const section of formData) {
      for (const question of section.questions) {
        if (question.answer.trim() === "") {
          return false;
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
        normalizedFormData[0].questions[0].answer
      );

      await backendClient?.collection("form_responses_business_owner").create(
        {
          user: decoded.id,
          responses_form1: JSON.stringify(formData),
        },
        { requestKey: null }
      );

      await backendClient?.collection("companies").create({
        user: decoded.id,
        name: formData[0].questions[0].answer,
        path: normalizedFormData[0].questions[0].answer,
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

  return (
    <styles.Container>
      <styles.Main>
        <styles.Logo>
          <img src={logo} alt="Logo synesis" />
        </styles.Logo>

        <styles.Title>
          <h1>Let's find out the maturity level of your business</h1>

          <p>At the end, you will have access to the comprehensive report.</p>
        </styles.Title>

        {formData.map((section, sectionIndex) => (
          <styles.Section key={sectionIndex}>
            <styles.SectionTitle>{section.section}</styles.SectionTitle>

            {section.questions.map((question, questionIndex) => (
              <styles.Question key={questionIndex}>
                <styles.QuestionTitle>{question.question}</styles.QuestionTitle>
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
                  <styles.Options>
                    {question.options?.map((option, optionIndex) => (
                      <styles.Option
                        key={optionIndex}
                        onClick={() =>
                          handleInputChange(sectionIndex, questionIndex, option)
                        }
                        selected={question.answer === option}
                      >
                        {option}
                      </styles.Option>
                    ))}
                  </styles.Options>
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
      </styles.Main>

      <ToastContainer />
    </styles.Container>
  );
};

export default FormOwner;

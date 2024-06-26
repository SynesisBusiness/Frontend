import React, { useState } from "react";
import { QuestionaryData } from "../../utils/FormOwner/Questionary";

import * as styles from "./styles/FormOwnerStyles";

import logo from "../../assets/logos/logo.svg";
import { RocketLaunch } from "phosphor-react";

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

const FormOwner: React.FC = () => {
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
          <button>
            Generate diagnosis{" "}
            <RocketLaunch size={20} className="icon__rocket" />
          </button>
        </styles.Button>
      </styles.Main>
    </styles.Container>
  );
};

export default FormOwner;

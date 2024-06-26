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

const website_questions = [
  {
    question: "What is your website's monthly traffic?",
    input_type: "multiple_choice",
    options: ["0 - 1,000", "1,001 - 5,000", "5,001 - 10,000", "10,001+"],
  },
  {
    question: "What are the key performance metrics for your website?",
    input_type: "multiple_choice",
    options: ["Bounce rate", "Average session duration", "Conversion rate"],
  },
];

const social_media_presence_questions = [
  {
    question: "Which social media platforms do you actively use?",
    input_type: "multiple_choice",
    options: ["Facebook", "LinkedIn", "Twitter", "Instagram"],
  },
  {
    question: "What are your engagement metrics on these platforms?",
    input_type: "text",
  },
];

const seo_performance_questions = [
  {
    question: "What are your main target keywords?",
    input_type: "text",
  },
  {
    question: "How is your website currently ranking for these keywords?",
    input_type: "text",
  },
];

const paid_advertising_questions = [
  {
    question:
      "Do you run any paid advertising campaigns? If yes, on which platforms?",
    input_type: "multiple_choice",
    options: ["Google Ads", "Facebook Ads", "LinkedIn Ads"],
  },
  {
    question: "What is the performance of these campaigns?",
    input_type: "text",
  },
];

const budget_questions = [
  {
    question:
      "What is your current budget for digital marketing and growth hacking initiatives?",
    input_type: "multiple_choice",
    options: [
      "Less than $5,000",
      "$5,001 - $10,000",
      "$10,001 - $20,000",
      "Over $20,000",
    ],
  },
];

const tools_and_technologies_questions = [
  {
    question:
      "What tools and platforms do you use for marketing and analytics?",
    input_type: "multiple_choice",
    options: ["Google Analytics", "HubSpot", "Salesforce"],
  },
];

const team_and_skills_questions = [
  {
    question: "How is your marketing team structured?",
    input_type: "text",
  },
  {
    question: "What are the key skills and expertise within your team?",
    input_type: "multiple_choice",
    options: ["SEO expertise", "Content creation", "Social media management"],
  },
];

const FormAnalyticsOwner: React.FC = () => {
  const all_questions = [
    { title: "Website Analytics", questions: website_questions },
    {
      title: "Social Media Presence",
      questions: social_media_presence_questions,
    },
    { title: "SEO Performance", questions: seo_performance_questions },
    { title: "Paid Advertising", questions: paid_advertising_questions },
    { title: "Budget", questions: budget_questions },
    {
      title: "Tools and Technologies",
      questions: tools_and_technologies_questions,
    },
    { title: "Team and Skills", questions: team_and_skills_questions },
  ];

  const totalQuestions = all_questions.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );

  const [formData, setFormData] = useState<string[]>(
    Array(totalQuestions).fill("")
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

  let questionIndex = 0;

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
          {all_questions.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3>{section.title}</h3>
              {section.questions.map((question, questionIdx) => {
                return (
                  <>
                    <Question key={questionIdx}>
                      <label>
                        {`${questionIndex + 1}. ${question.question}`}
                      </label>
                      {question.input_type === "text" && (
                        <input
                          type="text"
                          value={formData[questionIndex]}
                          onChange={(e) =>
                            handleInputChange(questionIndex, e.target.value)
                          }
                          placeholder="Type here..."
                        />
                      )}
                      {question.input_type === "textarea" && (
                        <textarea
                          value={formData[questionIndex]}
                          onChange={(e) =>
                            handleInputChange(questionIndex, e.target.value)
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
                                handleInputChange(questionIndex, option)
                              }
                              selected={formData[questionIndex] === option}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </Question>
                    {questionIndex++}
                  </>
                );
              })}
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

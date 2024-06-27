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

export const QuestionaryData: QuestionarySection[] = [
  {
    section: "Website Analytics",
    questions: [
      {
        question: "1. What is your website's monthly traffic?",
        answer: "",
        input_type: "multiple_choice",
        options: ["0 - 1,000", "1,001 - 5,000", " 5,001 - 10,000", "10,001+"],
        loading: false,
      },
      {
        question: "2. What are the key performance metrics for your website?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Bounce rate", "Average session duration", "Conversion rate"],
        loading: false,
      },
    ],
  },
  {
    section: "Social Media Presence",
    questions: [
      {
        question: "3. Which social media platforms do you actively use?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Facebook", "LinkedIn", "Twitter", "Instagram"],
        loading: false,
      },
      {
        question: "4. What are your engagement metrics on these platforms?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "SEO Performance",
    questions: [
      {
        question: "5. What are your main target keywords?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question:
          "6. How is your website currently ranking for these keywords?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Paid Advertising",
    questions: [
      {
        question:
          "7. Do you run any paid advertising campaigns? If yes, on which platforms?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Google Ads", "Facebook Ads", "LinkedIn Ads"],
        loading: false,
      },
      {
        question: "8. What is the performance of these campaigns?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Budget",
    questions: [
      {
        question:
          "9.  What is your current budget for digital marketing and growth hacking initiatives?",
        answer: "",
        input_type: "multiple_choice",
        options: [
          "Less than $5,000",
          "$5,001 - $10,000",
          "$10,001 - $20,000",
          "Over $20,000",
        ],
        loading: false,
      },
    ],
  },
  {
    section: "Tools and Technologies",
    questions: [
      {
        question:
          "10. What tools and platforms do you use for marketing and analytics?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Google Analytics", "HubSpot", "Salesforce"],
        loading: false,
      },
    ],
  },
  {
    section: "Team and Skills",
    questions: [
      {
        question: "11. How is your marketing team structured?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question: "12. What are the key skills and expertise within your team?",
        answer: [],
        input_type: "multiple_choice",
        options: [
          "SEO expertise",
          "Content creation",
          "Social media management",
        ],
        loading: false,
      },
    ],
  },
];

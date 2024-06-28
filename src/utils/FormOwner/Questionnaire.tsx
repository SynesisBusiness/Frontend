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

export const QuestionnaireData: QuestionnaireSection[] = [
  {
    section: "Industry and Market",
    questions: [
      {
        question: "1. What is your company name?",
        answer: "",
        input_type: "text",
        loading: false,
      },
      {
        question: "2. In which industry does your company operate?",
        answer: "",
        input_type: "multiple_choice",
        options: ["Technology", "Healthcare", "Retail", "Manufacturing"],
        loading: false,
      },
      {
        question:
          "3. How would you describe your company's market positioning?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Product/Service",
    questions: [
      {
        question: "4. What products or services does your company offer?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question:
          "5. What are the unique features or benefits of your products/services?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Current Sales and Marketing Strategies",
    questions: [
      {
        question: "6. What sales strategies are currently in place?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Direct sales", "Online sales", "Partnerships"],
        loading: false,
      },
      {
        question: "7. What marketing channels do you currently use?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Social media", "E-mail marketing", "SEO", "PPC"],
        loading: false,
      },
    ],
  },
  {
    section: "Growth Goals",
    questions: [
      {
        question:
          "8. What are your short-term growth objectives (next 6-12 months)?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question:
          "9. What are your long-term growth objectives (next 2-5 years)?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Key Performance Indicators (KPIs)",
    questions: [
      {
        question: "10.  What KPIs do you currently track?",
        answer: [],
        input_type: "multiple_choice",
        options: [
          "Monthly sales",
          "Customer acquisition cost",
          "Customer lifetime value",
        ],
        loading: false,
      },
    ],
  },
  {
    section: "Lead generation",
    questions: [
      {
        question: "11. How do you currently generate leads?",
        answer: "",
        input_type: "multiple_choice",
        options: ["Through online forms", "Events", "Partnerships"],
        loading: false,
      },
      {
        question:
          "12. How would you rate the quality of the leads you generate?",
        answer: "",
        input_type: "multiple_choice",
        options: ["1", "2", "3", "4", "5"],
        loading: false,
        range: "Very poor - Excellent",
      },
    ],
  },
  {
    section: "Conversion Funnel",
    questions: [
      {
        question: "13. Can you describe your current sales funnel stages?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question:
          "14. What are the current conversion rates at each stage of the funnel?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
    ],
  },
  {
    section: "Customer Journey",
    questions: [
      {
        question: "15. Can you map out a typical customer journey?",
        answer: "",
        input_type: "textarea",
        loading: false,
      },
      {
        question: "16. What are the main touchpoints in the customer journey?",
        answer: [],
        input_type: "multiple_choice",
        options: ["Website visit", "Email interaction", "Sales Call"],
        loading: false,
      },
    ],
  },
];

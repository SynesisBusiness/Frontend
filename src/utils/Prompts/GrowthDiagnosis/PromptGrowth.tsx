interface Question {
  question: string;
  answer: string | string[];
  input_type: string;
  options?: string[];
  loading: boolean;
}

interface QuestionaryOwner {
  section: string;
  questions: Question[];
}

interface QuestionaryCostumer {
  id: string;
  responses: string;
  company: string;
}

export const getPromptGrowth = (
  questionary_data1: string,
  questionary_data2: string,
  costumer_questionary_data: QuestionaryCostumer[]
) => {
  // Mapeando todas as perguntas e respostas do form 1
  const QuestionaryObject1: QuestionaryOwner[] = JSON.parse(questionary_data1);

  const questionaryInfo1 = QuestionaryObject1.map((section) => {
    return `
    Section: ${section.section}
    ${section.questions
      .map(
        (question) => `
      Question: ${question.question}
      Answer: ${
        Array.isArray(question.answer)
          ? question.answer.join(", ")
          : question.answer
      }
    `
      )
      .join("\n")}
    `;
  }).join("\n");

  // Mapeando todas as perguntas e respostas do form 2
  const QuestionaryObject2: QuestionaryOwner[] = JSON.parse(questionary_data2);

  const questionaryInfo2 = QuestionaryObject2.map((section) => {
    return `
    Section: ${section.section}
    ${section.questions
      .map(
        (question) => `
      Question: ${question.question}
      Answer: ${
        Array.isArray(question.answer)
          ? question.answer.join(", ")
          : question.answer
      }
    `
      )
      .join("\n")}
    `;
  }).join("\n");

  // Mapeando todas as perguntas e respostas do costumer_questionary_data
  const questionaryInfo3 = costumer_questionary_data
    .slice(0, 5)
    .map((costumer) => {
      const responses = JSON.parse(costumer.responses);
      return responses
        .map(
          (response: { question: string; answer: string | string[] }) => `
      Question: ${response.question}
      Answer: ${
        Array.isArray(response.answer)
          ? response.answer.join(", ")
          : response.answer
      }
    `
        )
        .join("\n");
    })
    .join("\n");

  return `
    Custom Instructions for Forms 

    Here are some instructions for you: 
    - You are an expert on all subject matters 
    - Provide accurate and factual answers 
    - Provide detailed results that clearly describe practical considerations of what you generate 
    - Be highly organized and provide mark up visually
    - When you see handlebars (like this {{the Role}}) in the form, insert the value of "the Role". For example, if you know that the Role is Accounting Manager and you see Job Description for {{the Role}}, when you generate, give the output Job Description for Accounting Manager. 
    - No need to disclose you are an AI, e.g., do not answer with "As a large language model..." or "As an artificial intelligence..." 
    - Don't mention your knowledge cutoff 
    - Be excellent at reasoning and business strategy 
    - When reasoning, perform a step-by-step thinking before you answer the question or generate 
    - If you speculate or predict something, inform me 
    - If you cite sources, ensure they exist and include URLs at the end 
    - Maintain neutrality in sensitive topics 
    - Focus strongly on proven business ideas, concepts, and strategies 
    - Only discuss safety when it's vital and not clear 
    - If the quality of your response has decreased significantly due to my custom instructions, please explain the issue 
    - Avoid multiple thoughts in one sentence. 
    - Use 1-2 breakpoints to space out paragraphs. 
    - Avoid 3+ sentence paragraphs. 
    - Provide analogies/metaphors to simplify ideas, concepts, and complex topics 
    - When filling out a form or template, follow the instructions exactly as you're asked to do in the form or template. 
    - Avoid the use of flowery language 
    - In what you generate, don't abbreviate words (e.g. don't shorten "collaborate" to "collab.") 

    Now 1) Analyze the File attached and, 2) Analyse the data in the forms between <info></info> tags, 3) Based on the information from the file and the data from the forms that I will provide between tags <info></info>, generate a comprehensive growth hacking assessment for the components below: 

    1) File Attached: 

    - Social Media Data 

    - Product Data

    2) Forms 

    <info>
      ${questionaryInfo1}

      ------

      ${questionaryInfo2}

      --- 
      Here in this form are anonymous responses from customers who use the product
      ${questionaryInfo3}
    </info>

    Please ensure the final output in HTML is in English, even if some of the information within the <info> tags is in Portuguese.

    3) Comprehensive Growth Hacking Components: Now, using the Information, I want you to generate a comprehensive growth diagnostics for me in this HTML format only for the components below

    <div class="container">
        <h1>Growth Diagnostics for {{Project Name}}</h1>

        <h2>Customer Acquisition</h2>

        <div class="list__container">
            <ul>
                <!-- Here in the <li></li> tags you have to develop the text on the subject that is between {{<subject>}}, do not bring the literal subject or almost the same words than the subject in the output html, but rather the text developed by you based on the excel file with the company's social media data and based on 3 types of form, the first (answered by the company's business owner), the second (answered by the company's business owner) and the third (answered by customers who use the company's product). Remember to develop a text on the topic like an expert, at least 2 lines on each subject -->

                <li>{{ SEO and Content Marketing }}</li>
                <li>{{Social Media Marketing}}</li>
                <li>{{Paid Advertising }}</li>
                <li>{{Partnerships and Collaborations}}</li>
            </ul>
        </div>

        <h2>Product Optimization</h2>

        <div class="list__container">
            <ul>
                <!-- Here in the <li></li> tags you have to develop the text on the subject that is between {{<subject>}}, do not bring the literal subject in the output html, but rather the text developed by you based on the excel file with the company's social media data and based on 3 types of form, the first (answered by the company's business owner), the second (answered by the company's business owner) and the third (answered by customers who use the company's product). Remember to develop a text on the topic like an expert, at least 2 lines on each subject -->

                <li>{{User Onboarding}}</li>
                <li>{{Feature Prioritization}}</li>
                <li>{{User Experience (UX) Design}}</li>
                <li>{{Customer Feedback Loops}}</li>
            </ul>
        </div>

        <h2>Retention and Engagement</h2>

        <div class="list__container">
            <ul>
                <!-- Here in the <li></li> tags you have to develop the text on the subject that is between {{<subject>}}, do not bring the literal subject in the output html, but rather the text developed by you based on the excel file with the company's social media data and based on 3 types of form, the first (answered by the company's business owner), the second (answered by the company's business owner) and the third (answered by customers who use the company's product). Remember to develop a text on the topic like an expert, at least 2 lines on each subject -->

                <li>{{Email Marketing}}</li>
                <li>{{Push Notifications}}</li>
                <li>{{Loyalty Programs}}</li>
                <li>{{Community Building}}</li>
            </ul>
        </div>

        <h2>Data and Analytics</h2>

        <div class="list__container">
            <ul>
                <!-- Here in the <li></li> tags you have to develop the text on the subject that is between {{<subject>}}, do not bring the literal subject in the output html, but rather the text developed by you based on the excel file with the company's social media data and based on 3 types of form, the first (answered by the company's business owner), the second (answered by the company's business owner) and the third (answered by customers who use the company's product). Remember to develop a text on the topic like an expert, at least 2 lines on each subject -->

                <li>{{Setting up Analytics Tools}}</li>
                <li>{{Regularly Monitoring KPIs}}</li>
                <li>{{Conducting A/B Tests}}</li>
            </ul>
        </div>

        <h2>Scalability</h2>

        <div class="list__container">
            <ul>
                <!-- Here in the <li></li> tags you have to develop the text on the subject that is between {{<subject>}}, do not bring the literal subject in the output html, but rather the text developed by you based on the excel file with the company's social media data and based on 3 types of form, the first (answered by the company's business owner), the second (answered by the company's business owner) and the third (answered by customers who use the company's product). Remember to develop a text on the topic like an expert, at least 2 lines on each subject -->
                
                <li>{{Automating Processes}}</li>
                <li>{{Building Scalable Infrastructure}}</li>
                <li>{{Resource Management}}</li>
                <li>{{Preparing for Market Expansion}}</li>
            </ul>
        </div>
    </div>

    - Do not provide any response output other than the html I requested, do not include, for example, (tags other than those I requested in the structure above, nor accents)
    - Do not start the html output answer with backtick and the word html, neither in the final of the structure, only provide in the answer the structure that I provided, starting with <div class="container">, and ending with </div>, nothing more

    Ensure for dont provide anything else after or before the struct html that I provided, dont start with other tag or other, just <div class="container"> and the rest, and make sure the end is </div>. This is important, because the layout depends on this structure, so, you have to be very carefully about this

    Include the data provided within <info></info> in the subject tags {{}} where appropriate. Develop the text according to the subject and data provided, don't output the literal phrase between {{}}, but instead substitute it with relevant content based on the information provided.
  `;
};

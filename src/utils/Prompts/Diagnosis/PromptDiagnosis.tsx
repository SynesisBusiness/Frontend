interface Question {
  question: string;
  answer: string | string[];
  input_type: string;
  options?: string[];
  loading: boolean;
}

interface Questionary {
  section: string;
  questions: Question[];
}

export const getPromptDiagnosis = (questionary_data: string) => {
  const QuestionaryObject: Questionary[] = JSON.parse(questionary_data);

  // Mapeando todas as perguntas e respostas
  const questionaryInfo = QuestionaryObject.map((section) => {
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

    Now, in between the <info> tags, you'll find some questions and answers about a project I'm working on. 

    <info> 

    ${questionaryInfo}

    </info> 

    Please ensure the final output in HTML is in English, even if some of the information within the <info> tags is in Portuguese.

    Now, using the Information, I want you to generate a customized growth hacking launch plan for me in this HTML format only: 

    <div class="container">
        <h1>Growth objective assessment for {{Project Name}}</h1>

        <h2>Recommended Data Tracking Setup</h2>

        <div class="list__container">
            <ul>
                <li>Analytics: Based on your {{B2B or B2C}} {{Industry}} project, I recommend setting up {{Google Analytics / Mixpanel / Heap}} to track website analytics. This will allow you to track key events and funnel performance.</li>
                <li>CRM: Since this is a {{B2B or B2C}} project, I recommend using {{HubSpot / Salesforce / Close / Keap}} as your CRM to track leads and customer data.</li>
                <li>Email: For email marketing, use {{MailChimp / Constant Contact / Campaign Monitor}} to build email lists, create campaigns, and track performance.</li>
                <li>Social: Monitor social mentions and engagement with {{Buffer / Hootsuite}}. Use it to schedule content as well.</li>
                <li>Surveys: Use {{SurveyMonkey / Typeform}} to create surveys to gather customer feedback.</li>
            </ul>
        </div>

        <h2>Key Performance Indicators</h2>

        <p class="info">Based on your industry and goals, here are 3-5 key metrics to focus on:</p>

        <div class="list__container">
            <ul>
                <li>{{metric 1}}</li>
                <li>{{metric 2}}</li>
                <li>{{metric 3}}</li>
                <li>{{metric 4 (optional)}}</li>
                <li>{{metric 5 (optional)}}</li>
            </ul>
        </div>

        <h2>Growth Channels</h2>

        <p class="info">To acquire and engage users, focus on these high-priority channels:</p>

        <div class="list__container">
            <ul>
                <li>{{Channel 1 (SEO, paid ads, etc)}}</li>
                <li>{{Channel 2}}</li>
                <li>{{Channel 3}}</li>
            </ul>
        </div>

        <h2>Activation Flow Optimization</h2>

        <p class="info">To optimize your user onboarding and activation flow:</p>

        <div class="list__container">
            <ul>
                <li>{{Suggestion 1}}</li>
                <li>{{Suggestion 2}}</li>
                <li>{{Suggestion 3}}</li>
            </ul>
        </div>

        <h2>Retention Strategy</h2>

        <p class="info">To improve long-term retention:</p>

        <div class="list__container">
            <ul>
                <li>{{Strategy 1}}</li>
                <li>{{Strategy 2}}</li>
                <li>{{Strategy 3}}</li>
            </ul>
        </div>
    </div>

    - Do not provide any response output other than the html I requested, do not include, for example, (tags other than those I requested in the structure above, nor accents)
    - Do not start the html output answer with backtick and the word html, neither in the final of the structure, only provide in the answer the scruture that I provided, starting with <div class="container">, and ending with </div>, nothing more

    Ensure for dont provide anything else after or before the struct html that I provided, dont start with other tag or other, just <div class="container"> and the rest, and make sure the end is </div>. This is important, because the layout depends on this structure, so, you have to be very carefully about this
 `;
};

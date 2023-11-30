// import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateQuiz = async (numQuestions, textContent) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
                      Make a number of ${numQuestions} question(s) about the provided TextFC, each question has 4 possible answers and only 1 of those 4 answers is the correct answer. Provide the questions like the following Example:
                      """"""
                      {"question":"Who participated in the Vietnam War?","answers":["France","Germany","USA","China"],"rightAnswer":"USA"}
                      {"question":"Which year did the Vietnam War end?","answers":["1972","1973","1974","1975"],"rightAnswer":"1975"}
                      """"""
                      TextFC:
                      """"""
                      ${textContent}
                      """"""
                  `,
      },
    ],
    model: "gpt-3.5-turbo-1106",
  });

  return completion.choices[0].message.content;
};

export default generateQuiz;

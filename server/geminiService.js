const { GoogleGenAI } = require("@google/genai");

class AIResponseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AIResponseError";
    this.code = code;
  }
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const quizSchema = {
  type: "object",

  properties: {
    title: {
      type: "string",
      description: "A short title for the quiz",
    },

    questions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
          },

          options: {
            type: "array",
            items: {
              type: "string",
            },
            minItems: 4,
            maxItems: 4,
          },

          correctAnswer: {
            type: "integer",
            minimum: 0,
            maximum: 3,
          },

          explanation: {
            type: "string",
          },
        },

        required: [
          "question",
          "options",
          "correctAnswer",
          "explanation",
        ],
      },
    },
  },

  required: ["title", "questions"],
};

async function generateQuiz(notes) {
  const prompt = `
Create a study quiz based only on the user's notes or topic below.

Requirements:
- Create 5 multiple-choice questions.
- Each question must have exactly 4 answer options.
- Only one option should be correct.
- correctAnswer must be the zero-based index of the correct option.
- Provide a short explanation for every correct answer.
- Keep questions clear and useful for studying.

User notes/topic:
${notes}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseSchema: quizSchema,
    },
  });

  if (!response.text || !response.text.trim()) {
  throw new AIResponseError(
    "Gemini returned an empty response.",
    "EMPTY_RESPONSE"
  );
  }

  try {
   return JSON.parse(response.text);
  } catch {
    throw new AIResponseError(
      "Gemini returned malformed JSON.",
      "MALFORMED_JSON"
    );
  }
}

module.exports = {
  generateQuiz,
  AIResponseError,
};
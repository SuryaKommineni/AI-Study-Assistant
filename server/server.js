require("dotenv").config();

const express = require("express");
const cors = require("cors");
const validateQuiz = require("./quizValidator");
const {
  generateQuiz,
  AIResponseError,
} = require("./geminiService");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Study Assistant API is running",
  });
});

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { notes } = req.body;

    if (typeof notes !== "string" || !notes.trim()) {
      return res.status(400).json({
        error: "Please provide notes or a topic.",
      });
    }

    if (notes.length > 5000) {
      return res.status(400).json({
        error: "Notes must be 5000 characters or fewer.",
      });
    }

    const quiz = await generateQuiz(notes.trim());

    const validation = validateQuiz(quiz);

    if (!validation.valid) {
       console.error(
        "Quiz validation failed:",
        validation.error
       );

      return res.status(502).json({
        error:
          "The AI generated an invalid quiz. Please try again.",
        code: "INVALID_QUIZ_STRUCTURE",
      });
    }

    quiz.questions = quiz.questions.map((question, index) => ({
      ...question,
      id: index + 1,
    }));

    res.json({
      quiz,
    });
  } catch (error) {
    console.error("Quiz generation failed:", error.message);

       if (error instanceof AIResponseError) {
         return res.status(502).json({
           error:
           "The AI returned an unusable response. Please try again.",
          code: error.code,
         });
       }

    const status = error.status || error.statusCode;

    if (status === 429) {
      return res.status(503).json({
        error:
          "The AI service is receiving too many requests. Please try again shortly.",
        code: "AI_RATE_LIMITED",
      });
    }

    if (status === 503) {
      return res.status(503).json({
        error:
          "The AI service is temporarily busy. Please try again in a moment.",
        code: "AI_UNAVAILABLE",
      });
    }

    return res.status(500).json({
      error:
        "Failed to generate quiz. Please try again.",
      code: "GENERATION_FAILED",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


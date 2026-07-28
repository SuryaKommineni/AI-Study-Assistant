function validateQuiz(data) {
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      error: "Quiz data must be an object.",
    };
  }

  if (typeof data.title !== "string" || !data.title.trim()) {
    return {
      valid: false,
      error: "Quiz must have a title.",
    };
  }

  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    return {
      valid: false,
      error: "Quiz must contain questions.",
    };
  }

  for (const question of data.questions) {
    if (
      typeof question.question !== "string" ||
      !question.question.trim()
    ) {
      return {
        valid: false,
        error: "Every question must contain question text.",
      };
    }

    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      !question.options.every(
        (option) => typeof option === "string" && option.trim()
      )
    ) {
      return {
        valid: false,
        error: "Every question must contain four valid options.",
      };
    }

    if (
      !Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer >= question.options.length
    ) {
      return {
        valid: false,
        error: "Every question must have a valid correct answer.",
      };
    }

    if (
      typeof question.explanation !== "string" ||
      !question.explanation.trim()
    ) {
      return {
        valid: false,
        error: "Every question must contain an explanation.",
      };
    }
  }

  return {
    valid: true,
    error: null,
  };
}

module.exports = validateQuiz;
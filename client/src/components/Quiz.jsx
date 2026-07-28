import { useState } from "react";
import Results from "./Results";

function Quiz({ quiz, onNewQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(quiz.questions);
  const [isRetryMode, setIsRetryMode] = useState(false);

  const currentQuestion =
  activeQuestions[currentQuestionIndex];

  const progress =
  ((currentQuestionIndex + 1) / activeQuestions.length) * 100;

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || answerSubmitted) {
      return;
    }

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    } else {
      setWrongAnswers((previousWrongAnswers) => [
        ...previousWrongAnswers,
        currentQuestion,
      ]);
    }

  setAnswerSubmitted(true);
};

  const handleNextQuestion = () => {
  const isLastQuestion =
    currentQuestionIndex === activeQuestions.length - 1;

  if (isLastQuestion) {
    setQuizCompleted(true);
    return;
  }

  setCurrentQuestionIndex(
    (previousIndex) => previousIndex + 1
  );

  setSelectedAnswer(null);
  setAnswerSubmitted(false);
  };

  const handleRetryWrong = () => {
  console.log("Wrong answers being retried:", wrongAnswers);
  
  setActiveQuestions(wrongAnswers);

  setCurrentQuestionIndex(0);
  setSelectedAnswer(null);
  setAnswerSubmitted(false);
  setScore(0);
  setWrongAnswers([]);
  setQuizCompleted(false);
  setIsRetryMode(true);
};

  if (quizCompleted) {
  return (
    <Results
      score={score}
      totalQuestions={activeQuestions.length}
      wrongAnswers={wrongAnswers}
      onRetryWrong={handleRetryWrong}
      onNewQuiz={onNewQuiz}
    />
  );
  }

  return (
    <section className="quiz-container">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>

        {isRetryMode && (
          <p className="retry-label">
             Retrying incorrect questions
          </p>
        )}

        <p>
          Question {currentQuestionIndex + 1} of {activeQuestions.length}
        </p>
      </div>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
       >
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="question-card">
        <h3>{currentQuestion.question}</h3>

        <div className="options">
            {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              type="button"
              disabled={answerSubmitted}
              aria-pressed={selectedAnswer === index}
              className={`option-button
              ${
              answerSubmitted
              ? index===currentQuestion.correctAnswer
              ? "correct"

              : index===selectedAnswer
              ? "incorrect"
              : ""

              : selectedAnswer===index
              ? "selected"

              : ""
              }`}
              onClick={() => {
                if (!answerSubmitted) {
                setSelectedAnswer(index);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="submit-answer"
          disabled={selectedAnswer === null || answerSubmitted}
          onClick={handleAnswerSubmit}
        >
          Submit Answer
        </button>

        {answerSubmitted && (
        <div className="answer-feedback">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <p className="correct-message">
              ✓ Correct!
            </p>
          ) : (
            <p className="incorrect-message">
             ✕ Incorrect
            </p>
         )}

          {selectedAnswer !== currentQuestion.correctAnswer && (
            <p>
              <strong>Correct answer:</strong>{" "}
              {currentQuestion.options[currentQuestion.correctAnswer]}
            </p>
          )}

          <p>
            <strong>Explanation:</strong>{" "}
            {currentQuestion.explanation}
          </p>
          <button
              type="button"
              className="next-button"
              onClick={handleNextQuestion}
          >
             {currentQuestionIndex === activeQuestions.length - 1
             ? "View Results"
             : "Next Question →"}
          </button>
        </div>
        )}

      </div>
    </section>
  );
}

export default Quiz;
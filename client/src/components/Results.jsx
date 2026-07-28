function Results({
  score,
  totalQuestions,
  wrongAnswers,
  onRetryWrong,
  onNewQuiz,
}) {
  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  return (
    <section className="results-container">
      <h2>Quiz Complete!</h2>

      <div className="score-display">
        <span className="score-number">
          {score} / {totalQuestions}
        </span>

        <span className="score-percentage">
          {percentage}%
        </span>
      </div>

      <p className="score-message">
        {percentage === 100 &&
        "Excellent! Perfect score!"}

        {percentage >= 80 &&
        percentage < 100 &&
        "Great work!"}

        {percentage >= 60 &&
        percentage < 80 &&
        "Good effort!"}

        {percentage < 60 &&
        "Review the material and try again."}
      </p>

      <div className="result-summary">
        <p>Correct: {score}</p>
        <p>Incorrect: {wrongAnswers.length}</p>
      </div>

      <div className="result-actions">
        {wrongAnswers.length > 0 && (
          <button
            type="button"
            onClick={onRetryWrong}
          >
            Retry Wrong Answers
          </button>
        )}

        <button
          type="button"
          onClick={onNewQuiz}
        >
          Create New Quiz
        </button>
      </div>
    </section>
  );
}

export default Results;
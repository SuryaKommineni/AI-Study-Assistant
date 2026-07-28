import { useRef, useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [takingLong, setTakingLong] = useState(false);

  const latestRequestId = useRef(0);

  const generateQuiz = async () => {
  if (!notes.trim()) {
    return;
  }

  const requestId = latestRequestId.current + 1;
  latestRequestId.current = requestId;

  setLoading(true);
  setError("");
  setQuiz(null);
  setTakingLong(false);

  const slowTimer = setTimeout(() => {
    if (requestId === latestRequestId.current) {
      setTakingLong(true);
    }
  }, 5000);

  try {
    const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/generate-quiz`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notes: notes.trim(),
      }),
    }
   );

    const contentType =
       response.headers.get("content-type");

    if (
      !contentType ||
      !contentType.includes("application/json")
    ) {
      throw new Error(
        "The server returned an unexpected response."
      );
    }

     const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to generate quiz."
      );
    }

    if (
      !data.quiz ||
      typeof data.quiz !== "object" ||
      typeof data.quiz.title !== "string" ||
      !Array.isArray(data.quiz.questions) ||
      data.quiz.questions.length === 0
    ) {
      throw new Error(
        "The server returned invalid quiz data."
      );
    }

    if (requestId === latestRequestId.current) {
       setQuiz(data.quiz);
    }
  } catch (error) {
    if (requestId === latestRequestId.current) {
      setError(error.message);
    }
  } finally {
    clearTimeout(slowTimer);
    if (requestId === latestRequestId.current) {
      setLoading(false);
      setTakingLong(false);
    }
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  generateQuiz();
};

const handleNewQuiz = () => {
  setQuiz(null);
  setError("");
};

  return (
    <main className="app">
      <section className="study-container">
        <header className="header">
          <h1>AI Study Assistant</h1>
          <p>Turn your notes or any topic into an interactive quiz.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="notes">What would you like to study?</label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Paste your study notes or enter a topic (e.g. React Hooks, World War II, Photosynthesis...)"
            maxLength={5000}
            rows={10}
          />

          {!notes.trim() && (
            <p className="helper-text">
              Enter some notes or a topic to generate a quiz.
            </p>
          )}

          <div className="form-footer">
            <span>{notes.length} / 5000</span>

            <button
              type="submit"
              disabled={!notes.trim()}
            >
              {loading ? "Generating Again" : "Generate Quiz"}
            </button>
          </div>
        </form>
         {loading && (
           <div className="status-message">
              <p>Generating your quiz...</p>

              {takingLong ? (
                <p>
                  The AI is taking longer than usual.
                  Please keep this page open.
                </p>
              ) : (
                <p>This may take a few seconds.</p>
              )}
           </div>
         )}
        {error && (
          <div className="error-message" role="alert">
          <p>{error}</p>

          <button type="button" onClick={generateQuiz}>
               Try Again
          </button>
          </div>
          )}
        {quiz && (
           <Quiz
             quiz={quiz}
             onNewQuiz={handleNewQuiz}
           />
        )}
      </section>
    </main>
  );
}

export default App;
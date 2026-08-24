# AI Study Assistant

An AI-powered web application that converts study notes or any topic into an interactive multiple-choice quiz. It uses the Gemini API to generate questions, answer options, correct answers, and explanations, helping students practice and understand their study material in an interactive way.

## Features

* **AI Quiz Generation** – Generate a 5-question multiple-choice quiz from notes or any study topic.
* **Four Answer Options** – Each generated question contains exactly four options with one correct answer.
* **Answer Validation** – Select an answer and receive immediate feedback.
* **Answer Explanations** – View an explanation after submitting an answer.
* **Progress Tracking** – Track progress while moving through the quiz.
* **Score Calculation** – View the final score and percentage after completing a quiz.
* **Retry Wrong Answers** – Retry only the questions answered incorrectly.
* **Create New Quiz** – Start a new quiz from another topic or set of notes.
* **Loading Feedback** – Displays a loading state while the AI generates the quiz.
* **Long-Request Feedback** – Provides additional feedback when quiz generation takes longer than expected.
* **Error Handling** – Handles invalid input, unavailable AI services, rate limits, and invalid AI responses.
* **5000-Character Input Limit** – Prevents excessively large study inputs from being submitted.
* **Responsive Interface** – Designed for use across different screen sizes.

## Tech Stack

### Frontend

* **React.js** – Component-based UI and application state management.
* **Vite** – Frontend development server and build tool.
* **JavaScript (ES Modules)** – Application logic and API communication.
* **HTML5** – Application structure.
* **CSS3** – Styling and responsive interface design.

The frontend is organized around reusable React components such as `Quiz` and `Results`.

### Backend

* **Node.js** – Server-side JavaScript runtime.
* **Express.js** – REST API and request handling.
* **CORS** – Controls cross-origin requests between the frontend and backend.
* **dotenv** – Loads environment variables securely.
* **@google/genai** – Integrates the application with the Gemini API.

The backend uses Express routes for health checks and quiz generation and separates AI integration into a dedicated service.

### AI

* **Google Gemini API** – Generates structured quiz content from the submitted study notes or topic.
* **Structured JSON Response Schema** – Ensures the AI returns quiz data in the expected format.

## Architecture

```text
                         ┌──────────────────────┐
                         │       Student        │
                         └──────────┬───────────┘
                                    │
                                    │ Study Notes / Topic
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │                      │
                         │  App.jsx             │
                         │  Quiz.jsx            │
                         │  Results.jsx         │
                         └──────────┬───────────┘
                                    │
                                    │ POST /api/generate-quiz
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │                      │
                         │   server.js          │
                         │   Request Validation │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Gemini AI Service   │
                         │                      │
                         │ geminiService.js     │
                         │ Quiz Generation      │
                         └──────────┬───────────┘
                                    │
                                    │ Structured JSON
                                    ▼
                         ┌──────────────────────┐
                         │    Quiz Validator    │
                         │                      │
                         │ quizValidator.js     │
                         └──────────┬───────────┘
                                    │
                                    │ Valid Quiz
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │                      │
                         │ Questions → Feedback │
                         │ → Results → Retry    │
                         └──────────────────────┘
```

## Project Structure

```text
AI-Study-Assistant/
│
├── Preview/
│   ├── Home.png
│   ├── Quiz.png
│   ├── Loading.png
│   ├── Correct Answer Feedback.png
│   ├── Wrong Answer Feedback.png
│   ├── Results.png
│   └── Error.png
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Quiz.jsx
│   │   │   └── Results.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/
│   ├── .env.example
│   ├── geminiService.js
│   ├── quizValidator.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

### Important Files

| File / Folder                       | Responsibility                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `client/src/App.jsx`                | Main application flow, user input, API requests, loading and error states    |
| `client/src/components/Quiz.jsx`    | Quiz questions, answer selection, feedback, progress and retry functionality |
| `client/src/components/Results.jsx` | Score calculation, result summary and quiz actions                           |
| `client/src/App.css`                | Application-specific styling                                                 |
| `client/src/index.css`              | Global styling                                                               |
| `server/server.js`                  | Express server, API routes, validation and error handling                    |
| `server/geminiService.js`           | Gemini API integration and quiz generation                                   |
| `server/quizValidator.js`           | Validates the structure of AI-generated quiz data                            |
| `server/.env.example`               | Example environment variable configuration                                   |
| `Preview/`                          | Screenshots showing the application's main states                            |

The current repository structure includes `App.jsx`, `Quiz.jsx`, `Results.jsx`, the backend service files, and the screenshot collection in `Preview/`.

## Installation & Setup

### Prerequisites

Install the following before running the project:

* Node.js
* npm
* Git
* A Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/SuryaKommineni/AI-Study-Assistant.git
cd AI-Study-Assistant
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open a second terminal:

```bash
cd AI-Study-Assistant/server
npm install
```

The frontend uses React and Vite, while the backend uses Express, CORS, dotenv and the Google GenAI SDK.

### 4. Configure the Gemini API Key

Inside the `server` directory, create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

The repository provides a `.env.example` file containing the required variable.

Do not commit your actual API key to GitHub.

### 5. Configure the Frontend API URL

The React frontend uses the `VITE_API_URL` environment variable when making requests to the backend.

Create a `.env` file inside `client`:

```env
VITE_API_URL=http://localhost:3000
```

For a deployed backend, replace the value with the backend's deployed URL.

### 6. Start the Backend

From the `server` directory:

```bash
node server.js
```

The backend uses port `3000` by default unless another `PORT` environment variable is provided.

### 7. Start the Frontend

From the `client` directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

## Usage

### Step 1 — Enter a Topic

Enter study notes or a topic into the text area.

Examples:

```text
React Hooks
```

or:

```text
Photosynthesis
```

or:

```text
Paste your class notes here...
```

The application accepts up to **5000 characters** of input.

### Step 2 — Generate the Quiz

Click **Generate Quiz**.

The frontend sends the notes to:

```http
POST /api/generate-quiz
```

The backend sends the topic to Gemini and requests a structured quiz containing:

* 5 questions
* 4 options per question
* One correct answer
* An explanation for each answer

The generated response is validated before being returned to the frontend.

### Step 3 — Answer Questions

Select one of the four options and click:

```text
Submit Answer
```

The application immediately indicates whether the selected answer is correct or incorrect.

For incorrect answers, the application also displays the correct answer and an explanation.

### Step 4 — Complete the Quiz

After answering all questions, the application displays:

* Score
* Percentage
* Correct answers
* Incorrect answers

### Step 5 — Retry Incorrect Questions

If there are incorrect answers, click:

```text
Retry Wrong Answers
```

The application creates a retry quiz containing only the questions answered incorrectly.

### Step 6 — Create a New Quiz

Click:

```text
Create New Quiz
```

to return to the input screen and generate another quiz.

## Screenshots / Demo

### Live Demo

[**Open AI Study Assistant**](https://ai-study-assistant-five-mocha.vercel.app/)

### Home

![AI Study Assistant Home](Preview/Home.png)

### Quiz Interface

![Quiz Interface](Preview/Quiz.png)

### Loading State

![Quiz Generation Loading State](Preview/Loading.png)

### Correct Answer Feedback

![Correct Answer Feedback](Preview/Correct%20Answer%20Feedback.png)

### Wrong Answer Feedback

![Wrong Answer Feedback](Preview/Wrong%20Answer%20Feedback.png)

### Quiz Results

![Quiz Results](Preview/Results.png)

### Error Handling

![Error Handling](Preview/Error.png)

The screenshots above correspond to the actual images currently stored in the repository's `Preview` directory.

## API Documentation

### Health Check

Checks whether the Study Assistant backend is running.

```http
GET /api/health
```

#### Response

```json
{
  "status": "ok",
  "message": "Study Assistant API is running"
}
```

### Generate Quiz

Generates a quiz from submitted notes or a topic.

```http
POST /api/generate-quiz
```

#### Request Headers

```http
Content-Type: application/json
```

#### Request Body

```json
{
  "notes": "Explain React Hooks and their purpose."
}
```

#### Successful Response

```json
{
  "quiz": {
    "title": "React Hooks Quiz",
    "questions": [
      {
        "id": 1,
        "question": "What are React Hooks?",
        "options": [
          "Functions that let components use React features",
          "CSS styling utilities",
          "Database queries",
          "Browser APIs"
        ],
        "correctAnswer": 0,
        "explanation": "React Hooks allow function components to use features such as state and lifecycle-related functionality."
      }
    ]
  }
}
```

The backend assigns question IDs after validating the generated quiz.

### Error Responses

#### Empty or Invalid Input

```http
400 Bad Request
```

```json
{
  "error": "Please provide notes or a topic."
}
```

#### Input Too Long

```http
400 Bad Request
```

```json
{
  "error": "Notes must be 5000 characters or fewer."
}
```

#### Invalid AI-Generated Quiz

```http
502 Bad Gateway
```

```json
{
  "error": "The AI generated an invalid quiz. Please try again.",
  "code": "INVALID_QUIZ_STRUCTURE"
}
```

#### AI Rate Limit

```http
503 Service Unavailable
```

```json
{
  "error": "The AI service is receiving too many requests. Please try again shortly.",
  "code": "AI_RATE_LIMITED"
}
```

The backend explicitly handles invalid input, invalid AI output, rate limits, temporary AI unavailability and unexpected generation failures.

## Engineering Decisions

### 1. Separate Frontend and Backend

The application is divided into:

```text
client/
server/
```

This keeps the user interface separate from API and AI-related logic and makes the application easier to deploy and maintain.

### 2. Keep the Gemini API Key on the Backend

The Gemini API key is loaded through the backend using an environment variable instead of exposing it directly in the React application.

```text
React Client
     ↓
Express Backend
     ↓
Gemini API
```

This prevents the API credential from being included in the browser-side application code.

### 3. Structured AI Responses

The Gemini service requests JSON output using a defined response schema.

Each question is expected to contain:

* Question text
* Four answer options
* Correct answer index
* Explanation

This makes the AI response predictable for the frontend.

### 4. Validate AI Output

AI-generated content should not be trusted blindly.

The project includes `quizValidator.js`, which checks that:

* The quiz has a title.
* Questions exist.
* Each question contains text.
* Each question has exactly four options.
* The correct answer is a valid index.
* Each question has an explanation.

Invalid data is rejected before being returned to the frontend.

### 5. Input Length Limitation

User input is limited to 5000 characters.

This helps keep requests controlled and prevents unnecessarily large prompts from being sent to the AI service.

### 6. Client-Side Request Handling

The frontend tracks the latest quiz-generation request and manages loading, errors and delayed responses.

A longer-running request displays additional feedback instead of leaving the user with an unexplained loading state.

### 7. Retry Wrong Answers

Instead of forcing users to repeat the entire quiz, incorrect questions are stored and can be retried separately.

This makes the quiz more useful as a learning and revision tool.

## Testing

### Manual Testing

The application was designed to verify the following scenarios:

| Test Case                    | Expected Result                                     |
| ---------------------------- | --------------------------------------------------- |
| Empty input                  | Quiz generation is prevented                        |
| Valid topic                  | Quiz is generated successfully                      |
| Input above 5000 characters  | Request is rejected                                 |
| Correct answer               | Correct feedback is displayed                       |
| Incorrect answer             | Incorrect feedback and correct answer are displayed |
| Quiz completion              | Score and percentage are displayed                  |
| Wrong answers exist          | Retry option is displayed                           |
| Retry wrong answers          | Only incorrect questions are repeated               |
| Create New Quiz              | User returns to the quiz-generation screen          |
| AI service unavailable       | Appropriate error message is displayed              |
| AI returns invalid structure | Backend rejects the response                        |
| AI rate limit                | User receives a retry-oriented error                |

The current backend package does not define an automated test suite; testing is therefore documented around the application's request flow and UI behavior.

## Limitations

* Quiz quality depends on the quality and content of the supplied notes or topic.
* AI-generated questions may occasionally require human verification.
* The application currently generates multiple-choice quizzes rather than other question types.
* Quiz history is not persisted between sessions.
* There is currently no user authentication or personal account system.
* There is no persistent learning-progress database.
* The application depends on the availability and quota of the Gemini API.
* The backend currently expects the frontend to be configured with the correct API URL.

## Future Improvements

* Add **user authentication** and personalized accounts.
* Store **quiz history** for later revision.
* Add **learning progress tracking**.
* Support **PDF and document uploads**.
* Generate **flashcards** from study material.
* Add **different question types**, such as true/false and short-answer questions.
* Add **difficulty selection** for generated quizzes.
* Allow users to select the **number of questions**.
* Add **topic-based performance analytics**.
* Add a **study dashboard**.
* Improve AI prompting for more consistent question difficulty and quality.
* Add automated backend and frontend tests.

## Environment Variables

### Backend

Create:

```text
server/.env
```

```env
GEMINI_API_KEY=your_api_key_here
```

### Frontend

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:3000
```

Do not commit `.env` files containing real API credentials.

## Deployment

The frontend is deployed and available through Vercel:

[**AI Study Assistant — Live Demo**](https://ai-study-assistant-five-mocha.vercel.app/)

For local development, the frontend communicates with the backend through `VITE_API_URL`.

For production deployment, configure the frontend environment variable with the URL of the deployed backend:

```env
VITE_API_URL=https://your-backend-url
```

## Contributing

Contributions and improvements are welcome.

### Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

### Make Your Changes

Test the application locally and verify both frontend and backend behavior.

### Commit Your Changes

```bash
git add .
git commit -m "Add your feature"
```

### Push the Branch

```bash
git push origin feature/your-feature
```

Then open a pull request.

## License

This project is intended for educational and portfolio purposes.

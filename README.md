# AI Study Assistant

## Overview

AI Study Assistant is a full-stack web application that transforms study notes or any topic into an interactive multiple-choice quiz using Google's Gemini AI. The application helps users quickly test their understanding through dynamically generated questions, instant feedback, scoring, and retry functionality.

---

## Features

- Generate quizzes from notes or any study topic
- AI-powered question generation using Gemini API
- Interactive multiple-choice quiz interface
- Immediate answer feedback with explanations
- Progress bar
- Final score and percentage
- Retry only incorrectly answered questions
- Loading indicators
- Friendly error handling
- Validation of AI responses
- Responsive design

---

## Tech Stack

### Frontend

- React
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API

---

## Installation

### Clone repository

```bash
git clone <repository-url>
```

### Install frontend

```bash
cd client
npm install
```

### Install backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## Running the Project

Start backend

```bash
cd server
node server.js
```

Start frontend

```bash
cd client
npm run dev
```

---

## Project Structure

```
client/
server/
README.md
```

---

## AI Usage Disclosure

Google Gemini API is used to generate quiz questions from user-provided notes.

AI-generated responses are validated before being shown to users.

The application includes safeguards against:

- Empty AI responses
- Malformed JSON
- Invalid quiz structures
- Temporary AI service failures

---

## Known Limitations

- AI responses depend on the quality of the input notes.
- Quiz quality may vary depending on the topic.
- Internet connection is required for quiz generation.
- Gemini service availability may affect response time.

---

## Time Spent

Approximately **7.5 hours**

| Task | Time |
|------|------:|
| Project setup and configuration | 30 minutes |
| Backend development (Express + Gemini API) | 1.5 hours |
| Frontend development (React UI) | 2.5 hours |
| AI integration and quiz validation | 1 hour |
| Testing, debugging, and UI improvements | 1 hour |
| Documentation, screenshots, and GitHub setup | 1 hour |

**Total:** Approximately **7.5 hours**

---

## Screenshots

### Home Page

![Home Page](Preview/Home.png)

### Loading State

![Loading](Preview/Loading.png)

### Quiz

![Quiz](Preview/Quiz.png)

### Correct Answer Feedback

![Correct Answer Feedback](Preview/Correct%20Answer%20Feedback.png)

### Wrong Answer Feedback

![Wrong Answer Feedback](Preview/Wrong%20Answer%20Feedback.png)

### Results

![Results](Preview/Results.png)

### Error Handling

![Error](Preview/Error.png)
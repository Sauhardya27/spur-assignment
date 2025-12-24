# ShopEasy AI Chat Agent

This is a chat application that uses Gemini API to answer user questions. The application has a frontend for the chat interface and a backend for handling the API requests and persisting the conversation data.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

To install the application, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/Sauhardya27/spur-assignment.git
   ```

2. Navigate to the project directory:

   ```shell
   cd spur-assignment
   ```

3. Install the dependencies for the backend:

   ```shell
   cd server
   npm install
   ```

4. Install the dependencies for the frontend:

   ```shell
   cd ../client
   npm install
   ```

5. Set up the local database:

   - Install a SQLite tool: Install a SQLite extension in VS Code (for example, the “SQLite” extension). No separate system-level SQLite installation is required.
   - Create and initialize the SQLite database: When you run the backend using `npm run dev` inside the `server` directory, the application automatically creates the `chat.sqlite` database file (if it does not already exist) and initializes the required tables using the schema defined in `server/src/db/migrations.sql`.

## Configuration

Before running the application, you need to configure the environment variables for the LLM API key. Create a `.env` file in the `server` directory and add the following line:

```shell
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your actual Gemini-2.5-flash API key.

## Architecture Overview

The project follows a clean, layered architecture with clear separation of concerns between the frontend and backend.

### Backend Architecture (`/server`)

The backend is structured into well-defined layers:

- **Routes (`src/routes`)**

  - Defines API endpoints such as `POST /chat/message`.
  - Routes delegate request handling to controllers.

- **Controllers (`src/controllers`)**

  - Handle HTTP-level concerns such as request validation, session handling, and response formatting.
  - Examples: `chatController.ts`, `historyController.ts`.

- **Services (`src/services`)**

  - Contain core business logic.
  - `chatService.ts` orchestrates conversation flow.
  - `llmService.ts` encapsulates all Gemini API interactions.
  - `faqService.ts` provides domain knowledge (shipping, returns, support hours).

- **Repositories (`src/repositories`)**

  - Responsible for all database operations.
  - Abstracts SQLite queries for conversations and messages.
  - Examples: `conversationRepo.ts`, `messageRepo.ts`.

- **Database Layer (`src/db`)**

  - SQLite database connection and initialization logic.
  - SQL schema defined in `migrations.sql`.

- **Middlewares (`src/middlewares`)**

  - Centralized error handling and input validation.
  - Prevents backend crashes on invalid or malicious input.

- **Utilities (`src/utils`)**
  - Shared helpers such as logging and message truncation.

This structure ensures:

- Clear separation of responsibilities
- Easier debugging and testing
- Future extensibility (e.g., swapping LLM providers or databases)

### Frontend Architecture (`/client`)

The frontend is built using React + Vite and organized as follows:

- **API Layer (`src/api`)**

  - Handles communication with backend endpoints.

- **Hooks (`src/hooks`)**

  - `useChat.ts` manages chat state, message flow, and loading indicators.

- **Components (`src/components`)**

  - Modular UI components such as chat window, input box, typing indicator, and message bubbles.

- **Types & Utilities**
  - Shared TypeScript types and session helpers.

The frontend communicates with the backend via a simple REST API and renders chat history based on the session ID.

## LLM Notes

- **Provider**

  - Google Gemini API (Gemini 2.5 Flash)

- **Integration**

  - All LLM-related logic is encapsulated inside `llmService.ts`.
  - The Gemini API key is loaded via environment variables.

- **Prompt Design**

  - A system prompt is used to define the AI’s role as a helpful customer support agent for a fictional e-commerce store.
  - Domain-specific knowledge (shipping policy, return policy, support hours) is injected into the prompt.
  - Recent conversation history is included to maintain contextual replies.

- **Error Handling & Guardrails**
  - API failures, timeouts, and invalid keys are gracefully handled.
  - User-friendly error messages are returned instead of crashing the backend.
  - Long user inputs are truncated to control token usage and costs.

## Trade-offs & Future Improvements

If I had more time, I would consider the following improvements:

- Implement caching to reduce the number of API calls to the LLM provider.
- Add support for multiple LLM providers to allow for more flexibility.
- Implement a chat history persistence mechanism to store and retrieve chat history for each user.

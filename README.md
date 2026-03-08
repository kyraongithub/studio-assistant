# 🎮 Studio Assistant — AI Internal Chat Tool
# 🎮 LIVE ON: https://studio-asssistant.kyraspace.com

AI-powered internal assistant designed for game studio workflows.

This project is a **full-stack AI application** with clean architecture, strong separation of concerns, and production-style patterns.

The goal is to demonstrate:

- practical AI integration
- scalable full-stack architecture
- strong engineering practices
- clean UX

This repository follows **industry-style architecture patterns** including:

- modular folder structure
- command plugin system
- AI provider abstraction
- clean service layers
- API proxy via Next.js server
- custom hooks separating UI and logic

---

## 🚀 Architecture Overview

The system uses a **proxy architecture** to hide the backend URL and keep the frontend clean.

Flow:

client UI
→ custom hook
→ Next.js server route
→ backend API
→ AI provider

```
React UI
   │
   ▼
Custom Hook (React Query)
   │
   ▼
Next Server Route (/api/chat)
   │
   ▼
Backend API (Express)
   │
   ▼
LLM Provider
```

Benefits:

- backend URL is never exposed to the browser
- API logic centralized
- easier auth in the future
- clean frontend architecture

---

## ⚙️ Tech Stack

**Frontend**

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

**Data Fetching**

- Axios
- TanStack React Query

**Backend**

- Node.js
- Express
- TypeScript

**AI**

- LLM API (API key provided)

**Deployment**

- Vercel

---

## 🏎 Quick Start

To easily install dependencies and run both apps simultaneously, we've added root scripts:

1. **Install all dependencies** across workspaces:
   ```bash
   npm run install:all
   ```

2. **Run both frontend and backend** simultaneously in development mode:
   ```bash
   npm run dev:all
   ```

---

## 📂 Robust Project Structure

Monorepo style architecture.

```text
studio-assistant
│
├── apps
│   │
│   ├── web                     # Next.js frontend
│   │   │
│   │   ├── app
│   │   │   ├── page.tsx
│   │   │   └── api
│   │   │       └── chat
│   │   │           └── route.ts
│   │   │
│   │   ├── components
│   │   │   └── chat
│   │   │       ├── ChatWindow.tsx
│   │   │       ├── MessageBubble.tsx
│   │   │       └── ChatInput.tsx
│   │   │
│   │   ├── hooks
│   │   │   └── useChat.ts
│   │   │
│   │   ├── services
│   │   │   ├── axiosClient.ts
│   │   │   └── axiosServer.ts
│   │   │
│   │   ├── types
│   │   │   └── chat.types.ts
│   │   │
│   │   └── providers
│   │       └── QueryProvider.tsx
│   │
│   └── server                  # Backend API
│       │
│       ├── routes
│       │   └── chat.routes.ts
│       │
│       ├── controllers
│       │   └── chat.controller.ts
│       │
│       ├── services
│       │   ├── ai.service.ts
│       │   └── log.service.ts
│       │
│       ├── providers
│       │   └── llmProvider.ts
│       │
│       ├── commands
│       │   ├── writeDialogue.command.ts
│       │   ├── assetDescription.command.ts
│       │   ├── summarize.command.ts
│       │   └── index.ts
│       │
│       ├── utils
│       │   └── commandParser.ts
│       │
│       ├── middleware
│       │   └── errorHandler.ts
│       │
│       ├── config
│       │   └── env.ts
│       │
│       └── server.ts
│
├── packages
│   └── shared
│       └── types
│
├── .env.example
├── README.md
└── package.json
```

---

## 🔑 Environment Variables

Only one variable is required.

`OPENAI_API_KEY`

`.env.example`

`OPENAI_API_KEY`

---

## 🔌 Axios Setup

Two axios clients are used.

### 1️⃣ Browser → Next Server

`services/axiosClient.ts`

Responsible for requests from the browser.

Example:

```ts
const client = axios.create({
  baseURL: "/api"
});
```

Used inside React Query hooks.

---

### 2️⃣ Next Server → Backend API

`services/axiosServer.ts`

Responsible for forwarding requests to the backend API.

Example:

```ts
const serverClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});
```

This keeps the backend URL hidden from the client.

---

## 🧠 React Query Integration

All data logic must live in **custom hooks**, not UI components.

Example:

`hooks/useChat.ts`

Responsibilities:

- call API
- manage loading state
- manage error state
- store chat history

UI components must only render state.

---

## 💬 Chat Features

Chat interface includes:

- conversation history
- loading state
- markdown rendering
- slash command support

---

## 🧩 Command System

Commands are implemented as plugins.

`commands/`

Supported commands:

```
/write-dialogue
/asset-description
/summarize
```

Registry example:

```ts
export const commands = {
  "/write-dialogue": writeDialogueCommand,
  "/asset-description": assetDescriptionCommand,
  "/summarize": summarizeCommand
}
```

---

## 🤖 AI Provider Abstraction

`providers/llmProvider.ts`

Interface example:

```ts
export interface LLMProvider {
  generate(prompt: string): Promise<string>
}
```

Allows switching providers easily.

---

## 📊 Generation Logging

Each AI request is logged.

Logged fields:

- timestamp
- command
- input
- duration
- status

This helps debugging and monitoring.

---

## 🧪 Error Handling

Centralized middleware handles:

- API failures
- rate limits
- invalid commands
- empty input

Example error:

```json
{
  "error": "AI service unavailable"
}
```

---

## 🧠 Prompt Engineering

Prompts are isolated from business logic.

Example system prompt:

```text
You are a narrative designer in a professional game studio.

Write immersive RPG dialogue.
Keep responses concise and emotionally expressive.
```

---

## ⏱ Time Log

| Start | End   | Task | Duration |
|-------|-------|------|----------|
| 08/03/26 23:05 WIB | 08/03/26 23:13 WIB | docs read and structure md for prompt | 8 mins |
| 08/03/26 23:13 WIB | 08/03/26 23:20 WIB | initiate app build | 7 mins |
| 08/03/26 23:20 WIB | 08/03/26 23:35 WIB | app testing | 15 mins |
| 08/03/26 23:35 WIB | 08/03/26 23:40 WIB | feature improvement add command recommendation feature | 5 mins |
| 08/03/26 23:40 WIB | 08/03/26 23:59 WIB | git push | 19 mins |
| 09/03/26 00:30 WIB | 09/03/26 00:50 WIB | deployment on render | 20 mins |
| 09/03/26 00:50 WIB | 09/03/26 01:20 WIB | deployment change to vercel both frontend and backend | 30 mins |

---

## 🤖 AI Tools Used

ChatGPT — prompt design and architecture planning.

AI coding agent — project scaffolding and implementation.

---

## 🔮 Future Improvements

Possible improvements:

- streaming AI responses
- persistent chat history
- authentication
- vector search
- multi conversation threads

---

Commit Strategy:
- feature-based commits
- architecture-first approach

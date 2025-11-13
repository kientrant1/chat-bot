# AI Chat Bot

A modern AI chatbot application built with Next.js 15 and powered by Google Gemini AI. Features a clean, responsive interface with dark mode support, real-time chat, message search, and persistent chat history.

## ✨ Features

- 🤖 **AI-Powered Chat** - Integrated with Google Gemini 2.0 Flash model
- 💬 **Real-time Chat Interface** - Smooth, responsive messaging experience
- 🔍 **Message Search** - Search through chat history with highlighting
- 💾 **Persistent Storage** - Chat history saved in localStorage. It's sent to AI to respond appropriately based on the full conversation context
- 🎨 **Modern UI Design** - Built with Tailwind CSS v4
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile
- ⚡ **Fast Performance** - Built with Next.js 16 App Router
- 🔤 **Type Safety** - Full TypeScript implementation
- 🧹 **Clear History** - Easy chat history management

## Demo

- [Link demo](https://*.vercel.app/login)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- yarn package manager
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd chat-bot
```

### 2. Install Dependencies

```bash
# Using yarn
yarn install

# Using yarn
yarn install

# Using pyarn
pyarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### How to Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `.env.local` file

> **Important:** Never commit your API key to version control. The `.env.local` file should be added to your `.gitignore`.

### 4. Run the Development Server

```bash
# Using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the chatbot in action.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
yarn run dev

# Build for production
yarn run build

# Start production server
yarn run start

# Run linting
yarn run lint

# Run type checking
yarn run type-check
```

### Code Style

This project uses:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

## 🏗️ Build and Deploy

### Build for Production

```bash
yarn run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini AI](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

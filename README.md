# Second Brain - AI-Powered Knowledge Management

Second Brain is a modern, high-performance personal knowledge management system. It allows you to connect your notes, documents, and thoughts into a unified, AI-powered interface. Using Retrieval-Augmented Generation (RAG), it provides instant answers to your questions based on your own data, complete with accurate citations.

## 🚀 Features

- **Semantic Search**: Find information across your entire knowledge base using natural language.
- **Instant Retrieval**: Get answers in seconds, backed by your local or remote documents.
- **Persistence**: Chat history is saved to MongoDB, allowing you to pick up where you left off.
- **RAG Engine**: Powered by LangChain and ChromaDB for efficient document ingestion and retrieval.
- **Privacy First**: Your data remains yours. Processes are designed for secure, local-first workflows where possible.
- **Modern UI**: A sleek, reactive interface built with Next.js, Framer Motion, and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org), [React 19](https://react.dev), [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **AI/LLM**: [LangChain](https://js.langchain.com), [Google Gemini API](https://ai.google.dev), [Vercel AI SDK](https://sdk.vercel.ai)
- **Database**: [MongoDB](https://www.mongodb.com) (Session storage), [ChromaDB](https://www.trychroma.com) (Vector store)
- **ORM**: [Prisma](https://www.prisma.io)
- **Deployment**: Vercel

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- ChromaDB instance
- Google Gemini API Key

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
GOOGLE_GENERAI_API_KEY=your_gemini_api_key
CHROMA_URL=your_chromadb_url
```

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Yuvadi29/Second-Brain.git
    cd second-brain
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🧠 How it Works

1.  **Ingestion**: Place your documents (PDF, Markdown, Text) in the `knowledge/` directory.
2.  **Processing**: The system chunks the text, generates embeddings, and stores them in ChromaDB.
3.  **Retrieval**: When you ask a question, the system finds the most relevant chunks.
4.  **Generation**: The LLM uses the retrieved context to generate a precise answer with citations.

## ⚙️ Automated Knowledge Ingestion with GitHub Actions

Second Brain includes a GitHub Actions workflow that automatically ingests new documents whenever you push changes to the `knowledge/` directory.

### How It Works

The `convertToEmbeddings.yml` workflow:

- **Triggers** on any push to the `knowledge/` directory
- **Detects** all changed files automatically
- **Sends** files to the ingestion API endpoint
- **Embeds** content into ChromaDB for instant searching

### Setup

1. Add your ingestion API key to GitHub Secrets:
   - Go to your repository Settings → Secrets and variables → Actions
   - Create a new secret named `INGEST_API_KEY`

2. Update the ingestion API URL in `.github/workflows/convertToEmbeddings.yml`:
   ```yaml
   INGEST_API_URL: your_api_endpoint_url
   ```

3. Ensure your ingestion server is running and accessible

4. Push changes to the `knowledge/` directory to trigger the workflow

### Monitoring

- Check the **Actions** tab in your GitHub repository to see workflow execution logs
- Each run shows which files were processed and any ingestion status

## 📖 Documentation

For a more detailed guide on setup, architecture, and extension, visit the [Documentation Page](http://localhost:3000/docs) (available locally).

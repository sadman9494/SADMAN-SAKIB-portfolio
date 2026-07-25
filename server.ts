import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Assistant Route - Sadman Sakib's Architectural AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          reply: "I am currently running in offline interactive mode (GEMINI_API_KEY not configured). Sadman Sakib is a Software Engineer & AI Consultant specializing in Enterprise Systems, PyTorch AI, Hyperledger Fabric, and .NET Core microservices. Feel free to explore his projects and research papers above!",
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are SS ARCHITECT AI, the official AI assistant and digital twin for Sadman Sakib — Software Engineer & AI Consultant.
Sadman's Background:
- CGPA 3.95 (Summa Cum Laude, Gold Medalist at American International University-Bangladesh AIUB).
- Roles: Software Engineer at BAT / Agnis Solutions, Intellias, Shadhin Lab, IBOS Limited.
- Key Projects:
  1. Project Kronos (BAT): Enterprise Automated Resume Parser & Matching System using PyTorch, FastAPI, HuggingFace transformers. 87% accuracy, 60% manual effort saved.
  2. Project AutoPilot (Intellias): Multi-Agent Autonomous Workflow Automation Engine using Python, Celery, LangChain, Redis, Docker. 94% mapping time reduction.
  3. Decentralized Smartphone Ownership Tracking System: Peer-Reviewed Publication (2024), Hyperledger Fabric, Solidity, Node.js, Docker, Web3.
- Core Stack: Python, C# / .NET Core, FastAPI, PyTorch, Docker, Kubernetes, PostgreSQL, Redis, Hyperledger Fabric, React, TypeScript.
- Contact: hello@ssarchitect.dev | Dhaka, Bangladesh [UTC+6]

Respond professionally, concisely, and with technical authority in a sleek, software architect tone. Offer to answer questions about Sadman's projects, technical arsenal, or collaboration opportunities.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ]
      });

      const text = response.text || "Thank you for reaching out. Please feel free to check out Sadman's research publications or download his CV!";
      res.json({ reply: text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate response", details: error?.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SS ARCHITECT] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

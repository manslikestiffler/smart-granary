import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from 'fs/promises';

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Configuration
const apiKey = "AIzaSyCuks2bOZRD0COHqrj7idX4Jsfh23PdSRg";
const development = process.env.NODE_ENV === 'development';

// Mock Shona dataset (fallback)
const mockShonaDataset = [
  {
    instruction: "mhoro('hello')",
    input: "",
    output: "Mhoro! Zvinofadza kusangana newe! Ndiri SmartGrain AI, mubatsiri wako weAI ane hushamwari."
  }
];

// Load Shona dataset
let shonaDataset = mockShonaDataset;
let datasetError = null;

async function loadDataset() {
  try {
    const data = await readFile('./shona_alpaca.json', 'utf8');
    const parsedData = JSON.parse(data);
    
    if (!Array.isArray(parsedData)) {
      throw new Error("Dataset must be an array of instruction/input/output objects");
    }
    
    const isValidEntry = (entry) => {
      return entry && 
             typeof entry.instruction === 'string' &&
             typeof entry.output === 'string';
    };
    
    if (!parsedData.every(isValidEntry)) {
      throw new Error("Each entry must have 'instruction' and 'output' fields");
    }
    
    shonaDataset = parsedData;
    console.log(`✅ Loaded ${shonaDataset.length} valid Shona entries`);
  } catch (error) {
    datasetError = error.message;
    console.error("❌ Dataset error:", error.message);
    console.log("🔄 Using mock dataset instead");
    shonaDataset = mockShonaDataset;
  }
} 

// Initialize AI
let genAI;
if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log("🤖 Gemini AI initialized");
  } catch (error) {
    console.error("❌ AI initialization failed:", error.message);
  }
} else {
  console.warn("⚠️ No GEMINI_API_KEY in .env - AI disabled");
}

// Load dataset
await loadDataset();

// Create prompt-completion pairs for AI training
function createPromptPairs() {
  return shonaDataset.map(item => ({
    prompt: item.instruction + (item.input ? `\n${item.input}` : ''),
    completion: item.output
  }));
}

// AI Endpoint
app.post("/api/ai-assistant", async (req, res) => {
  if (!genAI) {
    return res.status(503).json({
      error: "AI service unavailable",
      solution: "Add GEMINI_API_KEY to your .env file"
    });
  }

  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ 
        error: "No message provided",
        example: { message: "mhoro('hello')" }
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptPairs = createPromptPairs();

    // Find matching instruction
    const matchedInstruction = shonaDataset.find(item => 
      item.instruction.toLowerCase().includes(message.toLowerCase())
    );

    let response;
    if (matchedInstruction) {
      // Use exact match from dataset
      response = matchedInstruction.output;
    } else {
      // Generate response using AI
      const systemPrompt = `
        You are a Shona language AI assistant. Use the following examples to respond:
        ${JSON.stringify(promptPairs.slice(0, 5))}

        Respond in Shona to: ${message}
      `;

      const result = await model.generateContent(systemPrompt);
      response = (await result.response).text();
    }

    return res.json({
      response,
      source: matchedInstruction ? "dataset" : "generated"
    });

  } catch (error) {
    console.error("AI Processing Error:", error);
    return res.status(500).json({
      error: "Response generation failed",
      details: development ? error.message : undefined
    });
  }
});

// Dataset status endpoint
app.get("/api/dataset", (req, res) => {
  res.json({
    entries: shonaDataset.length,
    isUsingMock: shonaDataset === mockShonaDataset,
    error: datasetError,
    sample: shonaDataset.slice(0, 3)
  });
});

// Start server
app.listen(port, () => {
  console.log(`\nServer Status:`);
  console.log(`🌐 http://localhost:${port}`);
  console.log(`🤖 AI: ${genAI ? "✅ Ready" : "❌ Disabled"}`);
  console.log(`📚 Dataset: ${shonaDataset.length} entries ${datasetError ? "(Mock)" : ""}`);
  if (datasetError) console.log(`   Error: ${datasetError}`);
});
// // server.js
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Load environment variables
// dotenv.config();

// const app = express();
// const port =3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Get API key from environment variables (recommended)
// const apiKey ="AIzaSyCuks2bOZRD0COHqrj7idX4Jsfh23PdSRg"; // Fallback to hardcoded key for development

// // Validate API Key
// if (!apiKey) {
//   console.error("ERROR: No Gemini API key provided. Set GEMINI_API_KEY in .env file.");
//   process.exit(1);
// }

// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI(apiKey);

// // AI Assistant Endpoint
// app.post("/api/ai-assistant", async (req, res) => {
//   try {
//     const { message, chatHistory = [] } = req.body;

//     // Validate input
//     if (!message) {
//       return res.status(400).json({ error: "No message provided" });
//     }

//     // Get the generative model (using the latest recommended model)
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-1.5-flash", // or "gemini-1.0-pro" if preferred
//     });

//     // Start a chat session with history
//     const chat = model.startChat({
//       history: chatHistory.map(msg => ({
//         role: msg.role,
//         parts: [{ text: msg.content }],
//       })),
//       generationConfig: {
//         maxOutputTokens: 1000,
//         temperature: 0.9,
//       },
//     });

//     // Send message and get response
//     const result = await chat.sendMessage(message);
//     const response = await result.response;
//     const text = response.text();

//     // Return the response
//     res.status(200).json({ 
//       response: text,
//       chatHistory: [
//         ...chatHistory,
//         { role: "user", content: message },
//         { role: "model", content: text }
//       ]
//     });

//   } catch (error) {
//     console.error("Gemini API Error:", error);
    
//     // More detailed error handling
//     let errorMessage = "Failed to get response from Gemini API";
//     if (error.message.includes("API key not valid")) {
//       errorMessage = "Invalid Gemini API key";
//     } else if (error.message.includes("model not found")) {
//       errorMessage = "Requested model not available";
//     }

//     res.status(500).json({ 
//       error: errorMessage,
//       details: development === "development" ? error.message : undefined
//     });
//   }
// });

// // Health Check Endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "healthy" });
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
//   console.log(`Using Gemini model: gemini-1.5-flash`);
// });
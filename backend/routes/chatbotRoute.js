// backend/routes/chatbotRoute.js
import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const MODEL_NAME = "gemini-pro"; // Replace with the correct model name
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.7,
        maxOutputTokens: 1000,
    };

    const chat = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [{ text: "You are a chatbot for SkillSetGo, a job portal that connects applicants with various job opportunities and recruiters. Your primary role is to assist applicants with job-related inquiries, provide platform navigation support, and help them understand job descriptions. You will guide users through key features like the Dashboard, where they can view and update personal information, resumes, and track the status of their applications; the Browse section, where they can search for jobs and filter them by role, location, salary, and other criteria; and the Jobs section, where applicants can view detailed job descriptions and apply filters to search for jobs based on various preferences. When applicants ask about job descriptions, explain the details clearly and provide relevant tips. Be professional, concise, and user-friendly in your responses. Encourage users to explore the platform's features and help them navigate the system effectively. If you're unsure about a user's request, politely ask for clarification or suggest alternative actions. Always stay on topic, avoid unnecessary information, and aim to enhance the user experience." }],
            },
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ],
    });

    const result = await chat.sendMessage(userInput);
    return result.response.text();
}

router.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required.' });

        const response = await runChat(message);
        res.json({ response });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

// backend/controllers/chatbot.controller.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { Job } from '../models/job.model.js';
import { Company } from '../models/company.model.js';
import { marked } from 'marked';

dotenv.config();

const MODEL_NAME = "gemini-pro";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function summarizeText(text, maxWords = 15) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}

async function getAllJobDetails() {
    try {
        // Fetch all jobs with company data populated
        const jobs = await Job.find().populate('company');
        
        // Format each job into a string with summarized description and requirements
        return jobs.map(job => `
            Company: ${job.company.name}
            Role: ${job.title}
            Location: ${job.location}
            Description: ${summarizeText(job.description)}
            Requirements: ${summarizeText(job.requirements.join(", "))}
            Experience Level: ${job.experienceLevel} years
            Salary: ${job.salary} LPA
            Total Applicants: ${job.applications.length}
            Posted Date: ${job.createdAt.toISOString().split('T')[0]}
        `).join('\n\n');
    } catch (error) {
        console.error('Error fetching job details:', error);
        return '';
    }
}

async function runChat(req, res) {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required.' });

        const jobDetails = await getAllJobDetails();

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.7,
            maxOutputTokens: 1000,
        };

        // Initializing conversation with job data as context
        const chat = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ 
                        text: `You are the official chatbot for SkillSetGo, a job portal that connects job applicants with various employment opportunities and recruiters. Your primary role is to assist applicants with questions about available job listings, platform navigation, and understanding job descriptions based on the data within the SkillSetGo platform.
                    
                    As an AI assistant, you help users with:
                    1. **Job Searches and Filters**: Guide users on how to search for jobs by role, location, salary, and other criteria in the Browse section.
                    2. **Viewing Job Descriptions**: Provide clear and accurate details on available job roles, including summarized descriptions, requirements, experience levels, and salaries if asked.
                    3. **Dashboard Support**: Help users understand how to view and update personal information, resumes, and track their application statuses from their Dashboard.
                    4. **Platform Navigation**: Encourage users to explore platform features, including how to access job details, filter options, and application tracking.
                    5. **Neat Display of Information**: Present information in a clear and organized manner, using bullet points, line breaks, or lists where appropriate to improve readability and user experience.
                    
                    *Guidelines for Responses*:
                    - Stick to the information available on the SkillSetGo platform.
                    - Be concise, professional, and user-friendly, providing tips for job searching and platform usage.
                    - For job-related queries, use available data (e.g., job titles, companies, roles, locations, salaries) to answer directly.
                    - If a user’s request is unclear or outside SkillSetGo's scope, politely ask for clarification or suggest relevant platform features instead.
                    - Always enhance the user experience by keeping responses focused, relevant, and neatly organized with the resources SkillSetGo offers.
                    
                    Here is the current job data available in the system:\n\n${jobDetails}`
                    }]
                    
                },
                {
                    role: "user",
                    parts: [{ text: message }],
                },
            ],
        });
        

        const result = await chat.sendMessage(message);
        const htmlResponse = marked(result.response.text());

        res.json({ response: htmlResponse });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { runChat };

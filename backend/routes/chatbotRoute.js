// backend/routes/chatbotRoute.js
import express from 'express';
import { runChat } from '../controllers/chatbot.controller.js'; // Import the runChat function from the controller

const router = express.Router();

router.route('/ask').post(runChat); // Route that calls the runChat function for the /ask endpoint

export default router;

# SkillSetGo

SkillSetGo is an employee recruitment portal that is designed to streamline the hiring process by using a role-based dashboard and leveraging Gen-AI to evaluate candidates better. With the help of our system, the different layers of the recruitment process are simplified and streamlined. Our system is currently built to support two user roles - Applicants and Recruiters.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Steps](#steps)
- [Future Enhancements](#future-enhancements)

## Features

- **Role-Based Access**:
   Dedicated user roles (Applicant and Recruiters) for streamlined workflows and access to relevant hiring stages.

- **Interactive Chatbot Support**:
   Gemini chatbot assists applicants with application status, job details, and navigation.

- **Application Tracking**:
   Real-time status updates on each application step, visible to designated team members, ensuring transparency.

- **Applicant Dashboard**:
   A personalized dashboard for applicants to upload CVs, manage profiles, and track application status.

- **Collaborative Hiring**:
   Seamless sharing of applicant information across roles, supporting efficient decision-making throughout the hiring process.

## Tech Stack
- SkillSetGo leverages the MERN stack (MongoDB, Express, React, Node.js) to deliver a dynamic and responsive hiring portal.

### Steps:

1. Clone the repository:
   ```
   git clone git@github.com:shrutibist01/SkillSetGo.git
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables in the backend (`.env` file):
   ```
   MONGO_URI= <Your MongoDB URI>
   SECRET_KEY= <Random key for JWT auth>
   PORT=8000
   CLOUD_NAME= <Cloudinary-credential name>
   API_KEY= <Cloudinary API-key>
   API_SECRET= <Cloudinary-credential API-secret>
   GEMINI_API_KEY= <Gemini API-key>
   ```

4. Run the backend:
   ```
   cd backend
   npm run dev
   ```

5. Run the frontend:
   ```
   cd frontend
   npm run dev
   ```

## Future Enhancements

- AI-Powered Interview Scheduling: Automatically schedule interviews based on recruiter availability and candidate preferences.

- Advanced Candidate Matching: Utilize machine learning to match applicants with jobs based on skills, experience, and cultural fit.

- Employee Referral System: Introduce a referral program that rewards employees for recommending qualified candidates to job postings.

- Customizable Screening Criteria: Enable HR to define and adjust ATS screening parameters based on the role requirements to refine applicant filtering.

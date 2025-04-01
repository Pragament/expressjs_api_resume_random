const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample skills and projects
const skillsList = ["JavaScript", "Node.js", "Express.js", "MongoDB", "React", "Python", "Django", "Flask", "Docker", "Kubernetes"];
const projectsList = [
    { title: "E-commerce Website", description: "Built an online store with payment integration." },
    { title: "Task Manager App", description: "Developed a productivity app to manage tasks efficiently." },
    { title: "Weather App", description: "Created an app that fetches real-time weather data." },
    { title: "Chat Application", description: "Implemented a chat system with real-time messaging." },
    { title: "Portfolio Website", description: "Designed a personal website showcasing skills and projects." },
    { title: "AI Chatbot", description: "Built a chatbot using NLP techniques." },
    { title: "Social Media Dashboard", description: "Developed an analytics dashboard for social media insights." },
    { title: "IoT Home Automation", description: "Created a system for automating home appliances." }
];
const dummyPhone = "+1-555-1234-567";
const dummyEmail = "user@example.com";
const dummyTwitter = "@exampleUser";
const dummyAddress = "123 Main St, Anytown, USA";
const dummySummary = "A passionate developer with experience in full-stack development, AI, and cloud computing.";

// Function to get random items from an array
const getRandomItems = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);

// Generate resume
const generateResume = (name) => {
    const skills = getRandomItems(skillsList, 3);
    const projects = getRandomItems(projectsList, 2).map(project => ({
        title: `${project.title} by ${name}`,
        description: project.description,
        startDate: "2023-01-01",
        endDate: "2023-06-30"
    }));
    
    return {
        name,
        phone: dummyPhone,
        email: dummyEmail,
        twitter: dummyTwitter,
        address: dummyAddress,
        summary: dummySummary,
        skills,
        projects
    };
};

// GET request to generate resume
app.get("/resume", (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    res.json(generateResume(name));
});

// POST request to generate resume
app.post("/resume", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    res.json(generateResume(name));
});

app.listen(port, () => {
    console.log(`Resume API is running on http://localhost:${port}`);
});

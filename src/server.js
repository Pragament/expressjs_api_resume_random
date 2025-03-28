const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample skills and projects
const skillsList = ["JavaScript", "Node.js", "Express.js", "MongoDB", "React", "Python", "Django", "Flask", "Docker", "Kubernetes"];
const projectsList = ["E-commerce Website", "Task Manager App", "Weather App", "Chat Application", "Portfolio Website", "AI Chatbot", "Social Media Dashboard", "IoT Home Automation"];

// Function to get random items from an array
const getRandomItems = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);

// Generate resume
const generateResume = (name) => {
    const skills = getRandomItems(skillsList, 3);
    const projects = getRandomItems(projectsList, 2).map(project => `${project} by ${name} using ${skills[Math.floor(Math.random() * skills.length)]}`);
    
    return {
        name,
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

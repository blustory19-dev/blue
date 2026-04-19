const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API endpoint for tasks
app.get('/api/tasks', (req, res) => {
    res.send('Fetching tasks...');
});

app.post('/api/tasks', (req, res) => {
    res.send('Creating a task...');
});

// API endpoint for schedule
app.get('/api/schedule', (req, res) => {
    res.send('Fetching schedule...');
});

app.post('/api/schedule', (req, res) => {
    res.send('Creating a schedule...');
});

// API endpoint for timer
app.get('/api/timer', (req, res) => {
    res.send('Fetching timer...');
});

// API endpoint for progress
app.get('/api/progress', (req, res) => {
    res.send('Fetching progress...');
});

// API endpoint for notes
app.get('/api/notes', (req, res) => {
    res.send('Fetching notes...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

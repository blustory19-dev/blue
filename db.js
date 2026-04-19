const sqlite3 = require('sqlite3').verbose();

// Initialize a SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    }
});

// Create tables
const createTables = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT, status TEXT, created_at TEXT, updated_at TEXT);`);
        db.run(`CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY, task_id INTEGER, due_date TEXT, FOREIGN KEY(task_id) REFERENCES tasks(id));`);
        db.run(`CREATE TABLE IF NOT EXISTS timer_sessions (id INTEGER PRIMARY KEY, task_id INTEGER, start_time TEXT, end_time TEXT, FOREIGN KEY(task_id) REFERENCES tasks(id));`);
        db.run(`CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY, task_id INTEGER, progress_percent INTEGER, updated_at TEXT, FOREIGN KEY(task_id) REFERENCES tasks(id));`);
        db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, task_id INTEGER, note TEXT, created_at TEXT, FOREIGN KEY(task_id) REFERENCES tasks(id));`);
    });
};

createTables();

module.exports = db;

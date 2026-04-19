from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

# Database configuration
DATABASE = 'study_planner.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the SQLite database
with get_db_connection() as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS study_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    subject TEXT NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL
                   )' )
    conn.commit()

@app.route('/sessions', methods=['GET'])
def get_sessions():
    conn = get_db_connection()
    sessions = conn.execute('SELECT * FROM study_sessions').fetchall()
    conn.close()
    return jsonify([dict(session) for session in sessions])

@app.route('/sessions', methods=['POST'])
def create_session():
    new_session = request.json
    conn = get_db_connection()
    conn.execute('INSERT INTO study_sessions (subject, start_time, end_time) VALUES (?, ?, ?)',
                 (new_session['subject'], new_session['start_time'], new_session['end_time']))
    conn.commit()
    conn.close()
    return jsonify(new_session), 201

@app.route('/sessions/<int:id>', methods=['DELETE'])
def delete_session(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM study_sessions WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
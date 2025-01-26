To-Do List App
A simple To-Do List app built with React (frontend), Flask (backend), and PostgreSQL (database). Allows users to create, edit, and delete tasks.

Technologies
Frontend: React
Backend: Flask
Database: PostgreSQL
Setup
1. Clone the repo:
bash
Copy
Edit
git clone https://github.com/Mahavir2112/To-Do-List.git
cd To-Do-List
2. Install Backend Dependencies:
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows
pip install -r requirements.txt
3. Install Frontend Dependencies:
bash
Copy
Edit
cd frontend
npm install
4. Set up PostgreSQL Database:
Create a new database To-Do-List in PostgreSQL and update the URI in backend/app.py.

5. Run the Apps:
Backend: python app.py (runs on http://localhost:8080)
Frontend: npm start (runs on http://localhost:3000)
Usage
The app allows you to:

Add, edit, and delete tasks
View tasks with their descriptions
This version is more compact while retaining the essential details.

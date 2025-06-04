# MLB-Project

A full-stack web application to analyze, compare, and visualize Major League Baseball player performance using real-world statistical data.

##  Overview

MLB-Project is designed to simulate and display player performance through intuitive visualizations and real-time comparisons. The application processes over 50,000 player data points and presents insights using a Flask backend and a modern React-based frontend.

##  Features

- Compare **two MLB players** side-by-side
- Select from any **team** and compare across teams
- Choose between **batting or pitching stats**
- Compare **multiple stats at once**
- Highlight better player in **green** and worse in **red**
- Shows **overall leader** by stat wins
- Clean, structured dataset using Pandas
- Flask API delivers stat comparisons as structured JSON

##  Tech Stack

- **Backend**: Python, Flask, Pandas
- **Frontend**: React, HTML, CSS, JavaScript
- **Data Source**: Kaggle - MLB player stats
- **Tools**: Flask-CORS, RESTful APIs, CSV data handling

##  How to Run

### Backend (Flask)

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/MLB-Project.git
   cd MLB-Project
2. Install Python dependencies:
   ```bash
   pip install flask flask-cors pandas
3. Place your CSV files here:
   ```bash
   backend/data/
   ├── 2023 MLB Player Stats - Batting.csv
   └── 2023 MLB Player Stats - Pitching.csv
4. Run the Flask server:
   ```bash
   cd backend
   python main.py

### Frontend (React)
1. In a new terminal:
   ```bash
   cd frontend
   npm install
   npm start

##  Screenshots

<div align="center"> <img src="https://github.com/user-attachments/assets/d73d68b0-b8c4-4e56-8073-93df8562a23d" alt="MLB Stat Comparison UI" width="700"/> <br><br> <img src="https://github.com/user-attachments/assets/ee553419-a159-454d-aeee-6e65a6048ede" alt="MLB Comparison Table" width="700"/> </div>


##  Future Work
- Add chart visualizations (using Chart.js or Recharts)
- Allow user-uploaded CSVs to analyze custom datasets
- Predictive modeling using player history and stats

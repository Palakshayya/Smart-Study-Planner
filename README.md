================================================================================
SMART STUDY PLANNER - COMPLETE PROJECT EXPLANATION & BACKEND DEVELOPER GUIDE
TABLE OF CONTENTS:
Project Overview & Architecture
File-by-File Breakdown (How Everything Works)
Data Flow & State Management
How a Backend Developer Can Work in This Project
Complete Backend REST API Specification (Endpoints & Data Models)
Recommended Database Schema (SQL / PostgreSQL / MySQL / MongoDB)
Ready-to-Use Backend Example (Node.js & Express)
College Presentation / Viva Questions & Answers
================================================================================
PROJECT OVERVIEW & ARCHITECTURE
================================================================================
The Smart Study Planner is a student productivity and academic management web
application. It allows students to manage course subjects, track daily tasks,
schedule study timetables, prepare for upcoming exams with countdown timers,
monitor GPA progress, and set academic milestones.
Key Architectural Decisions:
Built with standard web technologies: HTML5, CSS3, Modern JavaScript (ES6 Modules).
Follows the MVC (Model-View-Controller) design pattern:
Models: In 'src/data/' (state management and mock data).
Views: In 'src/views/' (reusable HTML UI templates).
Controllers: In 'src/controllers/' (logic, event listeners, calculations).
Services: In 'src/services/' (network calls & backend communication).
Utilities: In 'src/utils/' (toast alerts, audio chimes, modal popups).
Zero mandatory build step: Can run in any browser or with VS Code Live Server
just by opening 'index.html'.
UI Styling: Uses Tailwind CSS utility classes loaded via CDN, plus custom CSS
in 'src/style.css' for scrollbars and layout bounds.
================================================================================
2. FILE-BY-FILE BREAKDOWN (HOW ALL THE CODE WORKS)
---
ROOT FILES:
index.html:
The single entry point of the web app.
Loads Google Fonts (Plus Jakarta Sans & JetBrains Mono).
Loads Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>).
Links to custom styling (src/style.css).
Defines the core skeleton layout containers:
#main-header: Top navigation and student profile bar.
#app-sidebar: Left sidebar navigation for switching views.
#main-content-container: Dynamic area where pages render.
#modals-container: Overlay container for all popup dialogs.
#toast-container: Floating alerts in the bottom-right corner.
Loads the main JavaScript orchestrator: <script type="module" src="./src/app.js"></script>.
---
SRC ROOT:
src/style.css:
Defines custom CSS variables (--primary: #5551FF, --primary-hover, etc.).
Fixes the viewport height (calc(100vh - 3.5rem)) so the top bar and sidebar
stay fixed while only the main content area scrolls.
Customizes modern slim scrollbars (6px width, slate-toned).
Contains modal fade transitions and priority badge styling.
src/app.js:
The central coordinator / bootstrap script.
Imports all controllers, views, data stores, and utility functions.
Attaches functions to the global 'window' object so inline HTML attributes
like onclick="switchView('tasks')" or onclick="openModal('create-task-modal')"
work seamlessly across modules.
Runs on DOMContentLoaded to initialize state from LocalStorage and render
the active view (Dashboard by default).
---
SRC/DATA (DATA MODELS & PERSISTENCE):
src/data/state.js:
Acts as the frontend database engine using the browser's 'localStorage'.
Contains the master 'appState' object holding:
appState.currentUser: Student name, email, avatar, major, semester, target GPA.
appState.subjects: Array of enrolled courses.
appState.tasks: Array of academic tasks with priorities and deadlines.
appState.schedule: Array of weekly lecture and study timetable blocks.
appState.exams: Array of upcoming exams, target scores, and topics.
appState.goals: Academic target milestones.
appState.notifications: System reminders and study alerts.
Exports functions:
loadState(): Reads JSON from localStorage; falls back to seedData on first run.
saveState(): Saves the current 'appState' back to localStorage as JSON.
resetState(): Restores initial demo sample data.
src/data/seedData.js:
Provides a realistic starting academic dataset (Computer Science student
with courses like CS-301 Data Structures, Calculus III, Operating Systems,
tasks, and upcoming midterms).
---
SRC/CONTROLLERS (BUSINESS LOGIC & INTERACTION):
navigationController.js:
Handles page switching: switchView('dashboard' | 'tasks' | 'schedule' | 'exams' | etc.).
Handles mode switching: switchMode('app' | 'landing' | 'onboarding' | 'auth').
Toggles mobile responsive sidebar drawer (open/close).
dashboardController.js:
Calculates real-time statistics: total study hours, tasks due today, upcoming exams count, overall syllabus completion percentage.
Generates the weekly study hours activity bar graph.
Renders today's timeline and urgent action items.
tasksController.js:
Manages the task workflow.
Filters tasks by status: 'all', 'today', 'upcoming', 'completed', 'overdue'.
Handles adding a task from the modal form.
Toggles task completion with an audio chime celebration.
Handles task deletion.
Supports "See More / See Less" list expansion.
scheduleController.js:
Manages the weekly timetable calendar grid (Monday to Sunday, 8 AM - 8 PM).
Handles adding new study blocks, classes, or revision sessions.
Allows date navigation (prev week, next week, today).
examsController.js:
Calculates countdown days and hours remaining for each exam.
Renders the featured exam card with progress percentage.
Tracks syllabus topics breakdown (students check off topics as they study).
Automatically calculates estimated readiness score.
examRemindersController.js:
Lets students configure custom alert reminders for tests (e.g., 24 hours before, 2 hours before).
Features a "Test Alarm" button that plays an audio chime and triggers a toast notification.
subjectsController.js:
Displays course cards with course codes, professor names, credit hours, and subject-specific color tags.
Handles adding new courses.
goalsController.js:
Tracks academic goals (e.g., "Maintain 3.8 GPA", "Complete 50 coding problems").
Filters by active, completed, or archived goals.
notificationsController.js:
Notification inbox drawer.
Handles "Mark all as read" and "Clear notifications".
profileController.js:
Manages student profile settings, avatar photo upload, major, graduation year.
Calculates real-time GPA and completed credits.
onboardingController.js:
Interactive multi-step wizard for new students to customize their semester.
---
SRC/VIEWS (UI TEMPLATES & PRESENTATION):
src/views/menuBars.js:
Generates HTML for the top header and sidebar navigation.
Contains student branding, quick action buttons, and active link styling.
src/views/modals.js:
Generates HTML for modal dialogs:
Create Task Modal
Add Subject Modal
Create Exam Plan Modal
Add Schedule Block Modal
Backend Developer Handbook Modal
src/views/pages/:
Each view has its own dedicated page template file:
dashboardPage.js: Dashboard widgets, stats cards, and timeline.
schedulePage.js: Timetable grid and quick session planner.
tasksPage.js: Task filter tabs, task items, and search box.
examsPage.js: Exam readiness tracker, countdowns, and syllabus lists.
subjectsPage.js: Course cards and professor details.
goalsPage.js: Academic milestone cards with progress bars.
notificationsPage.js: Notification activity log.
profilePage.js: Profile details, academic standing, and security settings.
progressPage.js: Visual GPA and study analytics breakdown.
settingsPage.js: Student preferences and data reset options.
landingPage.js: Public landing page showcasing features.
signupPage.js: Student login and account registration screens.
---
SRC/UTILS (HELPERS):
toast.js:
Creates non-intrusive floating alert messages in the bottom-right corner.
Types supported: 'success' (green), 'error' (red), 'info' (indigo), 'warning' (amber).
Auto-dismisses after 3 seconds with a smooth slide-out animation.
modal.js:
Handles opening and closing popup dialogs by ID (e.g., openModal('create-task-modal')).
Locks background body scroll when open and closes on 'Escape' key press.
audio.js:
Generates pleasant sound effects (success ding, notification chimes) purely using the
browser's native Web Audio API (AudioContext) without needing external MP3 audio files!
---
SRC/SERVICES (API & BACKEND INTEGRATION):
apiService.js:
Contains the standardized RESTful API endpoints contract and fetch client.
This is the bridge where the frontend communicates with the backend!
================================================================================
3. DATA FLOW & STATE MANAGEMENT
Current Frontend Data Flow:
[User Action] (e.g., clicks "Add Task")
│
▼
[Modal Form Submitted] (e.g., handleAddTaskSubmit in tasksController.js)
│
▼
[State Mutation] (New task object pushed into appState.tasks)
│
▼
[Persistence] (saveState() writes appState into browser localStorage)
│
▼
[UI Re-Render] (renderTasks() updates the DOM dynamically)
│
▼
[Feedback] (showToast('Task added!') + playNotificationChime())
When connecting a Real Backend:
Instead of writing directly to 'localStorage', the controller will send an HTTP
request (e.g., fetch('/api/v1/tasks', { method: 'POST', body: ... })) to the backend.
The backend saves it to a database (PostgreSQL/MySQL/MongoDB) and returns JSON.
================================================================================
4. HOW A BACKEND DEVELOPER CAN WORK IN THIS PROJECT
Any backend technology can be used with this project:
Node.js (Express, NestJS, Fastify)
Python (FastAPI, Flask, Django)
Java (Spring Boot)
PHP (Laravel)
Go (Gin, Fiber)
C# (.NET Core)
Steps for the Backend Developer:
STEP 1: Set up the Backend Server
Create a backend project in your preferred language.
Run it on a local port (e.g., http://localhost:5000).
STEP 2: Enable CORS (Cross-Origin Resource Sharing)
Because the frontend runs on port 3000 (or Live Server port 5500) and the backend
runs on port 5000, you must enable CORS in the backend:
// Node/Express example:
const cors = require('cors');
app.use(cors({ origin: '*' }));
STEP 3: Configure the Frontend API Base URL
Open 'src/services/apiService.js'.
Set the API_BASE_URL to point to your backend:
export const API_BASE_URL = 'http://localhost:5000/api/v1';
STEP 4: Connect Controllers to API Calls
In each controller, replace local 'appState' operations with calls to 'ApiService'.
For example, in 'tasksController.js':
// OLD (LocalStorage):
appState.tasks.push(newTask);
saveState();
renderTasks();
// NEW (Connected to Backend):
const response = await fetch(`${API_BASE_URL}/tasks`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(newTask)
});
const savedTask = await response.json();
appState.tasks.push(savedTask);
renderTasks();
================================================================================
5. COMPLETE BACKEND REST API SPECIFICATION
Here are all the API endpoints the backend developer needs to implement:
---
AUTHENTICATION & USER PROFILE:
---
POST /api/v1/auth/signup
Request Body: { name, email, password, major }
Response (201): { user: { id, name, email }, token: "jwt_token_here" }
POST /api/v1/auth/login
Request Body: { email, password }
Response (200): { user: { id, name, email }, token: "jwt_token_here" }
GET /api/v1/profile
Headers: Authorization: Bearer <token>
Response (200): { id, name, email, avatar, major, university, semester, targetGpa, currentGpa }
PUT /api/v1/profile
Request Body: Updated fields
Response (200): Updated user object
---
DASHBOARD SUMMARY:
---
GET /api/v1/dashboard/summary
Response (200):
{
studyHoursThisWeek: 18.5,
tasksDueCount: 4,
upcomingExamsCount: 2,
overallProgressPercentage: 74,
weeklyActivity: [
{ day: "Mon", hours: 3.5 },
{ day: "Tue", hours: 4.0 },
{ day: "Wed", hours: 2.5 },
{ day: "Thu", hours: 5.0 },
{ day: "Fri", hours: 3.5 },
{ day: "Sat", hours: 0 },
{ day: "Sun", hours: 0 }
]
}
---
SUBJECTS (COURSES):
---
GET /api/v1/subjects
Response (200): Array of subjects:
[{ id: "s1", name: "Data Structures", code: "CS-301", instructor: "Dr. Chen", color: "indigo", credits: 4 }]
POST /api/v1/subjects
Request Body: { name, code, instructor, color, credits }
Response (201): Created subject object with 'id'
DELETE /api/v1/subjects/:id
Response (200): { message: "Subject deleted successfully" }
---
TASKS:
---
GET /api/v1/tasks?status=all
Optional Query Params: status (all | today | upcoming | completed | overdue)
Response (200): Array of task objects:
[{
id: "t1",
title: "Binary Trees Assignment",
subjectId: "s1",
subjectName: "Data Structures",
dueDate: "2026-10-05",
priority: "high", // "high" | "medium" | "low"
completed: false,
estimatedMinutes: 90
}]
POST /api/v1/tasks
Request Body: { title, subjectId, dueDate, priority, estimatedMinutes }
Response (201): Created task object
PATCH /api/v1/tasks/:id/toggle
Toggles task between completed (true) and pending (false)
Response (200): Updated task object
DELETE /api/v1/tasks/:id
Response (200): { message: "Task deleted successfully" }
---
SCHEDULE & TIMETABLE:
---
GET /api/v1/schedule?week=YYYY-MM-DD
Response (200): Array of calendar sessions:
[{
id: "sch1",
title: "Algorithms Lecture",
subjectId: "s1",
dayOfWeek: 1, // 0 = Sunday, 1 = Monday, ...
startTime: "09:00",
endTime: "10:30",
location: "Hall B",
type: "lecture" // "lecture" | "lab" | "study" | "revision"
}]
POST /api/v1/schedule
Request Body: { title, subjectId, dayOfWeek, startTime, endTime, type, location }
Response (201): Created schedule item
DELETE /api/v1/schedule/:id
Response (200): { message: "Session deleted" }
---
EXAMS & ROADMAPS:
---
GET /api/v1/exams
Response (200): Array of exams:
[{
id: "ex1",
title: "Midterm Examination",
subjectId: "s1",
examDate: "2026-10-18T10:00:00Z",
location: "Building 3, Room 204",
targetScore: 90,
topics: [
{ id: "top1", name: "Tree Traversals", completed: true },
{ id: "top2", name: "Dijkstra's Algorithm", completed: false }
],
reminders: [
{ id: "rem1", hoursBefore: 24, channel: "sound", enabled: true }
]
}]
POST /api/v1/exams
Request Body: { title, subjectId, examDate, location, targetScore, topics }
Response (201): Created exam object
PATCH /api/v1/exams/:id/topics/:topicId/toggle
Toggles a syllabus topic checked/unchecked
Response (200): Updated exam object with recalculated readiness score
POST /api/v1/exams/:id/reminders
Request Body: { hoursBefore, channel, enabled }
Response (201): Created reminder
---
GOALS:
---
GET /api/v1/goals?status=active
Response (200): Array of goals:
[{ id: "g1", title: "Complete 100 Practice Problems", category: "Academic", progressPercentage: 65, status: "active" }]
POST /api/v1/goals
Request Body: { title, category, progressPercentage }
Response (201): Created goal object
PATCH /api/v1/goals/:id
Request Body: { progressPercentage, status }
Response (200): Updated goal
================================================================================
6. RECOMMENDED DATABASE SCHEMA
If using a Relational SQL Database (PostgreSQL / MySQL / SQLite):
TABLE users:
id VARCHAR(36) PRIMARY KEY
name VARCHAR(100) NOT NULL
email VARCHAR(150) UNIQUE NOT NULL
password_hash VARCHAR(255) NOT NULL
major VARCHAR(100)
university VARCHAR(150)
current_gpa NUMERIC(3,2) DEFAULT 0.00
target_gpa NUMERIC(3,2) DEFAULT 4.00
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
TABLE subjects:
id VARCHAR(36) PRIMARY KEY
user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE
name VARCHAR(100) NOT NULL
code VARCHAR(20) NOT NULL
instructor VARCHAR(100)
color VARCHAR(20) DEFAULT 'indigo'
credits INT DEFAULT 3
TABLE tasks:
id VARCHAR(36) PRIMARY KEY
user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE
subject_id VARCHAR(36) REFERENCES subjects(id) ON DELETE SET NULL
title VARCHAR(200) NOT NULL
description TEXT
due_date DATE NOT NULL
priority VARCHAR(10) DEFAULT 'medium' -- 'high', 'medium', 'low'
completed BOOLEAN DEFAULT FALSE
estimated_minutes INT DEFAULT 60
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
TABLE exams:
id VARCHAR(36) PRIMARY KEY
user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE
subject_id VARCHAR(36) REFERENCES subjects(id) ON DELETE CASCADE
title VARCHAR(200) NOT NULL
exam_date TIMESTAMP NOT NULL
location VARCHAR(100)
target_score INT DEFAULT 85
TABLE exam_topics:
id VARCHAR(36) PRIMARY KEY
exam_id VARCHAR(36) REFERENCES exams(id) ON DELETE CASCADE
name VARCHAR(200) NOT NULL
completed BOOLEAN DEFAULT FALSE
TABLE schedule_sessions:
id VARCHAR(36) PRIMARY KEY
user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE
subject_id VARCHAR(36) REFERENCES subjects(id) ON DELETE SET NULL
title VARCHAR(200) NOT NULL
day_of_week INT NOT NULL -- 0 = Sunday, 1 = Monday, etc.
start_time TIME NOT NULL
end_time TIME NOT NULL
type VARCHAR(20) DEFAULT 'study'
================================================================================
7. READY-TO-USE BACKEND EXAMPLE (Node.js & Express)
To quickly test with a real backend, create a file named 'server.js' in a new folder:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory mock database
let tasks = [
  { id: '1', title: 'Calculus Assignment 4', priority: 'high', dueDate: '2026-10-04', completed: false },
  { id: '2', title: 'Data Structures Lab Prep', priority: 'medium', dueDate: '2026-10-06', completed: false }
];

// GET All Tasks
app.get('/api/v1/tasks', (req, res) => {
  res.json(tasks);
});

// POST New Task
app.post('/api/v1/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title,
    priority: req.body.priority || 'medium',
    dueDate: req.body.dueDate || new Date().toISOString().split('T')[0],
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH Toggle Task
app.patch('/api/v1/tasks/:id/toggle', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  res.json(task);
});

// DELETE Task
app.delete('/api/v1/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ message: 'Task deleted' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
```
To run this backend:
Initialize: npm init -y
Install dependencies: npm install express cors
Start server: node server.js
================================================================================
8. COLLEGE PRESENTATION / VIVA QUESTIONS & ANSWERS
Q1: What architecture does this application follow?
A1: It follows the Model-View-Controller (MVC) architecture using pure ES6 JavaScript modules.
- Model: Handles data state and persistence in 'src/data/state.js'.
- View: Modular presentation templates in 'src/views/'.
- Controller: Handles business logic, DOM updates, and events in 'src/controllers/'.
Q2: Why did you choose Vanilla JavaScript instead of heavy frameworks like React or Angular?
A2: Vanilla JavaScript has zero runtime overhead, near-instant load times, runs natively
in any modern browser without mandatory build tools, and clearly demonstrates a deep
understanding of foundational Web APIs (DOM, ES Modules, LocalStorage, Web Audio API).
Q3: How does data stay saved when the browser is refreshed?
A3: It uses the browser's native 'window.localStorage' API. Every time a task, exam, or course
is added or updated, 'saveState()' serializes the application state into a JSON string and
saves it. On page load, 'loadState()' retrieves and parses it.
Q4: How does the frontend communicate with a backend database?
A4: Through standard asynchronous HTTP requests using the modern JavaScript 'fetch()' API.
The 'ApiService' class in 'src/services/apiService.js' outlines all REST endpoints
(GET, POST, PATCH, DELETE) to send and receive JSON data from any backend server.
Q5: How is the visual design created?
A5: It combines Tailwind CSS utility classes (loaded via official browser CDN) for responsive
grid layouts, cards, and typography, alongside custom CSS in 'src/style.css' for layout
bounds and slim scrollbar styling.
Q6: How does the exam countdown timer work?
A6: The 'examsController.js' compares the target exam timestamp with the current time
(new Date()), calculating the remaining days and hours using JavaScript Date mathematics.
================================================================================
END OF GUIDE

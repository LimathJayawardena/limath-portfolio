🚀 Limath's Portfolio

A dynamic, dual-themed portfolio website built with modern web technologies. It features a unique split landing page that separates "Personal Life" from "Developer Skills," complete with a real-time Guestbook powered by Firebase.

⚠️ Important: Bring Your Own Keys

This project relies on Firebase (for Authentication & Database) and Google Gemini (for AI features). To run this locally, you must create your own Firebase project and API keys. The instructions below will guide you through this process.

✨ Features

🎭 Split Landing Page: Interactive split-screen design allowing visitors to choose between the "Personal" or "Developer" view.

🔐 Google Authentication: Secure sign-in functionality using Firebase Auth.

💬 Real-time Guestbook: Visitors can leave comments that update instantly across all devices using Firestore.

🤖 AI Muse: Integration with Google Gemini to generate creative prompts (requires API key).

🎨 Modern UI/UX: Built with Tailwind CSS and Framer Motion for smooth animations.

🚀 Getting Started

Follow these steps to set up the project on your own machine.

Prerequisites: Node.js installed on your computer.

A Google Account: (to access Firebase and AI Studio).

1. Clone the repository

git clone [https://github.com/LimathJayawardena/your-repo-name.git](https://github.com/LimathJayawardena/your-repo-name.git)


2. Navigate into the folder

cd your-repo-name


3. Install dependencies

npm install


4. Configuration (The Important Part!)

You need to create a configuration file with your own secret keys.

Create a new file inside the src/ folder named firebaseConfig.js.

Paste the following code into it:

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

// REPLACE THESE VALUES WITH YOUR OWN FIREBASE KEYS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);


(Optional) Open src/App.jsx and find the apiKey variable. Replace it with your own Google Gemini API Key if you want the AI feature to work.

🔥 How to Get Your Keys (Step-by-Step)

If you have never used Firebase before, here is how to get the values for the file above.

Step 1: Create a Firebase Project

Go to the Firebase Console.

Click "Add project" and give it a name (e.g., "My Portfolio").

Disable Google Analytics (not needed for this demo) and click Create Project.

Step 2: Register the App

In your new project dashboard, click the Web icon (</>).

Give the app a nickname (e.g., "Portfolio Web") and click Register app.

Copy the firebaseConfig object shown on the screen.

Paste those values into your src/firebaseConfig.js file (created in the previous section).

Step 3: Enable Google Sign-In

Go to Build -> Authentication in the sidebar.

Click Get Started.

Select the Sign-in method tab.

Click Google, toggle it to Enable, select your support email, and click Save.

Step 4: Create the Database

Go to Build -> Firestore Database in the sidebar.

Click Create Database.

Choose a location near you.

Select Start in Test Mode (this allows read/write access easily for development).

Click Create.

Once created, click Start collection:

Collection ID: guestbook

Add a Document: Click "Auto-ID".

Field 1: name (string) -> Value: "Admin"

Field 2: text (string) -> Value: "Welcome to the guestbook!"

Click Save.

5. Running the App

Once you have your keys set up:

npm run dev


The terminal will show a local URL (usually http://localhost:5173). Open that in your browser to see your portfolio!

📂 Project Structure

src/
├── assets/           # Images and static assets
├── App.jsx           # Main application logic & layout
├── Guestbook.jsx     # Guestbook component (Firestore logic)
├── firebaseConfig.js # YOUR KEYS (Do not commit this file!)
├── main.jsx          # React entry point
└── index.css         # Tailwind directives & global styles


I hope this helpful...! Thanks for read. Limath/Ramika Jayawardena

Contact -> GitHub LimathJayawardena

Any concerns or wrong let me know "I'm still a beginner". -> Email: limathramika8876@gmail.com
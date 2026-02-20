# 🎓 College Admissions Assistant Chatbot

A fully interactive college admissions chatbot built with React. Helps prospective students explore programs, track applications, find scholarships, and get 24/7 admissions guidance.

---

## ✨ Features

- 💬 **AI Chat** — Answers questions about programs, deadlines, GPA requirements, and scholarships
- 🎯 **Program Matcher** — Matches students to programs based on GPA, SAT score, and interests
- ✅ **Application Checklist** — Tracks all application components with a live progress bar
- ✍️ **Essay Tips** — Expert guidance for writing a standout personal statement
- 🏛️ **Virtual Campus Tours** — Explore 5 key campus locations interactively

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/admissions-chatbot.git
cd admissions-chatbot
```

### 2. Create a React App
```bash
npx create-react-app admissions-app
cd admissions-app
```

### 3. Replace the App File
Copy `admissions-chatbot.jsx` into the `src/` folder and rename it `App.js`, or import it inside your existing `App.js`.

### 4. Install & Run
```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📦 Tech Stack

- **React** — Frontend framework
- **CSS-in-JS** — Inline styles with animations
- **Google Fonts** — Lora + Source Sans 3
- **No external dependencies** required beyond React

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

### 1. Install gh-pages
```bash
npm install gh-pages --save-dev
```

### 2. Update `package.json`
Add these lines:
```json
"homepage": "https://YOUR_USERNAME.github.io/admissions-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### 3. Deploy
```bash
npm run deploy
```

Your app will be live at `https://YOUR_USERNAME.github.io/admissions-app`

---

## 📁 Project Structure

```
admissions-app/
├── src/
│   └── admissions-chatbot.jsx   # Main chatbot component
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🖼️ Preview

| Chat | Program Matcher | Checklist |
|------|----------------|-----------|
| AI-powered Q&A with suggestions | GPA + interest-based matching | Progress tracker with checkboxes |

---

## 📌 How to Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - admissions chatbot"
git remote add origin https://github.com/YOUR_USERNAME/admissions-chatbot.git
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🙌 Credits

Built with ❤️ using React and Claude AI.

# Anupama Singh - Personal Portfolio Website

A modern, responsive, and interactive personal developer portfolio for **Anupama Singh** (B.Tech in Computer Science & Artificial Intelligence at Newton School of Technology - RU Campus).

---

## 🌟 Highlights & Features

- **Personalized Narrative**: Features Anupama's real profile, including B.Tech in CS & AI at Newton School of Technology (RU Campus), schooling from Woodland Academy, passion for Python, Artificial Intelligence, Badminton, Basketball, and ambivert mindset.
- **Dynamic Typing Animation**: Cycles through key passions (*"B.Tech CS & AI Student"*, *"Python Programmer"*, *"Badminton Player"*, etc.).
- **Ambient Canvas Particles**: Gentle, responsive particle and constellation background animation.
- **Dark & Light Mode Toggle**: Seamless theme switching with persistent user preference via `localStorage`.
- **Responsive Layout**: Designed for mobile phones, tablets, and wide-screen monitors with a mobile slide-out drawer menu.
- **Interactive Skills Section**: Visual mastery bars and categorized skill tags.
- **Milestone Timeline**: Chronological academic journey from Woodland Academy to NST-RU.
- **Filterable Projects Grid**: Category-based filtering (Python & AI, Web Development) with smooth card transitions.
- **Interactive Contact Form**: Client-side validation with responsive feedback toasts.
- **Zero Heavy Dependencies**: Pure semantic HTML5, modern CSS3 (Custom Properties & Glassmorphism), and Vanilla JavaScript.

---

## 📁 Project Structure

```text
portfolio/
├── about myself       # Original biographical notes
├── index.html         # Main HTML5 semantic structure
├── style.css          # Modern styling, theme variables, glassmorphism & responsive media queries
├── script.js          # Interactive features (Typing, Dark/Light mode, Canvas particles, Contact form)
└── README.md          # Documentation and deployment guide
```

---

## 🚀 How to Run & Preview Locally

### Option 1: Direct in Browser
Double-click [`index.html`](index.html) or right-click and choose **Open With > Google Chrome / Safari / Edge**.

### Option 2: Using Python's Built-in Server
Open your terminal in this directory and run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🎨 Easy Customization Guide

1. **Update Social & Email Links**:
   - In `index.html`, search for `https://github.com`, `https://linkedin.com`, and `anupama@example.com` to insert your actual profile URLs.

2. **Add Your Profile Photo**:
   - In `index.html`, inside `<div class="avatar-graphic">`, replace the initials placeholder with an `<img>` tag:
     ```html
     <img src="your-photo.jpg" alt="Anupama Singh" class="avatar-img" />
     ```

3. **Add New Projects**:
   - Duplicate any `.project-card` block in `index.html` under the `<section id="projects">` section with your title, description, and GitHub repository link.

---

## 🌐 Free Deployment Options

- **GitHub Pages**:
  1. Create a GitHub repository named `portfolio` or `anupama-singh.github.io`.
  2. Push these files to GitHub.
  3. Go to **Settings > Pages** and set branch to `main` / root. Your portfolio will be live at `https://<username>.github.io/portfolio`!
- **Vercel / Netlify**:
  - Drag and drop this folder onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on Vercel for instant free SSL and fast hosting.


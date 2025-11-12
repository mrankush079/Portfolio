# 🚀 CodeANKUSH — Full Stack Portfolio Website

Welcome to **CodeANKUSH**, my personal portfolio built to showcase full-stack development skills across **React**, **Java/Spring Boot**, and **MongoDB**. This site features interactive UI/UX, secure admin tools, and recruiter-polished branding — from animated dashboards to downloadable CVs and certificate previews.

## 🌐 Live Demo

🔗 [Visit Portfolio](https://portfolio-seven-kappa-78.vercel.app)

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/Frontend-React-blue)
![Java](https://img.shields.io/badge/Backend-Java%2FSpringBoot-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

## 📸 Screenshots

| Home Page | Admin Login | Certificates |
|-----------|-------------|--------------|
| ![Home](<img width="1903" height="977" alt="image" src="https://github.com/user-attachments/assets/f1ad151e-c370-4838-bde4-16b8aa384f61" />
) | ![Admin](<img width="1911" height="975" alt="image" src="https://github.com/user-attachments/assets/27212003-4edc-4976-8fd3-0a7068aa9aec" />
) | ![Certs](<img width="1910" height="972" alt="image" src="https://github.com/user-attachments/assets/e5dfa984-5a6d-40c8-bed4-47a5379e085d" />
) |


---

## ✨ Features

- 🔥 Animated landing page with glowing icons and parallax effects
- 📄 CV download and certificate showcase with PDF preview
- 🛡️ Secure admin login with JWT authentication
- 📊 Admin dashboard with analytics cards, audit logs, and CSV export
- 📥 Contact form with email notifications and rate limiting
- 🧠 Modular backend with role-based access and error handling
- 🎨 Dark-themed UI with recruiter-polished branding

---

## 📁 Folder Structure

portfolio-web/ ├── frontend/ 
# React + Vite frontend ├── backend/       
# Express + MongoDB backend │  
├── controllers/ │ 
├── routes/ │  
├── models/ │  
├── middleware/ │  
└── server.js
├── .env           
# Environment variables
├── README.md      
# Project overview


---

## 🚀 Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/portfolio-web.git
cd portfolio-web


2. Setup backend

cd backend
npm install
npm run dev


3. Setup frontend

cd frontend
npm install
npm run dev

🔐 Environment Variables
Create a .env file in backend/


PORT=5000
MONGO_DB=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000


## 📡 API Routes

| Method | Endpoint                         | Access       | Description                          |
|--------|----------------------------------|--------------|--------------------------------------|
| POST   | `/api/contact`                   | Public       | Submit contact form                  |
| GET    | `/api/contact`                   | Admin only   | View all contact messages            |
| GET    | `/api/contact/export/csv`        | Admin only   | Export messages as CSV               |
| GET    | `/api/admin/audit-logs`          | Admin only   | View latest 100 audit logs           |
| GET    | `/api/admin/summary`             | Admin only   | Get dashboard stats (users, projects, messages) |
| GET    | `/api/projects`                  | Public       | Fetch all portfolio projects         |
| GET    | `/api/users`                     | Admin only   | Fetch all registered users           |
| GET    | `/api/health`                    | Public       | Check MongoDB connection status      |
| POST   | `/api/auth/login`                | Public       | Admin login, returns JWT token       |



👨‍💻 Author
Ankush Choudhary
📧 ankush.choudhary.01@gmail.com
📄 Download CV


 License
This project is open-source and free to use for learning and showcasing purposes.

---

Let me know if you want:
- A version with badges for deployment (Vercel, Netlify)
- A contributor section or changelog
- Markdown polish for GitHub profile integration

This README is recruiter-ready and highlights your full-stack power!



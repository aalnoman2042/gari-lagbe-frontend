# 🚖 Ride Management System

A production-grade, fully responsive ride booking platform (similar to Uber or Pathao) with role-based dashboards for Riders, Drivers, and Admins.

---

## 🌐 Live Deployment
- **Frontend:** [Frontend Live Link](https://gari-lagbe-frontend.vercel.app/)  
- **Backend:** [Backend Live Link](https://gari-lagbe-backend.vercel.app/)  


---

## 📖 Project Overview

This project is a full-stack ride booking application designed to provide a seamless experience for riders to request rides, and drivers to manage ride requests efficiently. The application includes:

- Role-based dashboards (Rider, Driver, Admin)  
- Real-time ride notifications for drivers  
- Emergency/SOS integration for safety  
- Analytics and earnings dashboards  
- Complete ride management, including booking, tracking, and history  

---

## ✨ Project Features

### Rider Features
- Request a ride with pickup & destination fields  
- Fare estimation and payment method selection  
- Live ride tracking (optional map integration)  
- Ride history with search & filters  
- Profile management (edit info, change password)  
- SOS/Emergency button for safety  

### Driver Features
- Online/Offline toggle for availability  
- Real-time ride requests notifications  
- Accept/Reject ride requests directly from notifications  
- Active ride management with status updates  
- Earnings dashboard (daily, weekly, monthly)  
- Ride history and profile management  

### Admin Features
- Manage users (approve, suspend, block/unblock)  
- View all rides with advanced filters  
- Analytics dashboard with charts and tables  
- Profile management  

### General Features
- JWT-based authentication & role-based access  
- Fully responsive design for mobile, tablet, and desktop  
- Form validation & proper error handling with toasts  
- Emergency/SOS contact management  
- Lazy-loading for heavy assets ( large tables)  
- Accessibility-compliant components  

---

## 🛠 Technology Stack

### Frontend
- React.js + TypeScript  
- Redux Toolkit & RTK Query  
- Tailwind CSS for styling  
- React Router for routing  
- Optional: Recharts, React Hot Toast  

### Backend
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT authentication + bcrypt password hashing  


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+  
- npm or yarn  
- MongoDB database  

### Frontend Setup
```bash
cd frontend
npm install
npm run dev

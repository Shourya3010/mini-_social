🚀 Mini Social App – Phase-Based Development
drive links- https://drive.google.com/file/d/1l2mdDDUrvQuoU9k90ZsFYiPHq9dbUAmt/view?usp=sharing
            https://drive.google.com/file/d/1eoDKfmwWniDJRngPwS9x8kRPAV5FKi7U/view?usp=sharing
            https://drive.google.com/file/d/1BWajAM98lNU46SIX2itgqOKIgvaJfIIQ/view?usp=sharing
            https://drive.google.com/file/d/1uivnDuDAfN7283OkyDBbyTqdxw0IRP9W/view?usp=sharing

A full-stack social media application built progressively in structured development phases using:

Node.js

Express

MongoDB

JWT Authentication

Multer

EJS

Flash Messages

This project was built step-by-step, focusing on backend fundamentals first, then adding authentication, authorization, UI, and enhancements.

🧩 Development Phases
🟢 Phase 1 – Express Server Setup

Goal: Initialize backend server.

Setup Node project

Installed Express

Configured environment variables

Connected MongoDB using Mongoose

Setup EJS templating engine

Static folder configuration

Key concepts:

Express middleware

MongoDB connection

Environment variables

🟢 Phase 2 – User Authentication (JWT)

Goal: Secure login & registration system.

Implemented:

User Model (name, email, password)

Password hashing using bcrypt

JWT token generation

Cookie-based authentication

Login & Register routes

Security Concepts:

Hashing passwords

JWT signing & verification

HTTP-only cookies

🟢 Phase 3 – Authentication Middleware

Goal: Protect private routes.

Created:

isAuth middleware

Token verification

Redirect to login if unauthorized

Now:

/feed becomes protected

Only logged-in users can access content

🟢 Phase 4 – Post Creation with Image Upload

Goal: Add content creation.

Implemented:

Post model

Multer for image uploads

File storage in public/uploads

Create post route

Concepts:

File handling

multipart/form-data

Multer disk storage

🟢 Phase 5 – Paginated Feed

Goal: Display posts efficiently.

Implemented:

Pagination using skip & limit

4 posts per page

Sorted newest first

Backend logic:

const page = parseInt(req.query.page) || 1;
const limit = 4;
const skip = (page - 1) * limit;

Concepts:

Database pagination

Query optimization

🟢 Phase 6 – Authorization (Owner-only Delete)

Goal: Restrict destructive actions.

Implemented:

Compare logged-in user ID with post owner ID

Allow delete only if owner matches

Logic:

if (post.user.toString() !== req.user.id) {
  return res.send("Unauthorized");
}

Concept:

Authorization vs Authentication

🟢 Phase 7 – Logout System

Goal: Secure session exit.

Implemented:

Clear JWT cookie

Redirect to login

Prevent feed access after logout

🟢 Phase 8 – Flash Messages

Goal: Improve UX with feedback messages.

Integrated:

express-session

connect-flash

Success & error alerts

Redirect-based messaging

Concept:

Session-based temporary messages

🟢 Phase 9 – UI Enhancement

Improved:

Modern login card

Styled feed page

Navbar with logout

Clean post cards

Responsive layout

🏗 Final Architecture
Client (EJS Views)
        ↓
Express Routes
        ↓
Middleware (Auth + Upload)
        ↓
MongoDB (User + Post)
🔐 Security Summary

Passwords hashed

JWT stored in httpOnly cookie

Protected routes

Owner-based authorization

Flash messaging

📂 Tech Stack

Backend:

Node.js

Express

MongoDB

Mongoose

JWT

Multer

Frontend:

EJS

CSS

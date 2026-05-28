# User Authentication System

A web-based authentication system built from scratch to understand how login and signup actually work under the hood. This project was built phase by phase, focusing on learning each concept deeply rather than just copying code.

---

## About This Project

Most developers use authentication libraries without understanding what happens behind the scenes. This project was built to change that — every line of code was written with the goal of understanding *why* it exists, not just *what* it does.

The majority of the work lives in `server.js` — a single backend file that handles everything from receiving form data to hashing passwords to managing sessions.

---

## Features

- User signup with email and password
- Password hashing before saving to database
- Unique username enforcement
- User login with hashed password comparison
- Session-based authentication
- Protected routes — home page only accessible when logged in
- Logout that destroys the session

---

## Tech Stack

**Frontend**
- HTML — signup, login, and home pages

**Backend**
- Node.js
- Express.js — server and routing
- better-sqlite3 — local database
- bcrypt — password hashing
- express-session — session management

---

## What I Learned

This project taught me how authentication actually works, not just how to use it. Here are the key concepts I picked up:

**1. How HTTP forms work**
Forms package user input and send it to the server via POST requests. The `name` attribute on inputs is what connects the HTML to the backend — without it, the server receives nothing.

**2. POST vs GET**
GET puts data in the URL — dangerous for passwords since they show up in browser history and server logs. POST sends data in the request body, keeping it hidden.

**3. SQL Injection**
One of the most common web attacks. If you build SQL queries by joining strings directly with user input, an attacker can type SQL code into a form field and manipulate your database. Using `?` placeholders with `db.prepare()` completely prevents this.

**4. Password Hashing with bcrypt**
Passwords should never be stored as plain text. bcrypt converts a password into an unreadable hash that can never be reversed. It also adds a unique random salt to every hash, meaning two users with the same password get completely different hashes in the database.

**5. Sessions and Stateless HTTP**
HTTP is stateless — the server forgets you after every request. Sessions solve this by storing a session ID in a cookie that the browser sends automatically with every request, letting the server remember who you are.

**6. Middleware**
A function that runs between a request arriving and a route handling it. Used here as a "bouncer" that checks if a user is logged in before allowing access to protected pages.

**7. APIs**
Without realizing it, this project involved building two APIs — `POST /signup` and `POST /login`. An API is just two things talking to each other, nothing more.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/user-authentication.git

# Navigate into the project
cd user-authentication

# Install dependencies
npm install

# Start the server
node server.js
```

Then open `http://localhost:3000/signup.html` in your browser.

---

## How to Use

1. Visit `http://localhost:3000/signup.html` to create an account
2. Visit `http://localhost:3000/login.html` to log in
3. After login you'll be redirected to the home page
4. Click logout to end your session
5. Try visiting `http://localhost:3000/home` without logging in — you'll be redirected back to login

---

## Project Structure

```
auth-project/
├── public/
│   ├── signup.html
│   ├── login.html
│   └── home.html
├── package.json
├── .gitignore
└── server.js
```

---

## Acknowledgements

Built with guidance from Claude (Anthropic) as a learning project. All code was written and debugged manually to ensure genuine understanding of each concept.

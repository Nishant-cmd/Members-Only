# Members-Only

A members-only message board built with Node.js and Express. You need an account to read messages, and only club members can see who wrote them and when.

---

## Features

- Sign up and log in securely
- Write messages with a title and body
- Join the club with a secret passcode to unlock authors and timestamps
- Delete your own messages
- Admin access to delete any message

### Who sees what

| | Read messages | See author & time | Delete |
|---|:---:|:---:|:---:|
| Visitor (not logged in) | ✗ | ✗ | ✗ |
| Logged-in user | ✓ | ✗ | Own only |
| Club member | ✓ | ✓ | Own only |
| Admin | ✓ | ✓ | All |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Framework | [Express](https://expressjs.com/) |
| Templating | [EJS](https://ejs.co/) |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| Auth | [Passport.js](https://www.passportjs.org/) (Local Strategy) |
| Validation | [express-validator](https://express-validator.github.io/) |
| Password hashing | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| Sessions | [express-session](https://github.com/expressjs/session) |
| Dev server | [nodemon](https://nodemon.io/) |

---

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/Nishant-cmd/Members-Only.git
cd Members-Only
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the database

Open your PostgreSQL shell (or pgAdmin) and create a new database:

```sql
CREATE DATABASE members_only;
```

### 4. Set up the `.env` file

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following variables:

```env
DATABASE_URL=postgresql://<your_pg_user>:<your_pg_password>@localhost:5432/members_only
SESSION_SECRET=your_session_secret_here
CLUB_PASSCODE=your_club_passcode_here
ADMIN_PASSCODE=your_admin_passcode_here
```

Replace the placeholders with your actual values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `SESSION_SECRET` | Any long random string for signing sessions |
| `CLUB_PASSCODE` | The passcode users enter to become club members |
| `ADMIN_PASSCODE` | The passcode to gain admin privileges |

### 5. Initialize the database tables

Run the provided script to create the required tables:

```bash
node db/populatedb.js
```

This creates the `users` table and `messages` table (with a `membership_status` enum).

### 6. Start the development server

```bash
npm run dev
```

The app will be running at **http://localhost:3000**

---

## Project Structure

```
Members-Only/
├── app.js                  # Express app entry point
├── config/
│   └── passport.js         # Passport local strategy
├── controllers/
│   ├── authController.js   # Login, register, logout handlers
│   ├── userController.js   # Message and club handlers
│   └── validation.js       # express-validator rules
├── db/
│   ├── pool.js             # PostgreSQL connection pool
│   └── populatedb.js       # Database initialisation script
├── middleware/
│   ├── locals.js           # Sets res.locals for all views
│   └── requireAuth.js      # Auth guard middleware
├── model/
│   └── queries.js          # All database queries
├── routes/
│   └── authRouter.js       # All application routes
├── views/
│   ├── auth/               # Login and register pages
│   ├── messages/           # Message board pages
│   └── partials/           # Header, footer, errors
└── public/
    ├── style.css           # CSS entry point
    └── css/                # Modular CSS files
```

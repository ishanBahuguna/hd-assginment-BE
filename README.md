# Backend API

A Node.js backend application built with TypeScript, featuring PostgreSQL database integration, JWT authentication, and email OTP functionality using Nodemailer.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/) (will be installed as part of setup)

## Getting Started

Follow these steps to set up and run the backend server locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

### 3. Install TypeScript

If TypeScript is not already installed globally, install it:

```bash
npm install -g typescript
# or install it locally as a dev dependency
npm install --save-dev typescript
```

### 4. Database Setup (Neon PostgreSQL)

1. Create a [Neon](https://neon.tech/) account
2. Create a new database project
3. Copy the connection string from your Neon dashboard

### 5. Gmail Setup for OTP Service

To enable OTP email functionality, you'll need to set up a Gmail account with App Password:

1. **Create or use an existing Gmail account**
2. **Enable 2-Factor Authentication** on your Google account
3. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security > 2-Step Verification
   - At the bottom, click "App passwords"
   - Select "Mail" and generate a password
   - Copy the generated 16-character password

### 6. Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and configure all required variables:
   ```env
   # POSTGRES DATABASE URL
   DATABASE_URL=postgresql://username:password@host:port/database

   # GOOGLE CREDENTIALS FOR OTP SENDING
   MAIL_USER="your-gmail@gmail.com"
   MAIL_PASSWORD="your-16-char-app-password"

   # JSONWEBTOKEN SECRET
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

#### Environment Variables Details:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname` |
| `MAIL_USER` | Gmail address for sending OTP emails | `yourapp@gmail.com` |
| `MAIL_PASSWORD` | Gmail App Password (16 characters) | `abcd efgh ijkl mnop` |
| `JWT_SECRET` | Secret key for JWT token signing | `my-super-secret-jwt-key-2024` |

### 7. Start the Development Server

Run the development server:

```bash
npm run dev
```

The server will start and typically be available at `http://localhost:3000` (check console output for the exact port).

## Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the compiled JavaScript version
- `npm run lint` - Run the linter (if configured)
- `npm test` - Run tests (if configured)

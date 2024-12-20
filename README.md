# FlashcardsApp

## Overview

FlashcardsApp is a web application that helps users create, manage, and study flashcards to enhance their learning experience. Whether you are a student, teacher, or lifelong learner, our app provides the tools you need to succeed.

## Prerequisites

### Node.js and npm

Make sure you have Node.js and npm installed. You can download Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/). Make sure to download the LTS version.

### VSCode

We recommend using VSCode for this project. Make sure you have the following extensions installed:

- Prettier - Code formatter
- Auto Rename Tag
- GitLens - Git supercharged

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/UCLL-Full-stack/project2425-groep1-23.git
cd project2425-groep1-23
```

### 2. Create Environment Files

Create the `.env` file in the `back-end` directory with the following content:

```sh
# .env (back-end)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flashcarddb?schema=public"
JWT_SECRET="2492067e5cebc3914bc9f7d502472b6d8bbaeb994441409ce7f7b48898e6e44f341b67316ea7ae916c206dc91b751f9157aa6cc9779f908e52660e42fa5013f1"
JWT_EXPIRES_HOURS=8
```

Create the `.env.local` file in the `front-end` directory with the following content:

```sh
# .env.local (front-end)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### 3. Install Dependencies

Navigate to the `back-end` directory and install the dependencies:

```sh
cd back-end
npm install
```

Navigate to the `front-end` directory and install the dependencies:

```sh
cd ../front-end
npm install
```

### 4. Start the Backend Server

Navigate to the `back-end` directory and start the server:

```sh
cd back-end
npm run dev
```

### 5. Start the Frontend Server

Navigate to the `front-end` directory and start the development server:

```sh
cd ../front-end
npm run dev
```

### 6. Access the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the frontend application.

## Additional Information

### Backend

The backend server is built with Node.js and Express. It uses Prisma as the ORM to interact with the database. The backend server runs on port 4000 by default.

### Frontend

The frontend application is built with Next.js and React. It uses next-i18next for internationalization and js-cookie for handling cookies.

## Authors

- Brent Van Eyken - r0702481
- Burak Anil Taskiran - r0855255

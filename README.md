[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/twPj_hbU)

# FlashcardsApp

## Overview

Provide a brief overview of your project here.

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
DATABASE_URL=your_database_url
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

## Authors

- Brent Van Eyken - r0702481
- Burak Anil Taskiran - r0855255

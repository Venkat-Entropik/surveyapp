# Survey App

The Survey App is a React + TypeScript application built with Chakra UI. It allows users to store images, videos, and surveys in a Firebase database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Configuration](#Configuration)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Any code editor like vs code
- Firebase account and project set up

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/venky123895/surveyapp.git

2. **Change into the project directory:**

   ```bash
   cd survey-app

3. **Install Dependency:**

    ```bash
   npm install

4. ## Configuration

1. **Create a Firebase Project:**
   - Visit [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Obtain Your Firebase Configuration:**
   - Go to Project Settings > General.
   - Scroll down to the "Your apps" section.
   - Click on the `</>` icon to add a web app to your project.
   - Copy the configuration snippet.

3. **Copy the configuration into src/components/config/firebaseConfig.ts:**
   ```javascript
   // Firebase Config
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   };

1. ## Usage
   1. **Run the application locally:**
      ```bash
      npm start


Criminal Capture Game

This is a web-based game built using Next.js 14 and TypeScript, simulating the capture of a fugitive by three cops. The project follows modern Next.js features, including server actions, Prisma ORM, and MySQL database.

🚀 Live Demo

Criminal Capture Game

🛠️ Technologies Used

Next.js 14 (App Router, Server Actions)

TypeScript

React-Hook-Form & Zod (Form validation)

Prisma ORM (Database management)

MySQL (Database)

Vercel (Frontend Deployment)

Railway (MySQL Deployment)

Jest & Playwright (Testing)

📥 Installation and Setup

1️⃣ Clone the Repository

git clone <repository-url>
cd criminal-capture

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add your MySQL connection URL and Base API URL:

DATABASE_URL="mysql://root:your_password@localhost:3306/criminal_capture"
BASE_URL="http://localhost:3000/api"

Example (For Local MySQL):

DATABASE_URL="mysql://root:Vivek@8433085703@localhost:3306/criminal_capture"
BASE_URL="http://localhost:3000/api"

Example (For Railway Deployed MySQL):

DATABASE_URL="mysql://root:LsyZmZCbQDjGNLIiumeXlqbwfxXTzBqR@nozomi.proxy.rlwy.net:22826/railway"

4️⃣ Install Prisma & MySQL Client

npm install @prisma/client @prisma/cli

5️⃣ Generate Prisma Client

npx prisma generate

6️⃣ Run the Development Server

npm run dev

The project will be available at: http://localhost:3000


🚀 Deployment

Frontend Deployment (Vercel)

This project is deployed on Vercel. To deploy your own version:

Push the code to GitHub.

Connect your repository to Vercel.

Set up environment variables in Vercel (DATABASE_URL, BASE_URL).

Deploy the project.


Database Deployment (Railway)

The MySQL database is deployed using Railway. To deploy your own database:

Create an account on Railway.app.

Create a new MySQL database.

Copy the provided DATABASE_URL and add it to your .env file.


🕹️ Gameplay Flow

Landing Page

Displays a Settings icon (top right).

Clicking the Settings icon navigates to the settings page, where users can add, update, and delete cities, vehicles, and cops.

Clicking the Start Game button navigates to the Selection Page.

Selection Page

A form opens where all cops select a city and a vehicle.

On submitting the form, the user navigates to the Results Page.

Results Page

Displays the capture status.

If a cop captures the criminal, the cop's name is displayed.

If no cop captures the fugitive, a "Fugitive Escaped!" message is shown.


🏙️ Cities and Distances

Yapkashnagar (60 KM)

Lihaspur (50 KM)

Narmis City (40 KM)

Shekharvati (30 KM)

Nuravgram (20 KM)

🚗 Vehicles and Ranges

EV Bike (60 KM range, 2 available)

EV Car (100 KM range, 1 available)

EV SUV (120 KM range, 1 available)


If you have any issues running the project, feel free to raise an issue on GitHub or reach out to me. 😊

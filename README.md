KaamOn: On-Demand Service Marketplace 🇮🇳
KaamOn is a modern, responsive web application designed to connect users with trusted local service workers. Built with Next.js and styled with Tailwind CSS, this platform provides a seamless experience for finding, booking, and managing services like plumbing, electrical work, cleaning, and more.

Tagline: "Har Kaam, Bas Ek Tap Mein!" (Every Task, In Just One Tap!)

✨ Key Features
Role-Based Dashboards: Separate, feature-rich dashboards for Users, Workers, and Admins.

Service & Worker Discovery: Browse a wide range of services and filter through detailed worker profiles.

Dynamic Filtering: Easily filter workers by service category to find the perfect professional for the job.

Mock Authentication: A complete, client-side authentication flow (Login, Signup, Logout) using localStorage to simulate user roles.

Interactive Booking System: A sleek modal-based booking process with date, time, and address selection.

Modern UI/UX: Built with shadcn/ui, featuring beautiful components like toasts, dialogs, and cards with "glassmorphism" effects.

Rich Animations: Smooth page transitions and component animations powered by Framer Motion.

Fully Responsive: A seamless experience across desktop, tablet, and mobile devices.

🛠️ Tech Stack
Framework: Next.js 15 (with Turbopack)

Styling: Tailwind CSS

UI Components: shadcn/ui

Language: TypeScript

Animations: Framer Motion

Icons: Lucide React

Notifications: Sonner

Forms: React Hook Form

🚀 Getting Started
Follow these instructions to get a local copy of the project up and running.

Prerequisites
Node.js (v18.0 or later recommended)

A package manager like npm, yarn, or pnpm

Installation
Clone the repository:

Bash

git clone https://github.com/Vedantrrai/KaamOn-VRR.git
cd kaamon
Install dependencies:

Bash

npm install
or if you use yarn:

Bash

yarn install
Run the development server:
The project uses Next.js with Turbopack for lightning-fast development.

Bash

npm run dev
Open your browser:
Navigate to http://localhost:3000 to see the application in action.

Demo Accounts
You can use the following mock accounts on the login page to explore the different user roles:

User: user@test.com

Worker: worker@test.com

Admin: admin@test.com

(Any password will work for these demo accounts).

📁 Project Structure
The project follows a standard Next.js App Router structure.

/
├── public/               # Static assets (images, fonts)
│   ├── services/
│   └── workers/
├── src/
│   ├── app/              # Main application routes
│   │   ├── (dashboard)/
│   │   ├── about/
│   │   ├── login/
│   │   ├── page.tsx      # Homepage
│   │   └── ...
│   ├── components/       # Reusable components
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utilities and data
│   │   ├── auth.ts       # Mock authentication logic
│   │   └── mockData.ts   # All mock data for services, workers, etc.
│   └── ...
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
└── ...

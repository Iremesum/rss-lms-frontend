# RSS Server + LMS Frontend

**GitHub Repository:** https://github.com/Iremesum/rss-lms-frontend

Assessment 1 for CSE5006 Cloud Web Applications — a frontend-only implementation
built with Next.js, React, and Tailwind CSS.

## About

This project is the first stage of a multi-stage assignment: building the
frontend for an RSS Server. This stage focuses on frontend design, usability,
and accessibility, using placeholder blog-style content in place of live RSS data.

## Features

- Component-based architecture (Header, Footer, Navbar, Breadcrumbs)
- Responsive, animated hamburger menu for mobile navigation
- Light/dark theme toggle, preference saved via cookie
- Live search bar and hover feedback on the Feeds page
- Full announcement system: create, edit, and delete posts (with author and optional image), persisted via localStorage
- Breadcrumb navigation
- Dynamic feed post pages (`/feeds/[id]`)
- Expandable "show more/less" content sections
- Accessibility features: ARIA attributes, keyboard navigation support

## Getting Started

Install dependencies and run the development server:

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — pages and routes (App Router)
- `app/components/` — reusable UI components
- `app/context/` — theme state management
- `app/data/` — sample post data (stand-in for RSS data)

## Author

Name: Irem Ercan Sumer — Student Number: 22591527
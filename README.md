# SpotScout
**API-first restaurant finder (portfolio project)**

SpotScout helps you quickly find restaurants in any city by searching real business data and displaying clean, readable results with proper loading, error and empty states.

## Live Demo
- **Deployed app:** <https://spotscout-9575igd1z-brunas-projects-7a3fa527.vercel.app/>

## Screenshots
[Search](./public/screenshots/search.png) 
[Results](./public/screenshots/results.png) 
[Saved](./public/screenshots/saved.png)

## Why I Built This
I built SpotScout to demonstrate **production-grade front-end development patterns**, including API integration, secure credential handling, resilient UX states, and real deployment workflows.

This project reflects how modern front-end applications interact with external APIs safely while maintaining a clean, user-focused interface.

## Key Features (MVP)
- Search restaurants by **city** + optional keyword (e.g., “sushi”)
- Real-time results from the **Yelp Fusion API**
- Clear UX states:
  - idle
  - loading
  - empty results
  - error + retry
- Serverless API proxy to keep credentials secure
- Save/unsave restaurants (localStorage)
- Dedicated Saved page for quick access

## Tech Stack
- **React + Vite**
- **Vercel Serverless Functions** (`/api/search`)
- **Yelp Fusion API**
- LocalStorage for client-side persistence
- Deployed on **Vercel**

## Architecture (Real-World Pattern)
Because the Yelp API key must remain private, the frontend never calls Yelp directly.

## Flow:

1. React UI calls `/api/search?city=...&term=...`
2. Vercel serverless function (`api/search.js`) calls Yelp using `YELP_API_KEY`
3. Server returns a sanitized response back to the UI

This mirrors how production apps integrate with 3rd-party APIs safely.

## What This Project Demonstrates
- API-first front-end architecture
- Secure handling of third-party credentials via serverless functions
- Clean management of async UI states (loading, empty, error, retry)
- Separation of concerns between UI, services, and storage utilities
- Local persistence using reusable abstractions
- Real deployment and iteration workflow on Vercel

## Getting Started (Local Development)

1) Install dependencies

npm install   

2) Environment variables

Create a .env.local file at the project root:

YELP_API_KEY=your_api_key_here

3) Run the app
npm run dev

4) Run with serverless API locally (recommended)
vercel dev

### Future Improvements

- Pagination and advanced result sorting
- Filters (price range, rating, open now)
- Shared saved lists
- Accessibility and keyboard navigation improvements

## Author

Built by **Bruna Medeiros de Oliveira**
Front-End Developer focused on clean UX, real-world problem solving, and production-ready architecture.
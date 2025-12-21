# SpotScout
**API-first restaurant finder (portfolio project)**

SpotScout helps you quickly find restaurants in any city by searching real business data and displaying clean, readable results with proper loading / error / empty states.

## Live Demo
- **Deployed app:** <https://spotscout-e3u1m1v1p-brunas-projects-7a3fa527.vercel.app/>

## Why I Built This
I built SpotScout to demonstrate real-world front-end development patterns that are directly transferable to production apps:
- API-driven UI with resilient UX states
- secure API key handling (no secrets in the browser)
- clean separation between UI, services, and serverless backend
- deploy + iteration workflow

## Key Features (MVP)
- Search restaurants by **city** + optional keyword (e.g., “sushi”)
- Real-time results from the **Yelp Fusion API**
- Clear UI states:
  - idle
  - loading
  - empty results
  - error + retry
- Serverless API proxy to keep credentials secure
- Save/unsave restaurants (localStorage)
- Saved list page for quick access

## Tech Stack
- **React + Vite**
- **Vercel Serverless Functions** (`/api/search`)
- **Yelp Fusion API**
- Deployed on **Vercel**

## Architecture (Real-World Pattern)
Because the Yelp API key must remain private, the frontend never calls Yelp directly.

**Flow:**
1. React UI calls `/api/search?city=...&term=...`
2. Vercel serverless function (`api/search.js`) calls Yelp using `YELP_API_KEY`
3. Server returns a sanitized response back to the UI

This mirrors how production apps integrate with 3rd-party APIs safely.

## Getting Started (Local Development)

### 1) Install
```bash
npm install   
```
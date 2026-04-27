# Music Album App

A React app with two modules:

1. Albums module: lists albums fetched from an API.
2. Tracks module: lists tracks for a selected album fetched from an API.

## Tech stack

- React + Vite
- React Router
- Fetch API

## Run

Install dependencies and start the app:

- `npm install`
- `npm run dev`

## API Notes

- In development, external API requests are routed through the Vite proxy (`/api/musicbrainz` and `/api/coverart`) to reduce browser CORS issues.
- If you deploy this app, use a backend/serverless proxy in production as well to avoid direct browser calls to third-party APIs.

## Routes

- `/albums` - albums list

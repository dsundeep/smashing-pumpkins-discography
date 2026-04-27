# Smashing Pumpkins Albums App

A React application for browsing Smashing Pumpkins albums, opening album-specific track details in a modal, and exploring results with search, sorting, and pagination controls.

## Local Setup

1. Prerequisites:
1. Node.js 20+ (recommended)
2. npm 10+
2. Clone and install:
1. git clone <your-repository-url>
2. cd music-album-app
3. npm install
3. Start development server:
1. npm run dev
2. Open the local URL shown in terminal (usually http://localhost:5173)
4. Build and preview production output:
1. npm run build
2. npm run preview

## Folder Structure

Core structure (important folders):

```text
src/
	api/          # API layer (MusicBrainz/CoverArt integration)
	components/   # Reusable UI pieces (cards, toolbar, modal)
	config/       # App constants and API configuration
	modules/      # Feature modules (albums page)
	routes/       # Route mapping
	utils/        # Shared helpers (date/string utils)
tests/
	setupTests.js # Global Vitest + Testing Library setup
```

### Highlights

1. `modules` contains feature-level logic and views.
2. `components` contains reusable UI blocks.
3. `config` keeps constants centralized (routes, defaults, API paths).
4. `utils` keeps cross-cutting helper functions reusable and testable.

## Highlights

1. Album discovery with list and card view modes.
2. Fast filtering by title or release date.
3. Sort options for title and release date.
4. Pagination optimized for larger album collections.
5. Track modal window with album cover, metadata, and in-modal track search/sort.
6. Graceful cover-image fallback for missing or broken image URLs.
7. Skeleton loading states and clear error/empty-state messaging.
8. Shared toolbar component reused across browsing contexts.

## Technical Overview

1. Frontend framework: React 19 with Vite.
2. Routing: React Router.
3. UI system: Material UI with Emotion.
4. Data sources:
1. MusicBrainz for album and track metadata.
2. Cover Art Archive for cover images.
5. Network layer:
1. Centralized API module with retry and exponential backoff behavior.
2. Proxy-based API access in development to minimize browser CORS issues.
6. Project structure:
1. Feature-oriented modules and components.
2. Shared utilities for date and string handling.
3. Centralized configuration constants under src/config.

## Architecture Notes

1. Route handling is centralized in an app routes component.
2. The albums page is the primary route and interaction surface.
3. Track details are intentionally shown in a modal workflow instead of a dedicated route.
4. Search/sort/pagination behavior is computed in page/component state and memoized selectors.

## Scripts

1. npm run dev: Start the development server.
2. npm run build: Create a production build.
3. npm run preview: Preview the production build locally.
4. npm run lint: Run ESLint checks.
5. npm run test: Execute unit tests.
6. npm run test:coverage: Execute unit tests with coverage reporting.

## Linting

1. Run linting:
1. npm run lint
2. What it checks:
1. Code quality rules from ESLint.
2. React hooks usage rules.
3. Semicolon enforcement and consistency rules.
3. Recommended workflow:
1. Run lint before every commit.
2. Fix warnings/errors immediately to keep CI clean.

## Unit Tests

1. Run all tests:
1. npm run test
2. Run tests with coverage:
1. npm run test:coverage
3. Testing stack:
1. Vitest
2. Testing Library
3. jsdom
4. Current focus:
1. Utilities and config validation
2. API behavior and mapping
3. Route and component rendering behavior
4. Albums page and modal interaction flows

## API and Environment Notes

1. In development, external API requests are proxied through Vite endpoints:
1. /api/musicbrainz
2. /api/coverart
2. In production, use a backend or serverless proxy to avoid direct browser calls to third-party APIs.
3. Retry behavior and API constants are configured in dedicated config files.

## Routes

1. /albums: Album browsing page.

## Testing and Quality

1. Unit testing is powered by Vitest and Testing Library.
2. Coverage reporting is enabled via V8 coverage provider.
3. Linting uses ESLint with React Hooks and Vite-focused rules.

## Future Enhancements

1. Add track duration and richer metadata in the track modal.
2. Cache API responses more aggressively for faster repeated browsing.
3. Add debounced search and URL-synced filters for shareable views.
4. Introduce integration tests for critical user flows.
5. Add accessibility improvements such as keyboard shortcuts and richer ARIA semantics.
6. Add optional theming and personalization settings.
7. Add production-ready backend proxy endpoints and API observability.

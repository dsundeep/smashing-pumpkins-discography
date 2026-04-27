# Smashing Pumpkins Albums App

A React application for browsing Smashing Pumpkins albums, opening album-specific track details in a modal, and exploring results with search, sorting, and pagination controls.

## Folder Structure

Core structure (important folders):

```text
src/
	api/          # API layer (MusicBrainz/CoverArt integration)
	components/   # Reusable UI pieces (cards, toolbar, modal)
	config/       # App constants and API configuration
	modules/      # Feature modules (contains feature-level logic and views)
	routes/       # Route mapping
	utils/        # Shared helpers (date/string utils)
tests/
	setupTests.js # Global Vitest + Testing Library setup
```

## Functionality

Albums Page:
1. Albums with list view and card view modes.
2. Fast filtering by title or release date.
3. Sort options for title and release date.
4. Pagination optimized for larger album collections.
5. Buffering animation of album cards during initial page load.
6. Graceful cover-image fallback for missing or broken image URLs.
7. clear error/empty-state messaging.

Tracks Modal:
1. Modal window with a cover image, album title and release date.
2. Modal window with a list of all the tracks under the selected albums.
3. Fast filtering and Sort options for title.

## Code Quality

1. Code is organized by feature and responsibility (`modules`, `components`, `utils`, `config`).
2. Shared logic is extracted into utility and config files to reduce duplication.
3. ESLint is configured and integrated through scripts.
4. Unit tests and coverage checks are part of the development workflow.
4. Search/sort/pagination behavior is computed in page/component state and memoized selectors.

## Design System Usage

1. Material UI components are used for consistency (cards, dialogs, form controls, icons, alerts, skeletons).
2. Shared components such as `BrowseToolbar`, `AlbumCoverCard`, and `TracksModal` improve reuse.
3. UI behavior and styling patterns are kept consistent across list and modal interactions.

## Error Handling

1. API layer includes retry and backoff behavior for transient failures.
2. UI displays clear fallback states for loading, empty results, and request errors.
3. Image fallback handling avoids broken UI when album cover images fail.
4. Proxy-based API access in development to minimize browser CORS issues.

## User Experience

1. Responsive layout supports both desktop and mobile usage.
2. Search, sort, and pagination provide intuitive data exploration.
3. Modal-based track browsing keeps users in context without route jumps.
4. Skeleton loaders and consistent feedback improve perceived performance.

## Approach

1. The implementation follows an incremental, feature-first approach.
2. Core behavior was built first, then enhanced with UI consistency, error resilience, and testing.
3. Configuration, utilities, linting, and tests were added to improve maintainability and delivery quality.

## Future Enhancements

1. Cache API responses more aggressively for faster repeated browsing.
2. Add debounced search and URL-synced filters for shareable views.
3. Introduce integration tests for critical user flows.
4. Add accessibility improvements such as keyboard shortcuts and richer ARIA semantics.
5. Add optional theming and personalization settings.
6. Add production-ready backend proxy endpoints and API observability.

## Local Setup

Prerequisites:
1. Node.js 20+ (recommended)
2. npm 10+

Clone and install:
1. git clone <your-repository-url>
2. cd music-album-app
3. npm install

Build, lint and test coverage:
1. npm run dev: start the development server (usually http://localhost:5173)
2. npm run build: Create a production build.
3. npm run preview: Preview the production build locally.
4. npm run lint: Run ESLint checks.
5. npm run test: Execute unit tests.
6. npm run test:coverage: Execute unit tests with coverage reporting.

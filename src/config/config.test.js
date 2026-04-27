import { describe, expect, it } from 'vitest';
import { API_PATHS, MUSICBRAINZ_ARTIST_ID, NETWORK_RETRY } from './apiConfig';
import {
  DEFAULT_ALBUM_SORT_OPTIONS,
  DEFAULT_TRACK_SORT,
  ITEMS_PER_PAGE,
  ROUTE_PATHS,
  UNKNOWN_DATE,
} from './appConstants';

describe('config', () => {
  it('exposes api config constants', () => {
    expect(API_PATHS.musicbrainzBase).toContain('/api/musicbrainz');
    expect(API_PATHS.coverArtBase).toContain('/api/coverart');
    expect(MUSICBRAINZ_ARTIST_ID).toHaveLength(36);
    expect(NETWORK_RETRY.maxAttempts).toBeGreaterThan(0);
    expect(NETWORK_RETRY.retryableStatusCodes).toContain(429);
  });

  it('exposes app constants', () => {
    expect(UNKNOWN_DATE).toBe('Unknown');
    expect(ITEMS_PER_PAGE).toBe(20);
    expect(DEFAULT_TRACK_SORT).toBe('title-asc');
    expect(ROUTE_PATHS.root).toBe('/');
    expect(ROUTE_PATHS.albums).toBe('/albums');
    expect(DEFAULT_ALBUM_SORT_OPTIONS.length).toBeGreaterThan(1);
  });
});

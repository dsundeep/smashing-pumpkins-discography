const isDevelopment = import.meta.env.DEV;

export const API_PATHS = {
  musicbrainzBase: isDevelopment ? '/api/musicbrainz' : 'https://musicbrainz.org',
  coverArtBase: isDevelopment ? '/api/coverart' : 'https://coverartarchive.org',
};

export const MUSICBRAINZ_ARTIST_ID = 'ba0d6274-db14-4ef5-b28d-657ebde1a396';

export const NETWORK_RETRY = {
  maxAttempts: 3,
  retryableStatusCodes: [429, 500, 502, 503, 504],
  initialBackoffMs: 300,
};

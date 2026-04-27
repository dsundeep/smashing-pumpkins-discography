import { API_PATHS, MUSICBRAINZ_ARTIST_ID, NETWORK_RETRY } from '../config/apiConfig';

const RETRYABLE_STATUS_CODES = new Set(NETWORK_RETRY.retryableStatusCodes);
const MAX_RETRY_ATTEMPTS = NETWORK_RETRY.maxAttempts;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isLikelyNetworkOrCorsError = (error) => {
  if (!error || !(error instanceof TypeError)) {
    return false;
  }

  const message = (error.message || '').toLowerCase();
  return (
    message.includes('failed to fetch') ||
    message.includes('networkerror') ||
    message.includes('load failed')
  );
};

const fetchWithRetry = async (url, options = {}) => {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      if (!RETRYABLE_STATUS_CODES.has(response.status) || attempt === MAX_RETRY_ATTEMPTS) {
        return response;
      }
    } catch (error) {
      lastError = error;

      if (!isLikelyNetworkOrCorsError(error) || attempt === MAX_RETRY_ATTEMPTS) {
        throw error;
      }
    }

    const backoffMs = NETWORK_RETRY.initialBackoffMs * 2 ** attempt;
    await delay(backoffMs);
  }

  throw lastError || new Error('Request failed unexpectedly');
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getAlbums = async () => {
  const response = await fetchWithRetry(
    `${API_PATHS.musicbrainzBase}/ws/2/release-group?artist=${MUSICBRAINZ_ARTIST_ID}&type=album|ep&fmt=json`,
  );
  const data = await handleResponse(response);
  const albums = data?.['release-groups'] || [];

  // TODO: Batch fetching the cover photo / pagination
  const albumsWithCoverPhoto = await Promise.all(albums.map(async (album) => {
    try {
      const coverData = await getAlbumCover(album.id);
      return {
        id: album.id,
        title: album.title,
        firstReleaseDate: album['first-release-date'],
        cover: coverData?.images?.[0]?.thumbnails?.small || null,
      };
    } catch {
      return {
        id: album.id,
        title: album.title,
        firstReleaseDate: album['first-release-date'] || 'Unknown',
        cover: null,
      };
    }
  }));

  return albumsWithCoverPhoto;
};

export const getTracksByAlbum = async (albumId) => {
  const [tracksResponse, albumResponse] = await Promise.all([
    fetchWithRetry(`${API_PATHS.musicbrainzBase}/ws/2/release?release-group=${albumId}&inc=recordings&fmt=json`),
    fetchWithRetry(`${API_PATHS.musicbrainzBase}/ws/2/release-group/${albumId}?fmt=json`),
  ]);

  const tracksData = await handleResponse(tracksResponse);
  const albumData = await handleResponse(albumResponse);

  const tracks = tracksData?.releases?.[0]?.media?.[0]?.tracks || [];

  return {
    albumTitle: albumData?.title || 'Unknown album',
    tracks: tracks.map((item) => ({
      id: item.id,
      title: item.title,
    })),
  };
};

export const getAlbumCover = async (albumId) => {
  const coverResponse = await fetchWithRetry(`${API_PATHS.coverArtBase}/release-group/${albumId}/`);
  const coverData = await handleResponse(coverResponse);
  return coverData;
};

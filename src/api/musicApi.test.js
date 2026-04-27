import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAlbumCover, getAlbums, getTracksByAlbum } from './musicApi';

const createJsonResponse = (jsonData, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(jsonData),
  };
};

describe('musicApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('maps albums with cover fallbacks', async () => {
    globalThis.fetch
      .mockResolvedValueOnce(createJsonResponse({
        'release-groups': [
          { id: '1', title: 'Alpha', 'first-release-date': '1990-01-01' },
          { id: '2', title: 'Beta' },
        ],
      }))
      .mockResolvedValueOnce(createJsonResponse({ images: [{ thumbnails: { small: 'cover.jpg' } }] }))
      .mockResolvedValueOnce(createJsonResponse({}, 404));

    const result = await getAlbums();

    expect(result).toEqual([
      { id: '1', title: 'Alpha', firstReleaseDate: '1990-01-01', cover: 'cover.jpg' },
      { id: '2', title: 'Beta', firstReleaseDate: 'Unknown', cover: null },
    ]);
  });

  it('throws on non-retryable album endpoint error', async () => {
    globalThis.fetch.mockResolvedValueOnce(createJsonResponse({}, 400));

    await expect(getAlbums()).rejects.toThrow('Request failed with status 400');
  });

  it('retries network errors for album cover request', async () => {
    vi.useFakeTimers();

    globalThis.fetch
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(createJsonResponse({ images: [] }));

    const promise = getAlbumCover('album-id');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ images: [] });
  });

  it('returns tracks and album title', async () => {
    globalThis.fetch
      .mockResolvedValueOnce(createJsonResponse({
        releases: [
          {
            media: [
              {
                tracks: [
                  { id: 't1', title: 'Track One' },
                  { id: 't2', title: 'Track Two' },
                ],
              },
            ],
          },
        ],
      }))
      .mockResolvedValueOnce(createJsonResponse({ title: 'Album Name' }));

    const result = await getTracksByAlbum('album-id');

    expect(result).toEqual({
      albumTitle: 'Album Name',
      tracks: [
        { id: 't1', title: 'Track One' },
        { id: 't2', title: 'Track Two' },
      ],
    });
  });
});

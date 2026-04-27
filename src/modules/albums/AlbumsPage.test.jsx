import { act, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumsPage from './AlbumsPage';
import { getAlbums, getTracksByAlbum } from '../../api/musicApi';

vi.mock('../../api/musicApi', () => ({
  getAlbums: vi.fn(),
  getTracksByAlbum: vi.fn(),
}));

let latestViewProps;
vi.mock('./AlbumsPage.view', () => ({
  default: (props) => {
    latestViewProps = props;
    return <div data-testid="albums-page-view" />;
  },
}));

describe('AlbumsPage', () => {
  it('loads albums and passes sorted paginated data to view', async () => {
    getAlbums.mockResolvedValueOnce([
      { id: '1', title: 'B album', firstReleaseDate: '1999-01-01' },
      { id: '2', title: 'A album', firstReleaseDate: '2001-01-01' },
    ]);

    render(<AlbumsPage />);

    await waitFor(() => expect(latestViewProps.loading).toBe(false));
    expect(latestViewProps.albums[0].title).toBe('A album');
    expect(latestViewProps.totalItems).toBe(2);
  });

  it('handles album load failure', async () => {
    getAlbums.mockRejectedValueOnce(new Error('fail'));

    render(<AlbumsPage />);

    await waitFor(() => expect(latestViewProps.error).toContain('Unable to load albums'));
  });

  it('opens tracks modal and loads tracks', async () => {
    getAlbums.mockResolvedValueOnce([
      { id: '1', title: 'Album 1', firstReleaseDate: '1998-01-01', cover: 'cover.jpg' },
    ]);
    getTracksByAlbum.mockResolvedValueOnce({
      albumTitle: 'Album 1 Deluxe',
      tracks: [{ id: 't1', title: 'Track 1' }],
    });

    render(<AlbumsPage />);

    await waitFor(() => expect(latestViewProps.loading).toBe(false));

    await act(async () => {
      await latestViewProps.openAlbumTracks({
        id: '1',
        title: 'Album 1',
        firstReleaseDate: '1998-01-01',
        cover: 'cover.jpg',
      });
    });

    expect(getTracksByAlbum).toHaveBeenCalledWith('1');
    expect(latestViewProps.isTracksModalOpen).toBe(true);
    expect(latestViewProps.selectedAlbumTitle).toBe('Album 1 Deluxe');
    expect(latestViewProps.selectedAlbumTracks).toHaveLength(1);

    act(() => {
      latestViewProps.closeAlbumTracksModal();
    });
    expect(latestViewProps.isTracksModalOpen).toBe(false);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TracksModalView from './TracksModal.view';

const baseProps = {
  open: true,
  onClose: vi.fn(),
  albumTitle: 'Album Name',
  albumCover: 'https://example.com/cover.jpg',
  albumReleaseDate: '1993-07-27',
  tracksLoading: false,
  tracksError: '',
  showCoverImage: true,
  setCoverLoadFailed: vi.fn(),
  trackSearchQuery: '',
  setTrackSearchQuery: vi.fn(),
  trackSortValue: 'title-asc',
  setTrackSortValue: vi.fn(),
  visibleTracks: [{ id: '1', title: 'Disarm' }],
  hasTracks: true,
  hasFilteredTracks: true,
  disableFilters: false,
};

describe('TracksModalView', () => {
  it('renders tracks and responds to filter changes', () => {
    render(<TracksModalView {...baseProps} />);

    expect(screen.getByText('Disarm')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: 'Search tracks' }), { target: { value: 'Dis' } });
    expect(baseProps.setTrackSearchQuery).toHaveBeenCalledWith('Dis');
  });

  it('handles image load error and fallback text branches', () => {
    render(<TracksModalView {...baseProps} />);

    fireEvent.error(screen.getAllByAltText('Album Name cover')[0]);
    expect(baseProps.setCoverLoadFailed).toHaveBeenCalledWith(true);
  });

  it('renders loading and no-results states', () => {
    const { rerender } = render(<TracksModalView {...baseProps} tracksLoading />);
    expect(document.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);

    rerender(<TracksModalView {...baseProps} tracksLoading={false} hasTracks={false} hasFilteredTracks={false} />);
    expect(screen.getByText('No tracks available for this album.')).toBeInTheDocument();

    rerender(<TracksModalView {...baseProps} tracksLoading={false} hasTracks hasFilteredTracks={false} />);
    expect(screen.getByText('No tracks match your search.')).toBeInTheDocument();

    rerender(<TracksModalView {...baseProps} tracksLoading={false} tracksError="Unable to load" />);
    expect(screen.getByText('Unable to load')).toBeInTheDocument();
  });
});

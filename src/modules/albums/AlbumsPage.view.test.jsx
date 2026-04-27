import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumsPageView from './AlbumsPage.view';

vi.mock('../../components/BrowseToolbar/BrowseToolbar', () => ({
  default: (props) => (
    <button type="button" onClick={() => props.onSortChange('title-asc')}>
      Toolbar Mock
    </button>
  ),
}));

vi.mock('../../components/AlbumCoverCard/AlbumCoverCard', () => ({
  default: ({ albumTitle }) => <div>{albumTitle}</div>,
}));

vi.mock('../../components/TracksModal/TracksModal', () => ({
  default: ({ open }) => <div>{open ? 'Modal Open' : 'Modal Closed'}</div>,
}));

const defaultProps = {
  albums: [{ id: '1', title: 'Album 1', firstReleaseDate: '1991-01-01', cover: null }],
  loading: false,
  error: '',
  viewMode: 'cards',
  setViewMode: vi.fn(),
  searchQuery: '',
  setSearchQuery: vi.fn(),
  sortField: 'date',
  setSortField: vi.fn(),
  sortDirection: 'desc',
  setSortDirection: vi.fn(),
  currentPage: 1,
  setCurrentPage: vi.fn(),
  totalPages: 1,
  totalItems: 1,
  selectedAlbumTitle: 'Album 1',
  selectedAlbumCover: null,
  selectedAlbumReleaseDate: '1991-01-01',
  isTracksModalOpen: false,
  tracksLoading: false,
  tracksError: '',
  selectedAlbumTracks: [],
  openAlbumTracks: vi.fn(),
  closeAlbumTracksModal: vi.fn(),
};

describe('AlbumsPageView', () => {
  it('renders loading, error, and empty states', () => {
    const { rerender } = render(<AlbumsPageView {...defaultProps} loading />);
    expect(screen.getByLabelText('Loading albums')).toBeInTheDocument();

    rerender(<AlbumsPageView {...defaultProps} loading={false} error="Boom" />);
    expect(screen.getByText('Boom')).toBeInTheDocument();

    rerender(<AlbumsPageView {...defaultProps} loading={false} error="" albums={[]} />);
    expect(screen.getByText('No albums match the current search.')).toBeInTheDocument();
  });

  it('renders album list and opens tracks from card click', () => {
    render(<AlbumsPageView {...defaultProps} />);

    expect(screen.getByText('Album 1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open tracks for Album 1' }));
    expect(defaultProps.openAlbumTracks).toHaveBeenCalled();
  });

  it('maps sort option change from toolbar', () => {
    render(<AlbumsPageView {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toolbar Mock' }));
    expect(defaultProps.setSortField).toHaveBeenCalledWith('title');
    expect(defaultProps.setSortDirection).toHaveBeenCalledWith('asc');
  });
});

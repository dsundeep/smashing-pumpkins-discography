import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TracksModal from './TracksModal';

let latestViewProps;
vi.mock('./TracksModal.view', () => ({
  default: (props) => {
    latestViewProps = props;
    return <div data-testid="tracks-modal-view" />;
  },
}));

const baseProps = {
  open: true,
  onClose: () => {},
  albumTitle: 'Album A',
  albumCover: 'https://example.com/cover.jpg',
  albumReleaseDate: '1993-07-27',
  tracksLoading: false,
  tracksError: '',
  tracks: [
    { id: '3', title: 'Cherub Rock' },
    { id: '1', title: 'Today' },
    { id: '2', title: 'Disarm' },
  ],
};

describe('TracksModal', () => {
  it('filters and sorts tracks in modal logic', async () => {
    render(<TracksModal {...baseProps} />);

    expect(latestViewProps.visibleTracks.map((track) => track.title)).toEqual([
      'Cherub Rock',
      'Disarm',
      'Today',
    ]);

    act(() => {
      latestViewProps.setTrackSearchQuery('dis');
    });
    expect(latestViewProps.visibleTracks.map((track) => track.title)).toEqual(['Disarm']);

    act(() => {
      latestViewProps.setTrackSearchQuery('');
      latestViewProps.setTrackSortValue('title-desc');
    });
    expect(latestViewProps.visibleTracks.map((track) => track.title)).toEqual([
      'Today',
      'Disarm',
      'Cherub Rock',
    ]);
  });

  it('resets filter state when modal opens', () => {
    const { rerender } = render(<TracksModal {...baseProps} open={false} />);

    act(() => {
      latestViewProps.setTrackSearchQuery('tod');
      latestViewProps.setTrackSortValue('title-desc');
    });

    rerender(<TracksModal {...baseProps} open />);
    expect(latestViewProps.trackSearchQuery).toBe('');
    expect(latestViewProps.trackSortValue).toBe('title-asc');
  });

  it('derives loading and error related flags', () => {
    const { rerender } = render(<TracksModal {...baseProps} tracksLoading />);
    expect(latestViewProps.disableFilters).toBe(true);
    expect(latestViewProps.hasTracks).toBe(true);

    rerender(<TracksModal {...baseProps} tracksLoading={false} tracksError="Boom" tracks={[]} />);
    expect(latestViewProps.disableFilters).toBe(true);
    expect(latestViewProps.hasTracks).toBe(false);
    expect(latestViewProps.tracksError).toBe('Boom');
  });
});

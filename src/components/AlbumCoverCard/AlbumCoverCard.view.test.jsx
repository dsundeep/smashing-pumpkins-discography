import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AlbumCoverCardView from './AlbumCoverCard.view';

describe('AlbumCoverCardView', () => {
  it('renders fallback icon when no cover', () => {
    render(
      <AlbumCoverCardView
        imageSrc={null}
        hasCover={false}
        albumTitle="Album A"
        albumName="2000"
        isCardView={false}
      />,
    );

    expect(screen.queryByAltText('Album A cover')).not.toBeInTheDocument();
    expect(screen.getByText('Album A')).toBeInTheDocument();
  });

  it('falls back to icon after image error', () => {
    render(
      <AlbumCoverCardView
        imageSrc="https://example.com/cover.jpg"
        hasCover
        albumTitle="Album B"
        albumName="2001"
        isCardView
      />,
    );

    const image = screen.getByAltText('Album B cover');
    fireEvent.error(image);

    expect(screen.queryByAltText('Album B cover')).not.toBeInTheDocument();
    expect(screen.getByText('Album B')).toBeInTheDocument();
  });
});

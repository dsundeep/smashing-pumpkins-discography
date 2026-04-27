import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumCoverCard from './AlbumCoverCard';

vi.mock('./AlbumCoverCard.view', () => ({
  default: ({ imageSrc, hasCover, albumTitle, albumName, isCardView }) => (
    <div>
      <span data-testid="image-src">{String(imageSrc)}</span>
      <span data-testid="has-cover">{String(hasCover)}</span>
      <span>{albumTitle}</span>
      <span>{albumName}</span>
      <span data-testid="is-card">{String(isCardView)}</span>
    </div>
  ),
}));

describe('AlbumCoverCard', () => {
  it('maps props for view component', () => {
    render(
      <AlbumCoverCard
        imageSrc="https://example.com/cover.jpg"
        albumTitle="Mellon Collie"
        albumName="1995-10-23"
        isCardView
      />,
    );

    expect(screen.getByTestId('image-src')).toHaveTextContent('https://example.com/cover.jpg');
    expect(screen.getByTestId('has-cover')).toHaveTextContent('true');
    expect(screen.getByText('Mellon Collie')).toBeInTheDocument();
    expect(screen.getByText('1995-10-23')).toBeInTheDocument();
    expect(screen.getByTestId('is-card')).toHaveTextContent('true');
  });

  it('handles missing image source', () => {
    render(<AlbumCoverCard albumTitle="Adore" albumName="1998-06-02" />);

    expect(screen.getByTestId('image-src')).toHaveTextContent('null');
    expect(screen.getByTestId('has-cover')).toHaveTextContent('false');
  });
});

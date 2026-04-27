import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import AppRoutes from './AppRoutes';

vi.mock('../modules/albums/AlbumsPage', () => ({
  default: () => <div>Albums Page Mock</div>,
}));

describe('AppRoutes', () => {
  it('redirects root to albums route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('Albums Page Mock')).toBeInTheDocument();
  });

  it('renders albums route directly', () => {
    render(
      <MemoryRouter initialEntries={['/albums']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('Albums Page Mock')).toBeInTheDocument();
  });
});

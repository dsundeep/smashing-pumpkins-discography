import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import BrowseToolbar from './BrowseToolbar';

describe('BrowseToolbar', () => {
  it('supports search, sorting, pagination, and view toggles', async () => {
    const user = userEvent.setup();
    const setSearchQuery = vi.fn();
    const onSortChange = vi.fn();
    const setViewMode = vi.fn();
    const setCurrentPage = vi.fn();

    render(
      <BrowseToolbar
        searchQuery=""
        setSearchQuery={setSearchQuery}
        sortValue="title-asc"
        onSortChange={onSortChange}
        viewMode="cards"
        setViewMode={setViewMode}
        currentPage={2}
        setCurrentPage={setCurrentPage}
        totalPages={5}
        showPagination
        paginationLabel="21-40 of 100 albums"
      />,
    );

    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'siamese');
    expect(setSearchQuery).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Sort items' }));
    await user.click(screen.getByRole('menuitem', { name: /Title: Z to A/i }));
    expect(onSortChange).toHaveBeenCalledWith('title-desc');

    await user.click(screen.getByRole('button', { name: 'List view' }));
    expect(setViewMode).toHaveBeenCalledWith('list');

    await user.click(screen.getByRole('button', { name: 'Previous page' }));
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(setCurrentPage).toHaveBeenCalledTimes(2);
  });

  it('hides pagination controls when disabled', () => {
    render(
      <BrowseToolbar
        searchQuery=""
        setSearchQuery={vi.fn()}
        sortValue="title-asc"
        onSortChange={vi.fn()}
        viewMode="cards"
        setViewMode={vi.fn()}
        currentPage={1}
        setCurrentPage={vi.fn()}
        totalPages={1}
        showPagination={false}
      />,
    );

    expect(screen.queryByLabelText('Collection pagination')).not.toBeInTheDocument();
  });
});

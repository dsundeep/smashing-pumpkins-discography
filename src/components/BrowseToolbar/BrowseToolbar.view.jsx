import { useState } from 'react';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import { DEFAULT_ALBUM_SORT_OPTIONS } from '../../config/appConstants';

const BrowseToolbarView = ({
  searchQuery,
  setSearchQuery,
  sortValue,
  onSortChange,
  viewMode,
  setViewMode,
  currentPage,
  setCurrentPage,
  totalPages,
  showPagination,
  searchLabel = 'Search',
  searchPlaceholder = 'Search',
  paginationLabel,
  sortOptions,
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const isSortMenuOpen = Boolean(sortAnchorEl);
  const resolvedSortOptions = sortOptions || DEFAULT_ALBUM_SORT_OPTIONS;
  const activeSortLabel = resolvedSortOptions.find((option) => option.value === sortValue)?.label || 'Custom';

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: { xs: 'stretch', lg: 'center' },
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      {showPagination && (
        <Box
          component="nav"
          aria-label="Collection pagination"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, order: { xs: 3, lg: 1 } }}
        >
          <Tooltip title="Previous page">
            <span>
              <IconButton
                color="primary"
                size="small"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ArrowBackIosNewRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Box
            component="span"
            sx={{
              px: 0.5,
              color: 'text.secondary',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
            }}
          >
            {paginationLabel}
          </Box>
          <Tooltip title="Next page">
            <span>
              <IconButton
                color="primary"
                size="small"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', flex: '1 1 320px', order: { xs: 1, lg: 2 } }}>
        <TextField
          size="small"
          fullWidth
          label={searchLabel}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={searchPlaceholder}
          inputprops={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title={`Sort items (${activeSortLabel})`}>
          <IconButton
            color="primary"
            onClick={(event) => setSortAnchorEl(event.currentTarget)}
            aria-label="Sort items"
            aria-haspopup="menu"
            aria-expanded={isSortMenuOpen}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: 40, height: 40 }}
          >
            <SortRoundedIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={sortAnchorEl}
          open={isSortMenuOpen}
          onClose={() => setSortAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {resolvedSortOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={sortValue === option.value}
              onClick={() => {
                onSortChange(option.value);
                setSortAnchorEl(null);
              }}
              sx={{ justifyContent: 'space-between', gap: 1 }}
            >
              {option.label}
              {sortValue === option.value && <CheckRoundedIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <ToggleButtonGroup
        size="small"
        exclusive
        value={viewMode}
        onChange={(_, nextViewMode) => {
          if (nextViewMode) {
            setViewMode(nextViewMode);
          }
        }}
        aria-label="Collection view mode"
        sx={{ order: { xs: 2, lg: 3 }, ml: { lg: 'auto' } }}
      >
        <ToggleButton value="cards" aria-label="Card view">
          <ViewModuleRoundedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="list" aria-label="List view">
          <ViewAgendaRoundedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default BrowseToolbarView;

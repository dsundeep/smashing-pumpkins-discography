import { Alert, Box, Skeleton } from '@mui/material';
import AlbumCoverCard from '../../components/AlbumCoverCard/AlbumCoverCard';
import BrowseToolbar from '../../components/BrowseToolbar/BrowseToolbar';
import TracksModal from '../../components/TracksModal/TracksModal';

const SKELETON_CARD_COUNT = 8;

const AlbumsPageView = ({
  albums,
  loading,
  error,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  selectedAlbumTitle,
  selectedAlbumCover,
  selectedAlbumReleaseDate,
  isTracksModalOpen,
  tracksLoading,
  tracksError,
  selectedAlbumTracks,
  openAlbumTracks,
  closeAlbumTracksModal,
}) => {
  const sortValue = `${sortField}-${sortDirection}`;
  const itemsPerPage = 20;
  const firstAlbumIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const lastAlbumIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handleSortChange = (nextValue) => {
    const [nextSortField, nextSortDirection] = nextValue.split('-');
    setSortField(nextSortField);
    setSortDirection(nextSortDirection);
  };

  return (
    <Box component="section" className="albums-page">
      <BrowseToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortValue={sortValue}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        showPagination={!loading && !error && albums.length > 0}
        searchLabel="Search"
        searchPlaceholder="Search title or year"
        paginationLabel={`${firstAlbumIndex}-${lastAlbumIndex} of ${totalItems} albums`}
      />

      {loading && (
        <Box component="ul" className="albums-list albums-list-cards" aria-label="Loading albums">
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
            <Box component="li" key={index} className="albums-list-item">
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'rgba(25, 36, 62, 0.14)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 6px 14px rgba(24, 34, 58, 0.08)',
                }}
              >
                <Skeleton variant="rectangular" height={184} animation="wave" />
                <Box sx={{ p: 2 }}>
                  <Skeleton height={28} width="80%" animation="wave" />
                  <Skeleton height={20} width="55%" animation="wave" />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && albums.length === 0 && (
        <Alert severity="info">No albums match the current search.</Alert>
      )}

      {!loading && !error && albums.length > 0 && (
        <Box
          component="ul"
          className={`albums-list ${viewMode === 'cards' ? 'albums-list-cards' : 'albums-list-rows'}`}
        >
            {albums.map((album) => (
              <Box
                component="li"
                key={album.id}
                className="albums-list-item"
              >
                <button
                  type="button"
                  className="albums-link albums-link-button"
                  onClick={() => openAlbumTracks(album)}
                  aria-label={`Open tracks for ${album.title}`}
                >
                  <AlbumCoverCard
                    imageSrc={album.cover}
                    albumTitle={album.title}
                    albumName={`${album.firstReleaseDate || 'Unknown'}`}
                    isCardView={viewMode === 'cards'}
                  />
                </button>
              </Box>
            ))}
        </Box>
      )}

      <TracksModal
        open={isTracksModalOpen}
        onClose={closeAlbumTracksModal}
        albumTitle={selectedAlbumTitle}
        albumCover={selectedAlbumCover}
        albumReleaseDate={selectedAlbumReleaseDate}
        tracksLoading={tracksLoading}
        tracksError={tracksError}
        tracks={selectedAlbumTracks}
      />
    </Box>
  );
};

export default AlbumsPageView;

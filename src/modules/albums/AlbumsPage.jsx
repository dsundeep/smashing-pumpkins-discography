import './AlbumsPage.css';
import { useEffect, useMemo, useState } from 'react';
import { getAlbums, getTracksByAlbum } from '../../api/musicApi';
import { ITEMS_PER_PAGE } from '../../config/appConstants';
import { compareReleaseDates, getReleaseDateOrUnknown } from '../../utils/dateUtils';
import { compareText, matchesNormalizedQuery, normalizeText } from '../../utils/stringUtils';
import AlbumsPageView from './AlbumsPage.view';

const useAlbumsPageProps = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlbumTitle, setSelectedAlbumTitle] = useState('');
  const [selectedAlbumCover, setSelectedAlbumCover] = useState('');
  const [selectedAlbumReleaseDate, setSelectedAlbumReleaseDate] = useState('');
  const [isTracksModalOpen, setIsTracksModalOpen] = useState(false);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState('');
  const [selectedAlbumTracks, setSelectedAlbumTracks] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        const result = await getAlbums();
        setAlbums(result);
      } catch {
        setError('Unable to load albums. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const visibleAlbums = useMemo(() => {
    const normalizedSearchQuery = normalizeText(searchQuery);

    const filtered = albums.filter((album) => {
      return (
        matchesNormalizedQuery(album.title, normalizedSearchQuery) ||
        matchesNormalizedQuery(getReleaseDateOrUnknown(album.firstReleaseDate), normalizedSearchQuery)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === 'date') {
        return compareReleaseDates(a.firstReleaseDate, b.firstReleaseDate, sortDirection);
      }

      return compareText(a.title, b.title, sortDirection);
    });

    return sorted;
  }, [albums, searchQuery, sortField, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(visibleAlbums.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const paginatedAlbums = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return visibleAlbums.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visibleAlbums, safeCurrentPage]);

  const openAlbumTracks = async (album) => {
    setSelectedAlbumTitle(album.title || 'Unknown album');
    setSelectedAlbumCover(album.cover || '');
    setSelectedAlbumReleaseDate(getReleaseDateOrUnknown(album.firstReleaseDate));
    setSelectedAlbumTracks([]);
    setTracksError('');
    setTracksLoading(true);
    setIsTracksModalOpen(true);

    try {
      const result = await getTracksByAlbum(album.id);
      setSelectedAlbumTitle(result?.albumTitle || album.title || 'Unknown album');
      setSelectedAlbumTracks(result?.tracks || []);
    } catch {
      setTracksError('Unable to load tracks for this album. Please try again.');
    } finally {
      setTracksLoading(false);
    }
  };

  const closeAlbumTracksModal = () => {
    setIsTracksModalOpen(false);
  };

  return {
    albums: paginatedAlbums,
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
    currentPage: safeCurrentPage,
    setCurrentPage,
    totalPages,
    totalItems: visibleAlbums.length,
    selectedAlbumTitle,
    selectedAlbumCover,
    selectedAlbumReleaseDate,
    isTracksModalOpen,
    tracksLoading,
    tracksError,
    selectedAlbumTracks,
    openAlbumTracks,
    closeAlbumTracksModal,
  };
};

const AlbumsPage = () => {
  const {
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
  } = useAlbumsPageProps();

  return (
    <AlbumsPageView
      albums={albums}
      loading={loading}
      error={error}
      viewMode={viewMode}
      setViewMode={setViewMode}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortField={sortField}
      setSortField={setSortField}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      selectedAlbumTitle={selectedAlbumTitle}
      selectedAlbumCover={selectedAlbumCover}
      selectedAlbumReleaseDate={selectedAlbumReleaseDate}
      isTracksModalOpen={isTracksModalOpen}
      tracksLoading={tracksLoading}
      tracksError={tracksError}
      selectedAlbumTracks={selectedAlbumTracks}
      openAlbumTracks={openAlbumTracks}
      closeAlbumTracksModal={closeAlbumTracksModal}
    />
  );
};

export default AlbumsPage;

import { useEffect, useMemo, useState } from 'react';
import './TracksModal.css';
import { DEFAULT_TRACK_SORT } from '../../config/appConstants';
import { compareText, matchesNormalizedQuery, normalizeText } from '../../utils/stringUtils';
import TracksModalView from './TracksModal.view';

const TracksModal = (props) => {
  const {
    open,
    onClose,
    albumTitle,
    albumCover,
    albumReleaseDate,
    tracksLoading,
    tracksError,
    tracks,
  } = props;
  const [coverLoadFailed, setCoverLoadFailed] = useState(false);
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [trackSortValue, setTrackSortValue] = useState(DEFAULT_TRACK_SORT);

  useEffect(() => {
    setCoverLoadFailed(false);
  }, [albumCover, open]);

  useEffect(() => {
    if (open) {
      setTrackSearchQuery('');
      setTrackSortValue(DEFAULT_TRACK_SORT);
    }
  }, [open]);

  const showCoverImage = Boolean(albumCover) && !coverLoadFailed;

  const visibleTracks = useMemo(() => {
    const normalizedQuery = normalizeText(trackSearchQuery);
    const [sortField, sortDirection] = trackSortValue.split('-');

    const filteredTracks = tracks.filter((track) => matchesNormalizedQuery(track.title, normalizedQuery));

    if (sortField !== 'title') {
      return filteredTracks;
    }

    return [...filteredTracks].sort((a, b) => compareText(a.title, b.title, sortDirection));
  }, [tracks, trackSearchQuery, trackSortValue]);

  const hasTracks = tracks.length > 0;
  const hasFilteredTracks = visibleTracks.length > 0;
  const disableFilters = tracksLoading || Boolean(tracksError) || !hasTracks;

  const viewProps = {
    open,
    onClose,
    albumTitle,
    albumCover,
    albumReleaseDate,
    tracksLoading,
    tracksError,
    showCoverImage,
    setCoverLoadFailed,
    trackSearchQuery,
    setTrackSearchQuery,
    trackSortValue,
    setTrackSortValue,
    visibleTracks,
    hasTracks,
    hasFilteredTracks,
    disableFilters,
  };

  return <TracksModalView {...viewProps} />;
};

export default TracksModal;

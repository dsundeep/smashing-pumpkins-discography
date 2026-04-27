import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';

const TracksModalView = ({
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
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="album-tracks-dialog-title"
    >
      <DialogTitle id="album-tracks-dialog-title" sx={{ p: 0 }}>
        <Box className="tracks-modal-header">
          <Box className="tracks-modal-cover" aria-hidden="true">
            {showCoverImage ? (
              <img
                src={albumCover}
                alt={`${albumTitle} cover`}
                onError={() => setCoverLoadFailed(true)}
              />
            ) : (
              <Box className="tracks-modal-cover-fallback">
                <AlbumRoundedIcon />
              </Box>
            )}
          </Box>
          <Box className="tracks-modal-heading">
            <Typography variant="h6" component="h2" className="tracks-modal-title" noWrap>
              {albumTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="tracks-modal-date" noWrap>
              {albumReleaseDate || 'Unknown release date'}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box className="tracks-modal-filters">
          <TextField
            label="Search tracks"
            placeholder="Search by track name"
            size="small"
            fullWidth
            value={trackSearchQuery}
            onChange={(event) => setTrackSearchQuery(event.target.value)}
            disabled={disableFilters}
          />
          <FormControl size="small" className="tracks-modal-sort" disabled={disableFilters}>
            <InputLabel id="tracks-sort-label">Sort</InputLabel>
            <Select
              labelId="tracks-sort-label"
              id="tracks-sort"
              label="Sort"
              value={trackSortValue}
              onChange={(event) => setTrackSortValue(event.target.value)}
            >
              <MenuItem value="title-asc">Title A-Z</MenuItem>
              <MenuItem value="title-desc">Title Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {tracksLoading && (
          <Box className="tracks-modal-status">
            <Skeleton height={28} width="90%" animation="wave" />
            <Skeleton height={28} width="80%" animation="wave" />
            <Skeleton height={28} width="85%" animation="wave" />
          </Box>
        )}

        {!tracksLoading && tracksError && <Alert severity="error">{tracksError}</Alert>}

        {!tracksLoading && !tracksError && !hasTracks && (
          <Alert severity="info">No tracks available for this album.</Alert>
        )}

        {!tracksLoading && !tracksError && hasTracks && !hasFilteredTracks && (
          <Alert severity="info">No tracks match your search.</Alert>
        )}

        {!tracksLoading && !tracksError && hasFilteredTracks && (
          <ol className="tracks-modal-list">
            {visibleTracks.map((track) => (
              <li key={track.id} className="tracks-modal-item">
                <span className="tracks-modal-item-icon" aria-hidden="true">
                  <MusicNoteRoundedIcon fontSize="small" />
                </span>
                <span>{track.title}</span>
              </li>
            ))}
          </ol>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TracksModalView;

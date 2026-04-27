import { useEffect, useState } from 'react';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import { Box, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';

const AlbumCoverCardView = ({ imageSrc, albumTitle, albumName, hasCover, isCardView = false }) => {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const showCoverImage = hasCover && !imageLoadFailed;

  useEffect(() => {
    setImageLoadFailed(false);
  }, [imageSrc]);

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: isCardView ? 'column' : 'row',
        alignItems: isCardView ? 'stretch' : 'center',
        width: '100%',
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(25, 36, 62, 0.14)',
        backgroundColor: 'background.paper',
        boxShadow: '0 6px 14px rgba(24, 34, 58, 0.08)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'rgba(25, 36, 62, 0.24)',
          boxShadow: '0 12px 24px rgba(24, 34, 58, 0.14)',
        },
      }}
    >
      {showCoverImage ? (
        <CardMedia
          component="img"
          image={imageSrc}
          alt={`${albumTitle} cover`}
          onError={() => setImageLoadFailed(true)}
          sx={{
            width: isCardView ? '100%' : 80,
            height: isCardView ? 184 : 80,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
      ) : (
        <Box
          sx={{
            width: isCardView ? '100%' : 80,
            height: isCardView ? 184 : 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #ede7f6 100%)',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          <AlbumRoundedIcon sx={{ fontSize: isCardView ? 78 : 52 }} />
        </Box>
      )}

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          p: isCardView ? 2 : 1.5,
          '&:last-child': { pb: isCardView ? 2 : 1.5 },
          width: '100%',
        }}
      >
        <Tooltip title={albumTitle} arrow>
          <Typography
            variant="subtitle1"
            component="h2"
            noWrap
            sx={{ fontWeight: 600, lineHeight: 1.3 }}
          >
            {albumTitle}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {albumName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AlbumCoverCardView;

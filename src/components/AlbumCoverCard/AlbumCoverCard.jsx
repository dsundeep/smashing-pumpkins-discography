import './AlbumCoverCard.css';
import AlbumCoverCardView from './AlbumCoverCard.view';

const AlbumCoverCard = (props) => {
  const { imageSrc, albumTitle, albumName, isCardView } = props;
  const viewProps = {
    imageSrc: imageSrc || null,
    hasCover: Boolean(imageSrc),
    albumTitle,
    albumName,
    isCardView,
  };

  return <AlbumCoverCardView {...viewProps} />;
};

export default AlbumCoverCard;

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits, clicked }) => {
  if (hits.length) {
    const items = hits.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li
          onClick={() => clicked(largeImageURL)}
          className={css.item}
          key={id}
        >
          <img
            className={css.itemImage}
            alt="img"
            src={webformatURL}
            srcbig={largeImageURL}
          />
        </li>
      );
    });
    return items;
  }
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  clicked: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

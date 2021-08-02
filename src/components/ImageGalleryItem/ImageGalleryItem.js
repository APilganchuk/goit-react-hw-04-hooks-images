const ImageGalleryItem = ({ images, handleImgClick }) => {
  return images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li key={id} className="ImageGalleryItem">
      <img
        onClick={() => handleImgClick(largeImageURL)}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  ));
};
export default ImageGalleryItem;

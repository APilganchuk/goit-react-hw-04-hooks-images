import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, handleImgClick }) => {
  return (
    <>
      <ul className="ImageGallery">
        <ImageGalleryItem handleImgClick={handleImgClick} images={images} />
      </ul>
    </>
  );
};

export default ImageGallery;

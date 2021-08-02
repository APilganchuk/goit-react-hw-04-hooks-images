/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "modern-normalize/modern-normalize.css";
import "react-toastify/dist/ReactToastify.css";
import imagesApi from "./components/services/image-api";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn";
import MyLoader from "./components/Loader";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [query, setQuery] = useState("");
  const [img, setImg] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState("");

  useEffect(() => {
    if (query === "") {
      return;
    }
    handleQuery();
    setImg([]);
  }, [query]);

  const handleQuery = () => {
    setIsloading(true);

    imagesApi
      .fetchImages(query, currentPage)
      .then(
        (image) => setImg((prevState) => prevState.concat(image.hits)),
        setCurrentPage((prevState) => prevState + 1)
      )
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setIsloading(false);
      });
  };
  const handleFormSubmit = (query) => {
    setQuery(query);
  };
  const onClickLoadMoreBtn = () => {
    handleQuery();
  };
  const handleImgClick = (src) => {
    setBigImg(src);
    setShowModal(true);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={bigImg} alt="" />
        </Modal>
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery handleImgClick={handleImgClick} images={img} />
      {img.length > 0 && <LoadMoreBtn onClick={onClickLoadMoreBtn} />}

      {isLoading && <MyLoader />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;

import "./App.css";
import "modern-normalize/modern-normalize.css";
import "react-toastify/dist/ReactToastify.css";
import imagesApi from "./components/services/image-api";
import { ToastContainer } from "react-toastify";
import { Component } from "react";
import { toast } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn";
import MyLoader from "./components/Loader";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    query: "",
    img: [],
    currentPage: 1,
    isLoading: false,
    showModal: false,
  };
  componentDidUpdate(prevProps, PrevState) {
    const { query } = this.state;
    if (PrevState.query !== query) {
      this.handleQuery();
      this.setState({ currentPage: 1, img: [] });
    }
  }

  handleQuery = () => {
    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(this.state.query, this.state.currentPage)
      .then((image) =>
        this.setState((prevState) => ({
          img: [...prevState.img].concat(image.hits),
          currentPage: prevState.currentPage + 1,
        }))
      )
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        if (this.state.img.length === 0) {
          toast.warn("no results were found for your request!");
        }
      });
  };

  handleFormSubmit = (query) => {
    this.setState({ query });
  };
  onClickLoadMoreBtn = () => {
    this.handleQuery();
  };
  handleImgClick = (src) => {
    this.setState({ bigImg: src, showModal: true });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.bigImg} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          handleImgClick={this.handleImgClick}
          images={this.state.img}
        />
        {this.state.img.length > 0 && (
          <LoadMoreBtn onClick={this.onClickLoadMoreBtn} />
        )}

        {this.state.isLoading && <MyLoader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;

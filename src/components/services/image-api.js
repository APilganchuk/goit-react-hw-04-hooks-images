const fetchImages = ( currentQuery, currentPage = "1" ) => {
  const KEY = "21816580-71493a440b7096ef43b823e18";

  return fetch(
    `https://pixabay.com/api/?q=${currentQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => response.json());
};

const imagesApi = {
  fetchImages,
};

export default imagesApi;

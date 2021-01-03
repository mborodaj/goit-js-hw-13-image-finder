import css from "./css/styles.css";
import refs from "./js/refs";
import cardTemplate from "./templates/photoItem.hbs";
import * as debounce from "lodash.debounce";
import PhotoApiServise from "./js/apiService";

refs.form.addEventListener("submit", photoSearch);
refs.loadMoreBtn.addEventListener("click", fetchPhotos);

const apiService = new PhotoApiServise();

function photoSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  clearMarkup();
  fetchPhotos();

  refs.loadMoreBtn.classList.remove("is-hidden");
}

function fetchPhotos() {
  apiService
    .fetchPhotos()
    .then((photos) => {
      renderMarkup(photos);
      scrollToHandler();
    })
    .catch(onFetchError);
}

function renderMarkup(photosList) {
  refs.gallery.insertAdjacentHTML("beforeend", cardTemplate(photosList));
}

function clearMarkup() {
  refs.gallery.innerHTML = "";
}

function onFetchError(error) {
  return error;
}

function scrollToHandler() {
  // console.log(document.documentElement.offsetHeight);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

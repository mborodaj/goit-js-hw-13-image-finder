import css from "./css/styles.css";
import refs from "./js/refs";
import cardTemplate from "./templates/photoItem.hbs";
import PhotoApiServise from "./js/apiService";
import errorsNotifications from "./js/notification";
import onImageClick from "./js/lightbox";

refs.form.addEventListener("submit", inicialPhotoSearch);
refs.loadMoreBtn.addEventListener("click", showMoreImages);
refs.gallery.addEventListener("click", onImageClick);

const apiService = new PhotoApiServise();

function inicialPhotoSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  clearMarkup();
  createMarkup();
}

function showMoreImages() {
  apiService.incrementPage();
  createMarkup();
}

function createMarkup() {
  apiService
    .fetchPhotos()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        errorsNotifications("Nothing was found. Please specify your request!");
      }
      showMoreBtnHandler(totalHits);
      renderMarkup(hits);
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
  alert(error);
}

function scrollToHandler() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

function showMoreBtnHandler(totalHits) {
  if (
    totalHits - apiService.perPage * (apiService.page - 1) >=
    apiService.perPage
  ) {
    refs.loadMoreBtn.classList.remove("is-hidden");
  } else {
    refs.loadMoreBtn.classList.add("is-hidden");
  }
}

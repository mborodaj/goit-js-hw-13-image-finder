const baseUrl = "https://pixabay.com/api";

export default class PhotoApiServise {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 12;
    this.apiKey = "19716290-df87d159eb9c48b6c31409183";
  }

  fetchPhotos() {
    const url = `${baseUrl}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then(({ hits, totalHits }) => {
        this.incrementPage();
        return { hits, totalHits };
      })
      .catch((error) => {
        alert(error);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

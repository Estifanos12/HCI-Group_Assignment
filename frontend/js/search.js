async function init() {
  let movies;
  let count;
  const limit = 8;
  let offset = 0;
  let query;

  const searchValue = document.getElementById("search-value");
  const searchMovies = document.getElementById("search-movies");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search");
  const loadMore = document.getElementById("load-more");

  loadMore.addEventListener("click", loadMoreHandler);
  searchForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    query = searchInput.value.toLowerCase().trim();

    let data = await fetchMovies("popular", query, limit, 0);
    movies = data.movies;
    count = data.count;
    offset = 8;

    searchValue.textContent = query;
    removeChildElements(searchMovies);
    createList(searchMovies, movies);
    if (count <= 8) {
      loadMore.removeEventListener("click", loadMoreHandler);
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      loadMore.style.display = "block";
    }
  });

  let uri = decodeURI(window.location.href.replace(/\+/g, " "));

  query = uri
    .slice(uri.indexOf("?search=") + 8)
    .toLowerCase()
    .trim();

  searchValue.textContent = query;

  let data = await fetchMovies("popular", query, limit, offset);
  movies = data.movies;
  count = data.count;
  offset = 8;
  createList(searchMovies, movies);
  if (count <= 8) {
    loadMore.removeEventListener("click", loadMoreHandler);
    loadMore.style.display = "none";
  } else {
    loadMore.addEventListener("click", loadMoreHandler);
    loadMore.style.display = "block";
  }

  async function loadMoreHandler(ev) {
    if (offset + 8 >= count) {
      loadMore.removeEventListener("click", loadMoreHandler);
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      loadMore.style.display = "block";
    }
    count = await loadMoreUtil(searchMovies, "popular", query, limit, offset);
    offset += 8;
  }
}

document.addEventListener("DOMContentLoaded", init);

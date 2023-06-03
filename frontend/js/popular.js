async function init() {
  // let count = 8;
  // let data = popular;
  let count;
  const limit = 8;
  let offset = 0;
  let genre = "";

  const popularMovies = document.getElementById("popular-movies");
  const loadMore = document.getElementById("load-more");
  const filterCatagories = document.getElementsByClassName("genre");

  async function loadMoreHandler(ev) {
    if (offset + 8 >= count) {
      loadMore.removeEventListener("click", loadMoreHandler);
      // loadMore.classList.add("none");
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      // loadMore.classList.add("none");
      loadMore.style.display = "block";
    }
    if (genre === "") {
      let count = await loadMoreUtil(
        popularMovies,
        "popular",
        "",
        limit,
        offset
      );
      offset += 8;
    } else {
      let data = await fetchWithGenre(genre, offset);
      let movie = data.movies;
      count = data.count;
      createList(popularMovies, movie);
      offset += 8;
    }
  }

  loadMore.addEventListener("click", loadMoreHandler);

  Array.prototype.forEach.call(filterCatagories, (element) => {
    element.addEventListener("click", async (ev) => {
      const genre = ev.target.textContent.trim();

      let data = await fetchWithGenre(genre, 0);
      let movies = data.movies;
      count = data.count;
      offset = 8;

      if (count <= 8) {
        loadMore.removeEventListener("click", loadMoreHandler);
        loadMore.style.display = "none";
      } else {
        loadMore.addEventListener("click", loadMoreHandler);
        loadMore.style.display = "block";
      }
      // count = data.length > 8 ? 8 : data.length;
      removeChildElements(popularMovies);
      createList(popularMovies, movies);
    });
  });

  async function fetchWithGenre(genre, offset) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://127.0.0.1:3000/movies/popular/recommendation?limit=8&offset=${offset}&genre=${genre}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  }
  let data = await fetchMovies("popular", "", 8, 0);
  let movie = data.movies;
  count = data.count;
  createList(popularMovies, movie);
  offset = 8;
}

document.addEventListener("DOMContentLoaded", init);

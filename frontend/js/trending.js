async function init() {
  let count;
  const limit = 8;
  let offset = 0;
  let category = "Daily";
  // let data = day;

  const trendingMovies = document.getElementById("trending-movies");
  const loadMore = document.getElementById("load-more");
  const dayFilter = document.getElementById("day-filter");
  const weekFilter = document.getElementById("week-filter");

  async function loadMoreHandler(ev) {
    console.log(offset, count);
    if (offset + 8 >= count) {
      loadMore.removeEventListener("click", loadMoreHandler);
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      loadMore.style.display = "block";
    }
    // count = loadMoreUtil(trendingMovies, data, count);
    count = await loadMoreTrenUtil(trendingMovies, category, offset);
    offset += 8;
  }

  loadMore.addEventListener("click", loadMoreHandler);
  dayFilter.addEventListener("click", async (ev) => {
    category = "Daily";
    weekFilter.classList.remove("selected");
    dayFilter.classList.add("selected");

    const data = await fetchTrending("Daily", 0);
    offset = 8;
    let movies = data.movies;
    count = data.count;

    if (count <= 8) {
      loadMore.removeEventListener("click", loadMoreHandler);
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      loadMore.style.display = "block";
    }
    removeChildElements(trendingMovies);
    createList(trendingMovies, movies);
  });
  weekFilter.addEventListener("click", async (ev) => {
    category = "Weekly";
    weekFilter.classList.add("selected");
    dayFilter.classList.remove("selected");

    const data = await fetchTrending("Weekly", 0);
    offset = 8;
    let movies = data.movies;
    count = data.count;

    if (count <= 8) {
      loadMore.removeEventListener("click", loadMoreHandler);
      loadMore.style.display = "none";
    } else {
      loadMore.addEventListener("click", loadMoreHandler);
      loadMore.style.display = "block";
    }
    removeChildElements(trendingMovies);
    createList(trendingMovies, movies);
  });

  const data = await fetchTrending("Daily", offset);
  let movies = data.movies;
  count = data.count;
  createList(trendingMovies, movies);
  offset = 8;
}
document.addEventListener("DOMContentLoaded", init);

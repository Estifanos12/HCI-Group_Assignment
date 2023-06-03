const loadMoreUtil = async (container, path, search, limit, offset) => {
  const { movies, count } = await fetchMovies(path, search, limit, offset);
  createList(container, movies);
  return count;
};
const loadMoreTrenUtil = async (container, category, offset, limit = 8) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:3000/movies/trending?limit=8&offset=${offset}&category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  createList(container, data.movies);
  return data.count;
};

const fetchMovies = async (path, search = "", limit = 10, offset = 0) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:3000/movies/${path}?search=${search}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const movies = await response.json();
  return movies;
};

const getDataByID = async (path, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:3000/movies/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getDataByGenre = async (genreList) => {
  let genre = genreList.join(",");
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:3000/movies/popular/recommendation?limit=12&genre=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

async function fetchTrending(category, offset) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:3000/movies/trending?limit=8&offset=${offset}&category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}

async function init() {
  let uri = decodeURI(window.location.href);
  let query = uri.slice(uri.indexOf("?") + 1);

  let dataByID = await getDataByID("popular", query);
  if (dataByID?.statusCode === 404) {
    dataByID = await getDataByID("trending", query);
    if (dataByID?.statusCode === 404) {
      dataByID = await getDataByID("upcoming", query);
    }
  }

  fillDescription(dataByID);
}
const fillDescription = async (data) => {
  const profileImage = document.getElementById("profile-image");
  const movieTitle = document.getElementById("movie-title");
  const vote = document.getElementById("vote");
  const genre = document.getElementById("genre");
  const overview = document.getElementById("overview");
  const descSection = document.getElementById("description-section");

  descSection.style.backgroundImage = `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.9) 100%
  ), url(http://127.0.0.1:3000${data.backdrop_path})`;
  descSection.style.backgroundRepeat = "no-repeat";
  descSection.style.backgroundSize = "cover";
  descSection.style.backgroundPosition = "center center";

  profileImage.src = `http://127.0.0.1:3000${data.poster_path}`;
  profileImage.setAttribute("width", "200");
  profileImage.setAttribute("height", "200");
  let title = data.title || data.name;
  movieTitle.textContent = title;
  const voteText = (Math.round(data.vote_average * 10) / 10).toFixed(1);
  vote.textContent = voteText;
  genre.textContent = data.genre_ids.join(", ");
  overview.textContent = data.overview;

  let archive = (await getDataByGenre(data.genre_ids)).movies;
  createList(document.getElementById("recommendations"), archive, false);
};

document.addEventListener("DOMContentLoaded", init);

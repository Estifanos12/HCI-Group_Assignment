const createList = (container, data, col = true) => {
  for (movie of data) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const titleP = document.createElement("titleP");
    const voteP = document.createElement("p");

    a.setAttribute("href", `./description.html?${movie["_id"]}`);
    a.classList.add("link-light");

    img.setAttribute("src", `http://127.0.0.1:3000${movie.poster_path}`);
    img.setAttribute("alt", `${movie?.title || movie?.name}`);
    img.setAttribute("width", "200");
    img.setAttribute("height", "200");
    img.setAttribute("loading", "lazy");
    img.classList.add("card-img-top", "rounded-3", "h-auto");
    div.classList.add(
      "card-body",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "py-3",
      "px-lg-3",
      "px-2",
      "fw-normal",
      "fs-6"
    );
    titleP.textContent = movie?.title || movie?.name;
    titleP.classList.add("card-title", "font-small", "w-75");

    const vote = (Math.round(movie.vote_average * 10) / 10).toFixed(1);
    voteP.textContent = vote;

    voteP.classList.add(
      "card-text",
      "p-2",
      "rounded",
      "fw-light",
      "rounded-2",
      "text-center"
    );
    if (vote <= 5) {
      voteP.classList.add("bg-danger");
    } else if (vote > 5 && vote <= 7) {
      voteP.classList.add("bg-warning");
    } else {
      voteP.classList.add("bg-success");
    }
    div.append(titleP);
    div.append(voteP);
    a.append(img);
    a.append(div);
    li.append(a);
    li.classList.add("card", "bg-dark", "border-0");
    if (col) {
      const colCont = document.createElement("div");

      colCont.classList.add(
        "p-1",
        "p-md-2",
        "p-lg-3",
        "m-0",
        "col-6",
        "col-md-4",
        "col-lg-3",
        "bg-color",
        "align-self-stretch",
        "d-flex"
      );
      colCont.append(li);
      container.append(colCont);
    } else {
      li.classList.add("flex-basis");
      container.append(li);
    }
  }
};

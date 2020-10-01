var data;

export default function receiveData(response) {

    data = response.data.results;
    renderPage();
}

function renderPage() {

    var body = document.querySelector("body");
    var container = document.createElement("section");

    data.forEach(element => {
        container.innerHTML += `<img id="${element.id}" 
        src="https://image.tmdb.org/t/p/w500${element.poster_path}" 
        alt="${element.title}">`
    });

    body.appendChild(container);
    addMovieEvent()
}

function addMovieEvent() {

    var movies = document.querySelectorAll("section img");
    movies.forEach(element => element.addEventListener("click", chooseMovie)); 
}

function chooseMovie() {
    
    var movieId = event.target.id;
    var selectedMovie;

    data.forEach(element => {

        if(element.id == movieId) {
            selectedMovie = element;
        }
    });

    openMovie(selectedMovie);
}

function openMovie(movie) {

    var body = document.querySelector("body");
    var article = document.createElement("article");
    article.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
    <div>
        <span>
            <h1>${movie.title}</h1>
            <h2>${movie.vote_average}</h2>
        </span>
        <p>${movie.overview}</p>
    </div>
    `

    body.appendChild(article);

    closeMoviesPage();
}

function closeMoviesPage() {

    var main = document.querySelector("section");
    var menu = document.querySelector("nav");

    main.style.display = "none";
    menu.style.display = "none";
}
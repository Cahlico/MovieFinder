import setPage from "./main";

const key = "921ca98e7932d5a487ee256da6405b38";
var data;
var selectedAsFavorite = JSON.parse(localStorage.selectedAsFavorite) || [];
saveFavorites();
var movieId;
var genres;

requestGenre();

export default function receiveData(response) {

    data = response.data.results;
    renderPage();
}

function renderPage() {

    var body = document.querySelector("body");
    var container = document.createElement("section");

    data.forEach(element => {

        var i = 0;
        var isFavorite;

        do {
            if(selectedAsFavorite[i] == element.id) {
                isFavorite = '<ion-icon name="heart"></ion-icon></span>';
                break;
            } else {
                isFavorite = '</span>';
            }

            i++;
        } while (i < selectedAsFavorite.length);

        container.innerHTML += `
        <span>
            <img id="${element.id}" src="https://image.tmdb.org/t/p/w200${element.poster_path}" 
            alt="${element.title}">
            ${isFavorite}
        `;
    });

    body.appendChild(container);
    addMovieEvent()
}

function addMovieEvent() {

    var movies = document.querySelectorAll("section img");
    movies.forEach(element => element.addEventListener("click", chooseMovie)); 
}

function chooseMovie() {
    
    movieId = event.target.id;
    var selectedMovie;

    data.forEach(element => {

        if(element.id == movieId) {
            selectedMovie = element;
        }
    });

    openMovie(selectedMovie);
}

function openMovie(movie) {

    var categories = mapGenres(movie);
    var categoriesStr = '';
    categories.forEach(element => categoriesStr += ` ${element}`);

    var body = document.querySelector("body");
    var article = document.createElement("article");

    article.innerHTML = `
    <ion-icon name="arrow-undo"></ion-icon>
    <ion-icon name="heart"></ion-icon>
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
    <div>
        <span>
            <h1>${movie.title}</h1>
            <h2>${movie.vote_average}</h2>
        </span>
        <p>${movie.overview}</p>
        <strong>Genres: ${categoriesStr}</strong>
    </div>
    `;

    body.appendChild(article);

    closeMoviesPage();
    addBackEvent();
    addFavoriteEvent();
}

function requestGenre() {

    var request = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
    request.then(getGenres);
}

function getGenres(response) {
    
    genres = response.data.genres;
}

function mapGenres(movie) {

    var categories = [];
    movie.genre_ids.forEach( ids => {
        genres.forEach( genres => {
            if(ids === genres.id) {
                categories.push(genres.name);
            }
        });
    });

    return categories;
}

function closeMoviesPage() {

    var main = document.querySelector("section");
    var menu = document.querySelector("nav");

    main.style.display = "none";
    menu.style.display = "none";
}

function addBackEvent() {

    var backIcon = document.querySelector("article ion-icon");
    backIcon.addEventListener("click", goBackToMoviesPage)
}

function goBackToMoviesPage() {

    var article = document.querySelector("article");
    var main = document.querySelector("section");
    var menu = document.querySelector("nav");

    article.remove();
    menu.style.display = "block";
    setPage();
}

function addFavoriteEvent() {

    for(var i = 0; i < selectedAsFavorite.length; i++) {
        if(selectedAsFavorite[i] === movieId) {
            var favorite = document.querySelector("article ion-icon:nth-child(2)");
            favorite.classList.add("clicked");
        }
    }

    var favorite = document.querySelector("article ion-icon:nth-child(2)");
    favorite.addEventListener("click", selectFavorite);
}

function selectFavorite() {

    var favorite = document.querySelector("article ion-icon:nth-child(2)");
    favorite.classList.toggle("clicked");

    addFavorite(favorite);
}

function addFavorite(favorite) {

    var clicked = favorite.getAttribute("class");
    clicked = clicked.slice(-7);

    if(clicked === "clicked") {

        selectedAsFavorite.push(movieId);
        saveFavorites();
    } else {

        selectedAsFavorite = selectedAsFavorite.filter(element => {

            if(element === movieId) {
                return false;
            }

            return true;
        });
        saveFavorites();
    }
}

function saveFavorites() {

    localStorage.selectedAsFavorite = JSON.stringify(selectedAsFavorite);
}
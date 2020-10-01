const key = "921ca98e7932d5a487ee256da6405b38";

export default function sendRequestUpcoming() {

    var request = axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`);
    request.then(receiveData);
}

function receiveData(response) {

    var data = response.data;
    renderPage(data.results);
}

function renderPage(data) {

    var body = document.querySelector("body");
    var container = document.createElement("main");

    data.forEach(element => {
        container.innerHTML += `<img id="${element.id}" 
        src="https://image.tmdb.org/t/p/w500${element.poster_path}" 
        alt="${element.title}">`
    })

    body.appendChild(container);
}
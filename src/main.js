import sendRequestPopular from "./popular.js";
import sendRequestNowPlaying from "./now_playing";
import sendRequestTopRated from "./top_rated";
import sendRequestUpcoming from "./upcoming";

var chosenBefore = document.querySelector("button:first-child");
var lastPage = "Populares";

sendRequestPopular();
addEventOnNavigator();

function addEventOnNavigator() {
    
    var button = document.querySelectorAll("button");
    button.forEach(element => element.addEventListener("click", setCategory));
}

function setCategory() {

    chosenBefore.removeAttribute("class");
    event.target.setAttribute("class", "chosen");

    chosenBefore = event.target;
    setPage(event.target);
}

export default function setPage(target) {

    var atualPage = document.querySelector("section");
    atualPage.remove();

    var page = (target) ? target.innerText : lastPage;
    lastPage = page;

    //os request sao feitos nas trocas de paginas pelo pouco volume de dados
    if(page === "Populares") {
        sendRequestPopular();
    } else if (page === "Nos cinemas") {
        sendRequestNowPlaying();
    } else if (page === "Maiores notas") {
        sendRequestTopRated();
    } else {
        sendRequestUpcoming();
    }
}
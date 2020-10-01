import sendRequestPopular from "./popular.js"
import sendRequestNowPlaying from "./now_playing"
import sendRequestTopRated from "./top_rated"
import sendRequestUpcoming from "./upcoming"

var chosenBefore = document.querySelector("button:first-child");

sendRequestPopular();
addEventOnNavigator();

function addEventOnNavigator() {
    
    var button = document.querySelectorAll("button");
    button.forEach((element) => element.addEventListener("click", setCategory));
}

function setCategory() {

    event.target.setAttribute("class", "chosen");
    chosenBefore.removeAttribute("class");

    chosenBefore = event.target;
    setPage(event.target);
}

function setPage(target) {

    var erase = document.querySelector("main");
    erase.remove();

    var page = target.innerText;

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
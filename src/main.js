const key = "921ca98e7932d5a487ee256da6405b38";
var chosenBefore = document.querySelector("button:first-child");

addEventOnNavigator();

function addEventOnNavigator() {
    
    var button = document.querySelectorAll("button");
    button.forEach((element, index) => element.addEventListener("click", setPage)); 
}

function setPage() {

    event.target.setAttribute("class", "chosen");
    chosenBefore.removeAttribute("class");
    chosenBefore = event.target;
}
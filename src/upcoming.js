import receiveData from "./render_page";

const key = "921ca98e7932d5a487ee256da6405b38";

export default function sendRequestUpcoming() {

    var request = axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`);
    request.then(receiveData);
}
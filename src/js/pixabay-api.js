import axios from "axios";

export function getImagesByQuery(query) {
    return axios.get("https://pixabay.com/api/", {
        params: {
            key: "53489981-68e2194cff91adb725bcb77ca",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true
        }
    })
        .then(response => response.data);
}

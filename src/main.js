import { getImagesByQuery }  from "./js/pixabay-api"
// import moduleName from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
} from "./js/render-functions";

const refs = {
    form: document.querySelector(".js-pixabay-form"),
    input: document.querySelector("input[name='search-text']"),
}
    
refs.form.addEventListener("submit", e => {
    e.preventDefault();

    const query = e.target.elements["search-text"].value.trim();
    if (!query) {
        iziToast.show({
            title: 'Hey',
            message: 'Please enter a search query!'
        });
        return;
    }

    clearGallery();
    showLoader();
    
    
    
    getImagesByQuery(query)
        .then(function (data) {
            
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                })
                return;
            }
            const images = data.hits;
            createGallery(images);
        })
        .catch(function (err) {
            iziToast.error({
                message: "Something went wrong. Try again later!",
                position: "topRight",
            });
        })
        .finally(function () {
            hideLoader();
        });

    refs.form.reset();
});


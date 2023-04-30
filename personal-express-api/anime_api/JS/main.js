document.querySelector("#anime-form").addEventListener("submit", getAnime);
const requestedDescription = document.querySelector("#description")
const requestedCategory = document.querySelector("#category")
const requestedEpisodes = document.querySelector("#episodes")
const requestedImage = document.querySelector("img")
var trash = document.getElementsByClassName("fa-trash");


function getAnime(event) {
    event.preventDefault()
    const animeName = document.querySelector("select").value;
    const url = `http://localhost:7610/api/${(animeName)}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            requestedDescription.innerText = `Description: ${data.description}`
            requestedCategory.innerText = `Category: ${data.category}`
            requestedEpisodes.innerText = `Episodes: ${data.episodes}`
            requestedImage.src = data.img
            requestedImage.classList.remove("hidden")
            document.querySelector(".fa-trash").classList.remove("hidden")
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}

    document.querySelector(".fa-trash").addEventListener('click', deleteFunc)

    function deleteFunc() {
        const animeName = document.querySelector("select").value;
    const url = `http://localhost:7610/api/${(animeName)}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            requestedDescription.innerText = ``
            requestedCategory.innerText = ``
            requestedEpisodes.innerText = ``
            requestedImage.src = data.img
            requestedImage.classList.remove("hidden")
            document.querySelector(".fa-trash").classList.remove("hidden")
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
    }
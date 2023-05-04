const searchButton = document.getElementById("search-button");
const profileLink = document.getElementById("profile-link");
const publishButton = document.getElementById("publish");
const publishPopUp = document.getElementById("publish-popup-container")
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const content = document.getElementById("content");


publishButton.addEventListener("click", function() {
    publishPopUp.classList.add("show");
    header.classList.add("blur");
    footer.classList.add("blur");
    content.classList.add("blur");
})

profileLink.setAttribute("href", "http://127.0.0.1:3000/profile/profile.html");


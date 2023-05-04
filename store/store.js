/**
 * <----------------------------------- Constants ----------------------------------->
 * 
 *                                  All constants here.
 * 
 * <--------------------------------------------------------------------------------->
 */

const searchButton = document.getElementById("search-button");
const profileLink = document.getElementById("profile-link");
const publishButton = document.getElementById("publish");
const publishPopUp = document.getElementById("publish-popup-container")
const closePublishPopUpButton = document.getElementById("close-publish-popup-btn");
const submitPublishButton = document.getElementById("submit-publish-btn");
const cartButton = document.getElementById("cart-btn");
const cartPopUp = document.getElementById("cart-popup-container");
const checkoutButton = document.getElementById("checkout-btn");
const closeCartButton = document.getElementById("close-cart-btn");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const content = document.getElementById("content");

/**
 * <----------------------------------- Event Listeners ----------------------------->
 * 
 *              All event listeners added at page load are added here.
 * 
 * <--------------------------------------------------------------------------------->
 */

publishButton.addEventListener("click", function() {
    publishPopUp.classList.add("show");
    header.classList.add("blur");
    content.classList.add("blur");
    footer.classList.add("blur");
})

closePublishPopUpButton.addEventListener("click", function() {
    publishPopUp.classList.remove("show");
    header.classList.remove("blur");
    content.classList.remove("blur");
    footer.classList.remove("blur");
})

submitPublishButton.addEventListener("click", function() {
    if(infoValidated()) {

        publishPopUp.classList.remove("show");
        header.classList.remove("blur");
        content.classList.remove("blur");
        footer.classList.remove("blur");
    }
})

cartButton.addEventListener("click", function() {
    cartPopUp.classList.add("show");
    header.classList.add("blur");
    content.classList.add("blur");
    footer.classList.add("blur");
})

checkoutButton.addEventListener("click", function() {

    cartPopUp.classList.remove("show");
    header.classList.remove("blur");
    content.classList.remove("blur");
    footer.classList.remove("blur");
})

closeCartButton.addEventListener("click", function() {
    cartPopUp.classList.remove("show");
    header.classList.remove("blur");
    content.classList.remove("blur");
    footer.classList.remove("blur");
})


/**
 * Todo
 * @returns 
 */

function infoValidated() {
    return true;
}



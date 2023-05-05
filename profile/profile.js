/**
 * <----------------------------------- Constants ----------------------------------->
 * 
 *                                  All constants here.
 * 
 * <--------------------------------------------------------------------------------->
 */

const cartButton = document.getElementById("cart-btn");
const cartPopUp = document.getElementById("cart-popup-container");
const checkoutButton = document.getElementById("checkout-btn");
const closeCartButton = document.getElementById("close-cart-btn");


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

/**
 * <----------------------------------- Constants ----------------------------------->
 * 
 *                                  All constants here.
 * 
 * <--------------------------------------------------------------------------------->
 */
import { getSocket, addMessageListener } from "../websocket.js";
const cartButton = document.getElementById("cart-btn");
const cartPopUp = document.getElementById("cart-popup-container");
const checkoutButton = document.getElementById("checkout-btn");
const closeCartButton = document.getElementById("close-cart-btn");

var connection = getSocket()
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

addMessageListener(function(evt) {
    let data = JSON.parse(evt.data) 
    let payload = data.payload
    connection.send('Hello')

    if (data.type === 'pendingOrders') {

    }
    console.log('elo, from profile')
})

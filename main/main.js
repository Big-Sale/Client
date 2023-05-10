const connection = new WebSocket('ws://127.0.0.1:8080')
const cart = []
var userId = 1
var username

const store = document.getElementById('store-content')
const profile = document.getElementById('profile-content')
const login = document.getElementById('login-content')
profile.classList.add('hidden')
store.classList.add("hidden")


const searchButton = document.getElementById("search-button")
const profileLink = document.getElementById("profile-link")
//const publishButton = document.getElementById("publish")
const publishPopUp = document.getElementById("publish-popup-container")
const closePublishPopUpButton = document.getElementById("close-publish-popup-btn")
const submitPublishButton = document.getElementById("submit-publish-btn")
const cartButton = document.getElementById("cart-btn")
const cartPopUp = document.getElementById("cart-popup-container")
const checkoutButton = document.getElementById("checkout-btn")
const closeCartButton = document.getElementById("close-cart-btn")
const header = document.getElementById("header")
const footer = document.getElementById("footer")
const content = document.getElementById("content")
const logoClick = document.getElementById('back-to-store')
const logo = document.getElementById('logo-div')

const filterBtn = document.getElementById('filter-order-history-btn')

const form = document.querySelector('form')
const usernameField = form.querySelector('input[name="username"]')
const passwordField = form.querySelector('input[name="password"]')
const registerButton = document.getElementById('sign-up')
const container = document.querySelector(".container")
const loginContainer = document.getElementById('login-container')
const registerContainer = document.getElementById('register')
const submitRegisterButton = document.getElementById('submit-signup')
const loginButton = document.getElementById('login')
const loginRedirect = document.getElementById('redirect')

//store group
/*
publishButton.addEventListener("click", function() {
    publishPopUp.classList.add("show");
    header.classList.add("blur");
    content.classList.add("blur");
    footer.classList.add("blur");
})
*/


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

        data = {}
        payload = {}
        data.type = 'addProduct'
        payload.productType = document.getElementById('product-category')
        payload.price = document.getElementById('product-price')
        payload.date = document.getElementById('product-year')
        payload.colour = document.getElementById('product-colour')
        payload.condition = document.getElementById('product-condition')
        payload.productName = document.getElementById('product-name')
        payload.userId = userid
        data.payload = payload

        connection.send(JSON.stringify(data))
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


//change scene group
function changeToProfile() {
    profile.classList.remove('hidden')
    store.classList.add('hidden')
    login.classList.add('hidden')
    let logo = document.getElementById('logo-div')
    let publish = document.getElementById('publish')
    if (publish) {
        logo.removeChild(publish)
    }

    let data = {}
    data.type = 'notifications'
    connection.send(JSON.stringify(data))
}

function changeToStore() {
    profile.classList.add('hidden')
    store.classList.remove('hidden')
    login.classList.add('hidden')
    let logo = document.getElementById('logo-div')
    let publish = document.getElementById('publish')
    if (!publish) {
        let button = document.createElement('button')
        button.setAttribute('id', 'publish')
        button.classList.add('publish-button')
        button.textContent = 'Publish Ad'
        button.addEventListener('click', function() {
            publishPopUp.classList.add('show')
            header.classList.add('blur')
            content.classList.add('blur')
            footer.classList.add('blur')
        })
        logo.appendChild(button)
    }
}

//handle message group


function removeFromCart(productId) {
    let tr = document.getElementById("cart-row" + productId)
    tr.remove()
    let index = cart.indexOf(productId)
    cart.splice(index, 1)
    console.log(cart)
}

function addToCart(productId, name, price) {
    if(cart.includes(productId)) return
    cart.push(productId)
    
    let template = 
                `<tr class="cart-row" id="cart-row${productId}">
                    <td>${productId}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td><button class=cart-binary-btn onclick="removeFromCart(${productId})">-</td>
                </tr>`
    let cartTable = document.getElementById("cart-table").innerHTML += template
}

function updateProductTable(payload) {
    let tableContainer = document.getElementById("table-div")
        if(payload.length === 0) {
            let error = "<h1>No items found</h1>"
            tableContainer.innerHTML = error
        } else {
            tableContainer.innerHTML = `<table id="product-list"></table>`
            let productContainer = document.getElementById("product-list")
            productContainer.innerHTML = 
                                        `
                                        <tr id="list-titles">
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Category</td>
                                            <td>Price</td>
                                            <td>Production Year</td>
                                            <td>Color</td>
                                            <td>Condition</td>
                                            <td>Seller</td>
                                            <td>Cart</td>
                                        </tr>`;
    
            payload.forEach(element => {
                let productTemplate = 
                                `<tr class="product-row">
                                    <td class="product-column">${element.productId}</td>
                                    <td class="product-column">${element.productName}</td>
                                    <td class="product-column">${element.productType}</td>
                                    <td class="product-column">${element.price}</td>
                                    <td class="product-column">${element.yearOfProduction}</td>
                                    <td class="product-column">${element.colour}</td>
                                    <td class="product-column">${element.condition}</td>
                                    <td class="product-column">${element.seller}</td>
                                    <td class="product-column"><button class="cart-binary-btn" onclick="addToCart(${element.productId}, '${element.productName}', ${element.price})">+</button></td>
                                </tr>`
                productContainer.innerHTML += productTemplate
            });
        }
}




function handleLogin(success) {
    if (success) {
        changeToStore()
        logoClick.addEventListener('click', changeToStore)
        profileLink.addEventListener('click', changeToProfile)
        document.getElementById('header-username').textContent = username
    } else {
        alert('Invalid login credentials')
    }
}


function handleSignup(success) {
    if (success) {
        changeToStore()
        logoClick.addEventListener('click', changeToStore)
        profileLink.addEventListener('click', changeToProfile)
        document.getElementById('header-username').textContent = username
    } else {
        alert('Username or E-mail already exists')
    }
}


function handleSearch(data) {
    if (data) {
       // connection.send('hej')
                //show success and/or login user
    } else {
        //show error
    }
}

function handlePublishProduct(data) {
    if(success) {

    } else {

    }
}

//profile group 

filterBtn.addEventListener('click', function() {
    let filterDate = document.getElementById('filter-date')
    let data = {}
    let payload = {}
    payload.userId = userId
    payload.date = filterDate.value
    data.type = 'OrderHistoryRequest'
    data.payload = payload 
    connection.send(JSON.stringify(data))    
})

function updateOrderHistory(payload) {
    let searchedOrders = document.getElementById('searched-orders')
    while (searchedOrders.firstChild) {
        searchedOrders.removeChild(searchedOrders.lastChild)
    }
    payload.forEach(element => {
        let id = document.createElement('h4')
        console.log(element.productId)
        id.textContent = element.productId
        searchedOrders.appendChild(id)
    })
    
}


//auth group

loginRedirect.addEventListener('click', () => {
    container.classList.remove("expanded");
    loginContainer.classList.remove("removed");
    registerContainer.classList.remove("visible");
})

/**
 * When the button for registering is clicked, the menu for 
 * submitting user info is shown by adding CSS classes to the 
 * corresponding elements.
 */
registerButton.addEventListener('click', () => {
    container.classList.add("expanded");
    loginContainer.classList.add("removed");
    registerContainer.classList.add("visible");
});

/**
 * When login is pressed, input is validated and the load-icon
 * should be shown while the request is processing. Async, await 
 * something something
 * 
 * **SIDENOTE** Maybe some technical debt here; I did the login-part
 * as a form, that's why theres no actual button corresponding to
 * this function.
*/

form.addEventListener('submit', function(e) {
    
    if(!checkUsername() || !checkPassword()) {
        return;
    }
    e.preventDefault();
    
    showLoading(loginButton);
    setTimeout(() => {

        form.submit();
    }, 3000)
});

/**
 * When the button for submitting user info is clicked, the load
 * icon should be shown while waiting for the response. Async?
 */

submitRegisterButton.addEventListener('click', () => {
    if(validUserDetails()) {
        showLoading(submitRegisterButton);
        let data = {}
        data.type = 'signup'
        let payload = {}
        payload.firstName = document.getElementById('first-name').value
        payload.lastName = document.getElementById('last-name').value
        payload.dateOfBirth = document.getElementById('date-of-birth').value
        payload.email = document.getElementById('e-mail').value
        payload.username = document.getElementById('username').value
        payload.pw = document.getElementById('password').value
        data.payload = payload
        username = document.getElementById('username').value
        connection.send(JSON.stringify(data))
    }
})

/** 
 * <----------------------------------- Functions ----------------------------------->
 * 
 *          I've put stuff defined with function here. You get the idea.
 * 
 * <--------------------------------------------------------------------------------->
*/

/**
 * Process user input for validity when registering as a new user
 * @returns 
 */

function validUserDetails() {
    // TODO
    return true;
}

/**
 * Checks to see whether username input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkUsername() {
    if (usernameField.value.length < 5) {
        usernameField.insertAdjacentHTML('afterend', '<div class="error">Username must be at least 5 characters long</div>');
        return false;
      }
      return true;
}


/**
 * Checks to see whether password input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkPassword() {
    if (passwordField.value === '') {
        passwordField.insertAdjacentHTML('afterend', '<div class="error">Password cannot be empty</div>');
        return false;
      }
      return true;
}

/**
 * Adds a loading icon to the classlist of the button added. This
 * CSS is wonky as fuck and should be redone as one needs to apply
 * the correct x and y index for the load bar for each individual
 * button (see .btn-submit-signup .lds ripple and below column for
 * example)
 * @param {*} button 
 */

function showLoading(button) {
    button.classList.add('loading');
    setTimeout(() => {
        button.classList.remove('loading');
    }, 3000);
}


connection.onmessage = function(evt) {
    let data = JSON.parse(evt.data)
    console.log(data)
    let payload = data.payload
    if (data.type === 'login') {
        handleLogin(payload.success)
    } else if (data.type === 'signup') {
        handleSignup(payload.success)
    } else if (data.type === 'randomProducts' || data.type === 'search') {
        updateProductTable(payload)
    } else if (data.type === 'notification') {

    } else if (data.type === 'pending_orders') {

    } else if (data.type === 'order_history_request') {
        updateOrderHistory(payload)
    }
}
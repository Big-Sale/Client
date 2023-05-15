const connection = new WebSocket('ws://127.0.0.1:8080')
var cart = []
var userId
var username

const store = document.getElementById('store-content')
const profile = document.getElementById('profile-content')
const login = document.getElementById('login-content')
//login.classList.add('hidden') for testing purposes
profile.classList.add('hidden')
store.classList.add("hidden")


const searchButton = document.getElementById("search-button")
const profileLink = document.getElementById("profile-link")
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
closePublishPopUpButton.addEventListener("click", function() {
    publishPopUp.classList.remove("show")
    header.classList.remove("blur")
    content.classList.remove("blur")
    footer.classList.remove("blur")
})

searchButton.addEventListener('click', () => {
    const data = {
      type: 'search',
      payload: {
        minPrice: document.getElementById('price-from').value || -1,
        maxPrice: document.getElementById('price-to').value || -1,
        productType: document.getElementById('search-input').value || undefined,
        condition: document.getElementById('condition-dropdown').value || undefined,
      },
    }
    connection.send(JSON.stringify(data))
  })
  

submitPublishButton.addEventListener("click", () => {
    if (infoValidated()) {
        publishPopUp.classList.remove("show")
        header.classList.remove("blur")
        content.classList.remove("blur")
        footer.classList.remove("blur")
      
        const data = {
            type: 'addProduct',
                payload: {
                productType: document.getElementById('product-category').value,
                price: document.getElementById('product-price').value,
                date: document.getElementById('product-year').value,
                colour: document.getElementById('product-colour').value,
                condition: document.getElementById('product-condition').value,
                productName: document.getElementById('product-name').value,
            },
        }
        console.log('hello')
        connection.send(JSON.stringify(data))
    }
})
  

cartButton.addEventListener("click", () => {
    cartPopUp.classList.add("show")
    header.classList.add("blur")
    profile-content.classList.add("blur")
    content.classList.add("blur")
    footer.classList.add("blur")
})

checkoutButton.addEventListener("click", () => {
    cartPopUp.classList.remove("show")
    header.classList.remove("blur")
    content.classList.remove("blur")
    profile-content.classList.remove("blur")
    footer.classList.remove("blur")
    
    const data = {
      type: 'buyProduct',
      payload: cart,
    }
    
    connection.send(JSON.stringify(data))
    
    cart = []
    
    const table = document.querySelector('#cart-table')
    const rows = table.querySelectorAll('tr')
    
    for (let i = 1; i < rows.length; i++) {
      table.removeChild(rows[i])
    }
  })

closeCartButton.addEventListener("click", () => {
    cartPopUp.classList.remove("show")
    header.classList.remove("blur")
    profile-content.classList.remove("blur")
    content.classList.remove("blur")
    footer.classList.remove("blur")
})


/**
 * Todo
 * @returns 
 */

function infoValidated() {
    return true
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
    const data = {
        type: 'notifications'
    }
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

function addToCart(productId, name, price) {
    return function() {     
        if(cart.includes(productId)) return
        cart.push(productId)
        let cartTable = document.getElementById('cart-table')
        let tr = document.createElement('tr')
        tr.classList.add('cart-row')
        let id = 'cart-row' + productId
        tr.setAttribute('id', id)
        cartTr(productId, tr)
        cartTr(name, tr)
        cartTr(price, tr)
        let td = document.createElement('td')
        let button = document.createElement('button')
        button.classList.add('cart-binary-btn')
        button.textContent = '-'
        button.addEventListener('click', () => {
            let tr = document.getElementById("cart-row" + productId)
            tr.remove()
            let index = cart.indexOf(productId)
            cart.splice(index, 1)
        })
        td.appendChild(button)
        tr.appendChild(td)
        cartTable.appendChild(tr)
    }
}

function cartTr(textContent, tr) {
    let td = document.createElement('td')
    td.textContent = textContent
    tr.appendChild(td)
}

function updateProductTable(payload) {
    let tableContainer = document.getElementById("table-div")
    let oldTable = document.getElementById('product-list')
    let oldError = document.getElementById('error')
    if (oldTable) {
        tableContainer.removeChild(oldTable)
    }
    if (oldError) {
        tableContainer.removeChild(oldError)
    }
    if (payload.length === 0) {
        let error = document.createElement('h1')
        error.textContent = 'No items found'
        error.setAttribute('id', 'error')
        tableContainer.appendChild(error)        
    } else {
        let table = document.createElement('table')
        table.setAttribute('id', 'product-list')
        tableContainer.appendChild(table)
        let listTiles = document.createElement('tr')
        listTiles.classList.add('list-titles')
        createTdForListTitle('ID', listTiles)
        createTdForListTitle('Name', listTiles)
        createTdForListTitle('Category', listTiles)
        createTdForListTitle('Price', listTiles)
        createTdForListTitle('Production', listTiles)
        createTdForListTitle('Colour', listTiles)
        createTdForListTitle('Condition', listTiles)
        createTdForListTitle('Seller', listTiles)
        createTdForListTitle('Cart', listTiles)
        table.appendChild(listTiles)
        payload.forEach(element => {
            let tr = document.createElement('tr')
            tr.classList.add('product-row')
            createTdForProductRow(element.productId, tr)
            createTdForProductRow(element.productName, tr)
            createTdForProductRow(element.productType, tr)
            createTdForProductRow(element.price, tr)
            createTdForProductRow(element.yearOfProduction, tr)
            createTdForProductRow(element.colour, tr)
            createTdForProductRow(element.condition, tr)
            createTdForProductRow(element.seller, tr)
            let td = document.createElement('td')
            td.classList.add('product-column')
            let button = document.createElement('button')
            button.classList.add('cart-binary-btn')
            button.textContent = '+'
            button.addEventListener('click', addToCart(element.productId, element.productName, element.price))
            td.appendChild(button)
            tr.appendChild(td)
            table.appendChild(tr)
        })
    }
}

function createTdForListTitle(text, listTiles) {
    let element = document.createElement('td')
    element.textContent = text
    listTiles.appendChild(element)
}

function createTdForProductRow(text, tr) {
    let element = document.createElement('td')
    element.classList.add('product-column')
    element.textContent = text
    tr.appendChild(element)
}

function handleLogin(id) {
    console.log(id)
    if (id !== -1) {
        userId = id
        changeToStore()
        logoClick.addEventListener('click', changeToStore)
        profileLink.addEventListener('click', changeToProfile)
        document.getElementById('header-username').textContent = username
    } else {
        console.log('denied')
        alert('Invalid login credentials')
    }
}

function handleSignup(id) {
    if (id !== -1) {
        userId = id
        changeToStore()
        logoClick.addEventListener('click', changeToStore)
        profileLink.addEventListener('click', changeToProfile)
        document.getElementById('header-username').textContent = username
    } else {
        alert('Username or E-mail already exists')
    }
}

function handlePublishProduct(data) {
    if(success) {

    } else {

    }
}

function handleNotification(data) {
    const table = document.getElementById('notifications-table')
    const rows = table.querySelectorAll('tr')
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i])
    }
    data.forEach(element => {
        let tr = document.createElement('tr')
        createNotificationsTd(element.productId, tr)
        createNotificationsTd(element.productName, tr)
        createNotificationsTd(element.price, tr)
        let td = document.createElement('td')
        let button = document.createElement('button')
        button.textContent = '+'
        button.addEventListener('click', addToCart(element.productId, element.productName, element.price))
        td.appendChild(button)
        tr.appendChild(td)
        table.appendChild(tr)
    })
    
}

function createNotificationsTd(textContent, tr) {
    let td = document.createElement('td')
    td.textContent = textContent
    //add classlist
    tr.appendChild(td)
}

//profile group 

filterBtn.addEventListener('click', function() {
    let filterDate = document.getElementById('filter-date')
    if (filterDate.value.length === 0) return
    const data = {
        type: 'OrderHistoryRequest',
        payload: {
            userId: userId, 
            date: filterDate.value
        }
    }
    connection.send(JSON.stringify(data))    
})

function updateOrderHistory(payload) {
    let searchedOrders = document.getElementById('searched-orders')
    while (searchedOrders.firstChild) {
        searchedOrders.removeChild(searchedOrders.lastChild)
    }
    if (payload.length === 0) {
        let empty = document.createElement('h4')
        empty.textContent = 'Nothing to show'
        searchedOrders.appendChild(empty)
    } else {
        payload.forEach(element => {
            let id = document.createElement('h4')
            console.log(element.productId)
            id.textContent = element.productId
            searchedOrders.appendChild(id)
        })
    }
}


//auth group

loginRedirect.addEventListener('click', () => {
    container.classList.remove("expanded")
    loginContainer.classList.remove("removed")
    registerContainer.classList.remove("visible")
})

/**
 * When the button for registering is clicked, the menu for 
 * submitting user info is shown by adding CSS classes to the 
 * corresponding elements.
 */
registerButton.addEventListener('click', () => {
    container.classList.add("expanded")
    loginContainer.classList.add("removed")
    registerContainer.classList.add("visible")
})

/**
 * When login is pressed, input is validated and the load-icon
 * should be shown while the request is processing. Async, await 
 * something something
 * 
 * **SIDENOTE** Maybe some technical debt here; I did the login-part
 * as a form, that's why theres no actual button corresponding to
 * this function.
*/

loginButton.addEventListener('click', () => {
    if(!checkUsername() || !checkPassword()) {
        return
    }
    showLoading(loginButton)
    const data = {
        type: 'login',
        payload: {
            username: usernameField.value,
            pw: passwordField.value
        }
    }
    username = usernameField.value
    connection.send(JSON.stringify(data))
})

/**
 * When the button for submitting user info is clicked, the load
 * icon should be shown while waiting for the response. Async?
 */

submitRegisterButton.addEventListener('click', () => {
    if(validUserDetails()) {
        showLoading(submitRegisterButton)
        const data = {
            type: 'signup',
            payload: {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                dateOfBirth: document.getElementById('date-of-birth').value,
                email: document.getElementById('e-mail').value,
                username: document.getElementById('username').value,
                pw: document.getElementById('password').value
            }
        }
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
    return true
}

/**
 * Checks to see whether username input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkUsername() {
    if (usernameField.value.length < 3) {
        usernameField.insertAdjacentHTML('afterend', '<div class="error">Username must be at least 5 characters long</div>')
        return false
      }
      return true
}


/**
 * Checks to see whether password input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkPassword() {
    if (passwordField.value === '') {
        passwordField.insertAdjacentHTML('afterend', '<div class="error">Password cannot be empty</div>')
        return false
      }
      return true
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
    button.classList.add('loading')
    setTimeout(() => {
        button.classList.remove('loading')
    }, 3000)
}


connection.onmessage = function(evt) {
    const data = JSON.parse(evt.data)
    console.log(data)
    const payload = data.payload
    
    switch (data.type) {
      case 'login':
        handleLogin(payload.id)
        break
      case 'signup':
        handleSignup(payload.id)
        break
      case 'randomProducts':
      case 'search':
        updateProductTable(payload)
        break
      case 'notifications':
        handleNotification(payload)
        break
      case 'pending_orders':
        // handle pending orders here
        break
      case 'order_history_request':
        updateOrderHistory(payload)
        break
      default:
        console.log(`Unknown data type: ${data.type}`)
    }
  }
  
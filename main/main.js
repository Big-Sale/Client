const connection = new WebSocket('ws://127.0.0.1:8080')
var cart = []
var userId
var username

const store = document.getElementById('store-content')
const profile = document.getElementById('profile-content')
const login = document.getElementById('login-content')
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
const subscribeButton = document.getElementById('subscribe-button')

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

function addNotification() {
    const svg = document.querySelector('.user-nav > svg')
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute('id', 'notification-circle')
    circle.setAttribute("cx", "20")
    circle.setAttribute("cy", "2")
    circle.setAttribute("r", "3")
    circle.setAttribute("fill", "red")
    svg.appendChild(circle)
}
  

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

subscribeButton.addEventListener('click', () => {
    let typeTerm = document.getElementById('search-input')
    if(typeTermValidated(typeTerm)) {
        const data = {
            type: 'subscribe',
            payload: typeTerm.value
        }
        connection.send(JSON.stringify(data))
    }
    typeTerm.value = ''
})

function typeTermValidated(typeTerm) {
    return typeTerm.length > 0
}

function infoValidated() {
    return true
}

function changeToProfile() {
    let circle = document.getElementById('notification-circle')
    if (circle) {
        circle.remove()
    }
    profile.classList.remove('hidden')
    store.classList.add('hidden')
    login.classList.add('hidden')
    let logo = document.getElementById('logo-div')
    let publish = document.getElementById('publish')
    if (publish) {
        logo.removeChild(publish)
    }
    let data = {
        type: 'notifications'
    }
    connection.send(JSON.stringify(data))
    data = {
        type: 'pendingOrderRequest'
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
        createTdForListTitle('Type', listTiles)
        createTdForListTitle('Price', listTiles)
        createTdForListTitle('Production', listTiles)
        createTdForListTitle('Colour', listTiles)
        createTdForListTitle('Condition', listTiles)
        createTdForListTitle('Seller', listTiles)
        createTdForListTitle('Add', listTiles)
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

function handleLogin(payload) {
    if (payload.id !== -1) {
        userId = payload.id
        changeToStore()
        logoClick.addEventListener('click', changeToStore)
        profileLink.addEventListener('click', changeToProfile)
        document.getElementById('header-username').textContent = username
        if (payload.notify === true) {
            addNotification()
        }
    } else {
        alert('Invalid login credentials')
    }
}

function handleSubscriptionNotification(product) {
    if (profile.classList.contains('hidden')) {
        addNotification()
    } else {
        const table = document.getElementById('notifications-table')
        let tr = document.createElement('tr')
        const id = 'notification-id' + product.productId
        tr.setAttribute('id', id)

        createRowElement(product.productName, tr)
        createRowElement(product.price, tr)

        let cartTd = document.createElement('td')
        let cartButton = document.createElement('button')
        cartButton.textContent = '+'
        cartButton.addEventListener('click', addToCart(product.productId, product.productName, product.price))

        let removeTd = document.createElement('td')
        let removeButton = document.createElement('button')
        removeButton.textContent = '-'
        removeButton.addEventListener('click', () => {
            const data = {
                type: 'removeNotification',
                payload: product.productId
            }
            let tr = document.getElementById(id)
            tr.remove()
            connection.send(JSON.stringify(data))
        })
        
        cartTd.appendChild(cartButton)
        removeTd.appendChild(removeButton)
        tr.appendChild(cartTd)
        tr.appendChild(removeTd)
        table.appendChild(tr)
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

function handleNotification(data) {
    const table = document.getElementById('notifications-table')
    const rows = table.querySelectorAll('tr')
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i])
    }
    data.forEach(element => {
        let tr = document.createElement('tr')
        const id = 'notification-id' + element.productId
        tr.setAttribute('id', id)
        createRowElement(element.productType, tr)
        createRowElement(element.price, tr)
        let cartTd = document.createElement('td')
        let cartButton = document.createElement('button')
        cartButton.textContent = '+'
        cartButton.addEventListener('click', addToCart(element.productId, element.productName, element.price))
        cartTd.appendChild(cartButton)
        tr.appendChild(cartTd)

        let removeTd = document.createElement('td')
        let removeButton = document.createElement('button')
        removeButton.textContent = '-'
        removeButton.addEventListener('click', () => {
            const data = {
                type: 'removeNotification',
                payload: element.productId
            }
            let tr = document.getElementById(id)
            tr.remove()
            connection.send(JSON.stringify(data))
        })
        removeTd.appendChild(removeButton)
        tr.appendChild(removeTd)
        table.appendChild(tr)
    })
}

function handlePendingOrders(orders) {
    let table = document.getElementById('pending-order-table')
    const rows = table.querySelectorAll('tr')
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i])
    }
    orders.forEach(element => {
        addPendingToTable(element, table)
    })
}

function addPendingToTable(element, table) {
    let tr = document.createElement('tr')
    const id = 'notification-id' + element.productId
    tr.setAttribute('id', id)
    createRowElement(element.product.productType, tr)
    createRowElement(element.product.price, tr)
    createRowElement(element.buyer, tr)
    let acceptTd = document.createElement('td')
    let acceptButton = document.createElement('button')
    acceptButton.textContent = '+'
    acceptButton.addEventListener('click', () => {
        let data = {
            type: 'acceptProductSale',
            payload: {
                productId : element.product.productId,
                buyer: element.buyerId
            }
        }
        connection.send(JSON.stringify(data))
        data = {
            type: 'pendingOrderRequest'
        }
        connection.send(JSON.stringify(data))
    })
    acceptTd.appendChild(acceptButton)
    tr.appendChild(acceptTd)
    let removeTd = document.createElement('td')
    let removeButton = document.createElement('button')
    removeButton.textContent = '-'
    removeButton.addEventListener('click', () => {
        let data = {
            type: 'denyProductSale',
            payload: {
                productId : element.product.productId,
                buyer: element.buyerId
            }
        }
        connection.send(JSON.stringify(data))
        data = {
            type: 'pendingOrderRequest'
        }
        connection.send(JSON.stringify(data))
    })
    removeTd.appendChild(removeButton)
    tr.appendChild(removeTd)
    table.appendChild(tr)
}

function createRowElement(textContent, tr) {
    let td = document.createElement('td')
    td.textContent = textContent
    tr.appendChild(td)
}

filterBtn.addEventListener('click', function() {
    let filterDate = document.getElementById('filter-date')
    if (filterDate.value.length === 0) return
    const data = {
        type: 'orderHistoryRequest',
        payload: {
            userId: userId, 
            date: filterDate.value
        }
    }
    connection.send(JSON.stringify(data))    
})

function updateOrderHistory(payload) {
    const table = document.getElementById('order-history-table')
    const rows = table.querySelectorAll('tr')
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i])
    }
    payload.forEach(element => {
        let tr = document.createElement('tr')
        createRowElement(element.productType, tr)
        createRowElement(element.price, tr)
        createRowElement(element.condition, tr)
        createRowElement(element.dateOfPurchase, tr)
        table.appendChild(tr)
    })
}

loginRedirect.addEventListener('click', () => {
    container.classList.remove("expanded")
    loginContainer.classList.remove("removed")
    registerContainer.classList.remove("visible")
})

registerButton.addEventListener('click', () => {
    container.classList.add("expanded")
    loginContainer.classList.add("removed")
    registerContainer.classList.add("visible")
})

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

function validUserDetails() {
    return true
}

function checkUsername() {
    return true
}

function checkPassword() {
    if (passwordField.value === '') {
        return false
    }
    return true
}

function showLoading(button) {
    button.classList.add('loading')
    setTimeout(() => {
        button.classList.remove('loading')
    }, 3000)
}

function handlePendingOrderNotification(payload) {
    if (profile.classList.contains('hidden')) {
        addNotification()
    } else {
        let table = document.getElementById('pending-order-table')
        addPendingToTable(payload, table)
    }
}

connection.onmessage = function(evt) {
    const data = JSON.parse(evt.data)
    console.log(data)
    const payload = data.payload
    
    switch (data.type) {
      case 'login':
        handleLogin(payload)
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
        handlePendingOrders(payload)
        break
      case 'order_history_request':
        updateOrderHistory(payload)
        break
      case 'subscribed_product':
        handleSubscriptionNotification(payload)
        break
      case 'pending_order_notification':
        handlePendingOrderNotification(payload)
        break
      default:
        console.log(`Unknown data type: ${data.type}`)
    }
}
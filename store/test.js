var connection = new WebSocket('ws://127.0.0.1:1234')



connection.onopen = function() {
    data = {}
    payload = {}
    data.type = 'addProduct'
    payload.productType = 'hej'
    payload.price = 10
    payload.date = '1111'
    payload.colour = 'red'
    payload.condition = 'good'
    payload.productName = 'hej'
    data.payload = payload
    console.log('connected')
    connection.send(JSON.stringify(data))
}

connection.onmessage = function(evt) {
    data = JSON.parse(evt.data)
    payload = data.payload
    if (data.type === 'login') {
        handleLogin(payload.success)
    } else if (data.type === 'signup') {
        handleSignup(payload)
    } else if (data.type === 'randomProducts') {
        productContainer = document.getElementById('cock')
        payload.forEach(element => {
            const productTemplate = `<div class="product">
                <div class="product-name">${element.productName}</div>
                <div class="prodzuct-category">${element.productType}</div>
                <div class="product-price">${element.price}</div>
                <div class="product-year">${element.yearOfProduction}</div>
                <div class="product-color">${element.colour}</div>
                <div class="product-condition">${element.condition}</div>
                <div class="product-seller">${element.seller}</div>
                <button class="add-to-cart">Add to Cart</button>
            </div>`
            productContainer.innerHTML += productTemplate
            console.log('hello')
        });
    }
}

function handleLogin(success) {
    if (success) {
        connection.send
        //handle login succeess
    } else {
        //handle login fail.
    }
}


function handleSignup(data) {
    if (data) {
        connection.send('hej')
                //show success and/or login user
    } else {
        //show error
    }
}

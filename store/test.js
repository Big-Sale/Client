var connection = new WebSocket('ws://127.0.0.1:1234');


const cart = [];

connection.onopen = function() {
    /*
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
    connection.send(JSON.stringify(data))*/
}

connection.onmessage = function(evt) {
    data = JSON.parse(evt.data);
    payload = data.payload;
    if (data.type === 'login') {
        handleLogin(payload.success);
    } else if (data.type === 'signup') {
        handleSignup(payload)
    } else if (data.type === 'randomProducts') {

        let tableContainer = document.getElementById("table-div");
        
        if(payload.length === 0) {
            let error = "<h1>Your stupid search didn't find anything</h1>";
            tableContainer.innerHTML = error;
        } else {
            tableContainer.innerHTML = `<table id="product-list"></table>`;
            let productContainer = document.getElementById("product-list");
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
    
                productTemplate = 
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
                console.log('hello')
            });
        }
    }
}

function addToCart(productId, name, price) {
    if(cart.includes(productId)) return;
    cart.push(productId);
    
    let template = 
                `<tr class="cart-row" id="cart-row${productId}">
                    <td>${productId}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td><button class=cart-binary-btn onclick="removeFromCart(${productId})"></td>
                </tr>`
    let cartTable = document.getElementById("cart-table").innerHTML += template;
}

function removeFromCart(productId) {
    let tr = document.getElementById("cart-row" + productId);
    tr.remove();
    let index = cart.indexOf(productId);
    cart.splice(index, 1);
    console.log(cart);
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

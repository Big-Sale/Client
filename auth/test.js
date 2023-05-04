var connection = new WebSocket('ws://127.0.0.1:1234')

connection.onopen = function() {
    data = {}
    payload = {}
    data.type = 'addProduct'
    payload.productType = 'hej'
    payload.price = 10
    payload.date = '1111'
    payload.colour = 'red'
    payload.condition = 1
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
    }
}

function handleLogin(success) {
    if (success) {
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

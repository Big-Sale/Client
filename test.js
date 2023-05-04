var connection = new WebSocket('ws://127.0.0.1:1234')

connection.onopen = function() {
    data = {}
    payload = {}
    data.type = 'login'
    payload.username = 'hej'
    payload.pw = 'pw'
    data.payload = payload
    console.log('connected')
    connection.send(JSON.stringify(data))
}

connection.onmessage = function(evt) {
    data = JSON.parse(evt.data)
    payload = data.payload
    if (data.type === 'login') {
        //updatepage
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
        //show success and/or login user
    } else {
        //show error
    }
}

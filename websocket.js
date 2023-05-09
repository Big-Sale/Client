let connection = null;
localStorage.removeItem('websocketconnected')
function connect(url) {
    connection = new WebSocket(url);

    connection.onopen = function() {
        localStorage.setItem('websocketconnected', true)
        console.log('WebSocket connection established');
    };

    connection.onclose = function(event) {
        localStorage.removeItem('websocketconnected')
        console.log('WebSocket connection closed with code ${event.code}');
    };

    connection.onerror = function(error) {
        console.error('WebSocket error', error);
    };
    return connection;
}

function getSocket() {
    let bool = localStorage.getItem('websocketconnected')
    console.log(bool)
    if (!bool) {
        connect('ws://127.0.0.1:8080')
        console.log('connected')
    } else {
        console.log('already connected')
    }
    return connection;
}


function addMessageListener(callback) {
    connection.addEventListener('message', callback);
}

export { getSocket, addMessageListener };
var connection;

function connect(url) {
    connection = new WebSocket(url)

    connection.onopen = function() {
        //do something
    }
    connection.onclose = function() {
        //do something?
    }
    connection.onerror = function(error) {
        console.log(error)
    }

    return connection
}

function getSocket() {
    if (!connection || connection.readyState === WebSocket.CLOSED) {
        connect('ws://127.0.0.1:8080')
    }
    return connection
}

function addMessageListener(callback) {
    connection.addEventListener('onmessage', callback)
}

export { getSocket, addMessageListener }
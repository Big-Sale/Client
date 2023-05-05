/*
if(!sessionStorage.getItem('websocket-connected')) {
    var connection = new WebSocket('ws://127.0.0.1:1234');
    sessionStorage.setItem('websocket-connected', true);
    connection.addEventListener('close', function() {
        sessionStorage.removeItem('websocket-connected')
    })
}
export {connection};
*/
var connection = new WebSocket('ws://127.0.0.1:1234');
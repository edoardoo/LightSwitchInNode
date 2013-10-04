window.onload = function() {
    //onload this function will initialize a connection and privide communication between server and client
 
    var messages = [];
    //connect to the server (document.domain is necessary to reach the server if the address is different from localhost)
    var socket = io.connect(document.domain);

    //get the buttons id
    var field = document.getElementById("field");
    var accendiButton = document.getElementById("accendi");
    var spengiButton = document.getElementById("spengi");
    
    // THIS is just a note to retrieve data on opening socket.
    //
    // socket.on('message', function (data) {
    //     if(data.message) {
    //         // messages.push(data.message);
    //         console.log(data.message);
           
    //     } else {
    //         console.log("There is a problem:", data);
    //     }
    // });
 
    accendiButton.onclick = function() {
        var text = 1;
        //on click send the message
        socket.emit('send', { message: text });
    };
    spengiButton.onclick = function() {
        //on click send the message

        socket.emit('send', {message: "0"});
    }
 
}

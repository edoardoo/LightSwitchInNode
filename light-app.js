//
//Edoardo Odorico and Lorenzo Farnararo , hack.lenotta.com
// CC-BY-SA
//
//define some dependencies
var express = require("express");
var exec = require('child_process');

//give a name to the web server
var app = express();
 //open the socket and listen to 3700 port


var io = require('socket.io').listen(app.listen('3700'));


//let's set the view folder and the view engine 'jade'
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
app.use(express.static(__dirname + '/public'));

//now define what happen when connecting the client connect to the socket

io.sockets.on('connection', function (socket) {
    // socket.emit('message', { message: 'Light Switch' });
    socket.on('send', function (data) {

    	//if we receive a message with 1 then exec ./switch -f On

        if(data.message == "1"){
        	 exec.execFile('../switch',
             ['-f','On'],
			    function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			        console.log('exec error: ' + error);
			      }
		    	});
        }else{
        	   //if we receive a message which is NOT 1 then exec ./switch -f Off

        	 exec.execFile('../switch',
             ['-f','Off'],
			    function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			        console.log('exec error: ' + error);
			      }
		    	});
        
        }
    });
});

//just some output to know everything is working
console.log("Listening on port " + 3700);


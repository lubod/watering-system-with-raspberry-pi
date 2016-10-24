// http://nodejs.org/api.html#_child_processes

var sys = require('sys')
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.static(__dirname));  

app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/getLog', function (req, res) {
        res.sendFile( __dirname + "/" + "log" );
})

app.get('/getStatus', function (req, res) {
	exec("/root/all_status", function(err, stdout, stderr) {
		res.type('text/plain');
       		res.send( stdout );
	});
})

app.get('/pumpON', function (req, res) {
        exec("/root/pump_on", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/pumpOFF', function (req, res) {
        exec("/root/pump_off", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/westernON', function (req, res) {
        exec("/root/western_on", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/westernOFF', function (req, res) {
        exec("/root/western_off", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/middleON', function (req, res) {
        exec("/root/middle_on", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/middleOFF', function (req, res) {
        exec("/root/middle_off", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/easternON', function (req, res) {
        exec("/root/eastern_on", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/easternOFF', function (req, res) {
        exec("/root/eastern_off", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/pause', function (req, res) {
        exec("touch /root/pause", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

app.get('/UNpause', function (req, res) {
        exec("rm /root/pause", function(err, stdout, stderr) {
                res.type('text/plain');
                res.send( stdout );
        });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


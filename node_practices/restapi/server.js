//create an http server by loading http module
var express = require('express');
var app = express()
var bodyParser  = require('body-parser');
var routes = require('./routes');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/restdb')

//express app will use body-parser to get datea from post

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set port
var port = process.env.PORT || 8080; //set the port

app.use('/', routes);


app.listen(port);

//put a friendly message on the terminal
console.log('restapi listening on port' + port);
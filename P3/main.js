#!/usr/bin nodejs
var http = require('http');
var express = require("express");
var morgan = require("morgan");
var path = require("path")

var app = express();

var staticPath = path.join(__dirname, "static/");
app.use(express.static(staticPath));

//legal http requests
// app.use(morgan('tiny')).get('/', function (req, res) {
// 	res.send("poopiesoupie");
// });

app.use(morgan('tiny')).post('/', function (req, res) {
	res.send("wow");
});

//illegal requests
app.use(morgan('tiny')).use(function (req, res) { res.status(404).send("page not found");});


app.listen(8033);
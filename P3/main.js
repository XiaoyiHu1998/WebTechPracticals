#!/usr/bin nodejs
var http = require('http');
var express = require("express");
var morgan = require("morgan");
var path = require("path")
var database = require("./database");

var app = express();

const menuRouter = require("./menu_router");

app.use("/menu", menuRouter);
// app.get('/progressiveloading.js', function (req, res) {
// 	res.send(req.query.currentSection + " " + req.query.sectionsLoaded);
// })

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
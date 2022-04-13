#!/usr/bin nodejs
var http = require('http');
var express = require("express");
var morgan = require("morgan");
var path = require("path")
var database = require("./database");
var ses = require('express-session');
var options = {secret: 'None would guess'};

var app = express();

const menuRouter = require("./menu_router");
const userRouter = require("./user_router");

app.use(ses(options));

app.use(morgan('tiny'));

var staticPath = path.join(__dirname, "static/");
app.use(express.static(staticPath));

app.use("/menu", menuRouter);
app.use("/user", userRouter);
//app.use(errors);
//legal http requests
// app.use(morgan('tiny')).get('/', function (req, res) {
// 	res.send("poopiesoupie");
// });

app.post('/', function (req, res) {
	res.send("wow");
});

//illegal requests
app.use(function (req, res) { res.status(404).send("page not found");});


app.listen(8033);
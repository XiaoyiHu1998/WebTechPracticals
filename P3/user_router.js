var express = require("express");
var router = express.Router();
var database = require("./database");

var queryResult;

router.get('/requestLogin', (req, res) =>{
    database.userExists(req.query.username, req.query.password,callBack, res);
    queryResult
    console.log(queryResult);
})

function callBack(name, login, email, password, adress){
    console.log(name);
    queryResult = name;
    console.log(queryResult);

}

module.exports = router;
var express = require("express");
var router = express.Router();
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    database.login(req.query.username, req.query.password,req, res);
})

router.get('/requestUserInfo', (req, res) =>{
    database.GetUserInfo(req,res);
})

function callBack(name, login, email, password, adress){
    console.log(name);
    queryResult = name;
    console.log(queryResult);

}

module.exports = router;
var express = require("express");
var router = express.Router();
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    database.login(req, res);
});

router.get('/requestRegister', (req, res) => {
    database.registerUser(req, res, database.insertUser, database.login);
});

router.get('/requestUserInfo', (req, res) => {
    database.GetUserInfo(req, res);
});


module.exports = router;
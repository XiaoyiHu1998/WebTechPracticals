var express = require("express");
var router = express.Router();
var menu = require("./menu");
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    database.login(req, res);
});

router.get('/requestRegister', (req, res) => {
    database.registerUser(req, res, database.insertUser, database.login);
    database.insertOrder(0);
});

router.get('/requestUserInfo', (req, res) => {
    database.GetUserInfo(req, res);
});

router.get('/placeOrder', (req, res) => {
    if (req.query.userID == database.loggedInUser){
        console.log("order has just been placed");
        database.insertOrder(menu.getTotal());
        menu.resetSelection(req);
    
        res.send("resetAll")
    }
});

module.exports = router;
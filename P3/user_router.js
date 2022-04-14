var express = require("express");
var router = express.Router();
var menu = require("./menu");
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    database.login(req.login, req.password, req, res);
});

router.get('/requestRegister', (req, res) => {
    database.registerUser(req, database.insertUser);
    database.insertOrder(0);
});

router.get('/requestUserInfo', (req, res) => {
    console.log(loggedInUser[req.session.id]);
    if(loggedInUser[req.session.id] == undefined){
        res.send("not logged in");
        return;
    }
    var query = "SELECT * FROM Users WHERE userID=?";
    db.each(query, loggedInUser[req.session.id], function (err, row) {
        res.send([row.name, row.email, row.login, row.password, row.address]);
    });
});

function callBack(name, login, email, password, adress){
    console.log(name);
    queryResult = name;
    console.log(queryResult);

}

router.get('/placeOrder', (req, res) => {
    console.log("order has just been placed");
    database.insertOrder(menu.getTotal());
});

module.exports = router;
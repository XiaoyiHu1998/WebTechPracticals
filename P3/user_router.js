var express = require("express");
var router = express.Router();
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    var query = "SELECT * FROM Users WHERE login=? AND password=?";
    var amount = 0;
    db.each(query, [req.query.username, req.query.password], function (err, row) {
        loggedInUsers[req.session.id] = row.userID;
        console.log("logged in as" + loggedInUsers);
        res.send(row.name);
        amount++;
    });
});

router.get('/requestRegister', (req, res) => {
    var userID = db.all("SELECT COUNT(*) FROM Users");
    console.log(userID);
    var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
    insertUser.run(userID, fullname, login, password, email, adress);
});

router.get('/requestUserInfo', (req, res) => {
    console.log(loggedInUsers[req.session.id]);
    if(loggedInUsers[req.session.id] == undefined){
        res.send("not logged in");
        return;
    }
    var query = "SELECT * FROM Users WHERE userID=?";
    db.each(query, loggedInUsers[req.session.id], function (err, row) {
        res.send([row.name, row.email, row.login, row.password, row.address]);
    });
});

function callBack(name, login, email, password, adress){
    console.log(name);
    queryResult = name;
    console.log(queryResult);

}

module.exports = router;
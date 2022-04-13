var express = require("express");
var router = express.Router();
var database = require("./database");


router.get('/requestLogin', (req, res) =>{
    test = database.userExists(req.query.username, req.query.password)
	res.send(test);
})

module.exports = router;
var express = require("express");
var router = express.Router();
var menu = require("./menu")

router.get('/progressiveloading.js', (req, res) =>{
	res.send(menu.getFood(req.query.currentSection, req.query.sectionsLoaded));
})

router.get('/', (req, res) => {
	res.send("test1");
})

module.exports = router;

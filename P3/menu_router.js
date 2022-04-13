var express = require("express");
var router = express.Router();
var menu = require("./menu");

router.get('/progressiveloading.js', (req, res) =>{
	res.send(menu.getFood(req.query.currentSection, req.query.sectionsLoaded));
})

router.get('/getMenuPage.js', (req, res) =>{
	res.send(menu.getMenuSection(req.query.menuSection));
})

router.get('/increaseDish.js', (req, res) =>{
	res.send(menu.increaseDish(req.query.dishName));
})

router.get('/decreaseDish.js', (req, res) =>{
	res.send(menu.decreaseDish(req.query.dishName));
})

router.get('/updateDish.js', (req, res) =>{
	res.send(menu.updateDish(req.query.dishName));
})

router.get('/setupMenu.js', (req, res) =>{
	res.send(menu.setupMenu());
})

router.get('/', (req, res) => {
	res.send("test1");
})

module.exports = router;

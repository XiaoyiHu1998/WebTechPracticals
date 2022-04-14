// filestream stuff
var fs = require("fs");
const { createConnection } = require("net");
var file = "database.db";
var exists = fs.existsSync(file);
console.log("does database exist: " + exists);


var loggedInUser;
if(!exists){
     fs.openSync(file, "w");
}


//database stuff
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// premade users
{
    //delete premade users when database has been made
    let names = ["jan", "henk", "Gert", "Mighuelp", "haramman"];
    let logins = ["theOnlyJuan", "HonkHonk", "Geert", "Carlos", "WohlaSahbi"]
    let passwords = ["hertog", "magikIn", "verGeerd", "imInPrisonLoL", "StayAwayIAmHaram"];
    let emails = ["jan@hotmail.com", "henkie@spankie.nl", "Geert@gmail.com","mighuelp@sos.mx", "haramman@halal.sa"];
    let adresses = ["janstraat 23 A", "boerenbuurt 69", "waterstraat 231", "Alcatraz 666", "dubaibai -1"];
    
    db.serialize(
        function(){
            if(!exists){
                db.run("CREATE TABLE Users (userID INTEGER, name TEXT, login TEXT, password TEXT, email TEXT, address TEXT)");
                db.run("CREATE TABLE Orders (userID INTEGER, totalPrice REAL)");
    
                var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
                for(let userID = 0; userID < 5; userID++){
                    insertUser.run(userID, names[userID], logins[userID], passwords[userID], emails[userID], adresses[userID]);
                }
                insertUser.finalize();
            }
        }
    )
    
}

exports.login = (req, res) =>{
    console.log("loggin in");
    var query = "SELECT * FROM Users WHERE login=? AND password=?";
    db.each(query, [req.query.username, req.query.password], function (err, row) {
        console.log(row);
        loggedInUser = row.userID;
        console.log("logged in as" + loggedInUser);
        res.send(row.name);
    });
};

exports.GetUser = () => {
    if(loggedInUser != undefined){
        return loggedInUser;
    }
};

exports.GetUserInfo = (req, res) =>{
    console.log(loggedInUser);
    if(loggedInUser == undefined){
        console.log("send false");
        res.send(false);
        return;
    }
    var query = "SELECT * FROM Users WHERE userID=?";
    db.each(query, loggedInUser, function (err, row) {
        res.send([row.name, row.email, row.login, row.password, row.address]);
    });
};

exports.insertUser = (req, res, userID, login) => {
    console.log("new userID:" + userID); 
    var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
    insertUser.run(userID, req.query.fullname, req.query.username, req.query.password, req.query.email, req.query.adress);
    login(req, res);
};

exports.registerUser = (req, res, callback, login) => {
    db.all("SELECT COUNT(*) as count FROM Users", function (err, rows){
        callback(req, res, rows[0].count, login);
    });
}

exports.insertOrder = function (req) {
    var query = db.prepare("INSERT INTO Orders values (?, ?)");
    query.run(loggedInUser, total);
}


exports = db;

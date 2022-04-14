// filestream stuff
var fs = require("fs");
const { createConnection } = require("net");
var file = "database.db";
var exists = fs.existsSync();


var loggedInUsers;
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
            }
    
            var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
            for(let userID = 0; userID < 5; userID++){
                insertUser.run(userID, names[userID], logins[userID], passwords[userID], emails[userID], adresses[userID]);
            }
            insertUser.finalize();
        }
    )
    
}

exports.login = (login, password,req, res) =>{
    var query = "SELECT * FROM Users WHERE login=? AND password=?";
    db.each(query, [login, password], function (err, row) {
        loggedInUsers = row.userID;
        console.log("logged in as" + loggedInUsers);
        res.send(row.name);
    });
};

exports.GetUser = () => {
    if(loggedInUsers != undefined){
        return loggedInUsers;
    }
};

exports.GetUserInfo = (req, res) =>{
    console.log(loggedInUsers);
    if(loggedInUsers == undefined){
        res.send("not logged in");
        return;
    }
    var query = "SELECT * FROM Users WHERE userID=?";
    db.each(query, loggedInUsers, function (err, row) {
        res.send([row.name, row.email, row.login, row.password, row.address]);
    });
};

exports.insertUser = (req, userID) => {
    console.log("new userID:" + userID); 
    var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
    insertUser.run(userID, req.query.fullname, req.query.username, req.query.password, req.query.email, req.query.adress);
};

exports.registerUser = (req, callback) => {
    db.all("SELECT COUNT(*) as count FROM Users", function (err, rows){
        callback(req, rows[0].count);
    });
}

// console.log(userExists("kip", "haan"));
// console.log(userExists("theOnlyJuan", "hertog"));


exports = db;

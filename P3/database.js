// filestream stuff
var fs = require("fs");
const { createConnection } = require("net");
var file = "database.db";
var exists = fs.existsSync();

if(!exists){
    fs.openSync(file, "w");
}

// premade users
{
    //delete premade users when database has been made
    let names = ["jan", "henk", "Gert", "Mighuelp", "haramman"];
    let logins = ["theOnlyJuan", "HonkHonk", "Geert", "Carlos", "WohlaSahbi"]
    let passwords = ["hertog", "magikIn", "verGeerd", "imInPrisonLoL", "StayAwayIAmHaram"];
    let emails = ["jan@hotmail.com", "henkie@spankie.nl", "Geert@gmail.com","mighuelp@sos.mx", "haramman@halal.sa"];
    let adresses = ["janstraat 23 A", "boerenbuurt 69", "waterstraat 231", "Alcatraz 666", "dubaibai -1"];
    
    
    //database stuff
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    
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

function attemptLogin(){
    return false;
}

function registerUser(fullname, login, password, email, adress, callback){
    var userID = db.all("SELECT COUNT(*) FROM Users");
    var insertUser = db.prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)");
    insertUser.run(userID, fullname, login, password, email, adress);

    callback();
}



module.exports = db;
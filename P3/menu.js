class menu {
    constructor(appetizers, mainCourses, deserts, drinks){
        this.appetizers = appetizers;
        this.mainCourses = mainCourses;
        this.deserts = deserts;
        this.drinks = drinks;
    }

    forEachSection(func){
        this.appetizers.Foreach(section => func(section));
        this.mainCourses.Foreach(section => func(section));
        this.deserts.Foreach(section => func(section));
        this.drinks.Foreach(section => func(section));
    }

    forEachItem(func){
        this.appetizers.forEachItem(item => func(item));
        this.mainCourses.forEachItem(item => func(item));
        this.deserts.forEachItem(item => func(item));
        this.drinks.forEachItem(item => func(item));
    }
};

class menuSection {
    constructor(section, items){
        this.name = section;
        this.items = items;
    }

    forEachItem(func){
        this.items.forEach(item => func(item));
    }
};



class food{
    constructor(name, htmlName, price, diets){
        this.name = name;
        this.htmlName = htmlName;
        this.price = price;
        this.diets = diets;
    }
};

class meatDish extends food{
    constructor(name, htmlName, price, diets, meatType){
        super(name, htmlName, price, diets);
        this.meatType = meatType;
        this.diets = diets;
    }
}

class drink extends food{
    constructor(name, htmlName, price, diets, alcoholStrength, caffeineStrength){
        super(name, htmlName, price, diets);
        this.alcoholStrength = alcoholStrength;
        this.caffeineStrength = caffeineStrength;
    }
}

//#region foods
var buratta  = new food("Buratta", "buratta", 7, ["Lactose"]);
var ciccheti = new meatDish("Ciccheti", "ciccheti",  8, ["Lactose", "Gluten"], "Pork");
var focaccia = new meatDish("Focaccia", "focaccia", 8, ["Gluten"], "Beef");

var melanzane    = new food("Melanzane alla Parmigiana", "melanzane", 17, ["Lactose"]);
var ossobuco     = new meatDish("Ossobuco Milanese", "ossobuco", 20, ["-"], "Veal");
var montaraPizza = new food("Montara Pizza", "montarapizza", 17, ["Lactose"]);
var zuppaToscana = new meatDish("Zuppa Toscana", "zuppatoscana", 17, ["-"], "Chicken, Pork");

var pannaCotta = new food("Panna cotta", "pannacotta",  9, ["Lactose"]);
var semifreddo = new food("Triple chocolat semifreddo", "semifreddo", 12, ["Lactose"]);
var tiramisu   = new food("Tiramisu", "tiramisu", 10, ["Lactose"]);

var espresso        = new drink("Espresso", "espresso", 4, ["-"], 0, "strong");
var capuccino       = new drink("Capuccino", "capuccino",  4, ["Lactose"], 0, "medium");
var spritz          = new drink("Spritz", "spritz", 5, ["-"], 11.0, "none");
var birraMoretti    = new drink("Birra Moretti", "birramoretti",  4, ["Gluten"], 4.6, "none");
var mineralWater    = new drink("Mineral Water", "mineralwater", 3, ["-"], 0, "none");

//#endregion

//#region globalVars
var appetizers = new menuSection("Appetizers", [buratta, ciccheti, focaccia]);

var mainCourses = new menuSection("Main Courses", [melanzane, ossobuco, montaraPizza, zuppaToscana]);

var deserts = new menuSection("Deserts", [pannaCotta, semifreddo, tiramisu]);

var drinks = new menuSection("Drinks", [espresso, capuccino, spritz, birraMoretti, mineralWater]);

var _menu = new menu(appetizers, mainCourses, deserts, drinks);

var total = 0;
var userSelections;
var menuArray = []; //used to store amounts of each item so they are not lost when changing the active menu

exports.getFood = (_menusection, foodsLoaded) =>{
    switch(_menusection){
        case "Appetizers":
            return appetizers.items[foodsLoaded];
        case "Main Courses":
            return mainCourses.items[foodsLoaded];
        case "Deserts":
            return deserts.items[foodsLoaded];
        case "Drinks":
            return drinks.items[foodsLoaded];
        }
    };

exports.getMenuSection = (_menusection) =>{
    switch(_menusection){
        case "Appetizers":
            return appetizers;
        case "Main Courses":
            return mainCourses;
        case "Deserts":
            return deserts;
        case "Drinks":
            return drinks;
        }
    };

exports.decreaseDish = (dishName, req) =>{
    if(userSelections[dishName] < 1){
        return null;
    }
    _menu.forEachItem(item => item.name == dishName ? total-= item.price : 0);
    userSelections[dishName]--;
    return [dishName, userSelections[dishName], total];
    };

exports.increaseDish = (dishName,req) =>{
    _menu.forEachItem(item => item.name == dishName ? total += item.price : 0);
    userSelections[dishName]++;
    return [dishName, userSelections[dishName], total];
    };

exports.updateDish = (dishName,req) =>{
    return [dishName, userSelections[dishName], total];
    };


exports.setupMenu = (req) =>{
    console.log(userSelections);
    if(userSelections != undefined){
        return;
    }
    initializeFoodMenu(req);
    };

    //setup the global menuArray
function initializeFoodMenu(req) {
    mySelection = [];
    _menu.forEachItem(item => mySelection[item.name] = 0);
    userSelections = mySelection;
    console.log(mySelection);
}

    // price = parseInt(row.children[2].firstChild.nodeValue);
    // if(row.children[5].firstChild.nodeValue >= 1){
    //     row.children[5].firstChild.nodeValue = parseInt(row.children[5].firstChild.nodeValue) - 1;
    //     amount = document.getElementById("ordersum");
    //     total = parseInt(totalNode.nodeValue) - price;
    //     totalNode.nodeValue = String(total);
    //     acces = row.children[0].children[0].childNodes[0].nodeValue;
    //     menuArray[acces] -= 1;



//     //#region menuConstruction
//     function createPage(_menuSection){
//         createSectionSelector();
//         createMenuTable(_menuSection);
//         makemenupage__ordersection();
//         //makeDishFigures(_menuSection);
//         registerButtonEvents();
//     }
    
//     function makemenupage__ordersection() {
//         section = document.createElement("section");
//         section.setAttribute("id", "menupage__ordersection");
//         text = document.createTextNode("Total = ");
//         totalNode = document.createTextNode("");
//         totalNode.nodeValue = String(total);
//         euro = document.createTextNode("€ ");
//         section.appendChild(text);
//         section.appendChild(totalNode);
//         section.appendChild(euro);
//         button = document.createElement("button");
//     button.setAttribute("class", "site__submission__button");
//     button.appendChild(document.createTextNode("Place Order"));
//     button.addEventListener("click", function() {window.alert("Your order has been received, it will arrive in never ;)"); location.reload();})
//     section.appendChild(button);
//     body.insertBefore(section, footer);
// }

// // call this to change the menutable and figuresection
// function replaceBody(menuSectionString){
//     let html = document.getElementsByTagName("html")[0];
//     let header = document.getElementsByClassName("header")[0];
//     let footer = document.getElementsByClassName("footer")[0];
//     let oldBody = document.getElementsByTagName("body")[0];
//     let newBody = document.createElement("body");

//     html.removeChild(oldBody);
//     newBody.appendChild(header);
//     newBody.appendChild(footer);
//     html.appendChild(newBody);
//     currentSection = menuSectionString;
//     sectionsLoaded = 0;
//     switch(menuSectionString){
//         case "Appetizers":
//             createPage(appetizers);
//             break;
//         case "Main Courses":
//             createPage(mainCourses);
//             break;
//         case "Deserts":
//             createPage(deserts);
//             break;
//         case "Drinks":
//             createPage(drinks);
//             break;
//     }
// }

// //used for selecting menu section (appetizers, main courses, deserts, drinks)
// function createSectionSelector(){
//     let sectionSelector = document.createElement("nav");
//     sectionSelector.setAttribute("class", "menupage__menusection__nav");

//     let menuSectionTable = document.createElement("table");
//     menuSectionTable.setAttribute("class", "menupage__menusection__table");

//     let tableHead = document.createElement("thead");
//     let headRow = document.createElement("tr");

//     let appetizersButton = document.createElement("button");
//     let mainCoursesButton = document.createElement("button");
//     let desertsButton = document.createElement("button");
//     let drinksButton = document.createElement("button");

//     let appetizersButtonText = document.createTextNode("Appetizers");
//     let mainCoursesButtonText = document.createTextNode("Main Courses");
//     let desertsButtonText = document.createTextNode("Deserts");
//     let drinksButtonText = document.createTextNode("Drinks");

//     appetizersButton.addEventListener("click", function() {replaceBody(this.textContent);});
//     mainCoursesButton.addEventListener("click", function() {replaceBody(this.textContent);});
//     desertsButton.addEventListener("click", function() {replaceBody(this.textContent);});
//     drinksButton.addEventListener("click", function() {replaceBody(this.textContent);});

//     appetizersButton.appendChild(appetizersButtonText);
//     mainCoursesButton.appendChild(mainCoursesButtonText);
//     desertsButton.appendChild(desertsButtonText);
//     drinksButton.appendChild(drinksButtonText);

//     appetizersButton.setAttribute("class", "menupage__menusection__button");
//     mainCoursesButton.setAttribute("class", "menupage__menusection__button");
//     desertsButton.setAttribute("class", "menupage__menusection__button");
//     drinksButton.setAttribute("class", "menupage__menusection__button");
    
//     let appetizersColumn = document.createElement("th");
//     let mainCoursesColumn = document.createElement("th");
//     let desertsColumn = document.createElement("th");
//     let drinksColumn = document.createElement("th");

//     appetizersColumn.appendChild(appetizersButton);
//     mainCoursesColumn.appendChild(mainCoursesButton);
//     desertsColumn.appendChild(desertsButton);
//     drinksColumn.appendChild(drinksButton);

//     headRow.appendChild(appetizersColumn);
//     headRow.appendChild(mainCoursesColumn);
//     headRow.appendChild(desertsColumn);
//     headRow.appendChild(drinksColumn);

//     tableHead.appendChild(headRow);
//     menuSectionTable.appendChild(tableHead);
//     sectionSelector.appendChild(menuSectionTable);

//     let body = document.getElementsByTagName("body")[0];
//     let footer = document.getElementsByTagName("footer")[0];

//     body.insertBefore(sectionSelector, footer);
// }


// //table is constructed by making a thead with base row (dish, diets, price, etc)
// //then appending columns specific to the foodclasses contained in the menusection
// //tbody is made row by row according to the items in the active section
// function createMenuTable(_menuSection){
//     let menuContainer = document.createElement("section");
//     menuContainer.setAttribute("id", "menupage__menucontainer");
    
//     let menuTable = document.createElement("table");
//     menuTable.setAttribute("class", "menupage__table");
    
//     console.log(createTableHead(_menuSection));
//     menuTable.appendChild(createTableHead(_menuSection));
//     menuTable = createTableBody(menuTable, _menuSection);

//     menuContainer.appendChild(menuTable);
//     footer = document.getElementsByClassName("footer")[0];
//     body = document.getElementsByTagName("body")[0];
//     body.insertBefore(menuContainer, footer);
// }

// function createBaseHeadRow(){
//     let menuTableHead = document.createElement("thead");
    
//     let headRow = document.createElement("tr");

//     let dish = document.createElement("th");
//     let dishText = document.createTextNode("Dish");
//     dish.appendChild(dishText);
//     headRow.append(dish);

//     let diets = document.createElement("th");
//     let dietsText = document.createTextNode("Diets");
//     diets.appendChild(dietsText);
//     headRow.append(diets);

//     let price = document.createElement("th");
//     let priceText = document.createTextNode("Price");
//     price.appendChild(priceText);
//     headRow.append(price);

//     let add = document.createElement("th");
//     let addText = document.createTextNode("+");
//     add.appendChild(addText);
//     headRow.append(add);

//     let remove = document.createElement("th");
//     let removeText = document.createTextNode("-");
//     remove.appendChild(removeText);
//     headRow.append(remove);

//     let amount = document.createElement("th");
//     let amountText = document.createTextNode("Amount");
//     amount.appendChild(amountText);
//     headRow.append(amount);

//     menuTableHead.appendChild(headRow);
    
//     return menuTableHead;
// }

// function addHeadRowColumn(headRow, columnName){
//     let newColumn = document.createElement("th");
//     let newColumnName = document.createTextNode(columnName);
//     newColumn.appendChild(newColumnName);
//     headRow.firstChild.appendChild(newColumn);

//     return headRow;
// }

// function createTableHead(_menuSection){
//     let tableHead = document.createElement("thead");
//     switch(_menuSection.name){
//         case "Appetizers":
//             tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat ");
//             break;
//         case "Main Courses":
//             tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat ");
//             break;
//         case "Deserts":
//             tableHead = createBaseHeadRow();
//             break;
//         case "Drinks":
//             tableHead = addHeadRowColumn(addHeadRowColumn(createBaseHeadRow(), "Alcohol "), "Caffeine ");
//             break;
//     }

//     return tableHead;
// }

// function createTableBody(menuTable, _menuSection){
//     let tableBody = document.createElement("tbody");
//     _menuSection.forEachItem(item => tableBody.appendChild(createItemRow(item, _menuSection)));
//     menuTable.appendChild(tableBody);

//     return menuTable;
// }

// function createItemRow(item, activeMenuSection){
//     let newRow = document.createElement("tr");

//     dish = document.createElement("td");
//     dishNameLink = document.createElement("a");
//     dishNameLink.setAttribute("href", "#menupage__img__" + item.htmlName);
//     dishNameLinkText = document.createTextNode(item.name);
//     dishNameLink.appendChild(dishNameLinkText);
//     dish.appendChild(dishNameLink);
//     newRow.appendChild(dish);

//     diet = document.createElement("td");
//     dietInfo = document.createTextNode(item.diets.join(","));
//     diet.appendChild(dietInfo)
//     newRow.appendChild(diet);

//     price = document.createElement("td");
//     priceText = document.createTextNode(item.price + "€");
//     price.appendChild(priceText);
//     newRow.appendChild(price);

//     add = document.createElement("td");
//     let addButton = document.createElement("button");
//     addButton.setAttribute("type", "button");
//     addButton.setAttribute("class", "menupage__table__button");
//     let addButtonText = document.createTextNode("+");
//     addButton.appendChild(addButtonText);
//     add.appendChild(addButton);
//     newRow.appendChild(add);

//     remove = document.createElement("td");
//     let removeButton = document.createElement("button");
//     removeButton.setAttribute("type", "button");
//     removeButton.setAttribute("class", "menupage__table__button");
//     let removeButtonText = document.createTextNode("-");
//     removeButton.appendChild(removeButtonText);
//     remove.appendChild(removeButton);
//     newRow.appendChild(remove);

//     amount = document.createElement("td");
//     amountText = document.createTextNode(menuArray[item.name]);
//     amount.appendChild(amountText);
//     newRow.appendChild(amount);

//     if(menuArray[item.name] > 0){
//         newRow.style.backgroundColor = "#ccaa88";
//     }

//     let meatTypeString = "Meatless";
//     let isMeatDish = item.constructor.name == "meatDish";
//     switch(activeMenuSection.name){
//         case "Appetizers":   //meatType
//             if(isMeatDish){
//                 meatTypeString = item.meatType;
//             }

//             meatType = document.createElement("td");
//             meatTypeText = document.createTextNode(meatTypeString);
//             meatType.appendChild(meatTypeText);
//             newRow.appendChild(meatType);
//             break;
//         case "Main Courses":   //meatType
//             if(isMeatDish){
//                 meatTypeString = item.meatType;
//             }3

//             meatType = document.createElement("td");
//             meatTypeText = document.createTextNode(meatTypeString);
//             meatType.appendChild(meatTypeText);
//             newRow.appendChild(meatType);
//             break;
//         case "Drinks":  //add alcoholpercentage caffeinestrength
//             alcohol = document.createElement("td");
//             alcoholText = document.createTextNode(item.alcoholStrength + "%");
//             alcohol.appendChild(alcoholText);
//             newRow.appendChild(alcohol);

//             caffeine = document.createElement("td");
//             caffeineText = document.createTextNode(item.caffeineStrength);
//             caffeine.appendChild(caffeineText);
//             newRow.appendChild(caffeine);
//             break;
//     }
    
//     newRow.addEventListener("click", changeDishNameColor);
//     return newRow;
// }

// function makeDishFigures(_section) {
//     let section = document.createElement('section');
//     section.appendChild(document.createElement('hr'));
//     section.setAttribute("class", "menupage__dishfigures");
//     let heading1 = document.createElement('h1');
//     heading1.setAttribute("class", "menupage__dishfigure__header");
//     heading1.appendChild(document.createTextNode(_section.name));
//     section.appendChild(heading1);
//     _section.items.forEach(element => section.appendChild(makeDishFigure(element)));
//     section.appendChild(document.createElement('hr'));
//     let footer = document.getElementsByClassName("footer")[0];
//     let body = document.getElementsByTagName("body")[0];

//     body.insertBefore(section, footer);
// }

// function makeDishFigure(food){
//     let figure = document.createElement('figure');
//     let img = document.createElement('img');
//     img.setAttribute("id", "menupage__img__" + food.htmlName);
//     img.setAttribute("class", "menupage__img");
//     img.setAttribute("src", "./../images/" + food.htmlName + ".jpg");
//     img.setAttribute("alt", "A picture of a " + food.name);
//     let figCaption = document.createElement('figcaption');
//     figCaption.appendChild(document.createTextNode(food.name));
//     figure.appendChild(img);
//     figure.appendChild(figCaption);
//     return figure;
// }


// //#region events

// //event for changing row color when that row has more than 0 items selected
// function changeDishNameColor(e){
//     let row = e.target.parentElement.parentElement;
//     console.log(row);
//     let dishName = row.children[0].children[0].childNodes[0].nodeValue;

//     if(menuArray[dishName] == 0){
//         row.style.backgroundColor = "#ffcc99";
//         e.stopPropagation();
//     }
//     else if(menuArray[dishName] != undefined){
//         row.style.backgroundColor = "#ccaa88";
//         e.stopPropagation();
//     }
// }

// //event for + button
// function increaseDish(e) {
//     row = e.target.parentElement.parentElement;
//     price = parseInt(row.children[2].firstChild.nodeValue);
//     row.children[5].firstChild.nodeValue = parseInt(row.children[5].firstChild.nodeValue) + 1;
//     amount = document.getElementById("ordersum");
//     total = parseInt(totalNode.nodeValue) + price
//     totalNode.nodeValue = String(total);
//     acces = row.children[0].children[0].childNodes[0].nodeValue;
    
//     menuArray[acces] += 1;
// }

// //event for - button
// function decreaseDish(e) {
//     row = e.target.parentElement.parentElement;
//     price = parseInt(row.children[2].firstChild.nodeValue);
//     if(row.children[5].firstChild.nodeValue >= 1){
//         row.children[5].firstChild.nodeValue = parseInt(row.children[5].firstChild.nodeValue) - 1;
//         amount = document.getElementById("ordersum");
//         total = parseInt(totalNode.nodeValue) - price
//         totalNode.nodeValue = String(total);
//         acces = row.children[0].children[0].childNodes[0].nodeValue;
//         menuArray[acces] -= 1;
//     }
// }

// //call this to setup all the events for the + and - buttons in menutable
// function registerButtonEvents() {
//     console.log("registerEvents");
//     let buttons = document.getElementsByTagName("button");
//     for (let index = 0; index < buttons.length; index++) {
//         if(buttons[index].firstChild.nodeValue == "+"){
//             console.log(buttons[index].firstChild.nodeValue);
//             buttons[index].addEventListener("click", increaseDish);
//         }
//         else if(buttons[index].firstChild.nodeValue == "-"){
//             console.log(buttons[index].firstChild.nodeValue);
//             buttons[index].addEventListener("click", decreaseDish);
//         }        
//     }
// }
// //#endregion




// //default page setup
// initializeFoodMenu();

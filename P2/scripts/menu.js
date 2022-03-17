class menu {
    constructor(appetizers, mainCourses, deserts, drinks){
        this.appetizers = appetizers;
        this.mainCourses = mainCourses;
        this.deserts = deserts;
        this.drinks = drinks;
    }
};

class menuSection {
    constructor(section, items){
        this.name = section;
        this.items = items;
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
var ciccheti = new meatDish("Ciccheti", "ciccheti",  8, ["Lactose", "Gluten", "Meat"], "Pork");
var focaccia = new meatDish("Focaccia", "focaccia", 8, ["Gluten", "Meat"], "Beef");

var melanzane    = new food("Melanzane alla Parmigiana", "melanzane", 17, ["Lactose"]);
var ossobuco     = new meatDish("Ossobuco Milanese", "ossobuco", 20, ["Meat"], "Veal");
var montaraPizza = new food("Montara Pizza", "montarapizza", 17, ["Lactose"]);
var zuppaToscana = new meatDish("Zuppa Toscana", "zuppatoscana", 17, ["Meat"], "Chicken, Pork");

var pannaCotta = new food("Panna cotta", "pannacotta",  9, ["Lactose"]);
var semifreddo = new food("Triple chocolat semifreddo", "semifreddo", 12, ["Lactose"]);
var tiramisu   = new food("Tiramisu", "tiramisu", 10, ["Lactose"]);

var espresso        = new drink("Espresso", "espresso", 4, [], 0, "strong");
var capuccino       = new drink("Capuccino", "capuccino",  4, ["Lactose"], 0, "medium");
var spritz          = new drink("Spritz", "spritz", 5, [], 11.0, "none");
var birraMoretti    = new drink("Birra Moretti", "birramoretti",  4, ["Gluten"], 4.6, "none");
var mineralWater    = new drink("Mineral Water", "mineralwater", 3, [], 0, "none");

//#endregion

//#region menuSections

var appetizers = new menuSection("Appetizers", [buratta, ciccheti, focaccia]);

var mainCourses = new menuSection("Main Courses", [melanzane, ossobuco, montaraPizza, zuppaToscana]);

var deserts = new menuSection("Deserts", [pannaCotta, semifreddo, tiramisu]);

var drinks = new menuSection("Drinks", [espresso, capuccino, spritz, birraMoretti, mineralWater]);

//#endregion

var _menu = new menu(appetizers, mainCourses, deserts, drinks);
var total = 0;
var menuArray = [];
//#region menuConstruction
function createPage(_menuSection){
    createSectionSelector();
    createMenuTable(_menuSection);
    makeOrderSection();
    makeDishFigures(_menuSection);
    registerOurButtonEvents();

    // var buttons = document.getElementsByTagName("button");
    // for (let index = 0; index < buttons.length; index++) {
    //     if(buttons[index].firstChild.nodeValue == "+"){
    //         console.log(buttons[index].firstChild.nodeValue);
    //         buttons[index].addEventListener("click", increaseDish);
    //     }
    //     else if(buttons[index].firstChild.nodeValue == "-"){
    //         console.log(buttons[index].firstChild.nodeValue);
    //         buttons[index].addEventListener("click", decreaseDish);
    //     }        
    // }
}

function makeOrderSection() {
    section = document.createElement("section");
    section.setAttribute("id", "ordersection");
    text = document.createTextNode("Total = ");
    totalNode = document.createTextNode("");
    totalNode.nodeValue = String(total);
    euro = document.createTextNode("€ ");
    section.appendChild(text);
    section.appendChild(totalNode);
    section.appendChild(euro);
    button = document.createElement("button");
    button.setAttribute("class", "button");
    button.appendChild(document.createTextNode("Place Order"));
    button.addEventListener("click", function() {window.alert("Your order has been received, it will arrive in never ;)"); location.reload();})
    section.appendChild(button);
    body.insertBefore(section, footer);

}
function replaceBody(menuSectionString){
    var html = document.getElementsByTagName("html")[0];
    var header = document.getElementsByClassName("header")[0];
    var footer = document.getElementsByClassName("footer")[0];
    var oldBody = document.getElementsByTagName("body")[0];
    var newBody = document.createElement("body");

    html.removeChild(oldBody);
    newBody.appendChild(header);
    newBody.appendChild(footer);
    html.appendChild(newBody);

    switch(menuSectionString){
        case "Appetizers":
            createPage(appetizers);
            break;
        case "Main Courses":
            createPage(mainCourses);
            break;
        case "Deserts":
            createPage(deserts);
            break;
        case "Drinks":
            createPage(drinks);
            break;
    }
}


function createSectionSelector(){
    var sectionSelector = document.createElement("nav");
    sectionSelector.setAttribute("class", "menupage__menusection__nav");

    var menuSectionTable = document.createElement("table");
    menuSectionTable.setAttribute("class", "menupage__menusection__table");

    var tableHead = document.createElement("thead");
    var headRow = document.createElement("tr");

    var appetizersButton = document.createElement("button");
    var mainCoursesButton = document.createElement("button");
    var desertsButton = document.createElement("button");
    var drinksButton = document.createElement("button");

    var appetizersButtonText = document.createTextNode("Appetizers");
    var mainCoursesButtonText = document.createTextNode("Main Courses");
    var desertsButtonText = document.createTextNode("Deserts");
    var drinksButtonText = document.createTextNode("Drinks");

    appetizersButton.addEventListener("click", function() {replaceBody(this.textContent);});
    mainCoursesButton.addEventListener("click", function() {replaceBody(this.textContent);});
    desertsButton.addEventListener("click", function() {replaceBody(this.textContent);});
    drinksButton.addEventListener("click", function() {replaceBody(this.textContent);});

    appetizersButton.appendChild(appetizersButtonText);
    mainCoursesButton.appendChild(mainCoursesButtonText);
    desertsButton.appendChild(desertsButtonText);
    drinksButton.appendChild(drinksButtonText);

    appetizersButton.setAttribute("class", "menupage__menusection__button");
    mainCoursesButton.setAttribute("class", "menupage__menusection__button");
    desertsButton.setAttribute("class", "menupage__menusection__button");
    drinksButton.setAttribute("class", "menupage__menusection__button");
    
    var appetizersColumn = document.createElement("th");
    var mainCoursesColumn = document.createElement("th");
    var desertsColumn = document.createElement("th");
    var drinksColumn = document.createElement("th");

    appetizersColumn.appendChild(appetizersButton);
    mainCoursesColumn.appendChild(mainCoursesButton);
    desertsColumn.appendChild(desertsButton);
    drinksColumn.appendChild(drinksButton);

    headRow.appendChild(appetizersColumn);
    headRow.appendChild(mainCoursesColumn);
    headRow.appendChild(desertsColumn);
    headRow.appendChild(drinksColumn);

    tableHead.appendChild(headRow);
    menuSectionTable.appendChild(tableHead);
    sectionSelector.appendChild(menuSectionTable);

    var body = document.getElementsByTagName("body")[0];
    var footer = document.getElementsByTagName("footer")[0];

    body.insertBefore(sectionSelector, footer);
}

function createMenuTable(_menuSection){
    var menuContainer = document.createElement("section");
    menuContainer.setAttribute("id", "menupage__menucontainer");
    
    var menuTable = document.createElement("table");
    menuTable.setAttribute("class", "menupage__table");
    
    console.log(createTableHead(_menuSection));
    menuTable.appendChild(createTableHead(_menuSection));
    menuTable = createTableBody(menuTable, _menuSection);

    menuContainer.appendChild(menuTable);
    footer = document.getElementsByClassName("footer")[0];
    body = document.getElementsByTagName("body")[0];
    body.insertBefore(menuContainer, footer);
}

//creates base row
function createBaseHeadRow(){
    var menuTableHead = document.createElement("thead");
    
    var headRow = document.createElement("tr");

    var dish = document.createElement("th");
    var dishText = document.createTextNode("Dish");
    dish.appendChild(dishText);
    headRow.append(dish);

    var diets = document.createElement("th");
    var dietsText = document.createTextNode("Diets");
    diets.appendChild(dietsText);
    headRow.append(diets);

    var price = document.createElement("th");
    var priceText = document.createTextNode("Price");
    price.appendChild(priceText);
    headRow.append(price);

    var add = document.createElement("th");
    var addText = document.createTextNode("+");
    add.appendChild(addText);
    headRow.append(add);

    var remove = document.createElement("th");
    var removeText = document.createTextNode("-");
    remove.appendChild(removeText);
    headRow.append(remove);

    var amount = document.createElement("th");
    var amountText = document.createTextNode("Amount");
    amount.appendChild(amountText);
    headRow.append(amount);

    menuTableHead.appendChild(headRow);
    
    return menuTableHead;
}

//Adds extra row
//TODO: insert rows instead of appending
function addHeadRowColumn(headRow, columnName){
    var newColumn = document.createElement("th");
    var newColumnName = document.createTextNode(columnName);
    newColumn.appendChild(newColumnName);
    headRow.firstChild.appendChild(newColumn);

    return headRow;
}

function createTableHead(_menuSection){
    var tableHead = document.createElement("thead");
    switch(_menuSection.name){
        case "Appetizers":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat Type");
            break;
        case "Main Courses":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat Type");
            break;
        case "Deserts":
            tableHead = createBaseHeadRow();
            break;
        case "Drinks":
            tableHead = addHeadRowColumn(addHeadRowColumn(createBaseHeadRow(), "Alcohol percentage"), "Caffeine Strength");
            break;
    }

    return tableHead;
}

function createTableBody(menuTable, _menuSection){
    var tableBody = document.createElement("tbody");
    _menuSection.items.forEach(item => tableBody.appendChild(createItemRow(item, _menuSection)));
    menuTable.appendChild(tableBody);

    return menuTable;
}

function createItemRow(item, activeMenuSection){
    var newRow = document.createElement("tr");

    dish = document.createElement("td");
    dishNameLink = document.createElement("a");
    dishNameLink.setAttribute("href", "#menupage__img__buratta" + item.htmlName);
    dishNameLinkText = document.createTextNode(item.name);
    dishNameLink.appendChild(dishNameLinkText);
    dish.appendChild(dishNameLink);
    newRow.appendChild(dish);

    diet = document.createElement("td");
    dietInfo = document.createTextNode(item.diets.join(","));
    diet.appendChild(dietInfo)
    newRow.appendChild(diet);

    price = document.createElement("td");
    priceText = document.createTextNode(item.price + "€");
    price.appendChild(priceText);
    newRow.appendChild(price);

    add = document.createElement("td");
    var addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    var addButtonText = document.createTextNode("+");
    addButton.appendChild(addButtonText);
    add.appendChild(addButton);
    newRow.appendChild(add);

    remove = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    var removeButtonText = document.createTextNode("-");
    removeButton.appendChild(removeButtonText);
    remove.appendChild(removeButton);
    newRow.appendChild(remove);

    amount = document.createElement("td");
    amountText = document.createTextNode(menuArray[item.name]);
    amount.appendChild(amountText);
    newRow.appendChild(amount);

    switch(activeMenuSection.name){
        case "Appetizers":   //meatType
            var meatTypeString = "Meatless";
            if(item.constructor.name == "meatDish")
                meatTypeString = item.meatType;

            meatType = document.createElement("td");
            meatTypeText = document.createTextNode(meatTypeString);
            meatType.appendChild(meatTypeText);
            newRow.appendChild(meatType);
            break;
        case "Main Courses":   //meatType
            var meatTypeString = "Meatless";
            if(item.constructor.name == "meatDish")
                meatTypeString = item.meatType;

            meatType = document.createElement("td");
            meatTypeText = document.createTextNode(meatTypeString);
            meatType.appendChild(meatTypeText);
            newRow.appendChild(meatType);
            break;
        case "Drinks":  //alcoholpercentage caffeinestrength
            alcohol = document.createElement("td");
            alcoholText = document.createTextNode(item.alcoholStrength + "%");
            alcohol.appendChild(alcoholText);
            newRow.appendChild(alcohol);

            caffeine = document.createElement("td");
            caffeineText = document.createTextNode(item.caffeineStrength);
            caffeine.appendChild(caffeineText);
            newRow.appendChild(caffeine);
            break;
    }
    
    return newRow;
}

function makeDishFigures(_section) {
    var section = document.createElement('section');
    section.appendChild(document.createElement('hr'));
    section.setAttribute("class", "menupage__dishfigures");
    var heading1 = document.createElement('h1');
    heading1.setAttribute("class", "menupage__dishfigure__header");
    heading1.appendChild(document.createTextNode(_section.name));
    section.appendChild(heading1);
    _section.items.forEach(element => section.appendChild(makeDishFigure(element)));
    section.appendChild(document.createElement('hr'));
    var footer = document.getElementsByClassName("footer")[0];
    var body = document.getElementsByTagName("body")[0];

    body.insertBefore(section, footer);
}

function makeDishFigure(food){
    var figure = document.createElement('figure');
    var img = document.createElement('img');
    img.setAttribute("id", "menupage__img__" + food.htmlName);
    img.setAttribute("class", "menupage__img");
    img.setAttribute("src", "./../images/" + food.htmlName + ".jpg");
    img.setAttribute("alt", "A picture of " + food.name);
    var figCaption = document.createElement('figcaption');
    figCaption.appendChild(document.createTextNode(food.name));
    figure.appendChild(img);
    figure.appendChild(figCaption);
    return figure;
}

function increaseDish(e) {
    row = e.target.parentElement.parentElement;
    price = parseInt(row.children[2].firstChild.nodeValue);
    row.children[5].firstChild.nodeValue = parseInt(row.children[5].firstChild.nodeValue) + 1;
    amount = document.getElementById("ordersum");
    total = parseInt(totalNode.nodeValue) + price
    totalNode.nodeValue = String(total);
    acces = row.children[0].children[0].childNodes[0].nodeValue;
    
    menuArray[acces] += 1;
    console.log(acces);
    console.log(typeof(acces));


    console.log(menuArray);

}

function decreaseDish(e) {
    row = e.target.parentElement.parentElement;
    price = parseInt(row.children[2].firstChild.nodeValue);
    if(row.children[5].firstChild.nodeValue >= 1){
        row.children[5].firstChild.nodeValue = parseInt(row.children[5].firstChild.nodeValue) - 1;
        amount = document.getElementById("ordersum");
        total = parseInt(totalNode.nodeValue) - price
        totalNode.nodeValue = String(total);
        acces = row.children[0].children[0].childNodes[0].nodeValue;
        menuArray[acces] -= 1;
        console.log(acces);
        console.log(typeof(acces));

        console.log(menuArray);

    }

    
}

function initializeFoodMenu() {
    _menu.appetizers.items.forEach(item => menuArray[item.name] = 0);
    _menu.mainCourses.items.forEach(item => menuArray[item.name] = 0);
    _menu.deserts.items.forEach(item => menuArray[item.name] = 0);
    _menu.drinks.items.forEach(item => menuArray[item.name] = 0);
    _menu.drinks.items.forEach(item => console.log(typeof(item.name)));
    
}

function registerOurButtonEvents() {
    console.log("registerEvents");
    var buttons = document.getElementsByTagName("button");
    for (let index = 0; index < buttons.length; index++) {
        if(buttons[index].firstChild.nodeValue == "+"){
            console.log(buttons[index].firstChild.nodeValue);
            buttons[index].addEventListener("click", increaseDish);
        }
        else if(buttons[index].firstChild.nodeValue == "-"){
            console.log(buttons[index].firstChild.nodeValue);
            buttons[index].addEventListener("click", decreaseDish);
        }        
    }
}

initializeFoodMenu();
createPage(appetizers);

//#endregion
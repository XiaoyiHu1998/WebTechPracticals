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


//#region menuConstruction
function createPage(_menuSection){
    createSectionSelector();
    createMenuTable(_menuSection);
    makeDishFigures(_menuSection);
}

function createSectionSelector(){
    var sectionSelector = document.createElement("nav");
    sectionSelector.setAttribute("class", "menupage__menusection__nav");

    var appetizersLink = document.createElement("a");
    var mainCoursesLink = document.createElement("a");
    var desertsLink = document.createElement("a");
    var drinksLink = document.createElement("a");

    var appetizersLinkText = document.createTextNode("Appetizers");
    var mainCoursesLinkText = document.createTextNode("Main Courses");
    var desertsLinkText = document.createTextNode("Deserts");
    var drinksLinkText = document.createTextNode("Drinks");

    appetizersLink.appendChild(appetizersLinkText);
    mainCoursesLink.appendChild(mainCoursesLinkText);
    desertsLink.appendChild(desertsLinkText);
    drinksLink.appendChild(drinksLinkText);

    appetizersLink.setAttribute("class", "menupage__menusection__link");
    mainCoursesLink.setAttribute("class", "menupage__menusection__link");
    desertsLink.setAttribute("class", "menupage__menusection__link");
    drinksLink.setAttribute("class", "menupage__menusection__link");
    
    sectionSelector.appendChild(appetizersLink);
    sectionSelector.appendChild(mainCoursesLink);
    sectionSelector.appendChild(desertsLink);
    sectionSelector.appendChild(drinksLink);

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
    // console.log(typeof(item));
    // console.log(typeof(item.diets));
    // console.log(item.diets);
    dietInfo = document.createTextNode(item.diets.join(","));
    diet.appendChild(dietInfo)
    newRow.appendChild(diet);

    price = document.createElement("td");
    priceText = document.createTextNode(item.price);
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
    amountText = document.createTextNode("0");
    amount.appendChild(amountText);
    newRow.appendChild(amount);

    switch(activeMenuSection.name){
        case "Appetizers":   //meatType
            var meatTypeString = "-";
            if(item.constructor.name == meatDish)
                meatTypeString = item.meatType;

            meatType = document.createElement("td");
            meatTypeText = document.createTextNode(meatTypeString);
            meatType.appendChild(meatTypeText);
            newRow.appendChild(meatType);
            break;
        case "Main Courses":   //meatType
            var meatTypeString = "-";
            if(item.constructor.name == meatDish)
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


function populateHtmlMenu(){
    var htmlNodes = getElementsByTagNames(["body", "header", "footer", "aside", "article", "section"]);
    
    var htmlForm = document.getElementById("htmltag");
    var htmlOptions = htmlNodes.map(x => document.createElement('option'));
    for (let i = 0; i < htmlOptions.length; i++) {
        htmlOptions[i].setAttribute("value", "");
        htmlOptions[i].setAttribute("selected", "selected");
        htmlOptions[i].appendChild(document.createTextNode(htmlNodes[i].nodeName));
        htmlForm.appendChild(htmlOptions[i]);
      }



}

function getElementsByTagNames(names){
    var elements = [];
    for (let i = 0; i < names.length; i++) {
        Array.from(document.getElementsByTagName(names[i])).forEach(x => elements.push(x));
    }
    return elements
}
createPage(deserts);
populateHtmlMenu();

//#endregion
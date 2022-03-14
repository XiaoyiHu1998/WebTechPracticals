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
    constructor(name, price, diets, meatType){
        super(name, price, diets);
        this.meatType = meatType;
    }
}

class drink extends food{
    constructor(name, price, diets, alcoholStrength, caffeineStrength){
        super(name, price, diets);
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

var espresso        = new drink("Espresso", "espresso", 4, 0, "strong");
var capuccino       = new drink("Capuccino", "capuccino",  4, 0, "medium");
var spritz          = new drink("Spritz", "spritz",  5, 11.0, "none");
var birraMoretti    = new drink("Birra Moretti", "birramoretti",  4, 4.6, "none");
var mineralWater    = new drink("Mineral Water", "mineralwater", 3, 0, "none");

//#endregion

//#region menuSections

var appetizers = new menuSection("Appetizers", [buratta, ciccheti, focaccia]);

var mainCourses = new menuSection("Main Courses", [melanzane, ossobuco, montaraPizza, zuppaToscana]);

var deserts = new menuSection("Deserts", [pannaCotta, semifreddo, tiramisu]);

var drinks = new menuSection("Drinks", [espresso, capuccino, spritz, birraMoretti, mineralWater]);

//#endregion

var _menu = new menu(appetizers, mainCourses, deserts, drinks);


//#region menuConstruction
var menuColumnCount = 0;
var menuSectionSelected = "";

function createMenuTable(_menuSection){
    var menuContainer = document.createElement("section");
    menuContainer.setAttribute("id", "menupage__menucontainer");
    
    var menuTable = document.createElement("table");
    menuTable.setAttribute("class", "menupage__table");
    
    menuTable.appendChild(createTableHead(_menuSection));
    menuTable = createTableBody(menuTable, _menuSection);
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
    var addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    var addButtonText = document.createTextNode("+");
    addButton.appendChild(addButtonText);
    add.appendChild(addButton);
    headRow.append(add);

    var remove = document.createElement("th");
    var removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    var removeButtonText = document.createTextNode("-");
    removeButton.appendChild(removeButtonText);
    remove.appendChild(removeButton);
    headRow.append(remove);

    var amount = document.createElement("th");
    var amountText = document.createTextNode("Amount");
    amount.appendChild(amountText);
    headRow.append(amount);

    menuTableHead.appendChild(headRow);
    
    menuColumnCount = 6;

    return menuTableHead;
}

//Adds extra row
//TODO: insert rows instead of appending
function addHeadRowColumn(headRow, columnName){
    var newColumn = document.createElement("th");
    var newColumnName = document.createTextNode(columnName);
    newColumn.appendChild(newColumnName);
    headRow.appendChild(newColumn);

    return headRow;
}

function createTableHead(_menuSection){
    var tableHead
    switch(_menuSection){
        case "Appetizer":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat Type");
            menuColumnCount++;
            menuSectionSelected = _menuSection;
            break;
        case "Main Courses":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat Type");
            menuColumnCount++;
            menuSectionSelected = _menuSection;
            break;
        case "Deserts":
            tableHead = createBaseHeadRow();
            menuSectionSelected = _menuSection;
            break;
        case "Drinks":
            tableHead = addHeadRowColumn(addHeadRowColumn(createBaseHeadRow(), "Alcohol percentage"), "Caffeine Strength");
            menuColumnCount += 2;
            menuSectionSelected = _menuSection;
            break;
    }

    return tableHead;
}

function createTableBody(menuTable, _menuSection){
    var activeMenuSection;
    switch(_menuSection){
        case "Appetizer":
            activeMenuSection = _menu.appetizers;
            break;
        case "Main Courses":
            activeMenuSection = _menu.mainCourses;
            break;
        case "Deserts":
            activeMenuSection = _menu.deserts;
            break;
        case "Drinks":
            activeMenuSection = _menu.drinks;
            break;
    }

    var tableBody = document.createElement("tbody");
    var newRows = [];
    activeMenuSection.items.forEach(item => newRows.push(createItemRow(item)));
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
    var div = document.getElementsByTagName("Body")[0];
    console.log(div);
    div.appendChild(section);
    console.log(div);
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

console.log("kip");
makeDishFigures(deserts);
//#endregion
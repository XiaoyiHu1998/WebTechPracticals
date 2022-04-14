var currentSection = "Appetizers";
var dishesLoaded = 0;

//send get AJAX request
function get(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
}

//#region menuConstruction
function createPage(_menuSection){
    createSectionSelector();
    createMenuTable(_menuSection);
    makemenupage__ordersection();
    //makeDishFigures(_menuSection);
    registerButtonEvents();
}

function makemenupage__ordersection() {
    section = document.createElement("section");
    section.setAttribute("id", "menupage__ordersection");
    text = document.createTextNode("Total = ");
    totalNode = document.createTextNode("");
    euro = document.createTextNode("€ ");
    section.appendChild(text);
    section.appendChild(totalNode);
    section.appendChild(euro);
    button = document.createElement("button");
    button.setAttribute("class", "site__submission__button");
    button.appendChild(document.createTextNode("Place Order"));
    button.addEventListener("click", function() {get("/placeOrder"); window.alert("Your order has been received, it will arrive in never ;P"); location.reload();});
    section.appendChild(button);
    body.insertBefore(section, footer);
}

// call this to change the menutable and figuresection
function replaceBody(menuSection){
    let html = document.getElementsByTagName("html")[0];
    let header = document.getElementsByClassName("header")[0];
    let footer = document.getElementsByClassName("footer")[0];
    let oldBody = document.getElementsByTagName("body")[0];
    let newBody = document.createElement("body");

    html.removeChild(oldBody);
    newBody.appendChild(header);
    newbBody.appendChild(jouding);
    newBody.appendChild(footer);
    html.appendChild(newBody);
    currentSection = menuSection.name;
    dishesLoaded = 0;
    createPage(menuSection);
}

//used for selecting menu section (appetizers, main courses, deserts, drinks)
function createSectionSelector(){
    let sectionSelector = document.createElement("nav");
    sectionSelector.setAttribute("class", "menupage__menusection__nav");

    let menuSectionTable = document.createElement("table");
    menuSectionTable.setAttribute("class", "menupage__menusection__table");

    let tableHead = document.createElement("thead");
    let headRow = document.createElement("tr");

    let appetizersButton = document.createElement("button");
    let mainCoursesButton = document.createElement("button");
    let desertsButton = document.createElement("button");
    let drinksButton = document.createElement("button");

    let appetizersButtonText = document.createTextNode("Appetizers");
    let mainCoursesButtonText = document.createTextNode("Main Courses");
    let desertsButtonText = document.createTextNode("Deserts");
    let drinksButtonText = document.createTextNode("Drinks");

    appetizersButton.addEventListener("click", function() {getMenuPage(this.textContent);});
    mainCoursesButton.addEventListener("click", function() {getMenuPage(this.textContent);});
    desertsButton.addEventListener("click", function() {getMenuPage(this.textContent);});
    drinksButton.addEventListener("click", function() {getMenuPage(this.textContent);});

    appetizersButton.appendChild(appetizersButtonText);
    mainCoursesButton.appendChild(mainCoursesButtonText);
    desertsButton.appendChild(desertsButtonText);
    drinksButton.appendChild(drinksButtonText);

    appetizersButton.setAttribute("class", "menupage__menusection__button");
    mainCoursesButton.setAttribute("class", "menupage__menusection__button");
    desertsButton.setAttribute("class", "menupage__menusection__button");
    drinksButton.setAttribute("class", "menupage__menusection__button");
    
    let appetizersColumn = document.createElement("th");
    let mainCoursesColumn = document.createElement("th");
    let desertsColumn = document.createElement("th");
    let drinksColumn = document.createElement("th");

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

    let body = document.getElementsByTagName("body")[0];
    let footer = document.getElementsByTagName("footer")[0];

    body.insertBefore(sectionSelector, footer);
}


//table is constructed by making a thead with base row (dish, diets, price, etc)
//then appending columns specific to the foodclasses contained in the menusection
//tbody is made row by row according to the items in the active section
function createMenuTable(_menuSection){
    let menuContainer = document.createElement("section");
    menuContainer.setAttribute("id", "menupage__menucontainer");
    
    let menuTable = document.createElement("table");
    menuTable.setAttribute("class", "menupage__table");
    
    console.log(createTableHead(_menuSection));
    menuTable.appendChild(createTableHead(_menuSection));
    menuTable = createTableBody(menuTable, _menuSection);

    menuContainer.appendChild(menuTable);
    footer = document.getElementsByClassName("footer")[0];
    body = document.getElementsByTagName("body")[0];
    body.insertBefore(menuContainer, footer);
}

function createBaseHeadRow(){
    let menuTableHead = document.createElement("thead");
    
    let headRow = document.createElement("tr");

    let dish = document.createElement("th");
    let dishText = document.createTextNode("Dish");
    dish.appendChild(dishText);
    headRow.append(dish);

    let diets = document.createElement("th");
    let dietsText = document.createTextNode("Diets");
    diets.appendChild(dietsText);
    headRow.append(diets);

    let price = document.createElement("th");
    let priceText = document.createTextNode("Price");
    price.appendChild(priceText);
    headRow.append(price);

    let add = document.createElement("th");
    let addText = document.createTextNode("+");
    add.appendChild(addText);
    headRow.append(add);

    let remove = document.createElement("th");
    let removeText = document.createTextNode("-");
    remove.appendChild(removeText);
    headRow.append(remove);

    let amount = document.createElement("th");
    let amountText = document.createTextNode("Amount");
    amount.appendChild(amountText);
    headRow.append(amount);

    menuTableHead.appendChild(headRow);
    
    return menuTableHead;
}

function addHeadRowColumn(headRow, columnName){
    let newColumn = document.createElement("th");
    let newColumnName = document.createTextNode(columnName);
    newColumn.appendChild(newColumnName);
    headRow.firstChild.appendChild(newColumn);

    return headRow;
}

function createTableHead(_menuSection){
    let tableHead = document.createElement("thead");
    switch(_menuSection.name){
        case "Appetizers":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat ");
            break;
        case "Main Courses":
            tableHead = addHeadRowColumn(createBaseHeadRow(), "Meat ");
            break;
        case "Deserts":
            tableHead = createBaseHeadRow();
            break;
        case "Drinks":
            tableHead = addHeadRowColumn(addHeadRowColumn(createBaseHeadRow(), "Alcohol "), "Caffeine ");
            break;
    }

    return tableHead;
}

function createTableBody(menuTable, _menuSection){
    let tableBody = document.createElement("tbody");
    for (let index = 0; index < _menuSection.items.length; index++) {
        tableBody.appendChild(createItemRow(_menuSection.items[index], _menuSection));
    }
    menuTable.appendChild(tableBody);
    return menuTable;
}

function createItemRow(item, activeMenuSection){
    let newRow = document.createElement("tr");

    dish = document.createElement("td");
    dishNameLink = document.createElement("a");
    dishNameLink.setAttribute("href", "#menupage__img__" + item.htmlName);
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
    let addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("class", "menupage__table__button");
    let addButtonText = document.createTextNode("+");
    addButton.appendChild(addButtonText);
    add.appendChild(addButton);
    newRow.appendChild(add);

    remove = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "menupage__table__button");
    let removeButtonText = document.createTextNode("-");
    removeButton.appendChild(removeButtonText);
    remove.appendChild(removeButton);
    newRow.appendChild(remove);

    amount = document.createElement("td");
    amountText = document.createTextNode(String(0));
    requestUpdateDish(item.name);
    amount.appendChild(amountText);
    newRow.appendChild(amount);
    requestUpdateDish(item.name);

    // if(menuArray[item.name] > 0){
    //     newRow.style.backgroundColor = "#ccaa88";
    // }

    let meatTypeString = "Meatless";
    let isMeatDish = item.constructor.name == "meatDish";
    switch(activeMenuSection.name){
        case "Appetizers":   //meatType
            if(isMeatDish){
                meatTypeString = item.meatType;
            }

            meatType = document.createElement("td");
            meatTypeText = document.createTextNode(meatTypeString);
            meatType.appendChild(meatTypeText);
            newRow.appendChild(meatType);
            break;
        case "Main Courses":   //meatType
            if(isMeatDish){
                meatTypeString = item.meatType;
            }
            meatType = document.createElement("td");
            meatTypeText = document.createTextNode(meatTypeString);
            meatType.appendChild(meatTypeText);
            newRow.appendChild(meatType);
            break;
        case "Drinks":  //add alcoholpercentage caffeinestrength
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
    
    //newRow.addEventListener("click", changeDishNameColor);
    return newRow;
}

function makeDishFigures(_section) {
    let section = document.createElement('section');
    section.appendChild(document.createElement('hr'));
    section.setAttribute("class", "menupage__dishfigures");
    let heading1 = document.createElement('h1');
    heading1.setAttribute("class", "menupage__dishfigure__header");
    heading1.appendChild(document.createTextNode(_section.name));
    section.appendChild(heading1);
    _section.items.forEach(element => section.appendChild(makeDishFigure(element)));
    section.appendChild(document.createElement('hr'));
    let footer = document.getElementsByClassName("footer")[0];
    let body = document.getElementsByTagName("body")[0];

    body.insertBefore(section, footer);
}

function makeDishFigure(food){
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.setAttribute("id", "menupage__img__" + food.htmlName);
    img.setAttribute("class", "menupage__img");
    img.setAttribute("src", "./../images/" + food.htmlName + ".jpg");
    img.setAttribute("alt", "A picture of a " + food.name);
    let figCaption = document.createElement('figcaption');
    figCaption.appendChild(document.createTextNode(food.name));
    figure.appendChild(img);
    figure.appendChild(figCaption);
    return figure;
}

function makeNextFigure(food){
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.setAttribute("id", "menupage__img__" + food.htmlName);
    img.setAttribute("class", "menupage__img");
    img.setAttribute("src", "./../images/" + food.htmlName + ".jpg");
    img.setAttribute("alt", "A picture of a " + food.name);
    let figCaption = document.createElement('figcaption');
    figCaption.appendChild(document.createTextNode(food.name));
    figure.appendChild(img);
    figure.appendChild(figCaption);
    body.insertBefore(figure, footer)
}

//#region events

//event for changing row color when that row has more than 0 items selected
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


//call this to setup all the events for the + and - buttons in menutable
function registerButtonEvents() {
    let buttons = document.getElementsByTagName("button");
    for (let index = 0; index < buttons.length; index++) {
        if(buttons[index].firstChild.nodeValue == "+"){
            buttons[index].addEventListener("click", requestIncreaseDish);
        }
        else if(buttons[index].firstChild.nodeValue == "-"){
            buttons[index].addEventListener("click", requestDecreaseDish);
        }        
    }
}
//#endregion


//event for - button
function requestDecreaseDish(e) {
    row = e.target.parentElement.parentElement;
    dishName = row.children[0].children[0].childNodes[0].nodeValue;
    var url = "menu/decreaseDish.js?dishName="+dishName;
    getWithFunction(url, updateDish);
}

function requestIncreaseDish(e) {
    row = e.target.parentElement.parentElement;
    dishName = row.children[0].children[0].childNodes[0].nodeValue;
    var url = "menu/increaseDish.js?dishName="+dishName;
    getWithFunction(url, updateDish);
}
function requestUpdateDish(dishName) {
    var url = "menu/updateDish.js?dishName="+dishName;
    getWithFunction(url, updateDish);
}

function updateDish(result) {   
    if(null){
        return;
    }
    table = document.getElementsByTagName("tbody")[0];
    console.log(table);
    for (let index = 0; index < table.children.length; index++) {
        if(table.children[index].children[0].children[0].childNodes[0].nodeValue == result[0]){
            amount = table.children[index].children[5].firstChild;
            console.log(amount);
            amount.nodeValue = String(result[1]);
        }
    }
    totalNode.nodeValue = String(result[2]);
}

//setup the global menuArray
// function initializeFoodMenu() {
//     _menu.forEachItem(item => menuArray[item.name] = 0);
// }


function makeFoodFigure(food){
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.setAttribute("id", "menupage__img__" + food.htmlName);
    img.setAttribute("class", "menupage__img");
    img.setAttribute("src", "./../images/" + food.htmlName + ".jpg");
    img.setAttribute("alt", "A picture of a " + food.name);
    let figCaption = document.createElement('figcaption');
    figCaption.appendChild(document.createTextNode(food.name));
    figure.appendChild(img);
    figure.appendChild(figCaption);
    body.insertBefore(figure, footer);
    dishesLoaded+=1;
}

function handleFooterIntersection(entries) {
    if(entries[0].isIntersecting){
        var url = "menu/progressiveloading.js?currentSection="+currentSection+"&sectionsLoaded="+ dishesLoaded; 
        getWithFunction(url, makeFoodFigure);
    }
}

function getMenuPage(menusection) {
    var url = "menu/getMenuPage.js?menuSection="+menusection;
    getWithFunction(url, replaceBody);
}

function setupMenu(menusection) {
    var url = "menu/setupMenu.js";
    get(url);
}

//default page setup
setupMenu();
getMenuPage("Appetizers");
let options = {
    root: null,
    rootMargins: "0px",
    treshold: 0.5
}
const observer = new IntersectionObserver(handleFooterIntersection, options);
observer.observe(document.getElementsByTagName("footer")[0]);

function getWithFunction(url, func) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            func(JSON.parse(req.responseText));
        }
    }
    req.send();
}

function get(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            return req.responseText;
        }
    }
    req.send();
}

function getObject(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            return JSON.parse(req.responseText);
        }
    }
    req.send();
}


//#endregion
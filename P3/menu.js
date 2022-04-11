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

exports.getFood = (_menusection, foodsLoaded) =>{
    switch(_menusection){
        case "Appetizers":
            return appetizers.items[foodsLoaded];
        case "Main Courses":
            return mainCourses.items[foodsLoaded];
            break;
        case "Deserts":
            return deserts.items[foodsLoaded];
            break;
        case "Drinks":
            return drinks.items[foodsLoaded];
            break;
    }
}

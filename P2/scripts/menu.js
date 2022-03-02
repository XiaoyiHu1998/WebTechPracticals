class menu {
    constructor(appetizers, mainCourses, deserts, drinks){
        this.appetizers = appetizers;
        this.mainCourses = mainCourses;
        this.deserts = deserts;
        this.drinks = drinks;
    }
};

class category {
    constructor(categoryName, items){
        this.name = categoryName;
        this.items = foodItems;
    }
};

class food {
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.diets = [];
        this.allergens = [];
    }
};

class carpaccio extends food{
    constructor(name, price, lactose, meatType, doneness){
        super(name, price);
        super.diets["vegitarian"] = false;
        super.diets["vegan"] = false;
        super.allergens["lactose"] = lactose;
        this.meatType = meatType;
        this.raw = true;
    }
}

class rissotto extends food {
    constructor(name, price, vegitarian, vegan, lactose, wetness){
        super(name, price);
        super.diets["vegitarian"] = vegitarian;
        super.diets["vegan"] = vegan;
        super.allergens["lactose"] = lactose;
        this.wetness = wetness;
    }
};

class coffeeOrTea extends food {
    constructor(name, price, caffeineStrength, lactose){
        super(name, price);
        this.caffeineStrength = caffeineStrength;
        this.allergens[lactose] = lactose;
        super.diets["vegitarian"] = true;
        super.diets["vegan"] = lactose;
    }
};

class alcoholicDrink extends food {
    constructor(name, price, alcoholPercentage, lactose){
        super(name, price);
        this.alcoholPercentage = alcoholPercentage;
        this.allergens[lactose] = lactose;
        super.diets["vegitarian"] = true;
        super.diets["vegan"] = lactose;
    }
}

class otherDrink extends food {
    constructor(name, price, fizzy ,sugarFree, lactose){
        super(name, price);
        this.fizzy = fizzy;
        this.sugarFree = sugarFree;
        this.allergens[lactose] = lactose;
        super.diets["vegitarian"] = true;
        super.diets["vegan"] = lactose;
    }
};
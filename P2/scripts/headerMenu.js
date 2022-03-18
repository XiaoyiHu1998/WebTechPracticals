 var selectedHtmlTag;
var htmlSelector;
var fontInput;
var colorInput;
var htmlNodes;

function createHeaderMenus(){                           //creates menu's in the header for changing the fonts and colors
    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(createDomSelector());
    ul.appendChild(createFontMenu());
    ul.appendChild(createColorMenu());
    
    function createDomSelector () {
        //creating the DOM selector
        let li = document.createElement("li");
        let form = document.createElement("form");
        form.setAttribute("name", "selector");
        let text = document.createTextNode("Website part ");
        htmlSelector = document.createElement("select");
        htmlSelector.setAttribute("id", "htmlselector");
        form.appendChild(text);
        form.appendChild(htmlSelector);
        li.appendChild(form);
        //populating the DOM selector
        htmlNodes = getElementsByTagNames(["body", "header", "footer", "aside", "article", "section"]); //Retrieves all the elements with one of the given tags
    
        var htmlOptions = htmlNodes.map(x => document.createElement('option'));
        for (let i = 0; i < htmlOptions.length; i++) {                                                  //Making the options for the dropdown menu and attaching them to the dropdown
            htmlOptions[i].setAttribute("value", i);
            htmlOptions[i].setAttribute("selected", "selected");
            htmlOptions[i].appendChild(document.createTextNode(i+1 + ". " + htmlNodes[i].nodeName));
            htmlSelector.appendChild(htmlOptions[i]);                                                   
        }
        changeSelectedTag();
        //populating
        return li;
    }

    //IMPORTANT!
    //Font size only changes when clicking on page outside of input field!
    //enter forces page reload which undoes the font change!
    function createFontMenu() {                             //Creates the font menu in the header
        let li = document.createElement("li");
        let form = document.createElement("form");
        form.setAttribute("name", "fontsize");
        let text = document.createTextNode("Fontsize ");
        fontInput = document.createElement("input");
        fontInput.setAttribute("type", "number");
        fontInput.setAttribute("min", 7);
        fontInput.setAttribute("max", 40);
        fontInput.setAttribute("id", "fontinput");
        form.appendChild(text);
        form.appendChild(fontInput);
        li.appendChild(form);
        return li;
    }
    function createColorMenu() {                        //Creates the color menu in the header
        let li = document.createElement("li");
        let form = document.createElement("form");
        form.setAttribute("name", "color");
        let text = document.createTextNode("Color ");
        colorInput = document.createElement("input");
        colorInput.setAttribute("type", "color");
        colorInput.setAttribute("id", "colorinput");
        form.appendChild(text);
        form.appendChild(colorInput);
        li.appendChild(form);
        return li;
    }
}

function changeColor(){                                                         //The color event which is fired when the color is changed
    selectedHtmlTag.style.color = document.getElementById("colorinput").value;  //Change the color of selected DOM element.
}

function changeFontSize(e){                                                             //The font event which is fired when the font is changed (Please dont use enter to submit the font this reloads the page, instead click outside the form) 
    selectedHtmlTag.style.fontSize = document.getElementById("fontinput").value + "px"; //Changes the fontsize of the selected DOM element
    e.stopPropagation();
}

function changeSelectedTag(){                                   //Changes the selected DOM element
    selectedHtmlTag = htmlNodes[htmlSelector.selectedIndex];
}

function registerEvents(){                                      //Register events
    fontInput.addEventListener("blur", changeFontSize);         //Activates when fontsize form is out focus (Again don't use enter)
    colorInput.addEventListener("input", changeColor);          //Activates when colorform changed
    htmlSelector.addEventListener("change", changeSelectedTag); //Activates when selected DOM element changed
}


function getElementsByTagNames(names){                          //Function to get multiple elements with different names at once
    let elements = [];
    for (let i = 0; i < names.length; i++) {
        Array.from(document.getElementsByTagName(names[i])).forEach(x => elements.push(x));
    }
    return elements
}
createHeaderMenus();                                           //makes the header menu's 
registerEvents();                                              //register the events
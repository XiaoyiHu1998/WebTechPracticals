var selectedHtmlTag;
var htmlSelector;
var fontInput;
var colorInput;
var htmlNodes;

function createHeaderMenus(){
    let ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(createHtmlSelector());
    ul.appendChild(createFontMenu());
    ul.appendChild(createColorMenu());
    
    function createHtmlSelector () {
        //creating
        let li = document.createElement("li");
        let form = document.createElement("form");
        form.setAttribute("name", "selector");
        let text = document.createTextNode("Website part ");
        htmlSelector = document.createElement("select");
        htmlSelector.setAttribute("id", "htmlselector");
        form.appendChild(text);
        form.appendChild(htmlSelector);
        li.appendChild(form);
        //creating
        //populating
        htmlNodes = getElementsByTagNames(["body", "header", "footer", "aside", "article", "section"]);
    
        var htmlOptions = htmlNodes.map(x => document.createElement('option'));
        for (let i = 0; i < htmlOptions.length; i++) {
            htmlOptions[i].setAttribute("value", i);
            htmlOptions[i].setAttribute("selected", "selected");
            htmlOptions[i].appendChild(document.createTextNode(htmlNodes[i].nodeName));
            htmlSelector.appendChild(htmlOptions[i]);
        }
        //populating
        return li;
    }
    function createFontMenu() {
        let li = document.createElement("li");
        let form = document.createElement("form");
        form.setAttribute("name", "fontsize");
        let text = document.createTextNode("Fontsize ");
        fontInput = document.createElement("input");
        fontInput.setAttribute("type", "number");
        fontInput.setAttribute("min", 1);
        fontInput.setAttribute("id", "fontinput");
        form.appendChild(text);
        form.appendChild(fontInput);
        li.appendChild(form);
        return li;
    }
    function createColorMenu() {
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

function changeColor(){
    selectedHtmlTag.style.color = document.getElementById("colorinput").value;
}

function changeFontSize(){
    selectedHtmlTag.style.fontSize = document.getElementById("fontinput").value + "px";
}

function changeSelectedTag(){
    var value = htmlSelector.options[htmlSelector.selectedIndex].value;
    selectedHtmlTag = htmlNodes[value];
}

function registerEvents(){
    fontInput.addEventListener("input", changeFontSize);
    colorInput.addEventListener("input", changeColor);
    htmlSelector.addEventListener("change", changeSelectedTag);
}

function getElementsByTagNames(names){
    var elements = [];
    for (let i = 0; i < names.length; i++) {
        Array.from(document.getElementsByTagName(names[i])).forEach(x => elements.push(x));
    }
    return elements
}
createHeaderMenus();
registerEvents();
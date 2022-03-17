var selectedHtmlTag;
var htmlForm;
var htmlNodes;

function createHeader*
Menus(){
    htmlNodes = getElementsByTagNames(["body", "header", "footer", "aside", "article", "section"]);
    
    htmlForm = document.getElementById("htmlselector");
    var htmlOptions = htmlNodes.map(x => document.createElement('option'));
    for (let i = 0; i < htmlOptions.length; i++) {
        htmlOptions[i].setAttribute("value", i);
        htmlOptions[i].setAttribute("selected", "selected");
        htmlOptions[i].appendChild(document.createTextNode(htmlNodes[i].nodeName));
        htmlForm.appendChild(htmlOptions[i]);
    }
    
    function createHeader (params) {
        
    }

}

function changeColor(){
    selectedHtmlTag.style.color = document.getElementById("colorinput").value;
}

function changeFontSize(){
    selectedHtmlTag.style.fontSize = document.getElementById("fontinput").value + "px";
}

function changeSelectedTag(){
    var value = htmlForm.options[htmlForm.selectedIndex].value;
    selectedHtmlTag = htmlNodes[value];
}

function registerEvents(){
    var fontInput = document.getElementById("fontinput");
    var colorInput = document.getElementById("colorinput");
    var tagInput = document.getElementById("htmlselector");
    fontInput.addEventListener("input", changeFontSize);
    colorInput.addEventListener("input", changeColor);
    tagInput.addEventListener("change", changeSelectedTag);
}

function getElementsByTagNames(names){
    var elements = [];
    for (let i = 0; i < names.length; i++) {
        Array.from(document.getElementsByTagName(names[i])).forEach(x => elements.push(x));
    }
    return elements
}
registerEvents();
populateHtmlMenu();
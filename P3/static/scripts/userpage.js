function createPage(res){
    console.log(res);
    if(!res){
        createAnonymousPage();
        return;
    }
    createRegisteredPage(res);
}

function createAnonymousPage(){
    body = document.getElementsByTagName("body")[0];
    footer = document.getElementsByTagName("footer")[0];
    body.insertBefore(createLoginSection(), footer);
    body.insertBefore(createRegisterSection(), footer);
}

var orderHistoryResponse = [];
function createRegisteredPage(userinfo){
    //userInfo
    console.log(userinfo);
    deletePage();
    userInfoSection = document.createElement("section");
    h1 = document.createElement("h1");
    text = document.createTextNode("User Info");
    h1.appendChild(text);
    p = document.createElement("p");
    text = document.createTextNode("name = " + userinfo[0] + "email = " + userinfo[1] + "username = " + userinfo[2] + "password = " + userinfo[3] + "adress = " + userinfo[4]);
    p.appendChild(text);
    userInfoSection.appendChild(h1);
    userInfoSection.appendChild(p);
    footer = document.getElementsByTagName("footer")[0];
    body = document.getElementsByTagName("body")[0];

    //order history
    //header
    orderHistorySection = document.createElement("section");
    orderHistoryHeader = document.createElement("h2");
    orderHistoryHeaderText = document.createTextNode("Order History");
    orderHistoryHeader.appendChild(orderHistoryHeaderText);
    orderHistorySection.appendChild(orderHistoryHeader);

    //list
    orderHistoryList = document.createElement("section");
    orderHistoryList.setAttribute("id", "userpage__orderhistory__list");
    var url = "user/requestOrderHistory";
    getWithFunctionParameters(url, appendOrderItems, orderHistoryList);

    body.insertBefore(userInfoSection, footer);
    body.insertBefore(orderHistoryHeader, footer);
    body.insertBefore(orderHistoryList, footer);
}

function appendOrderItems(result, orderHistoryList){
    orders = JSON.parse(result);
    console.log(orders);
    console.log(orders.length);

    for(let i = 0; i < orders.length; i++){
        let orderCost = orders[i].totalPrice;
        console.log(typeof(orderCost));
        console.log(typeof(orders[i]));

        orderItem = document.createElement("p");
        orderItemText = document.createTextNode("Order cost: " + orderCost);

        orderItem.appendChild(orderItemText);
        orderHistoryList.appendChild(orderItem);
    }
    
    // result.forEach(order => {
    //     let orderCost = order.totalPrice;

    //     orderItem = document.createElement("li");
    //     orderItemText = document.createTextNode(orderCost);

    //     orderItem.appendChild(orderItemText);
    //     orderHistoryList.appendChild(orderItem);
    // });

}

function deletePage(){
    let html = document.getElementsByTagName("html")[0];
    let header = document.getElementsByClassName("header")[0];
    let footer = document.getElementsByClassName("footer")[0];
    let oldBody = document.getElementsByTagName("body")[0];
    let newBody = document.createElement("body");

    html.removeChild(oldBody);
    newBody.appendChild(header);
    newBody.appendChild(footer);
    html.appendChild(newBody);
}


function createLoginSection() {                           
    loginForm = document.createElement("form");
    usernameInput = document.createElement("input");
    passwordInput = document.createElement("input");
    submitInput = document.createElement("input");
    usernameInput.setAttribute("type", "text");
    passwordInput.setAttribute("type", "text");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Submit");
    usernameInput.setAttribute("placeholder", "Username");
    passwordInput.setAttribute("placeholder", "Password");
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitInput);
    loginForm.addEventListener("submit", requestLogin);
    return loginForm;
}

function createRegisterSection() {                           
    registerForm = document.createElement("form");
    nameInput = document.createElement("input");
    emailInput = document.createElement("input");
    usernameInput = document.createElement("input");
    passwordInput = document.createElement("input");
    adresInput = document.createElement("input");
    submitInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    emailInput.setAttribute("type", "text");
    usernameInput.setAttribute("type", "text");
    passwordInput.setAttribute("type", "text");
    submitInput.setAttribute("type", "submit");
    adresInput.setAttribute("type", "text");
    submitInput.setAttribute("value", "Submit");
    nameInput.setAttribute("placeholder", "Full name");
    emailInput.setAttribute("placeholder", "Email adress");
    usernameInput.setAttribute("placeholder", "Username");
    passwordInput.setAttribute("placeholder", "Password");
    adresInput.setAttribute("placeholder", "Adress");

    registerForm.appendChild(nameInput);
    registerForm.appendChild(emailInput);
    registerForm.appendChild(usernameInput);
    registerForm.appendChild(passwordInput);
    registerForm.appendChild(adresInput);
    registerForm.appendChild(submitInput);
    registerForm.addEventListener("submit", requestRegister);

    return registerForm;
}

function requestRegister(e){
    console.log("event");
    e.target.childNodes.forEach(element => {
        console.log(element.value);
    });

    let fullname = e.target.childNodes[0].value;
    let email = e.target.childNodes[1].value;
    let username = e.target.childNodes[2].value;
    let password = e.target.childNodes[3].value;
    let adress = e.target.childNodes[4].value;

    var url = "user/requestRegister?username="+ username + "&password="+ password + "&fullname=" + fullname + "&email=" + email + "&adress=" + adress; 
    getWithFunction(url, OnLogin);

    e.preventDefault();
}

function requestLogin(e){
    username = e.target.childNodes[0].value;
    password = e.target.childNodes[1].value;
    var url = "user/requestLogin?username="+ username + "&password="+ password; 
    getWithFunction(url, OnLogin);
    e.preventDefault();
}


var url = "user/requestUserInfo";
getObjectWithFunction(url, createPage);

function OnLogin(emptyVar){
    var url = "user/requestUserInfo";
    getObjectWithFunction(url, createPage);
}

function getObjectWithFunction(url, func) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            func(JSON.parse(req.responseText));
        }
    }
    req.send();
}

function getWithFunction(url, func) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            func(req.responseText);
        }
    }
    req.send();
}

function getWithFunctionParameters(url, func, param) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            func(req.responseText, param);
        }
    }
    req.send();
}

function get(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            
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
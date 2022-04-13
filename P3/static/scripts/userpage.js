function createPage(){
    body = document.getElementsByTagName("body")[0];
    footer = document.getElementsByTagName("footer")[0];
    body.insertBefore(createLoginSection(), footer);
    body.insertBefore(createRegisterSection(), footer);
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
    console.log("evnt");
    e.target.childNodes.forEach(element => {
        console.log(element.value);
    });
 
    e.preventDefault();
}

function requestLogin(e){
    console.log("login");
    username = e.target.childNodes[0].value;
    password = e.target.childNodes[1].value;
    var url = "user/requestLogin?username="+ username + "&password="+ password; 
    console.log(get(url));
    e.preventDefault();
}

function result(test){
    console.log(test);
}


createPage();

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
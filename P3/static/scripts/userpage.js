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
    return registerForm;
}

createPage();
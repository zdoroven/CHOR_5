function authClicked() {
  setServerErrorVisibility(false);
  setWrongPassErrorVisibility(false)
  let login = document.getElementById('auth_login').value;
  let pass = document.getElementById('auth_pass').value;

  let isLoginOk = checkLogin(login);
  setLoginErrorVisibility(!isLoginOk);

  let isPassOk = checkPass(pass);
  setPassErrorVisibility(!isPassOk);

  if (!isLoginOk || !isPassOk) {
    return
  }
  showLoader();
  setTimeout(function() { tryAuth(login, pass) }, 2000);
}

function tryAuth(login, pass) {
  if (login == "admin") {
    console.log("Имитируем ошибку на сервере")
    setServerErrorVisibility(true);
    hideLoader();
    return;
  }
  var dbPass = Load(login);
  console.log(dbPass);
  if (pass == dbPass) {
    location.href = "loggedIn.html"
  } else {
    setWrongPassErrorVisibility(true);
    hideLoader();
  }
}


function checkLogin(login) {
  var pass = Load(login);
  if (login == "") {
    setLoginErrorText('Логин не может быть пустым')
    return false
  } else if (containsForbiddenSymbols(login)){
    setLoginErrorText('В логине не могут быть следюущие символы:\n `!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~')
    return false
  } else if (pass == "") {
    setLoginErrorText('Такого пользователя нет')
    return false
  } else {
    return true
  }
}

function checkPass(pass) {
  if ([...pass].length < 8) {
    console.log("short pass");
    return false;
  } else if (!containsNumber(pass)) {
    console.log("no number in pass");
    return false;
  }
  return true
}

function setLoginErrorVisibility(visible) {
  if (visible) {
    document.getElementById('login_error').style.display = "block";
  } else {
    document.getElementById('login_error').style.display = "none";
  }
}

function setLoginErrorText(text) {
  document.getElementById('login_error').innerText = text;
}

function setPassErrorVisibility(visible) {
  if (visible) {
    document.getElementById('pass_error').style.display = "block";
  } else {
    document.getElementById('pass_error').style.display = "none";
  }
}

function setWrongPassErrorVisibility(visible) {
  if (visible) {
    document.getElementById('wrong_pass').style.display = "block";
  } else {
    document.getElementById('wrong_pass').style.display = "none";
  }
}

function setServerErrorVisibility(visible) {
  if (visible) {
    document.getElementById('server_problems').style.display = "block";
  } else {
    document.getElementById('server_problems').style.display = "none";
  }
}

function showLoader() {
  document.getElementById('loader').style.display = "block";
  document.getElementById('auth_button').style.display = "none";
  document.getElementById('register_button').style.display = "none";
}

function hideLoader() {
  document.getElementById('loader').style.display = "none";
  document.getElementById('auth_button').style.display = "block";
  document.getElementById('register_button').style.display = "block";
}

function containsNumber(str) {
  return /\d/.test(str);
}

var forbiddenSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function containsForbiddenSymbols(str) {
  return forbiddenSymbols.test(str);
}


function goRegisterClicked() {
  location.href = "register.html";
}

function Load(login){
  var ans = localStorage.getItem(login);
  if (ans == null) {
    return ""
  }
  var data = JSON.parse(ans);
  var pass = data.pass;
  return pass
}
  
function registerClicked() {
    var login = document.getElementById('register_login').value
    var pass = document.getElementById('register_pass').value
    
    let isLoginOk = checkLogin(login);
    setLoginErrorVisibility(!isLoginOk);
  
    let isPassOk = checkPass(pass);

    if (!isLoginOk || !isPassOk) {
        return
    }
    showLoader();
    setTimeout(function() {
        Save(login, pass);
        location.href = "auth.html";
        }, 2000);
  }
  
  function checkLogin(login) {
    if (login == "") {
        setLoginErrorText('Логин не может быть пустым')
        return false
    } else if (containsForbiddenSymbols(login)){
        setLoginErrorText('В логине не могут быть следюущие символы:\n `!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~')
        return false
    } else if (checkUserExist(login)) {
        setLoginErrorText('Логин занят')
        return false
    } else {
        return true
    }
  }
  
  function checkPass(pass) {
    var samePasswords = pass == document.getElementById('register_pass_2').value;
    setDiffPassErrorVisibility(!samePasswords);
    if ([...pass].length < 8) {
      console.log("short pass");
      setPassErrorVisibility(true);
      return false;
    } else if (!containsNumber(pass)) {
      console.log("no number in pass");
      setPassErrorVisibility(true);
      return false;
    } else {
        setPassErrorVisibility(false);
    }
    return samePasswords
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

  function setDiffPassErrorVisibility(visible) {
    if (visible) {
      document.getElementById('diff_pass_error').style.display = "block";
    } else {
      document.getElementById('diff_pass_error').style.display = "none";
    }
  }

  function showLoader() {
    document.getElementById('loader').style.display = "block";
    document.getElementById('register_button').style.display = "none";
  }

  function containsNumber(str) {
    return /\d/.test(str);
  }

  var forbiddenSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  function containsForbiddenSymbols(str) {
    return forbiddenSymbols.test(str);
  }

  function Save(login, pass){
    var data = new Object;
    data.login = login;
    data.pass = pass;
    var str = JSON.stringify(data);
    localStorage.setItem(data.login,str);
    console.log("Save Successfully!");
  }
  function checkUserExist(login){
    var ans = localStorage.getItem(login);
    if (ans == null) {
        return false
    } else {
        return true
    }
  }
var loggedIn = false;

function authenticate() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  loggedIn = login(password, email);
  status();
}

function login(password, email) {
  var storeEmail = "subletme@email.com";
  var storedPassword = "subletme";

  return password == storedPassword && email == storeEmail;
}

function status() {
  if (loggedIn) {
    window.location = "../index.html";
  } else {
    console.log("You are not in :(");
  }
}

function passwordReset() {
  alert("Your link has been set");
}

function signUp() {
  window.location = "../index.html";
}

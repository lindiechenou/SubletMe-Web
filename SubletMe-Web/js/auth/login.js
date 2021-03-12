async function login() {
  //login fields
  var email = document.querySelector("#loginEmail").value;
  var loginEmail = email.toLowerCase();
  const params = {
    email: loginEmail,
    password: document.querySelector("#loginPassword").value,
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/api/rest-auth/login/", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(params));
  xhr.onreadystatechange = function () {
    console.log(xhr.status);
    if (this.status == 200) {
      window.location.href = "../../html/index.html";
    } else {
      // document.getElementById("error-message").innerHTML = xhr.responseText;
    }
  };
}

var emailBox = document.getElementById("loginEmail");
var passwordBox = document.getElementById("loginPassword");
var emailLabel = document.getElementById("email-label");
var passwordLabel = document.getElementById("password-label");

emailBox.addEventListener("focusout", emailFocusOut);
passwordBox.addEventListener("focusout", passwordFocusOut);

//Keeps label above input box when text is inside
function emailFocusOut() {
  if (emailBox.value.length > 0) {
    emailBox.classList.add("not-empty");
  } else {
    emailBox.classList.remove("not-empty");
  }
}
function passwordFocusOut() {
  if (passwordBox.value.length > 0) {
    passwordBox.classList.add("not-empty");
  } else {
    passwordBox.classList.remove("not-empty");
  }
}

//allow focus for input boxes even on click of input labels
emailLabel.onclick = function () {
  emailBox.focus();
};
passwordLabel.onclick = function () {
  passwordBox.focus();
};

$(".toggle-password").click(function () {
  const password = document.getElementById("loginPassword");
  $(this).toggleClass("fa-eye fa-eye-slash");
  if (password.getAttribute("type") == "password") {
    password.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
  }
});
// var loggedIn = false;

// function authenticate() {
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;

//   loggedIn = login(password, email);
//   status();
// }

// function login(password, email) {
//   var storeEmail = "subletme@email.com";
//   var storedPassword = "subletme";

//   return password == storedPassword && email == storeEmail;
// }

// function status() {
//   if (loggedIn) {
//     window.location = "../index.html";
//   } else {
//     console.log("You are not in :(");
//   }
// }

// function passwordReset() {
//   alert("Your link has been set");
// }

// function signUp() {
//   window.location = "../index.html";
// }

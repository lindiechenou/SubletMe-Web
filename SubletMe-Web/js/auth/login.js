localStorage.setItem("info", "");    
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
    if (this.status == 200) {
      var token = JSON.parse(xhr.responseText);
      // console.log(token.key);
      profileInfo(token.key);
    } else {
      // document.getElementById("error-message").innerHTML = xhr.responseText;
    }
  };
}

function profileInfo(tok){
  let xhr1 = new XMLHttpRequest();
  localStorage.setItem("Token", tok);
  xhr1.open('GET', 'http://localhost:8000/api/rest-auth/user/');
  xhr1.setRequestHeader('Authorization', `Token ${tok}`);
  xhr1.send();
  xhr1.onreadystatechange = function() {
    if (this.status == 200) {
        console.log(xhr1.responseText);
        localStorage.setItem("info", xhr1.responseText);
        window.location.href = "../../html/index.html";
    }

  }
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

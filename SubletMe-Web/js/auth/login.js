localStorage.setItem("info", "");   
function login() {
  //login fields
  var email = document.querySelector("#loginEmail").value;
  var loginEmail = email.toLowerCase();
  var password = document.querySelector("#loginPassword").value;
  fetch('http://localhost:8000/api/rest-auth/login/', {
      method  : 'post',
      headers : new Headers({
  //         'Authorization': 'Token 81dbe0ac1b0347974b01eb08627f493a0a23c75c'
          'Content-type': 'application/json'
      }),
      body: JSON.stringify({
      email: loginEmail,
      password: password,
    })
  }).then( response => {
      return response.json(); // server returned valid JSON
  }).then( parsed_result => {
      // console.log(parsed_result.key);
      // localStorage.setItem("Token", parsed_result.key);
      profileInfo(parsed_result.key);
  });
}

function profileInfo(token){
  localStorage.setItem("Token", token);
  fetch('http://localhost:8000/api/rest-auth/user/',{
    method: 'get',
    headers:  new Headers({
      'Authorization':  `Token ${token}`
    })
  }).then(response => {
    return response.json();
  }).then(parsed_result => {
    // console.log(parsed_result);
    // console.log(localStorage.getItem("Token"));
    const Information = {
      id: parsed_result.id,
      email: parsed_result.email,
      first_name: parsed_result.first_name,
      last_name: parsed_result.last_name,
      university_choices: parsed_result.university_choices,
    }
    localStorage.setItem("info", JSON.stringify(Information));
    window.location.href = "../../html/index.html";
  })
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
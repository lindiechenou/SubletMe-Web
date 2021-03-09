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

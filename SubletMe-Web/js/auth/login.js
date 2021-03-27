localStorage.setItem("info", "");
function login(){
  var email = (document.querySelector("#loginEmail").value).toLowerCase();
  var password = document.querySelector("#loginPassword").value;
  if(email != "" && password != ""){
      fetch('http://localhost:8000/api/rest-auth/login/',{
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }).then(response =>{
        if (response.ok) return response.json();
        return response.json().then(response => {
          var text = Object.keys(response)[0]
          throw new Error(response[text])
        })
      }).then(response =>{profileInfo(response.key)})
      .catch((error) => {
        console.log(error.message)
        document.getElementById('toastBody').innerHTML = error.message;
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function(toastEl){
          return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => toast.show());
      })
  }
  else{
    document.getElementById('toastBody').innerHTML = "Please fill out all the fields";
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl){
      return new bootstrap.Toast(toastEl)
    });
    toastList.forEach(toast => toast.show());
  }
}

function profileInfo(keyID){
  localStorage.setItem("Token", keyID);
  fetch('http://localhost:8000/api/rest-auth/user/',{
    method: 'get',
    headers:  new Headers({
      'Authorization':  `Token ${keyID}`
    })
  }).then(response => {
    return response.text();
  }).then(parsed_result => {
    console.log(parsed_result)
    localStorage.setItem("info", parsed_result);
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



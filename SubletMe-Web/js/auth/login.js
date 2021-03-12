
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
async function createUser() {
  //form fields
  const params = {
    email: document.querySelector("#signupEmail").value,
    password1: document.querySelector("#signupPassword").value,
    password2: document.querySelector("#signupPassword2").value,
    university_choices: document.querySelector("#school").value,
    first_name: document.querySelector("#firstName").value,
    last_name: document.querySelector("#lastName").value,
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/api/rest-auth/registration/", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(params));
  xhr.onreadystatechange = function () {
    console.log(xhr.status);
    if (this.status == 201) {
      window.location.href = "../../html/auth/newAccount.html";
    } else {
      document.getElementById("error-message").innerHTML = xhr.responseText;
      console.log(xhr.status);
    }
  };
}

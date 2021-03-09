async function createUser() {
  //form fields
  const params = {
    email: (document.querySelector("#signupEmail").value).toLowerCase(),
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

$('select').on('change', function() {
  if ($(this).val()) {
return $(this).css('color', 'black');
  } else {
return $(this).css('color', 'rgb(116, 115, 115)');
  }
});

$(".toggle-password").click(function(){
  const password = document.querySelector('.passwordtext');
  $(this).toggleClass('fa-eye fa-eye-slash');
  if (password.getAttribute('type')==='password'){
    password.setAttribute('type', 'text');
  }
  else{
    password.setAttribute('type', 'password');
  }
})

$(".toggle-Repassword").click(function(){
  const passwordRe = document.querySelector('.passwordRetext');
  $(this).toggleClass('fa-eye fa-eye-slash');
  if (passwordRe.getAttribute('type')==='password'){
    passwordRe.setAttribute('type', 'text');
  }
  else{
    passwordRe.setAttribute('type', 'password');
  }
})
function createUser() {
  //SignUp fields
  var email = (document.querySelector("#signupEmail").value).toLowerCase();
  var password1 = document.querySelector("#signupPassword").value;
  var password2 = document.querySelector("#signupPassword2").value;
  var university_choices = document.querySelector("#school").value;
  var first_name = document.querySelector("#firstName").value;
  var last_name = document.querySelector("#lastName").value;
  fetch('http://localhost:8000/api/rest-auth/registration/', {
      method  : 'post',
      headers : new Headers({
  //         'Authorization': 'Token 81dbe0ac1b0347974b01eb08627f493a0a23c75c'
          'Content-type': 'application/json'
      }),
      body: JSON.stringify({
      email: email,
      password1: password1,
      password2: password2,
      university_choices: university_choices,
      first_name: first_name,
      last_name: last_name,
    })
  }).then( response => {
      return response.json(); // server returned valid JSON
  }).then( parsed_result => {
      window.location.href = "../../html/auth/newAccount.html";
  });
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
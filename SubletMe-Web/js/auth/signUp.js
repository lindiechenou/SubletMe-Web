function createUser() {
  var email = (document.querySelector("#signupEmail").value).toLowerCase();
  var password1 = document.querySelector("#signupPassword").value
  var password2 = document.querySelector("#signupPassword2").value
  var university_choices = document.querySelector("#school").value
  var first_name = document.querySelector("#firstName").value
  var last_name = document.querySelector("#lastName").value
  if(email !="" && password1 !="" && password2 !="" && university_choices !="" && first_name !="" && last_name !=""){
      fetch('http://localhost:8000/api/rest-auth/registration/',{
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          email: email,
          password1: password1,
          password2: password2,
          university_choices: university_choices,
          first_name: first_name,
          last_name: last_name,
        })
      }).then(response =>{
        if (response.ok) return response.json();
        return response.json().then(response => {
          var text = Object.keys(response)[0]
          throw new Error(response[text])})
      }).then(response => {window.location.href = "../../html/auth/newAccount.html";})
      // .catch(error => console.log(error))
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
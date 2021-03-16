function signOutWeb() {
  var passedJson = localStorage.setItem("info", "");
  console.log(passedJson);
  // window.location.href = "/Users/lindiechenou/Desktop/Spring 2021/Software Engineering/SubletMe-Web/SubletMe-Web/html/auth/login.html";
}

if (localStorage.getItem("info") == "") {
  window.location.href = "auth/login.html";
} else if (document.title === "Profile") {
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  console.log(passedJson);
  first = passedJson.first_name;
  last = passedJson.last_name;
  fullname = first + " " + last;
  document.getElementById("userName").innerHTML = fullname;
  document.getElementById("userEmail").innerHTML = passedJson.email;

  //sets element values for Profile page
  document.getElementById("first-name").innerHTML = first;
  document.getElementById("last-name").innerHTML = last;
  document.getElementById("email").innerHTML = passedJson.email;
  document.getElementById("school").innerHTML = passedJson.university_choices;
} else if (document.title === "Name") {
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  console.log(passedJson);
  first = passedJson.first_name;
  last = passedJson.last_name;
  fullname = first + " " + last;
  document.getElementById("userName").innerHTML = fullname;
  document.getElementById("userEmail").innerHTML = passedJson.email;

  //sets element values for Name page
  document.getElementById("fname-box").value = first;
  document.getElementById("lname-box").value = last;
} else if (document.title === "Email") {
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  console.log(passedJson);
  first = passedJson.first_name;
  last = passedJson.last_name;
  fullname = first + " " + last;
  document.getElementById("userName").innerHTML = fullname;
  document.getElementById("userEmail").innerHTML = passedJson.email;

  //sets element values for Email page
  document.getElementById("email-box").value = passedJson.email;
} else if (document.title === "School") {
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  console.log(passedJson);
  first = passedJson.first_name;
  last = passedJson.last_name;
  fullname = first + " " + last;
  document.getElementById("userName").innerHTML = fullname;
  document.getElementById("userEmail").innerHTML = passedJson.email;

  //sets element values for School page
  document.getElementById("school-box").value = passedJson.university_choices;
} else {
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  console.log(passedJson);
  first = passedJson.first_name;
  last = passedJson.last_name;
  fullname = first + " " + last;
  document.getElementById("userName").innerHTML = fullname;
  document.getElementById("userEmail").innerHTML = passedJson.email;
}

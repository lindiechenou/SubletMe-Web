// alert("Profile");
function editButton1() {
  var name = document.getElementById("name");
  var button = document.getElementById("edit-btn1");

  if (button.innerHTML == "Edit") {
    button.innerHTML = "Save";
    name.readOnly = false;
  } else if (button.innerHTML == "Save") {
    button.innerHTML = "Edit";
    name.readOnly = true;
  } else if (button.innerHTML == "Save") {
    button.innerHTML = "Edit";
    name.readOnly = true;
  }
}


let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', 'http://localhost:8000/api/rest-auth/user/');
// xhr.setRequestHeader('content-type', 'application/json');
// xhr.setRequestHeader('authorization', '59431db66a4a874a6fe7452d089c4eaae948117b');
xhr.send();

xhr.onload = function() {
  console.log(xhr.status);
}
// 3. Send the request over the network

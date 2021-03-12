// alert("Profile");
var box = document.getElementById("input-box");
var lNameBox = document.getElementById("lname-box");
var label = document.getElementById("input-label");
var lLabel = document.getElementById("lname-label");

box.addEventListener("focusout", onFocusOut);
lNameBox.addEventListener("focusout", lonFocusOut);

//Keeps label above input box when text is inside
function onFocusOut() {
  if (box.value.length > 0) {
    box.classList.add("not-empty");
  } else {
    box.classList.remove("not-empty");
  }
}
function lonFocusOut() {
  if (lNameBox.value.length > 0) {
    lNameBox.classList.add("not-empty");
  } else {
    lNameBox.classList.remove("not-empty");
  }
}
//allow focus for input-box even on click of input-label
label.onclick = function () {
  box.focus();
};
lLabel.onclick = function () {
  lNameBox.focus();
};

let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open("GET", "http://localhost:8000/api/rest-auth/user/");
// xhr.setRequestHeader('content-type', 'application/json');
// xhr.setRequestHeader('authorization', '59431db66a4a874a6fe7452d089c4eaae948117b');
xhr.send();

xhr.onload = function () {
  console.log(xhr.status);
};
// 3. Send the request over the network

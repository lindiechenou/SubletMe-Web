// alert("Profile");
var box = document.querySelector(".input-box");
var label = document.getElementById("input-label");

box.addEventListener("focusout", onFocusOut);

//Keeps label above input box when text is inside
function onFocusOut() {
  if (box.value.length > 0) {
    box.classList.add("not-empty");
  } else {
    box.classList.remove("not-empty");
  }
}
//allow focus for input-box even on click of input-label
label.onclick = function () {
  box.focus();
};

//For Last Name box
var lNameBox = document.getElementById("lname-box");
var lLabel = document.getElementById("lname-label");

lNameBox.addEventListener("focusout", lonFocusOut);

function lonFocusOut() {
  if (lNameBox.value.length > 0) {
    lNameBox.classList.add("not-empty");
  } else {
    lNameBox.classList.remove("not-empty");
  }
}

lLabel.onclick = function () {
  lNameBox.focus();
};

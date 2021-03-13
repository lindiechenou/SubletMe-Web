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
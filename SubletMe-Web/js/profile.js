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

var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
  myInput.focus();
});

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

function editButton2() {
  var name = document.getElementById("email");
  var button = document.getElementById("edit-btn2");

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

function editButton3() {
  var name = document.getElementById("school");
  var button = document.getElementById("edit-btn3");

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

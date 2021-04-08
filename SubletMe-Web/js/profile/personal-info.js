/*for user information screens */
if (document.title !== "Password" && document.title !== "New Password") {
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
} else if (document.title === "Password") {
  //For Password Screen
  var pBox = document.getElementById("password-input");
  var pLabel = document.getElementById("password-label");

  pBox.addEventListener("focusout", lonFocusOut);

  function lonFocusOut() {
    if (pBox.value.length > 0) {
      pBox.classList.add("not-empty");
    } else {
      pBox.classList.remove("not-empty");
    }
  }

  pLabel.onclick = function () {
    pBox.focus();
  };

  $(".toggle-password").click(function () {
    const password = document.getElementById("password-input");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (password.getAttribute("type") == "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });

  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);
  first = passedJson.first_name;
  document.getElementById("firstName").innerHTML = "Hi " + first;
  document.getElementById("email").innerHTML =
    '<i class="far fa-user-circle"></i>  ' + passedJson.email;
} else {
  //For New Password Screen
  var nbox = document.getElementById("newPassword-input");
  var nlabel = document.getElementById("newPassword-label");

  nbox.addEventListener("focusout", lonFocusOut1);

  function lonFocusOut1() {
    if (nbox.value.length > 0) {
      nbox.classList.add("not-empty");
    } else {
      nbox.classList.remove("not-empty");
    }
  }

  nlabel.onclick = function () {
    nbox.focus();
  };

  $(".toggle-newPassword").click(function () {
    const password = document.getElementById("newPassword-input");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (password.getAttribute("type") == "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });

  //re-enter password
  var rbox = document.getElementById("rePassword-input");
  var rlabel = document.getElementById("rePassword-label");

  rbox.addEventListener("focusout", lonFocusOut);

  function lonFocusOut() {
    if (rbox.value.length > 0) {
      rbox.classList.add("not-empty");
    } else {
      rbox.classList.remove("not-empty");
    }
  }

  rlabel.onclick = function () {
    rbox.focus();
  };

  $(".toggle-rePassword").click(function () {
    const password = document.getElementById("rePassword-input");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (password.getAttribute("type") == "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });
}

function changeName() {
  var Token = localStorage.getItem("Token");
  var passedJson = localStorage.getItem("info");
  passedJson = JSON.parse(passedJson);

  id = passedJson.id;
  firstName = passedJson.first_name;
  updateFirst = document.getElementById("fname-box").value;
  lastName = passedJson.last_name;
  updateLast = document.getElementById("lname-box").value;

  if (updateFirst != firstName || updateLast != lastName) {
    fetch(`http://localhost:8000/api/rest-auth/user/${id}/`, {
      method: "patch",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Token ${Token}`,
      }),
      body: JSON.stringify({
        first_name: updateFirst,
        last_name: updateLast,
      }),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("toast").innerHTML =
            "Your change has been saved";
          $(".toast").toast("show");
          return response.json();
        } else {
          document.getElementById("toast").innerHTML =
            "Something went wrong when trying to update";
          $(".toast").toast("show");
          console.log(response);
          throw new Error("Something went wrong when trying to update");
        }
      })
      .then((parsed_result) => {
        console.log(parsed_result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

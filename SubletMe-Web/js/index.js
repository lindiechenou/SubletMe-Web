localStorage.setItem("ListingID", "");
// alert("Home");
(function () {
  var parent = document.querySelector(".price-slider"); //acts as parent and holds a node list for everything in the HTML <div>
  if (!parent) return;

  var //variables associated with the parent variable that return node list of elements with matching selector
    ranges = parent.querySelectorAll("input[type=range]"),
    numbers = parent.querySelectorAll("input[type=number]");

  //function that associates the range sliders with the input boxes
  ranges.forEach(function (slide) {
    slide.oninput = function () {
      var slide1 = parseFloat(ranges[0].value),
        slide2 = parseFloat(ranges[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numbers[0].value = slide1;
      numbers[1].value = slide2;
    };
  });

  //function that associates the input boxes with the range sliders
  numbers.forEach(function (input) {
    input.oninput = function () {
      var number1 = parseFloat(numbers[0].value),
        number2 = parseFloat(numbers[1].value);

      ranges[0].value = number1;
      ranges[1].value = number2;
    };
  });
})();

//Connecting filters to sublease search
async function filterLease() {
  var parameters = "";
  var washer = document.getElementById("washer-dryer").checked;
  var pool = document.getElementById("pool-available").checked;
  var pets = document.getElementById("pets-allowed").checked;
  var parking = document.getElementById("free-parking").checked;
  var furnished = document.getElementById("is-furnished").checked;
  var fitness = document.getElementById("fitness-center").checked;
  var women = document.getElementById("women-only").checked;
  var men = document.getElementById("men-only").checked;
  var nb_binary = document.getElementById("nb-binary").checked;
  var costMin = document.getElementById("Min").value;
  var costMax = document.getElementById("Max").value;
  var highLow = document.getElementById("btnradio1").checked;
  var lowHigh = document.getElementById("btnradio2").checked;
  var startDate = document.getElementById("start").value;
  var endDate = document.getElementById("end").value;
  if (washer == true) {
    console.log(washer);
    parameters += "laundry=True";
  }
  if (pool == true) {
    parameters += "&pool=True";
  }
  if (pets == true) {
    parameters += "&pets=True";
  }
  if (parking == true) {
    parameters += "&free_parking=True";
  }
  if (furnished == true) {
    parameters += "&is_furnished=True";
  }
  if (fitness == true) {
    parameters += "&fitness_center=True";
  }
  if (women == true) {
    parameters += "&women=True";
  }
  if (men == true) {
    parameters += "&men=True";
  }
  if (nb_binary == true) {
    parameters += "&nb=True";
  }
  if (costMin != "") {
    parameters += `&cpm_min=${costMin}`;
  }
  if (costMax != "") {
    parameters += `&cpm_max=${costMax}`;
  }
  if (highLow == true) {
    parameters += "&ordering=-cost_per_month";
  }
  if (lowHigh == true) {
    parameters += "&ordering=cost_per_month";
  }
  if (startDate != "") {
    parameters += `&start_lease=${startDate}`;
  }
  if (endDate != "") {
    parameters += `&end_lease=${endDate}`;
  }
  if (parameters[0] == "&") {
    parameters = parameters.slice(1);
  }

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(this.response);
      console.log(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", `http://localhost:8000/api/sublet/?${parameters}`);
    xhr.setRequestHeader("Authorization", `Token ${Token}`);
    xhr.send();
  });
}
//Connection to the BackEnd
var Token = localStorage.getItem("Token");
var ownerEmail = localStorage.getItem("info");
ownerEmail = JSON.parse(ownerEmail);
ownerEmail = ownerEmail.email;

function findImages(images) {
  const BaseURL = "http://localhost:8000";
  var image = "";
  if (images.length == 0) {
    return image;
  }
  for (var i = 0; i < images.length; i++) {
    if (images[i].is_primary == true) {
      image = BaseURL + images[i].image;
      return image;
    }
  }
  image = BaseURL + images[0].image;
  return image;
}

async function renderLease() {
  let leases = await filterLease();
  let html = "";
  // leases = await filterLease();
  leases.forEach((lease) => {
    if (lease.owner != ownerEmail) {
      images = lease.images;
      var link = findImages(images);
      var myLease = JSON.stringify(lease);
      var leaseID = JSON.stringify(lease.id);
      let htmlSegment = `<div class="col-lg-6 col-md-6 col-sm-12" data-bs-toggle="modal" data-bs-target="#leaseDetails">
                              <div class="placard-apt-1" onclick='leaseInformation(${leaseID})'>
                                    <div class="placard-header clear">
                                        <div class="left">
                                            <div>${lease.room_type} Room in ${lease.housing_type}</div>
                                            <div class="right">${lease.address.street}, ${lease.address.city}, ${lease.address.state}, ${lease.address.zipcode}</div>
                                            <div class="clear2">$${lease.cost_per_month}/month</div>
                                        </div>
                                    </div>
                                    <div class="placard-photo-1 left"><img src="${link}" onerror="this.src='../images/ulease.png'"> </div>
                              </div>
                          </div>`;
      html += htmlSegment;
    } else {
      localStorage.setItem("ListingID", lease.id);
    }
  });
  let container = document.getElementById("left");
  container.innerHTML = html;
}

async function getLeaseInformation(leaseID) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", `http://localhost:8000/api/sublet/${leaseID}`);
    xhr.setRequestHeader("Authorization", `Token ${Token}`);
    xhr.send();
  });
}

async function checkSaved() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      var savedLeases = [];
      var saved = this.response.saved;

      saved.forEach((lease) => {
        savedLeases.push(lease.id);
      });
      resolve(savedLeases);
      //console.log(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", "http://localhost:8000/api/saved/");
    xhr.setRequestHeader("Authorization", `Token ${Token}`);
    xhr.send();
  });
}
async function leaseInformation(leaseID) {
  let saved = await checkSaved();

  

  $("#saveToggle").show();
  $("#saveToggle1").hide();
  lease = await getLeaseInformation(leaseID);
  const BaseURL = "http://localhost:8000";
  console.log(lease);
  document.getElementById("email").onclick = function() {
    window.open(`mailto:${lease.owner}?subject=Your Lease`);
  }
  let imageHtml = "";
  let htmlSegment = "";
  if (saved.includes(lease.id)) {
    $("#saveToggle").hide();
    $("#saveToggle1").show();
  } else {
    $("#saveToggle").show();
    $("#saveToggle1").hide();
  }
  if (lease.images.length == 0) {
    imageHtml = `<div class="carousel-item active">
                            <img src="../images/ulease.png" class="d-block w-100" alt="../images/ulease.png">
                        </div>`;
  }
  for (var i = 0; i < lease.images.length; i++) {
    if (i == 0) {
      htmlSegment = `<div class="carousel-item active">
                            <img src="${
                              BaseURL + lease.images[i].image
                            }" class="d-block w-100" alt="../images/ulease.png">
                        </div>`;
    } else {
      htmlSegment = `<div class="carousel-item">
                            <img src="${
                              BaseURL + lease.images[i].image
                            }" class="d-block w-100" alt="../images/ulease.png">
                        </div>`;
    }
    imageHtml += htmlSegment;
  }
  let carousel = document.getElementById("image-carousel");
  carousel.innerHTML = imageHtml;
  let descriptionHtml = `<strong>Lease Description: </strong>${lease.description}`;
  let desHtml = document.getElementById("leaseDescription");
  desHtml.innerHTML = descriptionHtml;
  var header =
    lease.room_type +
    " Room in " +
    lease.housing_type +
    " with " +
    lease.num_roomates +
    " Roomate ";
  var leaseAddress =
    lease.address.street +
    ", " +
    lease.address.city +
    ", " +
    lease.address.state +
    ", " +
    lease.address.zipcode;
  var leaseCost = "$" + lease.cost_per_month + "/month";
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var start_day = parseInt(lease.start_lease.slice(8, 10));
  var start_month = parseInt(lease.start_lease.slice(5, 7)) - 1;
  var start_year = parseInt(lease.start_lease.slice(0, 4));
  var end_day = parseInt(lease.end_lease.slice(8, 10));
  var end_month = parseInt(lease.end_lease.slice(5, 7)) - 1;
  var end_year = parseInt(lease.end_lease.slice(0, 4));
  var start_date =
    monthNames[start_month] + " " + start_day + ", " + start_year;
  var end_date = monthNames[end_month] + " " + end_day + ", " + end_year;
  var totalDate = start_date + " to " + end_date;
  if (lease.men_allowed == true) {
    $("#men-gender").css("color", "#0d6efd");
  }
  if (lease.women_allowed == true) {
    $("#women-gender").css("color", "#0d6efd");
  }
  if (lease.nb_other_allowed == true) {
    $("#nb-gender").css("color", "#0d6efd");
  }
  if (lease.pets_allowed == true) {
    $("#leasePet").css("color", "#0d6efd");
  }
  if (lease.washer_dryer == true) {
    $("#leaseWasher").css("color", "#0d6efd");
  }
  if (lease.is_furnished == true) {
    $("#leaseFurnishe").css("color", "#0d6efd");
  }
  if (lease.pool_available == true) {
    $("#leasePool").css("color", "#0d6efd");
  }
  if (lease.free_parking == true) {
    $("#leaseParking").css("color", "#0d6efd");
  }
  if (lease.fitness_center == true) {
    $("#leaseFitness").css("color", "#0d6efd");
  }
  $("#roomate").html(header);
  $("#leaseAddress").html(leaseAddress);
  $("#leaseCost").html(leaseCost);
  $("#leaseDate").html(totalDate);
  $("#saveIcon").click(function () {
    $("#saveToggle").hide();
    $("#saveToggle1").show();
    saveLease(lease.id);
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
  });
}
function saveLease(leaseID) {
  fetch(`http://localhost:8000/api/saved/${leaseID}/add_saved/`, {
    method: "post",
    headers: new Headers({
      Authorization: `Token ${Token}`,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((parsed_result) => {
      console.log(parsed_result);
    });
}

function resetFilter() {
  location.reload();
}
var myModalEl = document.getElementById("leaseDetails");
myModalEl.addEventListener("hidden.bs.modal", function (event) {
  $("#leaseDetails .gender").css("color", "#cadfff");
  $("#leaseDetails .pets").css("color", "#cadfff");
});

renderLease();

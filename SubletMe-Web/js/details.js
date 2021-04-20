// alert("Details");
// var slider = new Slider("#ex2", {});
var Token = localStorage.getItem("Token");
function findImages(images) {
  const BaseURL = "http://localhost:8000";
  var image = "";
  if (images.length == 0) {
    return image;
  }
  for (var i = 0; i < images.length; i++) {
    if (images[i].is_primary == true) {
      image = BaseURL + images[i].image;
      console.log(image)
      return image;
    }
  }
  image = BaseURL + images[0].image;
  return image;
}

async function findLease() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(this.response);
    //   console.log(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", "http://localhost:8000/api/saved/");
    xhr.setRequestHeader('Authorization', `Token ${Token}`);
    xhr.send();
  });
}

async function renderLease() {
  let leases = await findLease();
  leases = leases.saved;
//   console.log(leases);
  let html = "";
  leases.forEach((lease) => {
    images = lease.images;
    var link = findImages(images);
    // var myLease = JSON.stringify(lease);
    var leaseID = JSON.stringify(lease.id);
    let htmlSegment = `<div class="col-lg-6 col-md-6 col-sm-12" data-bs-toggle="modal" data-bs-target="#leaseDetail">
                          <div class="placard-apt-1" onclick='leaseInformation(${leaseID})'>
                              <div class="placard-header clear">
                                  <div class="left row">
                                      <div class="col-lg-9 col-md-10">
                                          <p class="info">${lease.room_type} Room in ${lease.housing_type}</p>
                                          <p class="info right">${lease.address.street}, ${lease.address.city}, ${lease.address.state}, ${lease.address.zipcode}</p>
                                      </div>
                                      <div class="col-lg-3 col-md-2">
                                          <p class="clear2 info"><i class="fas fa-trash delete" onclick='deleteSave(${leaseID})'></i></p>
                                          <p class="clear2 info">$${lease.cost_per_month}/month</p>
                                      </div>
                                  </div>
                              </div>
                              <div class="placard-photo-1 left"><img src="${link}" onerror="this.src='../images/ulease.png'"> </div>
                        </div>
                      </div>`;
    html += htmlSegment;
    console.log(lease);
  });
  let container = document.getElementById("grid-container");
  container.innerHTML = html;
}

function deleteSave(leaseID){
  fetch(`http://localhost:8000/api/saved/${leaseID}/delete_saved/`,{
    method: 'delete',
    headers:  new Headers({
      'Authorization':  `Token ${Token}`
    })
  }).then(response => {
    return response.json();
  }).then(parsed_result => {
    location.reload();
  })

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
    xhr.setRequestHeader('Authorization', `Token ${Token}`);
    xhr.send();
  });
}


async function leaseInformation(leaseID) {
  lease = await getLeaseInformation(leaseID);
  const BaseURL = "http://localhost:8000";
  document.getElementById("email").onclick = function() {
    window.open(`mailto:${lease.owner}?subject=Your Lease`);
  }
  console.log(lease);
  let imageHtml = "";
  let htmlSegment = "";
  if (lease.images.length == 0) {
    imageHtml = `<div class="carousel-item active">
                            <img src="../images/ulease.png" class="d-block w-100" alt="../images/ulease.png">
                        </div>`;
  }
  for (var i = 0; i < lease.images.length; i++) {
    if (i == 0) {
      htmlSegment = `<div class="carousel-item active">
                            <img src="${BaseURL + lease.images[i].image}" class="d-block w-100" alt="../images/ulease.png">
                        </div>`;
    } else {
      htmlSegment = `<div class="carousel-item">
                            <img src="${BaseURL + lease.images[i].image}" class="d-block w-100" alt="../images/ulease.png">
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
  var start_month = parseInt(lease.start_lease.slice(5, 7))-1;
  var start_year = parseInt(lease.start_lease.slice(0, 4));
  var end_day = parseInt(lease.end_lease.slice(8, 10));
  var end_month = parseInt(lease.end_lease.slice(5, 7))-1;
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
}

var myModalEl = document.getElementById("leaseDetail");
myModalEl.addEventListener("hidden.bs.modal", function (event) {
  $("#leaseDetail .gender").css("color", "#cadfff");
  $("#leaseDetail .pets").css("color", "#cadfff");
});

renderLease();
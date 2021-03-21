// alert("Details");
// var slider = new Slider("#ex2", {});
function findImages(images) {
  const BaseURL = "http://localhost:8000";
  var image = "";
  if (images.length == 0) {
    return image;
  }
  for (i = 0; i < images.length; i++) {
    if (images[i].is_primary == "true") {
      image = BaseURL + lease.image[i].image;
      return image;
    }
  }
  image = BaseURL + images[0].image;
  return image;
}

async function findLease() {
  return new Promise(function (resolve, reject) {
    var Token = localStorage.getItem("Token");
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
    let htmlSegment = `<div class="col-lg-4 col-md-6 col-sm-12">
                          <div class="placard-apt-1">
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
    console.log(lease);
  });
  let container = document.getElementById("grid-container");
  container.innerHTML = html;
}

renderLease();
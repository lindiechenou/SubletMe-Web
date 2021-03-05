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

//Connection to the BackEnd
function findImages(images) {
  var image = "";
  if (images.length == 0) {
    return image;
  }
  for (i = 0; i < images.length; i++) {
    if (images[i].is_primary == "true") {
      image = lease.image[i].image;
      return image;
    }
  }
  image = images[0].image;
  return image;
}
async function findLease() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", "http://localhost:8000/api/sublet/");
    xhr.send();
  });
}

async function renderLease() {
  let leases = await findLease();
  let html = "";
  leases.forEach((lease) => {
    images = lease.images;
    console.log(images);
    var link = findImages(images);
    console.log(link);
    let htmlSegment = `<div class="placard-apt-1" onclick="click1(${lease.cost_per_month})">
                              <div class="placard-header clear">
                                  <div class="left">
                                      <div>${lease.room_type} Room in ${lease.housing_type}</div>
                                      <div class="right">${lease.address.street}, ${lease.address.city}, ${lease.address.state}, ${lease.address.zipcode}</div>
                                      <div class="clear2">$${lease.cost_per_month}/month</div>
                                  </div>
                              </div>
                              <div class="placard-photo-1 left"><img src="${link}" onerror="this.src='../images/ulease.png'"> </div>
                        </div>`;
    html += htmlSegment;
  });
  let container = document.getElementById("left");
  container.innerHTML = html;
}

function click1(cost) {
  console.log(cost);
}
renderLease();

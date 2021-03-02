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

// var addressDict = [];
// var imageDict = [];

// function findLease(url) {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = "json";
//     xhr.onload = function () {
//       resolve(this.response);
//     };
//     xhr.onerror = reject;
//     xhr.open("GET", url);
//     xhr.send();
//   });
// }

// function findAddress(url, albumID, cost) {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = "json";
//     xhr.onload = function (e) {
//       var dict = {
//         address: this.response,
//         imageUrl: albumID,
//         cost_per_month: cost,
//       };
//       addressDict.push(dict);
//       resolve(this.response);
//     };
//     xhr.onerror = reject;
//     xhr.open("GET", url);
//     xhr.send();
//   });
// }
// console.log("ajax resutl: ", addressDict);

// function findPictureLink(url, albumID) {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = "json";
//     xhr.onload = function () {
//       var dict = {
//         album: albumID,
//         imageUrl: this.response[0].image,
//       };
//       imageDict.push(dict);
//       resolve(this.response);
//     };
//     xhr.onerror = reject;
//     xhr.open("GET", url);
//     xhr.send();
//   });
// }
// console.log("ajax resutl4: ", imageDict);
// var i = 0;

// function getLease(firstCallback, secondCallback) {
//   findLease("http://localhost:8000/sublet/api/sublet").then(function (result) {
//     while (i < result.length) {
//       firstCallback(
//         result[i].address,
//         result[i].album,
//         result[i].cost_per_month
//       );
//       secondCallback(result[i].album);
//       i++;
//     }
//   });
// }
// function getAddress(addressID, albumID, cost) {
//   findAddress(
//     `http://localhost:8000/sublet/api/address/${addressID}/`,
//     albumID,
//     cost
//   );
// }
// function getImage(albumID) {
//   findPictureLink(
//     `http://localhost:8000/sublet/api/image?album=${albumID}&primary=true`,
//     albumID
//   );
// }

// getLease(getAddress, getImage);

// function greet(addressDict, imageDict) {
//   let html = "";
//   for (var x = 0; x < addressDict.length; x++) {
//     console.log(addressDict[x].address);
//     var address = addressDict[x].address;
//     var url = addressDict[x].imageUrl;
//     var cost = addressDict[x].cost_per_month;

//     for (var i = 0; i < imageDict.length; i++) {
//       if (url == imageDict[i].album) {
//         console.log(url, imageDict[i].album);
//         image = imageDict[i].imageUrl;
//         console.log(image);
//         let htmlSegment = `<div class="placard-apt-1">
//                               <div class="placard-header clear">
//                                   <div class="left">
//                                       <div>${address.street}</div>
//                                       <div>$${cost}/month</div>
//                                   </div>
//                                   <div class="right">
//                                       <div>${address.city}</div>
//                                       <div>${address.state}, ${address.zipcode}</div>
//                                   </div>

//                               </div>
//                               <div class="placard-photo-1 left"><img src="${image}"> </div>
//                           </div>`;
//         html += htmlSegment;
//       }
//     }
//   }
//   let container = document.getElementById("left");
//   container.innerHTML = html;
// }
// setTimeout(() => {
//   greet(addressDict, imageDict);
// }, 1000);

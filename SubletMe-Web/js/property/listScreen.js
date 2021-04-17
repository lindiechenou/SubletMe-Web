var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + month + "-" + day;
var future = now.getFullYear() + 1 + "-" + month + "-" + day;
document.getElementById("start").min = today;
document.getElementById("start").value = today;
document.getElementById("start").max = future;

function myFunction() {
  x = document.getElementById("start").value;
  document.getElementById("end").min = x;
  // console.log(x);
  var year1 = parseInt(x.slice(0, 4)) + 1;
  var month1 = x.slice(5, 7);
  var day1 = x.slice(8, 10);
  end = year1 + "-" + month1 + "-" + day1;
  // console.log(end);
  document.getElementById("end").max = end;
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

var leaseID = create_UUID();
var addressID = create_UUID();
// localStorage.setItem("ListingID", leaseID);
var Token = localStorage.getItem('Token');
var ownerEmail = localStorage.getItem("info");
ownerEmail = JSON.parse(ownerEmail);
ownerEmail = ownerEmail.email;
var ownerUniversity = localStorage.getItem("info");
ownerUniversity = JSON.parse(ownerUniversity);
ownerUniversity = ownerUniversity.university_choices;
var University = {
  "UOFL":"University of Louisville",
  "UK":"University of Kentucky",
  "UC":"University of Cincinnati"
}
ownerUniversity = University[ownerUniversity];
console.log(ownerUniversity);

function createLease() {
  //  console.log(document.getElementById("housing-type").value);
  console.log(images.length)
  if(images.length <3){
    errorHandling(`Please upload ${3 - images.length} more image(s)`);
    return;
  }
  var addressStreet = document.getElementById("streetName").value;
  var addressCity = document.getElementById("cityName").value;
  var addressState = document.getElementById("stateName").value;
  var addressZipcode = document.getElementById("zipcodeName").value;
  var leaseDescription = document.getElementById("story").value;
  var leaseCost = document.getElementById("monthlyRent").value;
  var leaseEnd = document.getElementById("end").value;
  if(addressStreet !="" && addressCity !="" && addressState !="" && addressZipcode !="" && leaseDescription !="" && leaseCost !="" &&  leaseEnd !=""){
    var Token = localStorage.getItem('Token');
    console.log(Token);
      fetch('http://localhost:8000/api/sublet/',{
          method: 'post',
          headers:  new Headers({
            'Content-type':  'application/json',
            'Authorization':  `Token ${Token}`
          }),
          body: JSON.stringify({
            address:  {
              city: addressCity,
              // id: addressID,
              lattitude: null,
              longitude: null,
              state: addressState,
              street: addressStreet,
              street2:  "",
              zipcode:  addressZipcode,
            },
            status: "Available",
            saved_list: [],
            images_set: [],
            description: leaseDescription,
            cost_per_month: leaseCost,
            room_type: document.getElementById("room-type").value,
            housing_type: document.getElementById("housing-type").value,
            university_choices: ownerUniversity,
            num_roomates: document.getElementById("roomates").value,
            start_lease: document.getElementById("start").value,
            end_lease: leaseEnd,
            men_allowed: document.getElementById("menAllowed").checked,
            women_allowed: document.getElementById("womenAllowed").checked,
            nb_other_allowed: document.getElementById("nbAllowed").checked,
            pets_allowed: document.getElementById("petAllowed").checked,
            washer_dryer: document.getElementById("washerDryer").checked,
            is_furnished: document.getElementById("isFurnished").checked,
            pool_available: document.getElementById("poolAvailable").checked,
            lgbt_friendly: document.getElementById("lgbtFriendly").checked,
            free_parking: document.getElementById("freeParking").checked,
            fitness_center: document.getElementById("fitnessCenter").checked,
            owner:  ownerEmail,
            // id: leaseID,
          })
        }).then(response => {
            if (response.ok) {
              return response.json();
            }
            else{
                throw new Error('Please fill out all of the field');
            }
            // return response.json();
        }).then(parsed_result => {
            console.log(parsed_result);
            localStorage.setItem("ListingID", parsed_result.id);
            createImages(parsed_result.id);
            // window.location = "property.html";

        })
        .catch((error) => {
            console.log(error)
        });
  }
  else{
    alert("Please fill out all of the field including the pictures");
  }
}
function createImages(leaseID){
  // image = document.getElementById("myfile").files || [];
  // images = document.getElementById("myfiles").files || [];
  for (var i = 0; i < images.length; i++) {
    imgID = images[i].imageID;
    isPrimary = document.getElementById(`primary${imgID}`).checked
    const formData = new FormData();
    formData.append('image', images[i].imageData);
    formData.append('sublease', leaseID);
    formData.append('is_primary', isPrimary);
    // console.log('found file ' + i + ' = ' + image[i].name);
    fetch('http://localhost:8000/api/image/', {
    method: 'POST',
    headers:  new Headers({
      'Authorization':  `Token ${Token}`
    }),
    body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  }
  window.location = "property.html";
}
function cancelLease(){
  localStorage.setItem("ListingID", "");
  window.location = "property.html";
}

function errorHandling(quote){
  document.getElementById('toastBody').innerHTML = quote;
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl){
    return new bootstrap.Toast(toastEl)
  });
  toastList.forEach(toast => toast.show());
}

images = []
const trying = {}
function readURL(er){
    if (images.length < 10){
        count = images.length;
        var imageLink;
        var file = er.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            if(trying[reader.result] ==1){
                alert("No duplicate photos")
            }
            else{
                dictionary(count, file, reader.result);
            }
        }
    }
    else{
        alert("Only allowed 10 images");
    }
}
function dictionary(id, info, link){
    image ={
        imageID: id,
        imageData: info,
        imageLink: link,
    }
    images.push(image);
    loadFunction();
}
function loadFunction(){
    console.log(images);
    totalImage = images
    let html = "";
    totalImage.forEach((image) => {
            let htmlSegment = `<div class="card" id="card${image.imageID}" style="width: 18rem;">
                                    <img src="${image.imageLink}" class="card-img-top" atl="...">
                                    <div class="card-body">
                                        <div class="check">
                                            <label class="input-group-text">
                                                <input class="form-check-input mt-0" type="checkbox" id="primary${image.imageID}">
                                                <span class="checkboxLabel">Primary Image</span>
                                            </label>
                                        </div>
                                        <a class="btn btn-primary" onclick='deleteImage(${image.imageID})'>Delete</a>
                                    </div>
                            </div>`
            html+=htmlSegment;
            trying[image.imageLink] = 1
    })
    let container = document.getElementById("grid-container");
    container.innerHTML = html;
}

function deleteImage(id){
    deleteList = []
    for(var i=0; i<images.length; i++){
        if(images[i].imageID == id){
            trying[images[i].imageLink] = 0
        }
        else{
            deleteList.push(images[i])
        }
    }
    images = deleteList;
    loadFunction();
}

document.getElementById('myfile').addEventListener('change', readURL, false);
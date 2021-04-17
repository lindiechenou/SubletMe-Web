var Token = localStorage.getItem("Token");
var leaseID = localStorage.getItem("ListingID");
var userUniversity = JSON.parse(localStorage.getItem("info"));
var addressID = ""
var ownerEmail = localStorage.getItem("info");
ownerEmail = JSON.parse(ownerEmail)
ownerEmail = ownerEmail.email;
async function getUserListing(){
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", `http://localhost:8000/api/sublet/${leaseID}/`);
    xhr.setRequestHeader('Authorization', `Token ${Token}`);
    xhr.send();
  });
}
images = [];
deleteID = [];
const trying = {};
count = 0;
async function renderLease(){
  const BaseURL = "http://localhost:8000";
  lease = await getUserListing();
  addressID = lease.address.id;
  userUniversity = userUniversity.university_choices
  console.log(lease);
  let html = "";
//   console.log(addressID);
  document.getElementById("streetName").value = lease.address.street;
  document.getElementById("cityName").value = lease.address.city;
  document.getElementById("stateName").value = lease.address.state;
  document.getElementById("zipcodeName").value = lease.address.zipcode;
  document.getElementById("monthlyRent").value = lease.cost_per_month;
  document.getElementById("room-type").value = lease.room_type;
  document.getElementById("roomates").value = lease.num_roomates;
  document.getElementById("start").value = lease.start_lease;
  document.getElementById("end").value = lease.end_lease;
  document.getElementById("menAllowed").checked = lease.men_allowed;
  document.getElementById("womenAllowed").checked = lease.women_allowed;
  document.getElementById("nbAllowed").checked = lease.nb_other_allowed;
  document.getElementById("petAllowed").checked = lease.pets_allowed;
  document.getElementById("washerDryer").checked = lease.washer_dryer;
  document.getElementById("isFurnished").checked = lease.is_furnished;
  document.getElementById("poolAvailable").checked = lease.pool_available;
  document.getElementById("lgbtFriendly").checked = lease.lgbt_friendly;
  document.getElementById("freeParking").checked = lease.free_parking;
  document.getElementById("fitnessCenter").checked = lease.fitness_center;
  document.getElementById("story").value = lease.description;
  for(var i=0; i<lease.images.length; i++)
  {
    imageLink = BaseURL + lease.images[i].image;
    dictionary(i, 0, imageLink, lease.images[i].is_primary,lease.images[i].id);
  }
  var addressID = JSON.stringify(addressID);
  let htmlSegment = `<a class="navbar-brand find" onclick='patchLease(${addressID})'>Save</a>
                    <a class="navbar-brand find" href="property.html">Cancel</a>
                    <a class="navbar-brand find find2" onclick='deleteLease(${addressID})'>Delete</a>`;
  html += htmlSegment;
  let container = document.getElementById("cancel");
  container.innerHTML = html;
}

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
                dictionary(count, file, reader.result, 0, 0);
            }
        }
    }
    else{
        alert("Only allowed 10 images");
    }
}

function dictionary(id, info, link, primary, imgID){
  // console.log(link);
  image = {
    imageID: id,
    imageData: info,
    imageLink: link,
    primary: primary,
    imageUUID: imgID,
  }
  images.push(image);
  loadFunction();
}

function loadFunction() {
  console.log(images);
  totalImage = images
    let html = "";
    totalImage.forEach((image) => {
      if(image.primary == true){
            let htmlSegment = `<div class="card" id="card${image.imageID}" style="width: 18rem;">
                                    <img src="${image.imageLink}" class="card-img-top" atl="...">
                                    <div class="card-body">
                                        <div class="check">
                                            <label class="input-group-text">
                                                <input class="form-check-input mt-0" type="checkbox" id="primary${image.imageID}" checked>
                                                <span class="checkboxLabel">Primary Image</span>
                                            </label>
                                        </div>
                                        <a class="btn btn-primary" onclick='deleteImage(${image.imageID})'>Delete</a>
                                    </div>
                            </div>`
            html+=htmlSegment;
            trying[image.imageLink] = 1
      }
      else{
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
      }
    })
    let container = document.getElementById("grid-container");
    container.innerHTML = html;
}

function deleteImage(id){
    deleteList = []
    
    for(var i=0; i<images.length; i++){
        if(images[i].imageID == id){
            trying[images[i].imageLink] = 0
            if(images[i].imageData ==0){
              deleteID.push(images[i].imageUUID)
              deleteImageAPI(images[i].imageUUID);
            }
        }
        else{
            deleteList.push(images[i])
        }
    }
    images = deleteList;
    loadFunction();
}

function deleteImageAPI(deleteID){
      fetch(`http://localhost:8000/api/image/${deleteID}/`,{
      method: 'delete',
      headers:  new Headers({
        'Authorization':  `Token ${Token}`
      })
    }).then(response => {
      // return response.json();
    }).then(parsed_result => {
      // deleteAddress(addressID);
    })
}

function patchLease(addressID){
    // console.log(addressID);
    if(images.length <3){
    errorHandling(`Please upload ${3 - images.length} more image(s)`);
    return;
  }
    console.log(leaseID);
    var addressStreet = document.getElementById("streetName").value;
    var addressCity = document.getElementById("cityName").value;
    var addressState = document.getElementById("stateName").value;
    var addressZipcode = document.getElementById("zipcodeName").value;
    var leaseDescription = document.getElementById("story").value;
    var leaseCost = document.getElementById("monthlyRent").value;
    var leaseEnd = document.getElementById("end").value;
    if(addressStreet !="" && addressCity !="" && addressState !="" && addressZipcode !="" && leaseDescription !="" && leaseCost !="" &&  leaseEnd !=""){
        fetch(`http://localhost:8000/api/sublet/${leaseID}/`,{
        method: 'patch',
        headers:  new Headers({
            'Content-type':  'application/json',
            'Authorization':  `Token ${Token}`
        }),
        body: JSON.stringify({
            description: leaseDescription,
            cost_per_month: leaseCost,
            room_type: document.getElementById("room-type").value,
            housing_type: document.getElementById("housing-type").value,
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
        })
        }).then(response => {
            if (response.ok) {
            return response.json();
            }
            else{
                throw new Error('Please fill out all of the field');
            }
        }).then(parsed_result => {
            console.log(parsed_result);
            updateAddress(addressID);
            createImages(leaseID);
        }).catch((error) => {
            console.log(error)
        });
    }
    else{
        alert("Please fill out all of the field");
    }
    
}

function errorHandling(quote){
  document.getElementById('toastBody').innerHTML = quote;
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl){
    return new bootstrap.Toast(toastEl)
  });
  toastList.forEach(toast => toast.show());
}

function createImages(leaseID){
  // image = document.getElementById("myfile").files || [];
  // images = document.getElementById("myfiles").files || [];
  for (var i = 0; i < images.length; i++) {
      if(images[i].imageUUID ==0){
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
      else{
        imgID = images[i].imageID;
        primary = document.getElementById(`primary${imgID}`).checked
        if(primary != images[i].primary){
          patchImage(leaseID, images[i].imageUUID, primary)
        }
      }
  }
  window.location = "property.html";
}

function patchImage(leaseID, imageID, primary){
  fetch(`http://localhost:8000/api/image/${imageID}/`,{
        method: 'patch',
        headers: new Headers({
            'Content-type':  'application/json',
            'Authorization':  `Token ${Token}`
        }),
        body: JSON.stringify({
            is_primary: primary,
        })
        }).then(response => {
            return response.json();
        }).then(parsed_result => {
    })
}


function updateAddress(addressID){
    console.log(addressID);
    var addressStreet = document.getElementById("streetName").value;
    var addressCity = document.getElementById("cityName").value;
    var addressState = document.getElementById("stateName").value;
    var addressZipcode = document.getElementById("zipcodeName").value;
    fetch(`http://localhost:8000/api/address/${addressID}/`,{
        method: 'patch',
        headers: new Headers({
            'Content-type':  'application/json',
            'Authorization':  `Token ${Token}`
        }),
        body: JSON.stringify({
            street: addressStreet,
            city: addressCity,
            state: addressState,
            zipcode: addressZipcode,
        })
        }).then(response => {
            return response.json();
        }).then(parsed_result => {
    })

}

function deleteLease(addressID){
    console.log(leaseID);
     console.log(addressID);
    //  deleteAddress(addressID);
    fetch(`http://localhost:8000/api/sublet/${leaseID}/`,{
    method: 'delete',
    headers:  new Headers({
      'Authorization':  `Token ${Token}`
    })
  }).then(response => {
    // return response.json();
  }).then(parsed_result => {
    deleteAddress(addressID);
  })
}

function deleteAddress(addressID){
    console.log(addressID);
    fetch(`http://localhost:8000/api/address/${addressID}/`,{
    method: 'delete',
    headers:  new Headers({
      'Authorization':  `Token ${Token}`
    })
  }).then(response => {
    // return response.json();
  }).then(parsed_result => {
    localStorage.setItem("ListingID", "");
    window.location = "property.html";
  })
}

renderLease();

document.getElementById('myfile').addEventListener('change', readURL, false);
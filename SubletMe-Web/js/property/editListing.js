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

async function renderLease(){
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
  var addressID = JSON.stringify(addressID);
  let htmlSegment = `<a class="navbar-brand find" onclick='patchLease(${addressID})'>Save</a>
                    <a class="navbar-brand find" href="property.html">Cancel</a>
                    <a class="navbar-brand find find2" onclick='deleteLease(${addressID})'>Delete</a>`;
  html += htmlSegment;
  let container = document.getElementById("cancel");
  container.innerHTML = html;
//   console.log(document.getElementById("room-type").value);
//   console.log(userUniversity.university_choices);
    // editLease(addressID);
}

function patchLease(addressID){
    // console.log(addressID);
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
            // address:  {
            // city: addressCity,
            // id: addressID,
            // lattitude: null,
            // longitude: null,
            // state: addressState,
            // street: addressStreet,
            // street2:  "",
            // zipcode:  addressZipcode,
            // },
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
            // window.location = "property.html";
        }).catch((error) => {
            console.log(error)
        });
    }
    else{
        alert("Please fill out all of the field");
    }
    
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
            // console.log(parsed_result);
            window.location = "property.html";
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

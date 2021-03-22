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
localStorage.setItem("ListingID", leaseID);
var Token = localStorage.getItem('Token');
var ownerEmail = localStorage.getItem("info");
ownerEmail = JSON.parse(ownerEmail)
ownerEmail = ownerEmail.email;

function createLease() {
  //  console.log(document.getElementById("end").value);

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
              id: addressID,
              lattitude: null,
              longitude: null,
              state: addressState,
              street: addressStreet,
              street2:  "",
              zipcode:  addressZipcode,
            },
            description: leaseDescription,
            cost_per_month: leaseCost,
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
            id: leaseID,
          })
        }).then(response => {
            if (response.ok) {
              return response.json();
            }
            else{
                throw new Error('Please fill out all of the field');
            }
            return response.json();
        }).then(parsed_result => {
            console.log(parsed_result);
            localStorage.setItem("ListingID", parsed_result.id);
            window.location = "property.html";
        })
        .catch((error) => {
            console.log(error)
        });
  }
  else{
    alert("Please fill out all of the field");
  }
}

function cancelLease(){
  localStorage.setItem("ListingID", "");
  window.location = "property.html";
}
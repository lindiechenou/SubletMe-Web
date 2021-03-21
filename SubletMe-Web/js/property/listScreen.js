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
  console.log(x);
  var year1 = parseInt(x.slice(0, 4)) + 1;
  var month1 = x.slice(5, 7);
  var day1 = x.slice(8, 10);
  end = year1 + "-" + month1 + "-" + day1;
  console.log(end);
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
var Token = localStorage.getItem('token');
var ownerEmail = localStorage.getItem("info");
ownerEmail = JSON.parse(ownerEmail)
ownerEmail = ownerEmail.email;

function createLease() {
    fetch('http://localhost:8000/api/sublet/',{
    method: 'post',
    headers:  new Headers({
      'Content-type':  'application/json',
      'Authorization':  'Token 0244c3baa6d10af7754706cfb6d88b8f801b577e'
    }),
    body: JSON.stringify({
      address:  {
        city: document.getElementById("cityName").value,
        id: addressID,
        lattitude: null,
        longitude: null,
        state: document.getElementById("stateName").value,
        street: document.getElementById("streetName").value,
        street2:  "",
        zipcode:  document.getElementById("zipcodeName").value,
      },
      description: document.getElementById("story").value,
      cost_per_month: document.getElementById("monthlyRent").value,
      num_roomates: document.getElementById("roomates").value,
      start_lease: document.getElementById("start").value,
      end_lease: document.getElementById("end").value,
      men_allowed: document.getElementById("menAllowed").value,
      women_allowed: document.getElementById("womenAllowed").value,
      nb_other_allowed: document.getElementById("nbAllowed").value,
      pets_allowed: document.getElementById("petAllowed").value,
      washer_dryer: document.getElementById("washerDryer").value,
      is_furnished: document.getElementById("isFurnished").value,
      pool_available: document.getElementById("poolAvailable").value,
      lgbt_friendly: document.getElementById("lgbtFriendly").value,
      free_parking: document.getElementById("freeParking").value,
      fitness_center: document.getElementById("fitnessCenter").value,
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
  }).then(parsed_result => {
      console.log(parsed_result);
  }).catch((error) => {
      console.log(error)
  });
}

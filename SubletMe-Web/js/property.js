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

if (localStorage.getItem("info") !=""){
    var passedJson = localStorage.getItem("info");
    passedJson = JSON.parse(passedJson)
    console.log(passedJson);
    first = passedJson.first_name;
    last = passedJson.last_name;
    fullname = first + " " + last;
    document.getElementById("userName").innerHTML = fullname;
    document.getElementById("userEmail").innerHTML = passedJson.email;
    
}
else{
    window.location.href="auth/login.html";
}

// function signOutWeb() {
//     var passedJson = localStorage.setItem("info", "");
//     console.log(passedJson);
//     // window.location.href = "/Users/lindiechenou/Desktop/Spring 2021/Software Engineering/SubletMe-Web/SubletMe-Web/html/auth/login.html";
// }
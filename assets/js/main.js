function linkState(id) {
  let current = document.getElementsByClassName("active");
  let newCurrent = document.getElementById(id);
  console.log(id);
  current[0].classList.remove("active");
  newCurrent.classList.add("active");
}

function loadHTML(page, request, updatenav) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("mainContainer").innerHTML = data;
    })
    .catch((error) => console.error(error));
  updatenav(`link-${request}`);
}

function getContent(request) {
  let contentToReturn;
  console.log(request);
  switch (request) {
    case "home":
      contentToReturn = "home.html";
      break;
    case "cv":
      contentToReturn = "cv.html";
      break;
    case "work":
      contentToReturn = "work.html";
      break;
    case "contact":
      contentToReturn = "contact.html";
      break;
  }
  loadHTML(`assets/fragments/${contentToReturn}`, request, linkState);
}


window.onload=()=>{
getContent('home')
}
// function getContent(request) {
//     let xhttp;
//     let elt = document.getElementById("mainContainer");
//     if (request) {
//         xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4) {
//                 console.log(this.status)

//                 if (this.status == 200) {
//                     elt.innerHTML = this.responseText;
//                 }

//                 if (this.status == 404) {
//                     elt.innerHTML = '<h1>Page not found</h1>';
//                 }

//             }
//         }
//         xhttp.open("GET",`assets/fragments/${request}.html`,true)
//         xhttp.send();
//         return;
//     }
// }

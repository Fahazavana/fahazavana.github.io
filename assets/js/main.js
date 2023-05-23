function typing(elt,text) {
    const n = text.length

    // Speed controller
    const delay = 200;

    let i = 0;

    setInterval(() => {
        elt.innerHTML = text.substring(0, Math.abs(i));
        i += 1;
        if (i >= n) {
            i *= -1;
        }
    }, delay)
}


function linkState(id) {
    const current = document.getElementsByClassName("active");
    const newCurrent = document.getElementById(id);
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


window.onload = () => {
    getContent('home')
    typing(document.getElementById("name"),'Jean Lucien Randrianatenaina')
}
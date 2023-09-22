window.onload = () => {
    typing(document.getElementById("name"), 'Jean Lucien Randrianatenaina')
}


function typing(elt, text) {
    const n = text.length

    // Speed controller
    const delay = 200;

    let i = 0;

    setInterval(() => {
        elt.innerHTML = text.substring(0, Math.abs(i));
        i += 1;
        if (i > n) {
            i *= -1;
        }
    }, delay)
}


window.addEventListener("scroll", function() {
    var navbar = document.querySelector("#navbar");
    if (window.pageYOffset === 0) {
        if (navbar.classList.contains("bg-dark")){
            navbar.classList.remove("bg-dark");
        }
    } else {
        if (!navbar.classList.contains("bg-dark")){
            navbar.classList.add("bg-dark");
        }
    }
  });


//   document.querySelectorAll('*').forEach(el => {
//     if (el.offsetWidth > document.documentElement.offsetWidth) {
//         el.style.backgroundColor='#f00'
//         console.log('Found the worst element ever: ', el);
//     }
//   });
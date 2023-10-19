// 
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const navMenu = document.querySelector('.menu-nav')
const menuAvatar = document.querySelector('.menu-avatar')
const navItems = document.querySelectorAll('.menu-nav-item')


// initial state
let showMenu = false

menuBtn.addEventListener('click', () => {
  if (!showMenu) {
    menuBtn.classList.add('close')
    menu.classList.add('show')
    navMenu.classList.add('show')
    menuAvatar.classList.add('show')
    navItems.forEach((item) => item.classList.add('show'))
    showMenu = true;
  }
  else {
    menuBtn.classList.remove('close')
    menu.classList.remove('show')
    navMenu.classList.remove('show')
    menuAvatar.classList.remove('show')
    navItems.forEach((item) => item.classList.remove('show'))
    showMenu = false;
  }
});




// Menu
var menuItems = document.querySelectorAll('.menu-nav-item');
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function (e) {
    e.preventDefault()
    let target = document.querySelector(this.firstElementChild.getAttribute('href'))
    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    menuItems.forEach(function (item) {
      item.classList.remove('active');
    });
    menuItem.classList.add('active');
  });
});

// Arrow scrool
function updateArrow(elt) {
  console.log(elt.classList)
  if (elt.classList.contains('bi-chevron-down')) {
    elt.classList.toggle('bi-chevron-down')
    elt.classList.toggle('bi-chevron-up')
  } else {
    elt.classList.toggle('bi-chevron-up')
    elt.classList.toggle('bi-chevron-down')
  }
}
// Timeline
const education = document.getElementById("educ");
const timeline = document.getElementsByClassName("timeline")[0];
function updateHeight() {
  timeline.style.height = education.offsetHeight + "px";
}
// Collapsible
let headers = document.getElementsByClassName("education expander");
for (let i = 0; i < headers.length; i++) {
  headers[i].addEventListener("click", function () {
    let content = this.nextElementSibling;
    updateArrow(this.children[0].firstElementChild)
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      this.style.borderRadius = "0 20px 20px 0";
    } else {
      this.style.borderRadius = " 0 20px 0px 0";
      content.style.maxHeight = content.scrollHeight + "px";
      content.addEventListener("transitionend", updateHeight);
    }
  });
}
// Initial height update
updateHeight();
//project
let col = document.getElementsByClassName("project-expander");
for (let i = 0; i < col.length; i++) {
  col[i].addEventListener("click", function () {
    let content = this.nextElementSibling;
    updateArrow(this.firstElementChild)
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


//// CONTACTME handler

const form = document.getElementById('contactform');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse'

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }

  const formData = new FormData(form);

  fetch(FORM, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
    .then(response => {
      console.log(response)
      if (response.status === 0 || response.ok) {
        alert('Sent')
        form.reset()
      } else {
        if (response.status === 403) {
          alert('Something went wrong')
        }
      }
    })
    .catch(error => {
      console.log('Form submission error:', error);
    });
});

function validateForm() {
  // Reset previous validation errors
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  messageInput.classList.remove('error');

  let isValid = true;

  // Validate name field
  if (nameInput.value.trim() === '') {
    nameInput.classList.add('error');
    isValid = false;
  }

  // Validate email field
  if (emailInput.value.trim() === '') {
    emailInput.classList.add('error');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add('error');
    isValid = false;
  }

  // Validate message field
  if (messageInput.value.trim() === '') {
    messageInput.classList.add('error');
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// Skill bar

let skills = document.getElementsByClassName('skill')
const minVal = 0,maxVal = 100;
const minCol = '#808080', maxCol = '#FFFF00';
console.log(skills)

for (let i=0; i<skills.length;i++){
  let level = parseInt(skills[i].dataset.level)
  let perc = level/100
  let bg = makeGradient(minCol,maxCol,perc) 
  console.log(bg,perc)
  skills[i].style.backgroundImage = `linear-gradient(to right,${minCol},${bg})`;
  skills[i].style.width = `${level}%`
}

function makeGradient(color1,color2,percentage){
  const color1R = parseInt(color1.substr(1, 2), 16);
  const color1G = parseInt(color1.substr(3, 2), 16);
  const color1B = parseInt(color1.substr(5, 2), 16);

  const color2R = parseInt(color2.substr(1, 2), 16);
  const color2G = parseInt(color2.substr(3, 2), 16);
  const color2B = parseInt(color2.substr(5, 2), 16);

  const interpolatedR = Math.round(color1R + (color2R - color1R) * percentage);
  const interpolatedG = Math.round(color1G + (color2G - color1G) * percentage);
  const interpolatedB = Math.round(color1B + (color2B - color1B) * percentage);

  return `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`;
}


// const findOverflows = () => {
//   const documentWidth = document.documentElement.offsetWidth;

//   document.querySelectorAll('*').forEach(element => {
//       const box = element.getBoundingClientRect();

//       if (box.left < 0 || box.right > documentWidth) {
//           console.log(element);
//           element.style.backgroundColor = 'red';
//       }
//   });
// };

// // Execute findOverflows to find overflows on the page.
// findOverflows();

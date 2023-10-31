
// theme
const body = document.getElementsByTagName('body')
let theme ='light'
darkModeSwitch.addEventListener('change', () => {
  console.log(body)
  if (theme =='dark') {
    body[0].classList.toggle('theme--default')
    body[0].classList.toggle('theme--dark')
  }
  else {
    body[0].classList.toggle('theme--dark')
    body[0].classList.toggle('theme--default')
    theme = 'dark'
  }
});







// PARTICLE

var mouseX = 0,
  mouseY = 0,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  SEPARATION = 200,
  AMOUNTX = 10,
  AMOUNTY = 10,
  camera,
  scene,
  renderer;
init();
animate();

function init() {
  var container,
    separation = 100,
    amountX = 50,
    amountY = 50,
    particle;
  container = document.getElementById('particle')
  canvas = document.getElementById('canvas')
  scene = new THREE.Scene();
  renderer = new THREE.CanvasRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(
    75,
    document.documentElement.clientWidth / document.documentElement.clientHeight,
    1,
    10000
  );
  camera.position.z = 1000;

  // particles
  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial({
    color: 0xaaaaaa,
    program: function (context) {
      context.beginPath();
      context.arc(0, 0, 1, 0, PI2, true);
      context.fill();
    }
  });

  var geometry = new THREE.Geometry();
  for (var i = 0; i < 100; i++) {
    var particle = new THREE.Sprite(material);

    var radius = 500;
    var phi = Math.acos(-1 + (2 * i) / 100);
    var theta = Math.sqrt(100 * Math.PI) * phi;

    particle.position.x = radius * Math.cos(theta) * Math.sin(phi);
    particle.position.y = radius * Math.sin(theta) * Math.sin(phi);
    particle.position.z = radius * Math.cos(phi);

    particle.scale.set(10, 10, 10);

    scene.add(particle);
    geometry.vertices.push(particle.position);
  }
  var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 }));
  scene.add(line);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);
}


function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}
function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * .05;
  camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}


// MENU 
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
const nameInput = document.getElementById('entry.111960903');
const emailInput = document.getElementById('entry.1427661846');
const messageInput = document.getElementById('entry.1225228599');
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
      console.log('Form submission error:');
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
const minVal = 0, maxVal = 100;
const minCol = '#808080', maxCol = '#FFFF00';

for (let i = 0; i < skills.length; i++) {
  let level = parseInt(skills[i].dataset.level)
  let perc = level / 100
  let bg = makeGradient(minCol, maxCol, perc)
  skills[i].style.backgroundImage = `linear-gradient(to right,${minCol},${bg})`;
  skills[i].style.width = `${level}%`
}

function makeGradient(color1, color2, percentage) {
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


// HANDLING ALL WINDOW RESIZING
function onWindowResize() {
  windowHalfX = document.documentElement.clientWidth / 2;
  windowHalfY = document.documentElement.clientHeight / 2;
  camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
  updateHeight()
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

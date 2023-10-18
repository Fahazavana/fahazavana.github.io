// 
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const navMenu = document.querySelector('.menu-nav')
const menuAvatar = document.querySelector('.menu-avatar')
const navItems = document.querySelectorAll('.menu-nav-item')


// initial state
let showMenu = false

menuBtn.addEventListener('click', ()=>{
    if (!showMenu){
        menuBtn.classList.add('close')
        menu.classList.add('show')
        navMenu.classList.add('show')
        menuAvatar.classList.add('show')
        navItems.forEach((item) => item.classList.add('show'))
        showMenu=true;
    }
    else 
    {
        menuBtn.classList.remove('close')
        menu.classList.remove('show')
        navMenu.classList.remove('show')
        menuAvatar.classList.remove('show')
        navItems.forEach((item) => item.classList.remove('show'))
        showMenu=false;
    }
});



/// collapsible

// var sections = document.querySelectorAll('.conteneur');

// console.log(sections)
// sections.forEach(function(section) {
//   var header = section.querySelector('.header');
//   var content = section.querySelector('.description');

//   header.addEventListener('click', function() {
//     if (content.style.display === 'none') {
//       content.style.display = 'block';
//       header.style.borderRadius = '10px 10px 0 0'
//     } else {
//       content.style.display = 'none';
//       header.style.borderRadius = 'initial'
//     }
//   });
// });


var headers = document.getElementsByClassName("education header");
console.log(headers)
for (let i = 0; i < headers.length; i++) {
  headers[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.style.borderRadius = '20px'
    } else {
        this.style.borderRadius = '20px 20px 0 0'
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
} 

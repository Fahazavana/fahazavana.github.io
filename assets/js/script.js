// Preloader
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(function () {
        preloader.style.display = 'none';
    }, 100);
  });

// header
const halfHeight = window.innerHeight;
window.addEventListener('scroll', ()=>{
  const menu = document.getElementById('menu') 
  if (window.scrollY > halfHeight){
    menu.classList.add("navbar-dark")
    menu.classList.add("bg-gray")

  }else{
    menu.classList.remove("navbar-dark")
    menu.classList.remove("bg-gray")


  }
})

//Skill bar
  const skillElements = document.querySelectorAll('#skill .skill-bar .skillbar');

skillElements.forEach((item)=>{
  level = item.getAttribute('data-level')
  item.firstElementChild.style.width = level
})


document.querySelectorAll('*').forEach(el => {
  if (el.offsetWidth > document.documentElement.offsetWidth) {
      el.style.backgroundColor='#f00'
      console.log('Found the worst element ever: ', el);
  }
});
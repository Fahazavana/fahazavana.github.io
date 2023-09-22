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


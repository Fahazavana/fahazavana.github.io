window.onload = () => {
    getContent('home')
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


function linkState(id) {
    const current = document.getElementsByClassName("active");
    const newCurrent = document.getElementById(id);
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



const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
let particleArray;
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.width / 100) * (canvas.height / 100)
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});


class Particle {
    constructor(x, y, dirX, dirY, size, col) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.col = col;
    }

    //drawing single particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 5, false);
        ctx.fillStyle = '#000';
        ctx.fill()
    }

    // position,  mouse pos, move particle, draw

    update() {
        // is particle in the canvas
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = - this.dirX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = - this.dirY;
        }
        // colision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > canvas - this.size * 10) {
                this.x -= 15;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.x += 10;
            }
            if (mouse.y > this.y && this.y > canvas.height - this.size * 10) {
                this.y -= 10;
            }

        }

        // over particle

        this.x += this.dirX;
        this.y += this.dirY;
        this.draw()
    }

}
// Particle array
function init() {
    particleArray = [];
    let numberOfParticle = (canvas.height * canvas.width) / 20000;
    for (let i = 0; i < numberOfParticle; i++) {
        let size = (Math.random() * 10) + 1;
        let x = Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2;
        let y = Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2;
        let dirX = Math.random() * 5 - 2.5;
        let dirY = Math.random() * 5 - 2.5;
        let color = '#ff0000';
        particleArray.push(new Particle(x, y, dirX, dirY, size, color))
    }
}

// animation

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
    }
    connect()
}

init();
animate();

function connect() {
    let opacityVal = 1
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = 0; b < particleArray.length; b++) {
            let dist = (particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x) + (particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y)
            if (dist < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = `#000`
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y)
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke()
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.width / 100) * (canvas.height / 100)
    init()
})

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})
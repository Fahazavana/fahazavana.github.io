const canvas = document.getElementById("particle");
const ctx = canvas.getContext("2d");
let particleArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.width / 100) * (canvas.height / 100),
};

window.addEventListener("mousemove", (event) => {
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

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 5, false);
        ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 15;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }
}

function init() {
    particleArray = [];
    let numberOfParticle = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticle; i++) {
        let size = Math.random() * 10 + 1;
        let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
        let dirX = Math.random() * 5 - 2.5;
        let dirY = Math.random() * 5 - 2.5;
        let color = document.documentElement.classList.contains('dark') ? '#ffffff' : '#ff0000';
        particleArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    connect();
}

function connect() {
    let opacityVal = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = 0; b < particleArray.length; b++) {
            let dist =
                (particleArray[a].x - particleArray[b].x) *
                (particleArray[a].x - particleArray[b].x) +
                (particleArray[a].y - particleArray[b].y) *
                (particleArray[a].y - particleArray[b].y);
            if (dist < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.width / 100) * (canvas.height / 100);
    init();
});

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();
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
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer({ alpha: true });
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

function onWindowResize() {
    windowHalfX = document.documentElement.clientWidth / 2;
    windowHalfY = document.documentElement.clientHeight / 2;
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
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
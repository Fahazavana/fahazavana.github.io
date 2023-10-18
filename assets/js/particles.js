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
    renderer = new THREE.CanvasRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.z = 500;

    // particles
    var PI2 = Math.PI*2;
    var material = new THREE.SpriteCanvasMaterial({
        color: 0xaaaaaa,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, 1, 0, PI2, true);
            context.fill();
        }
    });

    var geometry = new THREE.Geometry();
    // for (var i = 0; i < 80; i++) {
    //     particle = new THREE.Sprite(material);
    //     particle.position.x = Math.random() * 2 - 1;
    //     particle.position.y = Math.random() * 2 - 1;
    //     particle.position.z = Math.random() * 2 - 1;
    //     particle.position.normalize();
    //     particle.position.multiplyScalar(Math.random() * 10 + 450);
    //     particle.scale.x = particle.scale.y = 10;
    //     scene.add(particle);
    //     geometry.vertices.push(particle.position);
    // }

    for (var i = 0; i < 100; i++) {
        var particle = new THREE.Sprite(material);
    
        // Generate points on a sphere using spherical coordinates
        var radius = 500; // Adjust the radius of the sphere as desired
        var phi = Math.acos(-1 + (2 * i) / 100);
        var theta = Math.sqrt(100 * Math.PI) * phi;
    
        // Convert spherical coordinates to Cartesian coordinates
        particle.position.x = radius * Math.cos(theta) * Math.sin(phi);
        particle.position.y = radius * Math.sin(theta) * Math.sin(phi);
        particle.position.z = radius * Math.cos(phi);

    
        // Scale the particle
        particle.scale.set(10, 10, 10);
    
        // Add the particle to the scene and the geometry
        scene.add(particle);
        geometry.vertices.push(particle.position);
    }

    // lines
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 }));
    scene.add(line);
    // mousey
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);
} // end init();
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
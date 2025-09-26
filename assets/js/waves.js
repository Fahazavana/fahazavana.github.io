// Get canvas and 2D context
const canvas = document.getElementById('particle');
const ctx = canvas.getContext('2d');

// Configuration constants
const CONFIG = {
    SEPARATION: 24, // Distance between particles
    AMOUNTX: 120,  // Base number of particles in x-axis (will be responsive)
    AMOUNTY: 24,   // Base number in y-axis (will be responsive)
    PARTICLE_SIZE: 0.45, // Base size of particles
    ANIMATION_SPEED: 0.12, // Speed of wave animation
    WAVE_AMPLITUDE: 22, // Height of wave effect
    WAVE_FREQUENCY: 0.25 // Frequency of wave oscillation
};

// Camera settings for 3D projection
const camera = {
    x: 0,
    y: 150, // Camera height
    z: 200, // Camera distance from origin
    fov: 700 // Field of view for projection scaling
};

let width, height, dpr;
let particles = [];
let animationCount = 0;
let running = false;
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function shouldEnable() {
  const isSmall = window.matchMedia('(max-width: 767px)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  return !prefersReducedMotion.matches && !isSmall && !isCoarse;
}

// Initialize the canvas and particles
function init() {
    if (!shouldEnable()) {
        running = false;
        canvas.style.display = 'none';
        return;
    }
    canvas.style.display = 'block';
    resizeCanvas();
    createParticleGrid();
    startAnimation();
}

// Set canvas size to match window dimensions
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Create a grid of particles in 3D space (x,z plane, y=0 initially)
function createParticleGrid() {
    particles = [];
    // Responsive density
    const isSmall = width < 768;
    const amountX = Math.max(40, Math.floor(width / CONFIG.SEPARATION / (isSmall ? 1.2 : 0.9)));
    const amountY = isSmall ? 14 : Math.max(18, Math.floor(height / (CONFIG.SEPARATION * 2)));

    for (let ix = 0; ix < amountX; ix++) {
        for (let iz = 0; iz < amountY; iz++) {
            particles.push({
                x: ix * CONFIG.SEPARATION - (amountX * CONFIG.SEPARATION) / 2,
                y: 0,
                z: iz * CONFIG.SEPARATION - (amountY * CONFIG.SEPARATION) / 2
            });
        }
    }
}

// Handle window resize events
function onResize() {
    if (!shouldEnable()) {
        running = false;
        canvas.style.display = 'none';
        return;
    }
    if (!running) {
        // Re-enable if we crossed the threshold to desktop
        canvas.style.display = 'block';
        resizeCanvas();
        createParticleGrid();
        startAnimation();
        return;
    }
    resizeCanvas();
    createParticleGrid();
}

window.addEventListener('resize', onResize);

// Project 3D coordinates to 2D canvas using perspective projection
function project(particle) {
    const dx = particle.x - camera.x;
    const dy = particle.y - camera.y;
    const dz = particle.z - camera.z;
    const scale = camera.fov / (camera.fov + dz + 0.0001); // Avoid division by zero
    return {
        x: width / 2 + dx * scale,
        y: height / 2 - dy * scale, // Invert y for canvas coordinate system
        scale: scale
    };
}

// Animation loop
function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    render();
    animationCount += CONFIG.ANIMATION_SPEED;
}

// Render particles to canvas
function render() {
    // Clear canvas with theme-aware background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#0f172a';

    // Process each particle
    for (const particle of particles) {
        // Calculate wave height and scale
        particle.y = (Math.sin((particle.x / CONFIG.SEPARATION + animationCount) * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE +
            Math.sin((particle.z / CONFIG.SEPARATION + animationCount) * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE);
        const baseScale = (Math.sin((particle.x / CONFIG.SEPARATION + animationCount) * 0.3) + 2) * 0.5 +
            (Math.sin((particle.z / CONFIG.SEPARATION + animationCount) * 0.5) + 1) * 0.5;

        // Project to 2D space
        const projected = project(particle);

        // Calculate final particle size
        const radius = CONFIG.PARTICLE_SIZE * baseScale * projected.scale;

        // Draw particle if in front of camera
        if (projected.scale > 0) {
            ctx.beginPath();
            ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Start the animation
function startAnimation() {
    if (!shouldEnable()) {
        running = false;
        return;
    }
    running = true;
    animate();
}

// Initialize everything
init();

// Pause animation when tab is hidden to save battery/CPU
document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
});

// React to reduced motion preference changes
prefersReducedMotion.addEventListener('change', () => {
    startAnimation();
});

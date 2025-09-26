// Get canvas and 2D context
const canvas = document.getElementById('particle');
const ctx = canvas.getContext('2d');

// Configuration constants
const CONFIG = {
    SEPARATION: 20, // Distance between particles
    AMOUNTX: 500,  // Number of particles in x-axis
    AMOUNTY: 30,   // Number of particles in z-axis
    PARTICLE_SIZE: 0.35, // Base size of particles
    ANIMATION_SPEED: 0.15, // Speed of wave animation
    WAVE_AMPLITUDE: 25, // Height of wave effect
    WAVE_FREQUENCY: 0.25 // Frequency of wave oscillation
};

// Camera settings for 3D projection
const camera = {
    x: 0,
    y: 150, // Camera height
    z: 200, // Camera distance from origin
    fov: 700 // Field of view for projection scaling
};

let width, height;
let particles = [];
let animationCount = 0;

// Initialize the canvas and particles
function init() {
    resizeCanvas();
    createParticleGrid();
    startAnimation();
}

// Set canvas size to match window dimensions
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// Create a grid of particles in 3D space (x,z plane, y=0 initially)
function createParticleGrid() {
    particles = [];
    for (let ix = 0; ix < CONFIG.AMOUNTX; ix++) {
        for (let iz = 0; iz < CONFIG.AMOUNTY; iz++) {
            particles.push({
                x: ix * CONFIG.SEPARATION - (CONFIG.AMOUNTX * CONFIG.SEPARATION) / 2,
                y: 0,
                z: iz * CONFIG.SEPARATION - (CONFIG.AMOUNTY * CONFIG.SEPARATION) / 2
            });
        }
    }
}

// Handle window resize events
window.addEventListener('resize', resizeCanvas);

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
    requestAnimationFrame(animate);
    render();
    animationCount += CONFIG.ANIMATION_SPEED;
}

// Render particles to canvas
function render() {
    // Clear canvas with theme-aware background
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#101828' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#f9fafb' : '#101828';

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
    animate();
}

// Initialize everything
init();
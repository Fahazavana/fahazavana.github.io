(function () {
  const canvas = document.getElementById("particle");
  const ctx = canvas ? canvas.getContext("2d") : null;

  if (!canvas || !ctx) {
    return;
  }

  const CONFIG = {
    SEPARATION: 24,
    PARTICLE_SIZE: 0.45,
    ANIMATION_SPEED: 0.12,
    WAVE_AMPLITUDE: 22,
    WAVE_FREQUENCY: 0.25,
  };

  const camera = {
    x: 0,
    y: 150,
    z: 200,
    fov: 700,
  };

  let width;
  let height;
  let dpr;
  let particles = [];
  let animationCount = 0;
  let running = false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const shouldEnable = () => {
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    return !prefersReducedMotion.matches && !isSmall && !isCoarse;
  };

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticleGrid = () => {
    particles = [];
    const isSmall = width < 768;
    const amountX = Math.max(40, Math.floor(width / CONFIG.SEPARATION / (isSmall ? 1.2 : 0.9)));
    const amountY = isSmall ? 14 : Math.max(18, Math.floor(height / (CONFIG.SEPARATION * 2)));

    for (let ix = 0; ix < amountX; ix += 1) {
      for (let iz = 0; iz < amountY; iz += 1) {
        particles.push({
          x: ix * CONFIG.SEPARATION - (amountX * CONFIG.SEPARATION) / 2,
          y: 0,
          z: iz * CONFIG.SEPARATION - (amountY * CONFIG.SEPARATION) / 2,
        });
      }
    }
  };

  const project = (particle) => {
    const dx = particle.x - camera.x;
    const dy = particle.y - camera.y;
    const dz = particle.z - camera.z;
    const scale = camera.fov / (camera.fov + dz + 0.0001);

    return {
      x: width / 2 + dx * scale,
      y: height / 2 - dy * scale,
      scale,
    };
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();

    particles.forEach((particle) => {
      particle.y =
        Math.sin((particle.x / CONFIG.SEPARATION + animationCount) * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE +
        Math.sin((particle.z / CONFIG.SEPARATION + animationCount) * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE;

      const baseScale =
        (Math.sin((particle.x / CONFIG.SEPARATION + animationCount) * 0.3) + 2) * 0.5 +
        (Math.sin((particle.z / CONFIG.SEPARATION + animationCount) * 0.5) + 1) * 0.5;

      const projected = project(particle);
      const radius = CONFIG.PARTICLE_SIZE * baseScale * projected.scale;

      if (projected.scale > 0) {
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  const animate = () => {
    if (!running) {
      return;
    }

    requestAnimationFrame(animate);
    render();
    animationCount += CONFIG.ANIMATION_SPEED;
  };

  const startAnimation = () => {
    if (!shouldEnable()) {
      running = false;
      canvas.style.display = "none";
      return;
    }

    running = true;
    canvas.style.display = "block";
    animate();
  };

  const init = () => {
    if (!shouldEnable()) {
      running = false;
      canvas.style.display = "none";
      return;
    }

    resizeCanvas();
    createParticleGrid();
    startAnimation();
  };

  const onResize = () => {
    if (!shouldEnable()) {
      running = false;
      canvas.style.display = "none";
      return;
    }

    resizeCanvas();
    createParticleGrid();

    if (!running) {
      startAnimation();
    }
  };

  window.addEventListener("resize", onResize);
  prefersReducedMotion.addEventListener("change", init);

  init();
})();

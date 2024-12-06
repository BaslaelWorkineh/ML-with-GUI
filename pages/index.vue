<template>
  <div class="bg-gray-900 text-white">
    <!-- Hero Section -->
    <section class="hero bg-cover bg-center h-screen flex items-center justify-center relative">
      <!-- Grid Background -->
      <div class="absolute inset-0 bg-cross-lines"></div>

      <!-- Canvas for moving lights -->
      <canvas id="lightTrails" class="absolute inset-0"></canvas>

      <!-- Content Overlay -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl lg:text-7xl font-bold leading-tight text-white">Join the Future of Technology</h1>
        <p class="mt-4 text-lg lg:text-xl text-gray-300">Innovative solutions for every organization.</p>
        <div class="mt-6 flex flex-wrap gap-4 justify-center">
  <button 
    @click="goToDocs" 
    class="bg-teal-600 hover:bg-teal-700 py-3 px-6 rounded-lg text-lg w-full sm:w-auto text-center"
  >
    Docs
  </button>
  <button 
    @click="goToPricing" 
    class="bg-transparent border-2 border-white py-3 px-6 rounded-lg text-lg hover:bg-white hover:text-gray-900 w-full sm:w-auto text-center"
  >
    Pricing
  </button>
  <button 
    @click="goToTrainMl" 
    class="bg-teal-600 hover:bg-teal-700 py-3 px-6 rounded-lg text-lg w-full sm:w-auto text-center"
  >
    Get Started
  </button>
</div>

        
      </div>
    </section>
  </div>
</template>

<script setup>
onMounted(() => {
  const canvas = document.getElementById('lightTrails');
  const ctx = canvas.getContext('2d');
  const GRID_SIZE = 40; // Match the grid size from CSS

  // Set canvas size
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // Light particle class
  class LightParticle {
    constructor() {
      this.reset();
      this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      this.trail = [];
      this.trailLength = 20;
      this.direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    }

    reset() {
      // Snap to grid
      this.x = Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE;
      this.y = Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE;
      this.speed = 2;
      this.direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      // Set movement direction along grid
      if (this.direction === 'horizontal') {
        this.dx = Math.random() < 0.5 ? this.speed : -this.speed;
        this.dy = 0;
      } else {
        this.dx = 0;
        this.dy = Math.random() < 0.5 ? this.speed : -this.speed;
      }
    }

    update() {
      // Store current position in trail
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }

      // Move particle
      this.x += this.dx;
      this.y += this.dy;

      // Random direction change at grid intersections
      if (this.x % GRID_SIZE === 0 && this.y % GRID_SIZE === 0) {
        if (Math.random() < 0.3) { // 30% chance to change direction
          if (this.direction === 'horizontal') {
            this.direction = 'vertical';
            this.dx = 0;
            this.dy = Math.random() < 0.5 ? this.speed : -this.speed;
          } else {
            this.direction = 'horizontal';
            this.dx = Math.random() < 0.5 ? this.speed : -this.speed;
            this.dy = 0;
          }
        }
      }

      // Wrap around screen
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;

      for (let i = 0; i < this.trail.length; i++) {
        const alpha = i / this.trail.length;
        ctx.globalAlpha = alpha;
        if (i === 0) {
          ctx.moveTo(this.trail[i].x, this.trail[i].y);
        } else {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Create particles
  const particles = Array(15).fill().map(() => new LightParticle());

  // Animation loop
  function animate() {
    ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
});

import { useRouter } from 'vue-router';
const router = useRouter();

const goToPricing = () => {
  router.push('/pricing');
};

const goToTrainMl = () => {
  router.push('/trainml');
};

const goToDocs = () => {
  router.push('/docs');
}
</script>

<style scoped>
.bg-cross-lines {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.hero {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#lightTrails {
  pointer-events: none;
  z-index: 1;
}
</style>
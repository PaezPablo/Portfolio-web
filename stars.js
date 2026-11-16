'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  if (canvas && ctx) {
    const stars = [];
    const STAR_COUNT = 150;
    let animationId;
    let lastTime = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.8 + 0.3,
          speed: Math.random() * 0.35 + 0.08,
          color: Math.random() > 0.88 ? '#97ce4c' : '#ffffff',
          alpha: Math.random() * 0.65 + 0.25
        });
      }
    }

    function drawStars(timestamp) {
      const delta = lastTime ? Math.min((timestamp - lastTime) / 16.67, 2) : 1;
      lastTime = timestamp;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed * delta;
        if (star.y > window.innerHeight + 3) {
          star.y = -3;
          star.x = Math.random() * window.innerWidth;
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    animationId = requestAnimationFrame(drawStars);

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      lastTime = 0;
      resizeCanvas();
      animationId = requestAnimationFrame(drawStars);
    });
  }

  // Efecto de escritura
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const text = 'Pablo Páez';
    let index = 0;

    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        window.setTimeout(type, 150);
      }
    }

    type();
  }

  // Portal interactivo
  const portal = document.querySelector('.portal');
  const destinations = [
    'https://paezpablo.github.io/Proyectos-JS/01-Tinder-Swipe/',
    'https://paezpablo.github.io/Proyectos-JS/07-BlackJack/'
  ];

  if (portal) {
    const activatePortal = () => {
      if (portal.classList.contains('portal-active')) return;
      portal.classList.add('portal-active');

      window.setTimeout(() => {
        const destination = destinations[Math.floor(Math.random() * destinations.length)];
        window.open(destination, '_blank', 'noopener,noreferrer');
        portal.classList.remove('portal-active');
      }, 400);
    };

    portal.addEventListener('click', activatePortal);
    portal.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activatePortal();
      }
    });
  }
});

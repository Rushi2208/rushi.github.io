// Click Effect with Particles
class ClickEffect {
  constructor() {
    this.particles = [];
    this.lastTime = performance.now();
    this.deltaTime = 0;
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(this.canvas);
    
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Start animation loop
    this.animate();
    
    // Add click listener
    document.addEventListener('click', (e) => this.createBurst(e.clientX, e.clientY));
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createBurst(x, y) {
    // Create particle burst on click
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 4 + Math.random() * 2;
      this.particles.push({
        x,
        y,
        size: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity,
        life: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
      });
    }
  }
  
  updateParticles() {
    this.particles = this.particles.filter(p => p.life > 0);
    
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedX *= 0.98; // Add friction
      p.speedY *= 0.98;
      p.life -= this.deltaTime * 0.001;
      p.size *= 0.95;
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
    });
  }
  
  animate() {
    const currentTime = performance.now();
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (this.particles.length > 0) {
      this.updateParticles();
      this.drawParticles();
    }
    requestAnimationFrame(() => this.animate());
  }
}

const clickEffect = new ClickEffect();

// Smooth scroll with custom easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    }
  });
});

// Enhanced reveal animation on scroll
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px'
};

const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate children with delay
      const elements = entry.target.querySelectorAll('.card, .tech-tag, .btn, img');
      elements.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        el.classList.add('animate-in');
      });
      
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// Enhanced mobile nav with animations
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('active');
    
    // Animate links with delay
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, i) => {
      if (navLinks.classList.contains('show')) {
        link.style.animationDelay = `${i * 0.1}s`;
        link.classList.add('slide-in');
      } else {
        link.style.animationDelay = '0s';
        link.classList.remove('slide-in');
      }
    });
  });
}

// Circuit board animation on hover
document.body.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.body.style.setProperty('--mouse-x', mouseX);
  document.body.style.setProperty('--mouse-y', mouseY);
  
  const circuitPattern = document.body.querySelector('.circuit-pattern');
  if (circuitPattern) {
    circuitPattern.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// Contact form handling (Formspree placeholder)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // Replace the URL below with your Formspree endpoint (e.g. https://formspree.io/f/yourId)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

    try {
      statusEl.textContent = 'Sending…';
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Message sent — thank you!';
        statusEl.classList.remove('error');
        statusEl.classList.add('success');
      } else {
        const json = await res.json();
        statusEl.textContent = (json && json.error) ? json.error : 'There was a problem sending your message.';
        statusEl.classList.add('error');
      }
    } catch (err) {
      statusEl.textContent = 'Network error — try again later.';
      statusEl.classList.add('error');
    }
  });
}

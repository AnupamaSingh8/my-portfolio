/* ==========================================================================
   ANUPAMA SINGH - PORTFOLIO INTERACTIVITY (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 2. Typing Text Effect
  // ==========================================================================
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'B.Tech CS & AI Student',
      'Python Programmer',
      'Badminton Player',
      'Tech Enthusiast',
      'Basketball Learner',
      'Curious Ambivert'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1600; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before typing new word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ==========================================================================
  // 3. Theme Toggle (Dark & Light Mode)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // ==========================================================================
  // 4. Navbar Scroll State & Active Section Link
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Navbar background blur/solid on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active nav link based on scroll position
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top button click
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 5. Mobile Navigation Drawer
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ==========================================================================
  // 6. Project Filter Tabs
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================================================
  // 7. Interactive Ambient Background Canvas (Floating Dust / Stars)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================================================
  // 8. Contact Form Handling & Validation
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      } else {
        nameError.textContent = '';
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      } else {
        subjectError.textContent = '';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write a message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters long.';
        isValid = false;
      } else {
        messageError.textContent = '';
      }

      if (!isValid) return;

      // Submit feedback simulation
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `🎉 Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been sent successfully. I will get back to you soon!`;
        formStatus.style.display = 'block';

        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 7000);
      }, 1200);
    });

    // Clear individual errors on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const errorSpan = document.getElementById(`${input.id}-error`);
          if (errorSpan) errorSpan.textContent = '';
        });
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // --- Sticky Header Scroll effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's a stats box, trigger count animation
        if (entry.target.classList.contains('stat-box')) {
          startCounter(entry.target);
        }
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Timeline Progress Tracker & Item Activator ---
  const timeline = document.querySelector('.timeline-wrapper');
  const timelineLine = document.querySelector('.timeline-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function updateTimelineProgress() {
    if (!timeline || !timelineLine) return;
    
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the timeline is scrolled past the middle of the screen
    const triggerPoint = windowHeight / 1.4;
    const timelineStart = rect.top + window.scrollY;
    const timelineHeight = rect.height;
    
    const scrollPosition = window.scrollY + triggerPoint;
    const relativeScroll = scrollPosition - timelineStart;
    
    let percentage = (relativeScroll / timelineHeight) * 100;
    percentage = Math.max(0, Math.min(percentage, 100));
    
    timelineLine.style.height = `${percentage}%`;

    // Activate items that have been passed
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top + window.scrollY;
      if (scrollPosition > itemTop) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateTimelineProgress);
  window.addEventListener('resize', updateTimelineProgress);
  updateTimelineProgress(); // Initial check

  // --- Counter Animations for Statistics ---
  function startCounter(statBox) {
    const numEl = statBox.querySelector('.stat-number');
    if (!numEl || numEl.dataset.started) return;
    numEl.dataset.started = 'true';

    const targetVal = parseFloat(numEl.dataset.target);
    const suffix = numEl.dataset.suffix || '';
    const isFloat = numEl.dataset.float === 'true';
    const duration = 2000; // 2 seconds animation
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      let currentVal = progress * targetVal;
      if (isFloat) {
        numEl.innerHTML = currentVal.toFixed(1) + suffix;
      } else {
        numEl.innerHTML = Math.floor(currentVal).toLocaleString() + suffix;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (isFloat) {
          numEl.innerHTML = targetVal.toFixed(1) + suffix;
        } else {
          numEl.innerHTML = targetVal.toLocaleString() + suffix;
        }
      }
    };

    window.requestAnimationFrame(step);
  }

  // --- Product Filter logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          // Force reflow and re-trigger simple CSS opacity animation
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

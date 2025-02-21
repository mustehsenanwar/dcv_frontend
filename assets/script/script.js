document.addEventListener('DOMContentLoaded', () => {
  // HANDLE MENU
  const navElement = document.querySelector('#nav');
  const menu = document.querySelector('.btn-menu');
  menu.addEventListener('click', () => {
    navElement.classList.toggle('active');
  });

  // NAVLINKS
  const navlinks = document.querySelectorAll('header nav a');
  navlinks.forEach((link) => {
    link.addEventListener('click', function () {
      navlinks.forEach((nav) => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // HANDLE SCROLL - Adjust header on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Adjust the threshold as needed
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // COUNTER ANIMATION
  const counters = document.querySelectorAll('#home .card h3');
  let hasAnimatedCounters = false; // Ensure the animation runs only once

  // Animate a single counter from 0 to target value
  function animateCounter(element, target, suffix, duration = 2000) {
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const current = Math.min(Math.floor((progress / duration) * target), target);
      element.textContent = current + suffix;
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Animate all counters by extracting numbers and suffixes from text
  function animateCounters() {
    if (hasAnimatedCounters) return;
    counters.forEach(counter => {
      const text = counter.textContent.trim();
      // Capture the digits and the following characters (e.g., "+" or "%")
      const match = text.match(/^(\d+)(.*)$/);
      if (match) {
        const target = parseInt(match[1], 10);
        const suffix = match[2] || '';
        animateCounter(counter, target, suffix);
      }
    });
    hasAnimatedCounters = true;
  }

  // Use Intersection Observer to trigger the animation when the card section is in view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        // Unobserve after triggering so it runs only once
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Observe the card-wrapper to trigger the counter animation when it's in view
  const cardWrapper = document.querySelector('#home .card-wrapper');
  if (cardWrapper) {
    observer.observe(cardWrapper);
  }
});

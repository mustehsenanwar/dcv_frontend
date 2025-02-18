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
});

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

  // HEADER SCROLL EFFECT
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // HANDLE PAYMENT OPTION
  // HANDLE PAYMENT OPTION
  const btnChangePayment = document.getElementById('togglePaymentBtn');
  const textBankTransfer = document.querySelector('#togglePaymentBtn .bank-transfer');
  const textViaDebit = document.querySelector('#togglePaymentBtn .via-debit');
  const cardInputGroup = document.getElementById('cardPayment');
  const transferInfo = document.getElementById('bankTransfer');

  btnChangePayment.addEventListener('click', (e) => {
    e.preventDefault();
    const isBTActive = textBankTransfer.classList.contains('active');

    if (isBTActive) {
      // Switch from Card Payment to Bank Transfer
      textBankTransfer.classList.remove('active');
      cardInputGroup.classList.remove('active');

      textViaDebit.classList.add('active');
      transferInfo.classList.add('active');
    } else {
      // Switch from Bank Transfer to Card Payment
      textViaDebit.classList.remove('active');
      transferInfo.classList.remove('active');

      textBankTransfer.classList.add('active');
      cardInputGroup.classList.add('active');
    }
  });

  // FILE UPLOAD
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const uploadProgressContainer = document.getElementById('uploadProgressContainer');
    const progressBar = document.querySelector('#place-order .progres');
    const percentageElement = document.querySelector('#place-order .persentage');

    if (file) {
      uploadProgressContainer.classList.add('active');

      const fileNameElement = uploadProgressContainer.querySelector('.top-content p');
      const fileSizeElement = uploadProgressContainer.querySelector('.size');

      fileNameElement.textContent = file.name;
      fileSizeElement.textContent = `${(file.size / 1024).toFixed()} KB`;

      let width = 0;
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
        } else {
          width += 1;
          progressBar.style.width = `${width}%`;
          percentageElement.textContent = `${width}%`;
        }
      }, 20);
    } else {
      uploadProgressContainer.classList.remove('active');
    }
  });

  // COUNTER ANIMATION (unchanged)
  const counters = document.querySelectorAll('#home .card h3');
  let hasAnimatedCounters = false;

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

  function animateCounters() {
    if (hasAnimatedCounters) return;
    counters.forEach((counter) => {
      const text = counter.textContent.trim();
      const match = text.match(/^(\d+)(.*)$/);
      if (match) {
        const target = parseInt(match[1], 10);
        const suffix = match[2] || '';
        animateCounter(counter, target, suffix);
      }
    });
    hasAnimatedCounters = true;
  }

  const cardWrapper = document.querySelector('#home .card-wrapper');
  if (cardWrapper) {
    const countersObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countersObserver.observe(cardWrapper);
  }

  // WHATSAPP ICON + CHAT POPUP
  const whatsappIcon = document.getElementById('whatsappIcon');
  const chatPopup = document.getElementById('whatsappChatPopup');
  const closeChatBtn = document.getElementById('closeChatBtn');

  // Function to check if the user is on a mobile device or tablet
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  if (whatsappIcon && chatPopup && closeChatBtn) {
    // Toggle chat popup or redirect based on device type
    whatsappIcon.addEventListener('click', () => {
      if (isMobileDevice()) {
        // If mobile, open WhatsApp directly
        window.location.href = 'https://api.whatsapp.com/send?phone=+971524576221&text=Hello%2C%20I%27m%20interested%20in%20your%20CV%20writing%20services.%20Could%20you%20share%20more%20details%3F';
      } else {
        // If desktop, show popup
        chatPopup.classList.toggle('active');
      }
    });

    // Close chat on "X" click
    closeChatBtn.addEventListener('click', () => {
      chatPopup.classList.remove('active');
    });
  }


  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const textToCopy = document.getElementById(targetId).textContent.trim();
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy';
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    });
  });
});

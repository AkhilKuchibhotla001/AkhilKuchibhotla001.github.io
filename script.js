document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Menu ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fas fa-xmark';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Close mobile menu on clicking any navigation link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
  });


  // --- Dynamic Typing Text Animation ---
  const typedSpan = document.getElementById('typed-text');
  const occupations = [
    "Artificial Intelligence Undergrad",
    "Machine Learning Researcher",
    "Full-Stack Software Engineer",
    "Data-Driven Problem Solver"
  ];
  let occupationIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentOccupation = occupations[occupationIndex];
    
    if (isDeleting) {
      typedSpan.textContent = currentOccupation.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      typedSpan.textContent = currentOccupation.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // standard typing speed
    }

    if (!isDeleting && charIndex === currentOccupation.length) {
      typingSpeed = 2000; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      occupationIndex = (occupationIndex + 1) % occupations.length;
      typingSpeed = 500; // brief pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  // --- Skills Section Tab Switching ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and active content panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate current button and matching pane
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });


  // --- Projects Filter System ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active filter button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.85)';
        }
      });
    });
  });


  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      return;
    }

    // Set submit button to loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    // Simulate network submission delay
    setTimeout(() => {
      // Restore submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;

      // Show mock success message
      formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      formStatus.className = 'form-status-message success';

      // Open mailto fallback to provide real functionality
      const mailtoLink = `mailto:kuchibhotla.akhil2006@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;
      window.location.href = mailtoLink;

      // Clear the inputs
      contactForm.reset();

      // Clear status after 8 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status-message';
      }, 8000);

    }, 1500);
  });

});

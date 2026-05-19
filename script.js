(function() {
    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    // --- Smooth scroll + active menu highlighting ---
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, .hero');

    function setActiveLink() {
      let current = '';
      const scrollPos = window.scrollY + 120; // offset for sticky header

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      // special case for hero id="home"
      if (!current && window.scrollY < 200) current = 'home';

      navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
          link.classList.add('active');
        }
      });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return;
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile menu after click
          if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        }
      });
    });

    window.addEventListener('scroll', () => {
      setActiveLink();
      // scroll reveal (fade-up)
      revealElements();
    });
    window.addEventListener('load', () => {
      setActiveLink();
      revealElements();
    });

    // --- scroll reveal animation (intersection observer style fallback but efficient)
    function revealElements() {
      const faders = document.querySelectorAll('.fade-up');
      faders.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
          el.classList.add('revealed');
        }
      });
    }
    // initial trigger
    setTimeout(revealElements, 100);

    // --- Lightbox functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function openLightbox(imgSrc) {
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightboxFn() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
      const imgElement = item.querySelector('img');
      const highRes = item.getAttribute('data-img') || imgElement.src;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(highRes);
      });
    });
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightboxFn();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightboxFn();
    });

    // --- Form validation (basic JS) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const msgError = document.getElementById('msgError');

        nameError.textContent = '';
        emailError.textContent = '';
        msgError.textContent = '';

        if (name === '') {
          nameError.textContent = 'Name is required.';
          isValid = false;
        } else if (name.length < 2) {
          nameError.textContent = 'Enter a valid name.';
          isValid = false;
        }

        const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (email === '') {
          emailError.textContent = 'Email address is required.';
          isValid = false;
        } else if (!emailPattern.test(email)) {
          emailError.textContent = 'Please enter a valid email (e.g., name@domain.com).';
          isValid = false;
        }

        if (message === '') {
          msgError.textContent = 'Message cannot be empty.';
          isValid = false;
        } else if (message.length < 5) {
          msgError.textContent = 'Message must be at least 5 characters.';
          isValid = false;
        }

        if (isValid) {
          alert(`✨ Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
          contactForm.reset();
        } else {
          // optional gentle highlight
        }
      });
    }

    // Additional micro fix: on window load ensure gallery images load safe, reveal active link
    window.addEventListener('load', () => {
      revealElements();
      // extra for hero fadeup
      document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('revealed'));
    });

  })();
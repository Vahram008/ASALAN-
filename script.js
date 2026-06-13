(function () {
  const menuToggle = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  const navItems = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section, .hero");

  function setActiveLink() {
    let current = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    if (!current && window.scrollY < 200) {
      current = "home";
    }

    navItems.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href").substring(1);

      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);

      if (!targetId) return;

      const targetElem = document.getElementById(targetId);

      if (targetElem) {
        e.preventDefault();

        targetElem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      }
    });
  });

  function revealElements() {
    const faders = document.querySelectorAll(".fade-up");

    faders.forEach((el) => {
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight - 100) {
        el.classList.add("revealed");
      }
    });
  }

  window.addEventListener("scroll", () => {
    setActiveLink();
    revealElements();
  });

  window.addEventListener("load", () => {
    setActiveLink();
    revealElements();

    document
      .querySelectorAll(".hero .fade-up")
      .forEach((el) => el.classList.add("revealed"));
  });

  setTimeout(revealElements, 100);
})();

emailjs.init("7x583ukgT3iyl6esS");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let anun = document.getElementById("name").value.trim();
  let userMail = document.getElementById("email").value.trim();
  let namak = document.getElementById("message").value.trim();

  if (anun === "") {
    alert(translations[getLanguage()]["alert-name"]);
    return;
  }

  if (userMail === "") {
    alert(translations[getLanguage()]["alert-email"]);
    return;
  }

  if (namak === "") {
    alert(translations[getLanguage()]["alert-message"]);
    return;
  }

  emailjs
    .send("service_qp46zms", "template_z6odbb4", {
      from_name: anun,
      user_email: userMail,
      message: namak,
    })
    .then(() => {
      alert(translations[getLanguage()]["alert-success"]);
      contactForm.reset();
    })
    .catch((error) => {
      console.error(error);
      alert(translations[getLanguage()]["alert-error"]);
    });
});
let kochak = document.getElementById("kochak");
kochak.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
  });
});
const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
  window.location.reload();
  console.log("aaaaaa");
});

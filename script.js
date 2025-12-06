/* ---------------------------------------------------------
   SCROLL PROGRESS BAR
--------------------------------------------------------- */
window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrolled = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.getElementById("scrollProgress").style.width = scrolled + "%";
});

/* ---------------------------------------------------------
   BACK TO TOP BUTTON
--------------------------------------------------------- */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------
   REVEAL ON SCROLL
--------------------------------------------------------- */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

/* ---------------------------------------------------------
   MOBILE NAVIGATION
--------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

/* ---------------------------------------------------------
   STATS COUNTER (Years, Clients, Projects)
--------------------------------------------------------- */
const statNumbers = document.querySelectorAll(".stat-number");
let counterStarted = false;

function animateCounters() {
  if (counterStarted) return;

  const statsSection = document.querySelector(".stats-section");
  const rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    counterStarted = true;

    statNumbers.forEach((num) => {
      const target = parseInt(num.getAttribute("data-target"), 10) || 0;
      let count = 0;
      const increment = Math.max(1, Math.ceil(target / 100));

      const updateCounter = () => {
        count += increment;
        if (count > target) count = target;
        num.textContent = count;

        if (count < target) {
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", animateCounters);
animateCounters();

/* ---------------------------------------------------------
   CONTACT FORM + EMAILJS + MODAL
--------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const successModal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

function openModal() {
  successModal.classList.add("show");
}

function closeModal() {
  successModal.classList.remove("show");
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalOk) modalOk.addEventListener("click", closeModal);
if (successModal) {
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) closeModal();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#555";

    const params = {
      name: document.getElementById("name").value,
      company: document.getElementById("company").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      date: new Date().toLocaleString()
    };

    emailjs
      .send("service_584ng44", "template_i0ps02s", params)
      .then(() => {
        formStatus.textContent = "";
        contactForm.reset();
        openModal();
      })
      .catch(() => {
        formStatus.textContent = "✗ Something went wrong. Please try again.";
        formStatus.style.color = "red";
      });
  });
}

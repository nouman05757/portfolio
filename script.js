// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active")

  // Animate hamburger menu
  const hamburgers = mobileMenuBtn.querySelectorAll(".hamburger")
  hamburgers.forEach((hamburger, index) => {
    if (mobileNav.classList.contains("active")) {
      if (index === 0) hamburger.style.transform = "rotate(45deg) translate(5px, 5px)"
      if (index === 1) hamburger.style.opacity = "0"
      if (index === 2) hamburger.style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      hamburger.style.transform = "none"
      hamburger.style.opacity = "1"
    }
  })
})

// Smooth Scrolling Function
function scrollToSection(selector) {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
  // Close mobile menu if open
  mobileNav.classList.remove("active")
  const hamburgers = mobileMenuBtn.querySelectorAll(".hamburger")
  hamburgers.forEach((hamburger) => {
    hamburger.style.transform = "none"
    hamburger.style.opacity = "1"
  })
}

// Add click event listeners to all navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const href = link.getAttribute("href")
    scrollToSection(href)
  })
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up")

      // Animate skill bars when skills section is visible
      if (entry.target.id === "skills") {
        animateSkillBars()
      }
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width")
      bar.style.width = width + "%"
    }, index * 100)
  })
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  // Simulate form submission
  console.log("Form submitted:", data)

  // Show success message
  alert("Thank you for your message! I'll get back to you soon.")

  // Reset form
  contactForm.reset()
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Add loading animation to page
window.addEventListener("load", () => {
  // Add initial animations
  const heroText = document.querySelector(".hero-text")
  const heroImage = document.querySelector(".hero-image")

  if (heroText) heroText.classList.add("animate-slide-in-left")
  if (heroImage) heroImage.classList.add("animate-slide-in-right")
})

// Parallax effect for floating icons
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-icon")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Typing animation for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation on load (uncomment to enable)
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// Add smooth reveal animations for elements
const revealElements = document.querySelectorAll(".stat-card, .skill-card, .project-card")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  { threshold: 0.1 },
)

revealElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "all 0.6s ease"
  revealObserver.observe(element)
})
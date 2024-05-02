"use strict";

// Preload
// loading will be end after document is loaded

const preloader = document.querySelector("[data-preload]");
window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Add eventListener to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

// Navbar
const navBar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// Header & Back to top
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Hero Slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastSliderActiveItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastSliderActiveItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastSliderActiveItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slider
let autoSliderInterval;

const autoSlide = function () {
  autoSliderInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mousemove",
  function () {
    clearInterval(autoSliderInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

// Parallax Effect

const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  // console.log(event);

  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerWidth) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  parallaxItems.forEach((parallaxItem) => {
    x = x * Number(parallaxItem.dataset.parallaxSpeed);
    y = y * Number(parallaxItem.dataset.parallaxSpeed);
    parallaxItem.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});

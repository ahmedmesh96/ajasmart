// ===== Navbar    ===================/

        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        const menuItems = document.querySelectorAll('.menu li a');

        /* loading will be end after document is loaded
        */
       
       const preloader = document.querySelector("[data-preaload]");
       
       window.addEventListener("load", function () {
         preloader.classList.add("loaded");
         document.body.classList.add("loaded");
       });
       
        // Toggle menu visibility and burger icon
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            if (menu.classList.contains('active')) {
                menuToggle.innerHTML = "&times;"; // Change to 'X'
                menuToggle.classList.add('active');
            } else {
                menuToggle.innerHTML = "&#9776;"; // Change back to burger icon
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when a menu item is clicked
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menu.classList.remove('active');
                menuToggle.innerHTML = "&#9776;"; // Reset to burger icon
                menuToggle.classList.remove('active');
            });
        });


  //  =============== Our Team sloider ==============/
  swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 50,
    centerSlider: true,
    autoplay:true,
    
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // Responsive
    breakpoints: {
      0:{
        slidesPerView: 1
      },
      768:{
        slidesPerView: 2
      },
      1024:{
        slidesPerView: 3
      }
    }
  
  });

 // our projects 
function filterPortfolio(category) {
  let items = document.querySelectorAll('.portfolio-item');
  let buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((button) => button.classList.remove('active'));
  document.querySelector(`[onclick="filterPortfolio('${category}')"]`).classList.add('active');

  items.forEach((item) => {
    if (category === 'all' || item.classList.contains(category)) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });
}

// Show only 3 projects initially on page load
window.addEventListener('load', function() {
  let items = document.querySelectorAll('.portfolio-item');
  let visibleItems = 3; // Number of projects to show initially

  // Show only the first 3 projects
  for (let i = 0; i < visibleItems; i++) {
    items[i].classList.add('show');
  }

  // Update button text based on the state
  document.querySelector('#more-projects-btn button').textContent = 'More Projects';
});

function toggleProjects() {
  let items = document.querySelectorAll('.portfolio-item');
  let moreButton = document.querySelector('#more-projects-btn button');

  if (moreButton.textContent === 'More Projects') {
    // Show all items
    items.forEach((item) => item.classList.add('show'));
    moreButton.textContent = 'Less Projects'; // Change button text
  } else {
    // Show only the first 3 items
    for (let i = 0; i < 3; i++) {
      items[i].classList.add('show');
    }
    // Hide the rest
    for (let i = 3; i < items.length; i++) {
      items[i].classList.remove('show');
    }
    moreButton.textContent = 'More Projects'; // Change button text back
  }
}







'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

// const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

// const navbar = document.querySelector("[data-navbar]");
// const navTogglers = document.querySelectorAll("[data-nav-toggler]");
// const overlay = document.querySelector("[data-overlay]");

// const toggleNavbar = function () {
//   navbar.classList.toggle("active");
//   overlay.classList.toggle("active");
//   document.body.classList.toggle("nav-active");
// }

// addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

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
}

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



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


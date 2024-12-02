// JavaScript to toggle sidebar
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");
const navbar = document.querySelector(".navber");

// Open sidebar when menu icon is clicked
menuIcon.addEventListener("click", () => {
  sidebar.classList.add("active");
});

// Close sidebar when close button is clicked
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  navbar.style.z - index - 1;
});

// Close sidebar when clicking outside of it
document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});

// client counter

const clientCounter = document.querySelector(".clients");
let currentClients = 0;
const targetClients = 10;

function animateClientCounter() {
  if (currentClients < targetClients) {
    currentClients++;
    clientCounter.textContent = currentClients + "+";
    requestAnimationFrame(animateClientCounter);
  }
}
animateClientCounter();
const track = document.querySelector(".testimonial-track");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startX;

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = getPositionX(e);
  track.style.cursor = "grabbing";
  cancelAnimationFrame(animationID);
});

track.addEventListener("mouseup", () => {
  isDragging = false;
  track.style.cursor = "grab";
  const movedBy = currentTranslate - prevTranslate;

  // Snap to closest slide
  if (movedBy < -100) {
    nextSlide();
  } else if (movedBy > 100) {
    prevSlide();
  } else {
    setPositionByIndex();
  }
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startX;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    track.style.cursor = "grab";
    setPositionByIndex();
  }
});

track.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = getPositionX(e);
  cancelAnimationFrame(animationID);
});

track.addEventListener("touchend", () => {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // Snap to closest slide
  if (movedBy < -100) {
    nextSlide();
  } else if (movedBy > 100) {
    prevSlide();
  } else {
    setPositionByIndex();
  }
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startX;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function nextSlide() {
  const maxTranslate = -(track.scrollWidth - track.clientWidth);
  if (prevTranslate > maxTranslate) {
    prevTranslate -= track.clientWidth;
    setPositionByIndex();
  }
}

function prevSlide() {
  if (prevTranslate < 0) {
    prevTranslate += track.clientWidth;
    setPositionByIndex();
  }
}

function setPositionByIndex() {
  const maxTranslate = -(track.scrollWidth - track.clientWidth);
  if (prevTranslate < maxTranslate) {
    prevTranslate = maxTranslate;
  } else if (prevTranslate > 0) {
    prevTranslate = 0;
  }
  currentTranslate = prevTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

const slider = document.querySelector(".brand-slider");
const prevButton = document.querySelector(".brand-nav.prev");
const nextButton = document.querySelector(".brand-nav.next");

let position = 0;

// Function to update the slider position
function updateSlider() {
  slider.style.transform = `translateX(${position}px)`;
}

// Move to the previous set of items
prevButton.addEventListener("click", () => {
  if (position < 0) {
    position += 200; // Adjust this value for smoother transitions
    updateSlider();
  }
});

// Move to the next set of items
nextButton.addEventListener("click", () => {
  const maxScroll = -(slider.scrollWidth - slider.parentElement.clientWidth);
  if (position > maxScroll) {
    position -= 200; // Adjust this value for smoother transitions
    updateSlider();
  }
}); 
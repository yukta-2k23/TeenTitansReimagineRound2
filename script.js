//CURSOR
let innercursor = document.querySelector('.innercursor');
let outercursor = document.querySelector('.outercursor');

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;
  innercursor.style.left = `${x}px`;
  innercursor.style.top = `${y}px`;
  outercursor.style.left = `${x}px`;
  outercursor.style.top = `${y}px`;
}

let links = Array.from(document.querySelectorAll("a,button,img"));
console.log(links);

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    innercursor.classList.add("grow");
  });
  link.addEventListener("mouseleave", () => {
    innercursor.classList.remove("grow");
  });
});

// LOADER
var tl = gsap.timeline();
tl.from(".parker-loader", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
});
tl.to(".parker-loader", {
  opacity: 0,
  x: -20,
  scale:4.5,
  duration: 1.5,
  stagger: 0.1,
});
tl.to(".loader", {
  opacity: 0,
});
tl.from("#navbar", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 0,
});
tl.to(".loader", {
  display: "none",
});
// SOUND ICON TOGGLE
document
  .getElementById("checkboxInput")
  .addEventListener("change", function () {
    var video = document.getElementById("myVideo");
    if (this.checked) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  });
// PARKER LOGO SHRINK
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  animation: gsap.from(".logo", {
    y: "50vh",
    scale: 6,
    yPercent: -10,
    xPercent: -20,
  }),
  scrub: true,
  trigger: ".milestonesMain",
  start: "top bottom",
  endTrigger: ".milestonesMain",
  end: "top center",
});

// TOGGLE FOR MOBILE NAVBAR
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// GSAP for scroll animation to hide the nav
if (window.innerWidth > 750) {
  gsap.to(".nav", {
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: ".nav",
      scroller: "body",
      start: "top 10%",
      end: "bottom -11%",
      scrub: 1,
    },
  });
}

// CSS for hover effect to make the nav visible
const style = document.createElement("style");
style.innerHTML = `
    .nav {
        transition: opacity 0.5s;
    }

    .nav:hover {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// NUMBER COUNTER ON SCROLL
const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");

let activated = false;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const activationOffset = 200;
  const resetOffset = 500;

  if (
    scrollPosition > containerTop - window.innerHeight + activationOffset &&
    !activated
  ) {
    counters.forEach((counter) => {
      counter.innerText = 0;
      let count = 0;

      function updateCount() {
        const target = parseInt(counter.dataset.count);
        if (count < target) {
          count++;
          counter.innerText = count;
          setTimeout(updateCount, 5);
        } else {
          counter.innerText = target;
        }
      }
      updateCount();
    });
    activated = true;
  } else if (
    (scrollPosition < containerTop - window.innerHeight + resetOffset ||
      scrollPosition === 0) &&
    activated
  ) {
    counters.forEach((counter) => {
      counter.innerText = 0;
    });
    activated = false;
  }
});

// WRITING TYPE
AOS.init({
  duration: 1200, // Animation duration
  once: false, // Whether animation should happen only once
});

// PENCARE

document.addEventListener("DOMContentLoaded", function() {
  const videos = document.querySelectorAll('.video');

  const options = {
    root: null, // use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // play video when 50% of it is in view
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  videos.forEach(video => {
    observer.observe(video);
  });
});

// HISTORY
document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const services = gsap.utils.toArray(".service");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const service = entry.target;
        const imgContainer = service.querySelector(".img");

        ScrollTrigger.create({
          trigger: service,
          start: "bottom bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            let progress = self.progress;
            let newWidth = 30 + 70 * progress;
            gsap.to(imgContainer, {
              width: newWidth + "%",
              duration: 0.1,
              ease: "none",
            });
          },
        });

        ScrollTrigger.create({
          trigger: service,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            let progress = self.progress;
            let newHeight = 150 + 300 * progress;
            gsap.to(service, {
              height: newHeight + "px",
              duration: 0.1,
              ease: "none",
            });
          },
        });

        observer.unobserve(service);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  services.forEach((service) => {
    observer.observe(service);
  });

  // Update: Ensure Lenis is started
  lenis.start(); // Added to make sure Lenis is started correctly

  // Update: Refresh ScrollTrigger
  ScrollTrigger.refresh(); // Added to make sure ScrollTrigger updates its information
});

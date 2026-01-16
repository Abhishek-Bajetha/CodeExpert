var typed = new Typed("#change", {
  strings: ["CONVERT", "DEBUG", "ORGANIZE", "DOC", "OPTIMIZE"],
  typeSpeed: 80,
  backSpeed: 80,
  loop: true,
});

var tl = gsap.timeline();
tl.from(".left h1", {
  y: -100,
  opacity: 0,
  duration: 0.5,
  delay: 0.3,
});
tl.from(".right a", {
  y: -100,
  opacity: 0,
  duration: 0.5,
  stagger: 0.3,
});
tl.from(".lowerpage .lower_left h1,.lowerpage .lower_left h2", {
  x: -100,
  opacity: 0,
  stagger: 1,
  duration: 0.5,
  ease: Power3,
});
gsap.from(
  ".lowerpage .lower_right .imageleft .image1,.image2 ,.lowerpage .lower_right .imageright .image3,.image4",
  {
    // scale: 0,
    y: 100,
    opacity: 0,
    stagger: 0.7,
    duration: 0.5,
    delay: 3.5,
    transition: "allease 0.1",
    ease: Power3,
  }
);
tl.from(".elem", {
  // scale: 0,
  opacity: 0,
  x: -200,
  stagger: 0.7,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page2",
    scroller: "body",
    scrub: 4,
    start: "top 30%",
    end: "top -10%",
    // markers: true,
  },
});
tl.from(".feedbackleft #head ,.feedbackleft h1 , .feedbackleft p", {
  x: -100,
  opacity: 0,
  stagger: 1,
  duration: 1,
  scrollTrigger: {
    trigger: ".page3",
    scroller: "body",
    scrub: 3,
    start: "top 25%",
    end: "top 15%",
    // markers: true,
  },
});
tl.from(".feedbackright", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page3",
    scroller: "body",
    scrub: 3,
    start: "top 30%",
    end: "top 20%",
    // markers: true,
  },
});
tl.from(".custom-shape-divider-bottom-1713427540", {
  y: 100,
  opacity: 0,
  stagger: 1,
  duration: 1,
  // yoyo: 1,
  scrollTrigger: {
    trigger: ".page4",
    scroller: "body",
    scrub: 4,
    start: "top 95%",
    end: "top 90%",
    // markers: true,
  },
});

//page2 animation

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (e) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
  elem.addEventListener("mousemove", function (e) {
    var diff = e.clientY - elem.getBoundingClientRect().top;
    diffrot = e.clientX - rotate;
    rotate = e.clientX;
    console.log(rotate);
    // console.log("clientX");
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power4,
      top: diff,
      // left: e.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
  elem.addEventListener("mousemove", function (e) {
    gsap.to(elem.querySelector("h1"), {
      opacity: 0.3,
      x: 50,
    });
  });
  elem.addEventListener("mouseleave", function (e) {
    gsap.to(elem.querySelector("h1"), {
      opacity: 0.7,
      x: 0,
    });
  });
});

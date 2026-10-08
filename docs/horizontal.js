(() => {
  "use strict";
  const section = document.getElementById("projetos");
  const viewport = document.getElementById("workViewport");
  const track = document.getElementById("workTrack");
  const slides = [...document.querySelectorAll(".work-slide")];
  const fraction = document.getElementById("workFraction");
  const fill = document.getElementById("workProgress");
  const previous = document.getElementById("workPrevious");
  const next = document.getElementById("workNext");
  const instruction = document.getElementById("workInstruction");
  if (!section || !viewport || !track || !slides.length || !previous || !next) return;

  const desktop = window.matchMedia("(min-width: 761px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let distance = 0;
  let sectionStart = 0;
  let currentIndex = 0;
  let raf = 0;
  let ready = false;
  const clamp = (v, low, high) => Math.max(low, Math.min(v, high));
  const slideX = (i) => Math.max(0, slides[i].offsetLeft - slides[0].offsetLeft);
  const closestIndex = (x) => {
    let winner = 0, gap = Infinity;
    slides.forEach((slide, i) => {
      const delta = Math.abs(slideX(i) - x);
      if (delta < gap) { winner = i; gap = delta; }
    });
    return winner;
  };
  function display(progress, x) {
    currentIndex = closestIndex(x);
    if (fraction) {
      fraction.textContent = String(currentIndex + 1).padStart(2, "0") +
        " — " + String(slides.length).padStart(2, "0");
    }
    if (fill) fill.style.width = (clamp(progress, 0, 1) * 100).toFixed(2) + "%";
    previous.disabled = x <= 2;
    next.disabled = x >= distance - 2;
  }
  function update() {
    raf = 0;
    if (!ready) return;
    if (desktop.matches) {
      const x = clamp(window.scrollY - sectionStart, 0, distance);
      track.style.transform = "translate3d(" + (-x).toFixed(2) + "px, 0, 0)";
      display(distance ? x / distance : 1, x);
    } else {
      const x = viewport.scrollLeft;
      display(distance ? x / distance : 1, x);
    }
  }
  function requestUpdate() {
    if (!raf) raf = requestAnimationFrame(update);
  }
  function measure() {
    ready = false;
    track.style.transform = "";
    section.style.height = "";
    if (desktop.matches) {
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const vh = viewport.getBoundingClientRect().height > 0 ?
        window.innerHeight : window.innerHeight;
      section.style.height = Math.ceil(distance + vh) + "px";
      sectionStart = section.getBoundingClientRect().top + window.scrollY;
      if (instruction) instruction.textContent = "Role normalmente: os projetos avançam para o lado";
    } else {
      distance = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      sectionStart = section.getBoundingClientRect().top + window.scrollY;
      if (instruction) instruction.textContent = "Deslize os projetos para o lado";
    }
    ready = true;
    requestUpdate();
  }
  function goTo(index) {
    index = clamp(index, 0, slides.length - 1);
    const x = clamp(slideX(index), 0, distance);
    if (desktop.matches) {
      window.scrollTo({
        top: sectionStart + x,
        behavior: reduced.matches ? "auto" : "smooth"
      });
    } else {
      viewport.scrollTo({left: x, behavior: reduced.matches ? "auto" : "smooth"});
    }
  }
  previous.addEventListener("click", () => goTo(currentIndex - 1));
  next.addEventListener("click", () => goTo(currentIndex + 1));
  viewport.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    goTo(currentIndex + (e.key === "ArrowRight" ? 1 : -1));
  });
  viewport.addEventListener("scroll", requestUpdate, {passive:true});
  window.addEventListener("scroll", requestUpdate, {passive:true});
  viewport.addEventListener("wheel", (e) => {
    if (desktop.matches || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const amount = e.deltaY;
    const atFirst = viewport.scrollLeft < 2 && amount < 0;
    const atLast = viewport.scrollLeft >= distance - 2 && amount > 0;
    if (atFirst || atLast) return;
    e.preventDefault();
    viewport.scrollLeft += amount;
  }, {passive:false});
  window.addEventListener("resize", measure, {passive:true});
  desktop.addEventListener?.("change", measure);
  if (window.ResizeObserver) {
    const obs = new ResizeObserver(() => {
      if (!ready) return;
      if (Math.abs((desktop.matches ? track.scrollWidth - viewport.clientWidth : viewport.scrollWidth - viewport.clientWidth) - distance) > 3)
        measure();
    });
    obs.observe(track);
    obs.observe(viewport);
  }
  measure();
  if (document.fonts?.ready) document.fonts.ready.then(measure);
  window.addEventListener("load", measure, {once:true});
})();
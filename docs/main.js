(() => {
  "use strict";
  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Abrir navegação");
    document.body.classList.remove("menu-open");
  };
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Fechar navegação" : "Abrir navegação");
      document.body.classList.toggle("menu-open", open);
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    window.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => { if (innerWidth > 1040) closeMenu(); });
  }
  const section = document.getElementById("projetos");
  const viewport = document.getElementById("journey-window");
  const track = document.getElementById("journey-track");
  const slides = [...document.querySelectorAll(".project-panel")];
  const prev = document.getElementById("journey-prev");
  const next = document.getElementById("journey-next");
  const current = document.getElementById("journey-current");
  const progress = document.getElementById("journey-progress");
  const instruction = document.getElementById("journey-instruction");
  if (!section || !viewport || !track || !slides.length || !prev || !next) return;
  const desktop = window.matchMedia("(min-width: 761px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  let distance = 0, start = 0, selected = 0, frame = null, isMeasuring = false, lastViewport = -1;
  const slidePositions = () => slides.map(el => el.offsetLeft - slides[0].offsetLeft);
  function updateControls(x) {
    const positions = slidePositions();
    let closest = 0, minDiff = Infinity;
    positions.forEach((pos, index) => {
      const difference = Math.abs(clamp(pos, 0, distance) - x);
      if (difference < minDiff) { minDiff = difference; closest = index; }
    });
    selected = closest;
    if (current) current.textContent = String(selected + 1).padStart(2, "0");
    if (progress) progress.style.width = (distance ? (x / distance) * 100 : 100).toFixed(2) + "%";
    prev.disabled = x < 2;
    next.disabled = x >= distance - 2;
  }
  function render() {
    frame = null;
    if (isMeasuring) return;
    const x = desktop.matches
      ? clamp(window.scrollY - start, 0, distance)
      : clamp(viewport.scrollLeft, 0, distance);
    if (desktop.matches) {
      track.style.transform = "translate3d(" + (-x) + "px,0,0)";
    }
    updateControls(x);
  }
  function requestRender() {
    if (frame === null) frame = requestAnimationFrame(render);
  }
  function measure() {
    if (isMeasuring) return;
    isMeasuring = true;
    track.style.transform = "";
    section.style.height = "";
    if (desktop.matches) {
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = Math.round(distance + window.innerHeight) + "px";
      if (instruction) instruction.textContent = "Role para percorrer →";
    } else {
      distance = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (instruction) instruction.textContent = "Deslize para o lado";
    }
    start = section.getBoundingClientRect().top + window.scrollY;
    lastViewport = viewport.clientWidth;
    isMeasuring = false;
    requestRender();
  }
  function navigate(step) {
    const index = clamp(selected + step, 0, slides.length - 1);
    const x = clamp(slidePositions()[index], 0, distance);
    const behavior = reduced.matches ? "instant" : "smooth";
    if (desktop.matches) {
      window.scrollTo({ top: start + x, behavior });
    } else {
      viewport.scrollTo({ left: x, behavior });
    }
  }
  prev.addEventListener("click", () => navigate(-1));
  next.addEventListener("click", () => navigate(1));
  viewport.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      if (desktop.matches) window.scrollTo({top:start,behavior:reduced.matches?"instant":"smooth"});
      else viewport.scrollTo({left:0,behavior:reduced.matches?"instant":"smooth"});
    } else if (event.key === "End") {
      event.preventDefault();
      if (desktop.matches) window.scrollTo({top:start+distance,behavior:reduced.matches?"instant":"smooth"});
      else viewport.scrollTo({left:distance,behavior:reduced.matches?"instant":"smooth"});
    }
  });
  window.addEventListener("scroll", requestRender, {passive:true});
  viewport.addEventListener("scroll", requestRender, {passive:true});
  window.addEventListener("resize", () => {
    if (Math.abs(viewport.clientWidth - lastViewport) >= 2) measure();
  }, {passive:true});
  if (desktop.addEventListener) desktop.addEventListener("change", measure);
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(() => {
      const computed = Math.max(0, desktop.matches ? track.scrollWidth - viewport.clientWidth : viewport.scrollWidth - viewport.clientWidth);
      if (Math.abs(computed - distance) > 3) measure();
    });
    observer.observe(track);
    observer.observe(viewport);
  }
  measure();
  document.fonts?.ready?.then(measure);
  window.addEventListener("load", measure, {once:true});
})();
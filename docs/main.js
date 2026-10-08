(() => {
  "use strict";
  const ids = ["face", "help", "cep", "erp", "chess"];
  const tabs = [...document.querySelectorAll(".project-tab")];
  const panels = [...document.querySelectorAll(".panel")];
  const current = document.getElementById("current-number");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const visual = document.getElementById("panels");
  let index = 1;

  function choose(newIndex, moveFocus = false) {
    index = Math.max(0, Math.min(ids.length - 1, newIndex));
    const selected = ids[index];
    tabs.forEach(tab => {
      const active = tab.dataset.project === selected;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
      if (active && tab.getBoundingClientRect().width > 0) {
        tab.scrollIntoView({behavior:"auto", block:"nearest", inline:"nearest"});
        if (moveFocus) tab.focus({preventScroll:true});
      }
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.panel !== selected;
    });
    if (current) current.textContent = String(index + 1).padStart(2, "0");
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === ids.length - 1;
  }

  tabs.forEach(tab => tab.addEventListener("click", () => choose(ids.indexOf(tab.dataset.project))));
  previous?.addEventListener("click", () => choose(index - 1));
  next?.addEventListener("click", () => choose(index + 1));
  document.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target?.matches?.("input,textarea,select")) return;
    if (event.key === "ArrowRight") { event.preventDefault(); choose(index + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); choose(index - 1); }
  });

  let startX = 0, startY = 0;
  visual?.addEventListener("touchstart", e => {
    if (!e.touches.length) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, {passive:true});
  visual?.addEventListener("touchend", e => {
    if (!e.changedTouches.length || !startX) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.3) choose(index + (dx < 0 ? 1 : -1));
    startX = 0;
  }, {passive:true});

  choose(index);
})();
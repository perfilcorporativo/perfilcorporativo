(() => {
  const root = document.documentElement;
  const progress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    root.style.setProperty('--scroll', value.toFixed(2) + '%');
  };
  window.addEventListener('scroll', progress, { passive: true });
  window.addEventListener('resize', progress);
  progress();
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, ob) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          ob.unobserve(entry.target);
        }
      });
    }, { threshold: .09, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    if (!menu || !mobile) return;
    mobile.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };
  if (menu && mobile) {
    menu.addEventListener('click', () => {
      const show = mobile.hidden;
      mobile.hidden = !show;
      menu.setAttribute('aria-expanded', String(show));
      menu.setAttribute('aria-label', show ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', show);
    });
    mobile.querySelectorAll('a').forEach(el => el.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
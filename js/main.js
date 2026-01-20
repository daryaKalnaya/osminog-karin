(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Reserve modal
  // const modal = document.getElementById('reserve');
  // const openers = document.querySelectorAll('[data-open-modal="reserve"]');
  // const closers = modal ? modal.querySelectorAll('[data-close-modal]') : [];

  // function openModal() {
  //   if (!modal) return;
  //   modal.setAttribute('aria-hidden', 'false');
  //   document.body.style.overflow = 'hidden';
  //   const first = modal.querySelector('input, button, textarea');
  //   if (first) first.focus();
  // }

  // function closeModal() {
  //   if (!modal) return;
  //   modal.setAttribute('aria-hidden', 'true');
  //   document.body.style.overflow = '';
  // }

  // openers.forEach((btn) => btn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   openModal();
  // }));
  // closers.forEach((el) => el.addEventListener('click', closeModal));
  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape') {
  //     closeModal();
  //     closeLightbox();
  //   }
  // });

  // Fake form submit (static site)
  const form = document.getElementById('reserve-form');
  const status = document.getElementById('reserve-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) status.textContent = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.';
      form.reset();
      setTimeout(closeModal, 900);
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const lbLinks = document.querySelectorAll('[data-lightbox]');

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCap) lbCap.textContent = alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lbImg) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  window.closeLightbox = closeLightbox;

  lbLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const img = a.querySelector('img');
      const alt = img ? img.getAttribute('alt') : '';
      openLightbox(a.getAttribute('href'), alt);
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target.closest('[data-lightbox-close]')) closeLightbox();
    });
  }
})();

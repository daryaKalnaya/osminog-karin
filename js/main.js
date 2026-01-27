// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');
let lastScrollY = window.scrollY;
let ticking = false;
const SCROLL_THRESHOLD = 150;
let isMobileMenuOpen = false;
let ignoreScroll = false; 
let ignoreScrollTimeout = null; 

// Функция для мобильного меню
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    isMobileMenuOpen = isOpen;
    
    if (isOpen) {
      header.classList.remove('header-hidden');
    }
  });

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    isMobileMenuOpen = false;
  });
}

// Функция для обработки всех якорных ссылок
function handleAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '#top') return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        header.classList.remove('header-hidden');
        
        ignoreScroll = true;
        
        if (ignoreScrollTimeout) {
          clearTimeout(ignoreScrollTimeout);
        }
        
        ignoreScrollTimeout = setTimeout(() => {
          ignoreScroll = false;
          lastScrollY = window.scrollY; 
        }, 1000);
        
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          isMobileMenuOpen = false;
        }
        
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    });
  });
}

handleAnchorLinks();

function updateHeader() {
  const currentScrollY = window.scrollY;
  
  if (ignoreScroll) {
    header.classList.remove('header-hidden');
    lastScrollY = currentScrollY;
    ticking = false;
    return;
  }
  
  if (isMobileMenuOpen || currentScrollY < 50) {
    header.classList.remove('header-hidden');
    lastScrollY = currentScrollY;
    ticking = false;
    return;
  }
  
  if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
    // Скролл вниз
    header.classList.add('header-hidden');
  } else if (currentScrollY < lastScrollY) {
    // Скролл вверх
    header.classList.remove('header-hidden');
  }
  
  lastScrollY = currentScrollY;
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && nav) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    isMobileMenuOpen = false;
  }
});

// Код для ссылки "Наверх"
const toTopLink = document.querySelector('.to-top');

if (toTopLink) {
  toTopLink.addEventListener('click', function(e) {
    e.preventDefault();

    // Показываем шапку и временно отключаем скрытие
    header.classList.remove('header-hidden');
    ignoreScroll = true;
    
    // Отменяем предыдущий таймаут если есть
    if (ignoreScrollTimeout) {
      clearTimeout(ignoreScrollTimeout);
    }
    
    // Через 1 секунду снова включаем логику скрытия
    ignoreScrollTimeout = setTimeout(() => {
      ignoreScroll = false;
      lastScrollY = window.scrollY;
    }, 1000);
    
    // Закрываем мобильное меню если оно открыто
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      isMobileMenuOpen = false;
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (window.location.hash === '#top') {
      history.replaceState(null, null, ' ');
    }
  });
}
//fancybox
  Fancybox.bind('[data-fancybox="grid"]',{

    });
  Fancybox.bind('[data-fancybox="full-gallery-chapaeva"]',{

    });
  Fancybox.bind('[data-fancybox="full-gallery-lermontova"]',{

    });


  document.querySelectorAll('.btn-gallery').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const galleryName = this.getAttribute('data-gallery');
      
      if (galleryName) {
        const firstImage = document.querySelector(`[data-fancybox="${galleryName}"]`);
        
        if (firstImage) {
          firstImage.click();
        }
      }
    });
  });
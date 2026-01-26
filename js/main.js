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


document.addEventListener('DOMContentLoaded', function() {
  const addressModal = document.getElementById('address-gallery-modal');
  const modalTitle = document.getElementById('modal-address-title');
  const modalAddress = document.getElementById('modal-address-info');
  const modalGrid = document.getElementById('address-gallery-grid');
  
  const photosByAddress = {
    chapaeva: [
      {
        thumb: 'https://saratov.travel/upload/resize_cache/iblock/654/800_800_1/7bvnaglfp60c1x2gwhroy5hvbsuzznlm.jpg',
        full: 'https://saratov.travel/upload/resize_cache/iblock/654/800_800_1/7bvnaglfp60c1x2gwhroy5hvbsuzznlm.jpg',
        alt: 'Интерьер ресторана на ул. Чапаева'
      },
      {
        thumb: 'https://osminog-restomarket.ru/upload/12f161c2-d07e-f987-5c3b-63e385bfc983_image_c',
        full: 'https://osminog-restomarket.ru/upload/12f161c2-d07e-f987-5c3b-63e385bfc983_image_c',
        alt: 'Зал ресторана на ул. Чапаева'
      },
      {
        thumb: 'https://osminog-restomarket.ru/upload/6699f84a-9cee-ce8f-be37-63e3861a96a0_image_c',
        full: 'https://osminog-restomarket.ru/upload/6699f84a-9cee-ce8f-be37-63e3861a96a0_image_c',
        alt: 'Сервировка стола в ресторане на ул. Чапаева'
      },
      {
        thumb: 'images/DSC_6157.JPG',
        full: 'images/DSC_6157.JPG',
        alt: 'Дополнительное фото ресторана на ул. Чапаева'
      },
      {
        thumb: 'images/DSC_6167.JPG',
        full: 'images/DSC_6167.JPG',
        alt: 'Дополнительное фото ресторана на ул. Чапаева'
      },
      {
        thumb: 'images/DSC_6181.JPG',
        full: 'images/DSC_6181.JPG',
        alt: 'Дополнительное фото ресторана на ул. Чапаева'
      },
      {
        thumb: 'images/DSC_6196.JPG',
        full: 'images/DSC_6196.JPG',
        alt: 'Дополнительное фото ресторана на ул. Чапаева'
      },
      {
        thumb: 'images/DSC_6201.JPG',
        full: 'images/DSC_6201.JPG',
        alt: 'Дополнительное фото ресторана на ул. Чапаева'
      }

    ],
    lermontova: [
      {
        thumb: 'images/SPR_0319.JPG',
        full: 'images/SPR_0319.JPG',
        alt: 'Сервировка стола в ресторане на ул. Лермонтова'
      },
      {
        thumb: 'images/SPR_0506.JPG',
        full: 'images/SPR_0506.JPG',
        alt: 'Зал ресторана на ул. Лермонтова'
      },
      {
        thumb: 'images/SPR_0416.JPG',
        full: 'images/SPR_0416.JPG',
        alt: 'Интерьер ресторана на ул. Лермонтова'
      },
      {
        thumb: 'images/SPR_0437.JPG',
        full: 'images/SPR_0437.JPG',
        alt: 'Дополнительное фото ресторана на ул. Лермонтова'
      },
      {
        thumb: 'images/SPR_0476.JPG',
        full: 'images/SPR_0476.JPG',
        alt: 'Дополнительное фото ресторана на ул. Лермонтова'
      },
      {
        thumb: 'images/SPR_0494.JPG',
        full: 'images/SPR_0494.JPG',
        alt: 'Дополнительное фото ресторана на ул. Лермонтова'
      },
    ]
  };
  
  // Адреса
  const addresses = {
    chapaeva: {
      title: 'Ресторан на ул. Чапаева',
      address: 'Саратов, ул. В.И. Чапаева, 58'
    },
    lermontova: {
      title: 'Ресторан на ул. Лермонтова',
      address: 'Саратов, ул. имени М.Ю. Лермонтова, 37'
    }
  };
  
  document.querySelectorAll('.btn-gallery').forEach(btn => {
    btn.addEventListener('click', function() {
      const address = this.getAttribute('data-address');
      openAddressGallery(address);
    });
  });
  
  // Закрытие модалки
  document.querySelectorAll('[data-address-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeAddressModal);
  });
  
  // Закрытие по Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && addressModal.getAttribute('aria-hidden') === 'false') {
      closeAddressModal();
    }
  });
  
  // Закрытие по клику на бэкдроп
  document.querySelector('.modal-address-gallery__backdrop').addEventListener('click', closeAddressModal);
  
  function openAddressGallery(address) {
    const photos = photosByAddress[address];
    const addressInfo = addresses[address];
    
    if (!photos || !addressInfo) {
      console.error('Нет данных для адреса:', address);
      return;
    }
    
    modalTitle.textContent = addressInfo.title;
    modalAddress.textContent = addressInfo.address;
    
    // Заполняем сетку фото
    modalGrid.innerHTML = '';
    
    photos.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'modal-address-gallery__item';
      item.setAttribute('data-index', index);
      
      const img = document.createElement('img');
      img.src = photo.thumb;
      img.alt = photo.alt;
      img.className = 'modal-address-gallery__thumb';
      img.setAttribute('data-full', photo.full);
      img.setAttribute('data-alt', photo.alt);
      
      // Клик открывает в лайтбоксе
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        openInLightbox(this);
      });
      
      item.appendChild(img);
      modalGrid.appendChild(item);
    });
    
    // Показываем модалку
    addressModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  
  function closeAddressModal() {
    addressModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  function openInLightbox(imgElement) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-cap');
    
    if (lightbox && lightboxImg) {
      lightboxImg.src = imgElement.getAttribute('data-full');
      lightboxImg.alt = imgElement.getAttribute('data-alt');
      
      if (lightboxCap) {
        lightboxCap.textContent = imgElement.getAttribute('data-alt');
      }
      
      lightbox.setAttribute('aria-hidden', 'false');
      
      closeAddressModal();
    } else {
      console.warn('Лайтбокс не найден, открываю изображение напрямую');
    }
  }
});
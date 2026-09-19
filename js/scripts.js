document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // HERO CAROUSEL [COMENTADO — Video clip_inicio.mp4 activo]
  // ============================================================
  // const heroImgs = document.querySelectorAll('.hero-img');
  // if (heroImgs.length > 1) {
  //   let current = 0;
  //   setInterval(() => {
  //     heroImgs[current].classList.remove('active');
  //     current = (current + 1) % heroImgs.length;
  //     heroImgs[current].classList.add('active');
  //   }, 6000);
  // }

  // ============================================================
  // MOBILE MENU [COMENTADO — Navbar bottom flotante es la alternativa]
  // ============================================================
  // const hamburger     = document.getElementById('hamburger');
  // const mobileMenu    = document.getElementById('mobile-menu');
  // const mobileOverlay = document.getElementById('mobile-overlay');
  //
  // function toggleMenu(open) {
  //   hamburger?.classList.toggle('open', open);
  //   mobileMenu?.classList.toggle('open', open);
  //   mobileOverlay?.classList.toggle('open', open);
  //   document.body.style.overflow = open ? 'hidden' : '';
  // }
  //
  // hamburger?.addEventListener('click', () =>
  //   toggleMenu(!mobileMenu.classList.contains('open'))
  // );
  // mobileOverlay?.addEventListener('click', () => toggleMenu(false));
  // document.querySelectorAll('.mobile-menu a').forEach(a =>
  //   a.addEventListener('click', () => toggleMenu(false))
  // );

  // ============================================================
  // DARK / LIGHT MODE
  // ============================================================
  const root      = document.documentElement;
  const themeBtn  = document.getElementById('btn-theme');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(mode) {
    root.classList.toggle('light', mode === 'light');
    themeIcon.className = mode === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('gp-theme', mode);
  }

  applyTheme(localStorage.getItem('gp-theme') || 'dark');

  themeBtn?.addEventListener('click', () =>
    applyTheme(root.classList.contains('light') ? 'dark' : 'light')
  );

  // ============================================================
  // PALETTE SWITCHER  (deep-space → warm → clean → loop)
  // ============================================================
  const palettes   = ['deep-space', 'warm', 'clean'];
  const paletteBtn = document.getElementById('btn-palette');

  function applyPalette(name) {
    root.dataset.palette = name;
    localStorage.setItem('gp-palette', name);
  }

  applyPalette(localStorage.getItem('gp-palette') || 'deep-space');

  paletteBtn?.addEventListener('click', () => {
    const idx = palettes.indexOf(root.dataset.palette);
    applyPalette(palettes[(idx + 1) % palettes.length]);
  });

  // ============================================================
  // MODAL — MÁS SERVICIOS
  // ============================================================
  const modalOverlay = document.getElementById('modal-overlay');
  const btnMore      = document.getElementById('btn-more-services');
  const btnClose     = document.getElementById('modal-close');

  function openModal()  {
    modalOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnMore?.addEventListener('click', openModal);
  btnClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // ============================================================
  // PRICING TABS (main — supports data-opens-modal for extras)
  // ============================================================
  document.querySelectorAll('.pricing-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.opensModal) {
        document.getElementById(tab.dataset.opensModal)?.classList.add('open');
        document.body.style.overflow = 'hidden';
        return;
      }
      const target = tab.dataset.plans;
      document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pricing-plans').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ============================================================
  // EXTRAS MODAL — sub-tabs + close
  // ============================================================
  const extrasOverlay = document.getElementById('modal-extras-overlay');
  const extrasClose   = document.getElementById('modal-extras-close');

  extrasClose?.addEventListener('click', () => {
    extrasOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  });

  extrasOverlay?.addEventListener('click', e => {
    if (e.target === extrasOverlay) {
      extrasOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.extras-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.eplans;
      document.querySelectorAll('.extras-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.extras-plans').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Escape closes both modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      extrasOverlay?.classList.remove('open');
      closeModal();
      document.body.style.overflow = '';
    }
  });

  // ============================================================
  // CURRENCY TOGGLE — COP / USD
  // ============================================================
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.toggle('show-usd', btn.dataset.currency === 'usd');
    });
  });

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ============================================================
  // NAVBAR SCROLL SHADOW
  // ============================================================
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============================================================
  // NAVBAR ACTIVE SECTION
  // ============================================================
  const sections       = document.querySelectorAll('section[id]');
  const navLinks       = document.querySelectorAll('.navbar-links li a[href^="#"]');
  const navBottomItems = document.querySelectorAll('.navbar-bottom .nav-item');

  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = `#${entry.target.id}`;

        // Actualizar navbar top (si existe)
        navLinks.forEach(link => {
          link.classList.toggle('nav-active', link.getAttribute('href') === targetId);
        });

        // Actualizar navbar bottom
        navBottomItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === targetId);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

  sections.forEach(s => secObserver.observe(s));

  // ============================================================
  // STATS COUNTER
  // ============================================================
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1600;
    const steps    = 60;
    const inc      = target / steps;
    let current    = 0;
    const timer    = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, duration / steps);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObs.observe(statsSection);
  }

  // ============================================================
  // PORTFOLIO FILTERS
  // ============================================================
  document.querySelectorAll('.pf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('pf-hidden', !match);
        if (match) card.style.display = '';
        else setTimeout(() => { if (card.classList.contains('pf-hidden')) card.style.display = 'none'; }, 300);
      });
    });
  });

  // ============================================================
  // LIGHTBOX
  // ============================================================
  const lbOverlay = document.getElementById('lightbox-overlay');
  const lbClose   = document.getElementById('lightbox-close');
  const lbThumb   = document.getElementById('lightbox-thumb');
  const lbTitle   = document.getElementById('lightbox-title');
  const lbDesc    = document.getElementById('lightbox-desc');
  const lbTech    = document.getElementById('lightbox-tech');
  const lbLink    = document.getElementById('lightbox-link');

  function openLightbox(card) {
    const thumb = card.querySelector('.portfolio-thumb');
    const color = thumb?.style.getPropertyValue('--card-color') || '#333';
    const iconEl = thumb?.querySelector('i');
    lbThumb.style.background = color;
    lbThumb.innerHTML = iconEl ? `<i class="${iconEl.className}"></i>` : '';
    lbTitle.textContent = card.querySelector('h4')?.textContent || '';
    lbDesc.textContent  = card.querySelector('p')?.textContent || '';
    lbTech.innerHTML    = [...card.querySelectorAll('.portfolio-tech span')]
      .map(s => `<span>${s.textContent}</span>`).join('');
    const href = card.querySelector('.btn-ver')?.getAttribute('href') || '#';
    lbLink.href = href;
    lbLink.style.display = (href === '#' || !href) ? 'none' : 'inline-flex';
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn-ver')) return;
      openLightbox(card);
    });
  });

  lbClose?.addEventListener('click', () => {
    lbOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  });
  lbOverlay?.addEventListener('click', e => {
    if (e.target === lbOverlay) { lbOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  });

  // Escape closes lightbox too (extends existing escape handler)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { lbOverlay?.classList.remove('open'); document.body.style.overflow = ''; }
  }, { capture: true });

  // ============================================================
  // TESTIMONIALS CAROUSEL
  // ============================================================
  const tTrack = document.getElementById('testimonials-track');
  const tDots  = document.getElementById('testimonials-dots');
  const tCards = tTrack?.querySelectorAll('.testimonial-card');
  let tCurrent = 0;

  if (tTrack && tCards?.length) {
    tCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => tGoTo(i));
      tDots.appendChild(dot);
    });

    function tGoTo(idx) {
      tCurrent = ((idx % tCards.length) + tCards.length) % tCards.length;
      tTrack.style.transform = `translateX(-${tCurrent * 100}%)`;
      tDots.querySelectorAll('button').forEach((d, i) =>
        d.classList.toggle('active', i === tCurrent));
    }

    document.getElementById('t-prev')?.addEventListener('click', () => tGoTo(tCurrent - 1));
    document.getElementById('t-next')?.addEventListener('click', () => tGoTo(tCurrent + 1));

    let tAuto = setInterval(() => tGoTo(tCurrent + 1), 5200);
    const tWrap = tTrack.closest('.testimonials-wrap');
    tWrap?.addEventListener('mouseenter', () => clearInterval(tAuto));
    tWrap?.addEventListener('mouseleave', () => { tAuto = setInterval(() => tGoTo(tCurrent + 1), 5200); });

    // Touch / swipe
    let touchX = 0;
    tWrap?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    tWrap?.addEventListener('touchend',   e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 48) tGoTo(tCurrent + (diff > 0 ? 1 : -1));
    });
  }

  // ============================================================
  // FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ============================================================
  // EXIT POPUP — Aparece solo después de 30 segundos
  // ============================================================
  const exitPopup = document.getElementById('exit-popup');
  let exitShown   = false;
  let canShowExit = false;

  // Habilitar exit popup después de 30 segundos
  setTimeout(() => { canShowExit = true; }, 30000);

  function showExitPopup() {
    if (exitShown || !canShowExit || sessionStorage.getItem('gp-exit')) return;
    exitShown = true;
    sessionStorage.setItem('gp-exit', '1');
    exitPopup?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.addEventListener('mouseleave', e => { if (e.clientY < 18) showExitPopup(); });

  function closeExitPopup() {
    exitPopup?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('exit-popup-close')?.addEventListener('click', closeExitPopup);
  document.getElementById('exit-dismiss')?.addEventListener('click', closeExitPopup);
  exitPopup?.addEventListener('click', e => { if (e.target === exitPopup) closeExitPopup(); });


  // ============================================================
  // PAGE TRANSITION
  // ============================================================
  const pageTrans = document.getElementById('page-transition');

  document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      e.preventDefault();
      pageTrans?.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });

  window.addEventListener('pageshow', () => pageTrans?.classList.remove('fade-out'));

  // ============================================================
  // SCROLL PROGRESS BAR
  // ============================================================
  const scrollBar = document.getElementById('scroll-progress');
  if (scrollBar) {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      scrollBar.style.width = (scrollTop / (scrollHeight - clientHeight) * 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // ============================================================
  // BACK TO TOP
  // ============================================================
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 420);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ============================================================
  // STICKY CTA
  // ============================================================
  const stickyCta  = document.getElementById('sticky-cta');
  const stickyClose = document.getElementById('sticky-cta-close');
  let ctaDismissed  = false;

  if (stickyCta) {
    const heroH = () => document.getElementById('inicio')?.offsetHeight || 500;
    window.addEventListener('scroll', () => {
      if (ctaDismissed) return;
      stickyCta.classList.toggle('visible', window.scrollY > heroH());
      stickyCta.setAttribute('aria-hidden', String(!stickyCta.classList.contains('visible')));
    }, { passive: true });
    stickyClose?.addEventListener('click', () => {
      ctaDismissed = true;
      stickyCta.classList.remove('visible');
      stickyCta.setAttribute('aria-hidden', 'true');
    });
  }

  // ============================================================
  // OFFER BANNER
  // ============================================================
  const offerBanner = document.getElementById('offer-banner');
  if (offerBanner) {
    if (sessionStorage.getItem('gp-offer')) offerBanner.classList.add('dismissed');
    document.getElementById('offer-banner-close')?.addEventListener('click', () => {
      offerBanner.classList.add('dismissed');
      sessionStorage.setItem('gp-offer', '1');
    });
  }

  // ============================================================
  // PARALLAX HERO
  // ============================================================
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroCarousel.style.transform = `translateY(${window.scrollY * 0.32}px)`;
      }
    }, { passive: true });
  }

  // ============================================================
  // TYPEWRITER [COMENTADO — Animación removida, texto estático]
  // ============================================================
  // const tagline = document.querySelector('.hero-tagline');
  // if (tagline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  //   const parts = [
  //     { tag: null,   text: 'Desarrollamos ' },
  //     { tag: 'gold', text: 'Soluciones Digitales Personalizadas' },
  //     { tag: null,   text: ' Que Convierten Tus Ideas En Productos Eficientes Y Escalables.' },
  //   ];
  //   tagline.innerHTML = '';
  //   const cursor = Object.assign(document.createElement('span'), { className: 'tw-cursor' });
  //   tagline.appendChild(cursor);
  //
  //   let pi = 0, ci = 0, span = null;
  //
  //   const typeId = setInterval(() => {
  //     if (pi >= parts.length) {
  //       clearInterval(typeId);
  //       setTimeout(() => cursor.remove(), 2200);
  //       return;
  //     }
  //     const part = parts[pi];
  //     if (!span && part.tag) {
  //       span = Object.assign(document.createElement('span'), { className: part.tag });
  //       tagline.insertBefore(span, cursor);
  //     }
  //     const node = document.createTextNode(part.text[ci]);
  //     if (span) span.appendChild(node);
  //     else tagline.insertBefore(node, cursor);
  //     ci++;
  //     if (ci >= part.text.length) { pi++; ci = 0; span = null; }
  //   }, 58);
  // }

  // ============================================================
  // FOCUS TRAP — all modals
  // ============================================================
  function makeTrap(overlayEl) {
    if (!overlayEl) return;
    overlayEl.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...overlayEl.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    });
  }

  makeTrap(document.getElementById('modal-overlay'));
  makeTrap(document.getElementById('modal-extras-overlay'));
  makeTrap(document.getElementById('lightbox-overlay'));
  makeTrap(document.getElementById('exit-popup'));

  // ============================================================
  // SHARE BUTTONS
  // ============================================================
  document.getElementById('share-wa')?.addEventListener('click', () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent('Mirá este sitio web: ' + location.origin)}`,
      '_blank'
    );
  });

  const shareCopy = document.getElementById('share-copy');
  shareCopy?.addEventListener('click', function () {
    navigator.clipboard?.writeText(location.origin).then(() => {
      this.classList.add('copied');
      const icon = this.querySelector('i'), label = this.querySelector('span');
      if (icon)  icon.className  = 'fas fa-check';
      if (label) label.textContent = '¡Copiado!';
      setTimeout(() => {
        this.classList.remove('copied');
        if (icon)  icon.className  = 'fas fa-link';
        if (label) label.textContent = 'Copiar link';
      }, 2400);
    });
  });

  // ============================================================
  // SERVICE CARD FLIP
  // ============================================================
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.service-wa')) return;
      card.classList.toggle('flipped');
    });
  });

  // ============================================================
  // PORTFOLIO ACCORDION (WEBS / INVITACIONES)
  // ============================================================
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Cerrar otros acordeones
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('open'));

      // Abrir este si no estaba abierto
      if (!isOpen) {
        content.classList.add('open');
        header.classList.add('open');
      }
    });
  });

  // Subsecciones dentro de acordeones
  document.querySelectorAll('.subsection-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Cerrar otras subsecciones en el mismo acordeón
      const parent = header.closest('.accordion-content');
      parent.querySelectorAll('.subsection-content').forEach(c => c.classList.remove('open'));
      parent.querySelectorAll('.subsection-header').forEach(h => h.classList.remove('open'));

      // Abrir esta si no estaba abierta
      if (!isOpen) {
        content.classList.add('open');
        header.classList.add('open');
      }
    });
  });

  // ============================================================
  // PORTFOLIO CAROUSEL — Carrusel horizontal
  // ============================================================
  const projects = [
    { title: 'Kontrol Cash', desc: 'Sistema de gestión de caja y pagos para negocios y uso personal dedicado a la gestión del dinero de cada persona para su mejor uso y manejo', cat: 'Apps', icon: 'fas fa-cash-register', logo: 'Image/portafolio/kontrol_cash/logo.png', preview: 'Image/portafolio/kontrol_cash/portada.jpg', link: 'https://juanzarta.github.io/Kontrol-Cash/login', images: ['Image/portafolio/kontrol_cash/img (1).png', 'Image/portafolio/kontrol_cash/img (2).png', 'Image/portafolio/kontrol_cash/img (3).png', 'Image/portafolio/kontrol_cash/img (4).png', 'Image/portafolio/kontrol_cash/img (5).png'] },
    { title: 'Panda Journal', desc: 'Aplicación de diario y notas para organizar tus pensamientos de la mejor manera, ejecutando tus tareas diarias y estableciendo un itinerario semanal', cat: 'Apps', icon: 'fas fa-book', logo: 'Image/portafolio/panda_journal/logo.png', preview: 'Image/portafolio/panda_journal/portada.jpg', link: 'https://juanzarta.github.io/Panda-Journal/login', images: ['Image/portafolio/panda_journal/img (1).png', 'Image/portafolio/panda_journal/img (2).png', 'Image/portafolio/panda_journal/img (3).png', 'Image/portafolio/panda_journal/img (4).png', 'Image/portafolio/panda_journal/img (5).png'] },
    { title: 'PandaLead', desc: 'Gestor integral de leads y clientes para potenciar ventas y mensajes personalizados para mayor alcance a nuestros clientes', cat: 'Apps', icon: 'fas fa-chart-line', logo: 'Image/portafolio/pandalead/logo.png', preview: 'Image/portafolio/pandalead/portada.jpg', link: 'https://goldenpandaz.github.io/PandaLead/login', images: ['Image/portafolio/pandalead/img (1).png', 'Image/portafolio/pandalead/img (2).png', 'Image/portafolio/pandalead/img (3).png', 'Image/portafolio/pandalead/img (4).png', 'Image/portafolio/pandalead/img (5).png', 'Image/portafolio/pandalead/img (6).png'] },
    { title: 'Agenda Co', desc: 'Plataforma de agendamiento online para gestionar citas y reservas de forma eficiente', cat: 'Apps', icon: 'fas fa-calendar-alt', logo: 'Image/portafolio/agendaco/logo.png', preview: 'Image/portafolio/agendaco/Portada.jpg', link: 'https://agendago-b8ea6.web.app', images: ['Image/portafolio/agendaco/img (1).png', 'Image/portafolio/agendaco/img (2).png', 'Image/portafolio/agendaco/img (3).png', 'Image/portafolio/agendaco/img (4).png', 'Image/portafolio/agendaco/img (5).png', 'Image/portafolio/agendaco/img (6).png', 'Image/portafolio/agendaco/img (7).png', 'Image/portafolio/agendaco/img (8).png'] },
    { title: 'Rezto Bar', desc: 'Sitio web profesional para restaurante y bares, con reservas, menú, ubicación y domicilios', cat: 'Apps', icon: 'fas fa-utensils', logo: 'Image/portafolio/reztobar/logo.png', preview: 'Image/portafolio/reztobar/portada.jpg', images: ['Image/portafolio/reztobar/img (1).png', 'Image/portafolio/reztobar/img (2).png', 'Image/portafolio/reztobar/img (3).png'] },
    { title: 'Protocol Events', desc: 'Gestor completo de mi equipo de trabajo, de tareas, por eventos y delegación de responsabilidades', cat: 'Apps', icon: 'fas fa-calendar-days', logo: 'Image/portafolio/protocol_eventz/Logo.png', preview: 'Image/portafolio/protocol_eventz/portada.jpg', link: 'https://juanzarta.github.io/Protocol-EventZ/login', images: ['Image/portafolio/protocol_eventz/img (1).png', 'Image/portafolio/protocol_eventz/img (2).png', 'Image/portafolio/protocol_eventz/img (3).png'] },
    { title: 'Web Fudesmud', desc: 'FUDESMU es una organización sin ánimo de lucro dedicada al desarrollo integral de comunidades vulnerables', cat: 'Webs', icon: 'fas fa-handshake', logo: 'Image/portafolio/fudesmu/logo.png', preview: 'Image/portafolio/fudesmu/portada.jpg', link: 'https://juanzarta.github.io/Fudesmud/', images: ['Image/portafolio/fudesmu/img (1).png', 'Image/portafolio/fudesmu/img (2).png', 'Image/portafolio/fudesmu/img (3).png'] },
    { title: 'Club Tiburones', desc: 'Sitio web para club social y deportivo que aumenta vistas y da a conocer el club con calendario, galería de fotos y contacto directo para unirte', cat: 'Webs', icon: 'fas fa-users', logo: 'Image/portafolio/club_tiburones/logo.jpeg', preview: 'Image/portafolio/club_tiburones/portada.jpg', link: 'https://tiburonespopayan.github.io/tiburones/', images: ['Image/portafolio/club_tiburones/img (1).png', 'Image/portafolio/club_tiburones/img (2).png', 'Image/portafolio/club_tiburones/img (3).png', 'Image/portafolio/club_tiburones/img (4).png', 'Image/portafolio/club_tiburones/img (5).png'] },
    { title: 'Legado Honor', desc: 'Web dedicada a la asesoría, afiliación, defensa y curso de todo tipo de militar', cat: 'Webs', icon: 'fas fa-medal', logo: 'Image/portafolio/legado_de_honor/logo.png', preview: 'Image/portafolio/legado_de_honor/portada.jpg', link: 'https://www.legadodehonor.com.co', images: ['Image/portafolio/legado_de_honor/img (1).png', 'Image/portafolio/legado_de_honor/img (2).png', 'Image/portafolio/legado_de_honor/img (3).png', 'Image/portafolio/legado_de_honor/img (4).png'] },
    { title: 'Bank', desc: 'Sistema de gestión bancaria completo para administrar transacciones y cuentas', cat: 'Apps', icon: 'fas fa-university', logo: '', preview: '', images: [] },
    { title: 'Ecommer-Z', desc: 'Plataforma de e-commerce inteligente para vender productos online', cat: 'Apps', icon: 'fas fa-shopping-cart', logo: '', preview: '', images: [] },
    { title: 'Web Abogado', desc: 'Landing page profesional para despacho de abogados y asesoría legal', cat: 'Webs', icon: 'fas fa-gavel', logo: 'Image/portafolio/web_abogado/logo.png', preview: 'Image/portafolio/web_abogado/portada.jpg', link: 'https://goldenpandaz.github.io/demo-abogado-landing/', images: ['Image/portafolio/web_abogado/img (1).png', 'Image/portafolio/web_abogado/img (2).png', 'Image/portafolio/web_abogado/img (3).png'] },
    { title: 'Web Barbería', desc: 'Sitio web atractivo para barbería con galería y reservas de citas', cat: 'Webs', icon: 'fas fa-cut', logo: 'Image/portafolio/web_barberia/logo.png', preview: 'Image/portafolio/web_barberia/portada.jpg', link: 'https://goldenpandaz.github.io/demo-barberia-landing/', images: ['Image/portafolio/web_barberia/img (1).png', 'Image/portafolio/web_barberia/img (2).png', 'Image/portafolio/web_barberia/img (3).png'] },
    { title: 'Web Ferretería', desc: 'Landing para ferretería con catálogo de productos y contacto', cat: 'Webs', icon: 'fas fa-hammer', logo: 'Image/portafolio/web_ferreteria/logo.png', preview: 'Image/portafolio/web_ferreteria/portada.jpg', link: 'https://goldenpandaz.github.io/demo-ferreteria-landing/', images: ['Image/portafolio/web_ferreteria/img (1).png', 'Image/portafolio/web_ferreteria/img (2).png', 'Image/portafolio/web_ferreteria/img (3).png'] },
    { title: 'Web Gimnasio', desc: 'Sitio web moderno para gimnasio con membresías y clases online', cat: 'Webs', icon: 'fas fa-dumbbell', logo: 'Image/portafolio/web_gimnasio/logo.png', preview: 'Image/portafolio/web_gimnasio/portada.jpg', link: 'https://goldenpandaz.github.io/demo-gimnasio-landing/', images: ['Image/portafolio/web_gimnasio/img (1).png', 'Image/portafolio/web_gimnasio/img (2).png', 'Image/portafolio/web_gimnasio/img (3).png', 'Image/portafolio/web_gimnasio/img (4).png'] },
    { title: 'Web Odontología', desc: 'Landing profesional para consultorio dental con servicios y equipo', cat: 'Webs', icon: 'fas fa-tooth', logo: 'Image/portafolio/web_odontologia/logo.png', preview: 'Image/portafolio/web_odontologia/portada.jpg', link: 'https://goldenpandaz.github.io/demo-odontologia-landing/', images: ['Image/portafolio/web_odontologia/img (1).png', 'Image/portafolio/web_odontologia/img (2).png', 'Image/portafolio/web_odontologia/img (3).png'] },
    { title: 'Web Restaurante', desc: 'Sitio web elegante para restaurante con menú, reservas y ubicación', cat: 'Webs', icon: 'fas fa-utensils', logo: 'Image/portafolio/web_restaurante/logo.png', preview: 'Image/portafolio/web_restaurante/portada.jpg', link: 'https://goldenpandaz.github.io/demo-restaurante-landing/', images: ['Image/portafolio/web_restaurante/img (1).png', 'Image/portafolio/web_restaurante/img (2).png', 'Image/portafolio/web_restaurante/img (3).png', 'Image/portafolio/web_restaurante/img (4).png', 'Image/portafolio/web_restaurante/img (5).png'] },
    { title: 'Web Spa', desc: 'Landing para spa y masajes con servicios y horarios disponibles', cat: 'Webs', icon: 'fas fa-spa', logo: 'Image/portafolio/web_spa/logo.png', preview: 'Image/portafolio/web_spa/portada.jpg', link: 'https://goldenpandaz.github.io/demo-spa-landing/', images: ['Image/portafolio/web_spa/img (1).png', 'Image/portafolio/web_spa/img (2).png', 'Image/portafolio/web_spa/img (3).png'] },
    { title: 'Web Veterinaria', desc: 'Sitio web profesional para clínica veterinaria con servicios y contacto', cat: 'Webs', icon: 'fas fa-stethoscope', logo: 'Image/portafolio/web_veterinaria-2/logo.png', preview: 'Image/portafolio/web_veterinaria-2/portada.jpg', link: 'https://juanzarta.github.io/web-veterinaria/', images: ['Image/portafolio/web_veterinaria-2/img (1).png', 'Image/portafolio/web_veterinaria-2/img (2).png', 'Image/portafolio/web_veterinaria-2/img (3).png'] },
    { title: 'Web Veterinaria', desc: 'Plataforma completa de clínica veterinaria con historia clínica digital', cat: 'Webs', icon: 'fas fa-stethoscope', logo: 'Image/portafolio/web_veterinaria/logo.png', preview: 'Image/portafolio/web_veterinaria/portada.jpg', link: 'https://goldenpandaz.github.io/demo-veterinaria-landing/', images: ['Image/portafolio/web_veterinaria/img (1).png', 'Image/portafolio/web_veterinaria/img (2).png', 'Image/portafolio/web_veterinaria/img (3).png', 'Image/portafolio/web_veterinaria/img (4).png', 'Image/portafolio/web_veterinaria/img (5).png'] },
    { title: 'Web Personal', desc: 'Sitio de información personal y portafolio profesional con proyectos', cat: 'Webs', icon: 'fas fa-user-circle', logo: 'Image/portafolio/web_personal/logo.png', preview: 'Image/portafolio/web_personal/portada.jpg', link: 'https://juanzarta.github.io/web-personal/#portafolio', images: ['Image/portafolio/web_personal/img (1).png', 'Image/portafolio/web_personal/img (2).png', 'Image/portafolio/web_personal/img (3).png'] },
    { title: 'Web XV', desc: 'Invitación digital interactiva para celebración de XV años memorable', cat: 'Invitaciones', icon: 'fas fa-heart', logo: 'Image/portafolio/web_xv/logo.png', preview: 'Image/portafolio/web_xv/portada.jpg', link: 'https://juanzarta.github.io/invitacion-15-general/', images: ['Image/portafolio/web_xv/img (1).png', 'Image/portafolio/web_xv/img (2).png', 'Image/portafolio/web_xv/img (3).png'] },
    { title: 'Web Bautizo', desc: 'Invitación digital elegante para bautizo con información del evento', cat: 'Invitaciones', icon: 'fas fa-water', logo: 'Image/portafolio/web_bautizo/logo.png', preview: 'Image/portafolio/web_bautizo/portada.jpg', link: 'https://juanzarta.github.io/invitacion-bautizo-general/', images: ['Image/portafolio/web_bautizo/img (1).png', 'Image/portafolio/web_bautizo/img (2).png', 'Image/portafolio/web_bautizo/img (3).png'] },
    { title: 'Web Boda', desc: 'Invitación digital exclusiva para matrimonio con detalles especiales', cat: 'Invitaciones', icon: 'fas fa-ring', logo: 'Image/portafolio/web_boda/logo.png', preview: 'Image/portafolio/web_boda/portada.jpg', link: 'https://juanzarta.github.io/invitacion-boda-general/', images: ['Image/portafolio/web_boda/img (1).png', 'Image/portafolio/web_boda/img (2).png'] },
    { title: 'Web Comunión', desc: 'Invitación digital para comunión con galería y confirmación de asistencia', cat: 'Invitaciones', icon: 'fas fa-child', logo: 'Image/portafolio/web_comunion/logo.png', preview: 'Image/portafolio/web_comunion/portada.jpg', link: 'https://juanzarta.github.io/invitacion-comunion-general/', images: ['Image/portafolio/web_comunion/img (1).png', 'Image/portafolio/web_comunion/img (2).png'] },
    { title: 'Web Corporativo', desc: 'Invitación digital profesional para eventos corporativos y conferencias', cat: 'Invitaciones', icon: 'fas fa-briefcase', logo: 'Image/portafolio/web_corporativo/logo.png', preview: 'Image/portafolio/web_corporativo/portada.jpg', link: 'https://juanzarta.github.io/invitacion-corporativa-general/', images: ['Image/portafolio/web_corporativo/img (1).png', 'Image/portafolio/web_corporativo/img (2).png', 'Image/portafolio/web_corporativo/img (3).png'] },
    { title: 'Web Cumpleaños', desc: 'Invitación digital festiva para cumpleaños con sorpresas interactivas', cat: 'Invitaciones', icon: 'fas fa-birthday-cake', logo: 'Image/portafolio/web_cumpleanos/logo.png', preview: 'Image/portafolio/web_cumpleanos/portada.jpg', link: 'https://juanzarta.github.io/invitacion-cumple-general/', images: ['Image/portafolio/web_cumpleanos/img (1).png', 'Image/portafolio/web_cumpleanos/img (2).png', 'Image/portafolio/web_cumpleanos/img (3).png'] },
    { title: 'Web Grado', desc: 'Invitación digital para grado con fotos de la promoción y detalles', cat: 'Invitaciones', icon: 'fas fa-graduation-cap', logo: 'Image/portafolio/web_grado/logo.png', preview: 'Image/portafolio/web_grado/portada.jpg', link: 'https://juanzarta.github.io/invitacion-grado-general/', images: ['Image/portafolio/web_grado/img (1).png', 'Image/portafolio/web_grado/img (2).png', 'Image/portafolio/web_grado/img (3).png'] },
    { title: 'Web General', desc: 'Plantilla de invitación digital personalizable para cualquier evento', cat: 'Invitaciones', icon: 'fas fa-envelope', logo: 'Image/Logo_Color.png', preview: 'Image/portafolio/web_general/portada.jpg', link: 'https://juanzarta.github.io/invitacion-general/', images: ['Image/portafolio/web_general/img (1).png', 'Image/portafolio/web_general/img (2).png', 'Image/portafolio/web_general/img (3).png', 'Image/portafolio/web_general/img (4).png'] },
    { title: 'EcoImpulso', desc: 'Plataforma de impacto ambiental y sostenibilidad', cat: 'Webs', icon: 'fas fa-leaf', logo: 'Image/portafolio/ecoimpulso/logo.png', preview: 'Image/portafolio/ecoimpulso/portada.jpg', link: 'https://juanzarta.github.io/web-EcoImpulso/', images: ['Image/portafolio/ecoimpulso/img (1).png', 'Image/portafolio/ecoimpulso/img (2).png', 'Image/portafolio/ecoimpulso/img.png'] }
  ];

  const carousel = document.getElementById('portfolio-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  // Filtrar solo proyectos con imágenes
  const projectsWithImages = projects.filter(p => p.images.length > 0);

  if (carousel) {
    carousel.innerHTML = projectsWithImages.map((p) => `
      <div class="portfolio-item" data-project-title="${p.title}">
        <div class="portfolio-project-card" onclick="openProjectModal('${p.title}')">
          <div class="project-header">
            <div class="project-info">
              <h3 class="project-title">${p.title.toUpperCase()}</h3>
              <p class="project-desc">${p.desc}</p>
            </div>
            <div class="project-icon">${p.logo ? `<img src="${p.logo}" alt="${p.title}" class="project-logo">` : `<i class="fas fa-image"></i>`}</div>
          </div>
          ${p.preview ? `<img src="${p.preview}" alt="${p.title}" class="project-preview">` : `<div class="project-preview" style="background: rgba(var(--gold-rgb), 0.1);"></div>`}
          <a href="${p.link || '#'}" class="project-btn" onclick="event.stopPropagation(); ${p.link ? '' : 'event.preventDefault();'}" ${p.link ? `target="_blank"` : ''}>Ver más →</a>
        </div>
      </div>
    `).join('');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -400, behavior: 'smooth' }));
      nextBtn.addEventListener('click', () => carousel.scrollBy({ left: 400, behavior: 'smooth' }));
    }
  }

  // Modal de imágenes del proyecto
  window.openProjectModal = function(projectId) {
    let modal = document.getElementById('project-modal');
    if (!modal) {
      const newModal = document.createElement('div');
      newModal.id = 'project-modal';
      newModal.className = 'project-modal';
      newModal.innerHTML = `
        <div class="modal-overlay" onclick="closeProjectModal()"></div>
        <div class="modal-window">
          <div class="modal-header">
            <h2 class="modal-title" id="modal-title"></h2>
            <button class="modal-close" onclick="closeProjectModal()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div class="modal-images" id="modal-images"></div>
          </div>
          <div class="modal-footer">
            <button class="modal-arrow modal-prev" onclick="prevImage()"><i class="fas fa-chevron-left"></i></button>
            <div class="modal-dots" id="modal-dots"></div>
            <button class="modal-arrow modal-next" onclick="nextImage()"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      `;
      document.body.appendChild(newModal);
      modal = newModal;
    }

    // Buscar proyecto por título
    const project = projects.find(p => p.title === projectId);
    document.getElementById('modal-title').textContent = project.title.toUpperCase();
    const imagesHtml = (project.images.length > 0 ? project.images : Array(4).fill('https://via.placeholder.com/800x600/1a2940/gold?text=Sin+imagen')).map((img, i) => `
      <img src="${img}" alt="Screenshot ${i+1}" ${i === 0 ? 'class="active"' : ''}>
    `).join('');
    document.getElementById('modal-images').innerHTML = imagesHtml;

    // Dots - cantidad real de imágenes
    const numImages = project.images.length > 0 ? project.images.length : 4;
    const dotsHtml = Array(numImages).fill().map((_, i) => `
      <span class="dot${i === 0 ? ' active' : ''}" onclick="showImage(${i})"></span>
    `).join('');
    document.getElementById('modal-dots').innerHTML = dotsHtml;

    window.currentImageIndex = 0;
    modal.classList.add('show');
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.add('closing');
      setTimeout(() => {
        modal.classList.remove('show', 'closing');
      }, 350);
    }
  };

  window.showImage = function(index) {
    const images = document.querySelectorAll('#modal-images img');
    window.currentImageIndex = index;
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  window.nextImage = function() {
    const images = document.querySelectorAll('#modal-images img');
    window.currentImageIndex = (window.currentImageIndex + 1) % images.length;
    window.showImage(window.currentImageIndex);
  };

  window.prevImage = function() {
    const images = document.querySelectorAll('#modal-images img');
    window.currentImageIndex = (window.currentImageIndex - 1 + images.length) % images.length;
    window.showImage(window.currentImageIndex);
  };

});

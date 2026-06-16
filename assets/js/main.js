/* ============================================
   PARIA KIA — Interactions & Motion
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* === CURSOR === */
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const animateCursor = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    document.querySelectorAll('a, button, .work-card, .work-hub-card, .insight-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });
  }

  /* === NAV: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP === */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    if (current > lastScroll && current > 200) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastScroll = current;
  }, { passive: true });

  /* === MOBILE NAV === */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* === SCROLL REVEAL === */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  /* === PARALLAX IMAGES === */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    const onScroll = () => {
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* === PAGE TRANSITIONS === */
  const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
  const transition = document.querySelector('.page-transition');
  if (transition) {
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('//')) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        transition.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
        transition.style.transformOrigin = 'bottom';
        transition.style.transform = 'scaleY(1)';
        setTimeout(() => { window.location.href = href; }, 450);
      });
    });
    window.addEventListener('pageshow', () => {
      transition.style.transition = 'none';
      transition.style.transformOrigin = 'top';
      transition.style.transform = 'scaleY(1)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          transition.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
          transition.style.transform = 'scaleY(0)';
        });
      });
    });
  }

  /* === CONTACT FORM === */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = 'Message sent ✓';
        btn.style.background = '#2a6e4e';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* === MARQUEE (trust logos auto-scroll) === */
  const trust = document.querySelector('.trust__logos');
  if (trust) {
    const clone = trust.cloneNode(true);
    trust.parentElement.appendChild(clone);
    let pos = 0;
    const speed = 0.4;
    const ticker = () => {
      pos -= speed;
      const totalW = trust.scrollWidth;
      if (Math.abs(pos) >= totalW) pos = 0;
      trust.style.transform = `translateX(${pos}px)`;
      clone.style.transform = `translateX(${pos + totalW}px)`;
      requestAnimationFrame(ticker);
    };
    ticker();
  }

  /* === CASE STUDY FILTER === */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        filterCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /* === ACTIVE NAV LINK === */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/' && href !== 'index.html') {
      link.style.color = 'var(--black)';
    }
  });

});

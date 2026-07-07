/* ===== MD-Copilot Investor Portal — Shared Scripts ===== */

document.addEventListener('DOMContentLoaded', function() {
  initAccordion();
  initTabs();
  initMobileMenu();
  initScrollSpy();
  initAnimateOnScroll();
});

/* ---- Accordion ---- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close siblings if data-accordion-group
      const group = item.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('.accordion-item.open').forEach(sib => {
          if (sib !== item) sib.classList.remove('open');
        });
      }
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ---- Tabs ---- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabList => {
    const buttons = tabList.querySelectorAll('.tab-btn');
    const panels = tabList.closest('.tabs-container')?.querySelectorAll('.tab-panel');
    if (!panels) return;
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });
}

/* ---- Scroll Spy for Sidebar ---- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  
  sections.forEach(section => observer.observe(section));
}

/* ---- Animate on Scroll ---- */
function initAnimateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
    observer.observe(el);
  });
}

/* Add CSS for aos-visible */
const aosStyle = document.createElement('style');
aosStyle.textContent = `[data-aos].aos-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(aosStyle);

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Print handler ---- */
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.add('open'));
});

/* ===== Markdown Modal ===== */
(function() {
  // Load marked.js and md-content.js in parallel, then init modal
  let loaded = 0;
  function tryInit() { loaded++; if (loaded >= 2) initMdModal(); }

  const script1 = document.createElement('script');
  script1.src = 'https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js';
  script1.onload = tryInit;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'assets/js/md-content.js';
  script2.onload = tryInit;
  document.head.appendChild(script2);

  let modalEl = null;

  function initMdModal() {
    // Create modal HTML
    modalEl = document.createElement('div');
    modalEl.className = 'md-modal-overlay';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Просмотр документа');
    modalEl.innerHTML = `
      <div class="md-modal">
        <div class="md-modal-header">
          <h3 class="md-modal-title">Загрузка...</h3>
          <button class="md-modal-close" aria-label="Закрыть">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="md-modal-body">
          <div class="md-modal-loading">Загрузка документа...</div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    // Close handlers
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeMdModal();
    });
    modalEl.querySelector('.md-modal-close').addEventListener('click', closeMdModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('active')) closeMdModal();
    });

    // Wire up data-md links
    document.querySelectorAll('[data-md]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openMdModal(el.dataset.md, el.dataset.title || '');
      });
    });
  }

  function openMdModal(path, title) {
    if (!modalEl) return;
    const bodyEl = modalEl.querySelector('.md-modal-body');
    const titleEl = modalEl.querySelector('.md-modal-title');
    titleEl.textContent = title || 'Документ';
    bodyEl.innerHTML = '<div class="md-modal-loading">Загрузка документа...</div>';
    modalEl.classList.add('active');
    document.body.classList.add('md-modal-open');
    modalEl.querySelector('.md-modal-close').focus();

    // Try embedded content first (works for file://)
    if (window.MD_CONTENT && window.MD_CONTENT[path]) {
      try {
        const html = window.marked.parse(window.MD_CONTENT[path], { breaks: true, gfm: true });
        bodyEl.innerHTML = html;
        bodyEl.querySelectorAll('details').forEach(d => d.open = true);
        return;
      } catch (err) {
        console.error('Markdown parse error:', err);
      }
    }

    // Fallback: try fetch (works for http://)
    fetch(path)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(md => {
        const html = window.marked.parse(md, { breaks: true, gfm: true });
        bodyEl.innerHTML = html;
        bodyEl.querySelectorAll('details').forEach(d => d.open = true);
      })
      .catch(err => {
        bodyEl.innerHTML = `
          <div class="md-modal-error">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9B2335" stroke-width="2" style="margin-bottom:8px"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <p><strong>Не удалось загрузить документ</strong></p>
            <p style="font-size:0.75rem;color:#5A5A5A">${err.message}<br>Путь: ${path}</p>
          </div>`;
      });
  }

  function closeMdModal() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.classList.remove('md-modal-open');
  }

  // Expose globally so inline onclick can use it
  window.openMdModal = openMdModal;
  window.closeMdModal = closeMdModal;
})();
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.add('open'));
});

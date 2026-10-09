// Rustius Website Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const showcaseBtns = document.querySelectorAll('.showcase-btn');
  const views = {
    session: document.getElementById('view-session'),
    hub: document.getElementById('view-hub'),
    rdp: document.getElementById('view-rdp')
  };
  const titlebarPill = document.getElementById('titlebar-pill');
  const tabsContainer = document.getElementById('workspace-tabs-container');

  // Pill templates for title bar
  const pillTemplates = {
    session: '<span class="session-indicator connected"></span><span class="session-name">ubuntu</span><span class="session-badge">SSH · 192.168.83.129</span>',
    hub: '<span class="session-badge">RUSTIUS 0.1.0</span>',
    rdp: '<span class="session-indicator connected"></span><span class="session-name">test-edp</span><span class="session-badge">RDP · 192.168.83.128:3389</span>'
  };

  function switchView(target) {
    if (!views[target]) return;

    // 1. Update Showcase top buttons
    showcaseBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === target);
    });

    // 2. Switch workspace view
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle('active', key === target);
      }
    });

    // 3. Update Title Bar active pill
    if (titlebarPill && pillTemplates[target]) {
      titlebarPill.innerHTML = pillTemplates[target];
    }

    // 4. Update Workspace tab strip
    if (tabsContainer) {
      if (target === 'session') {
        tabsContainer.innerHTML = `
          <div class="workspace-tab active" id="tab-item-session" data-target="session">
            <span class="tab-dot green"></span>
            <span class="tab-title">ubuntu</span>
            <span class="tab-sub">SSH - 192.168.83.129</span>
            <span class="tab-close">✕</span>
          </div>
          <div class="workspace-tab-plus" id="tab-item-plus" title="Open Welcome Hub" data-target="hub">+</div>
        `;
      } else if (target === 'hub') {
        tabsContainer.innerHTML = `
          <div class="workspace-tab-plus active" id="tab-item-plus" title="Welcome Hub" data-target="hub">+</div>
        `;
      } else if (target === 'rdp') {
        tabsContainer.innerHTML = `
          <div class="workspace-tab active" id="tab-item-rdp" data-target="rdp">
            <span class="tab-dot green"></span>
            <span class="tab-title">test-edp</span>
            <span class="tab-sub">RDP - 192.168.83.128:3389</span>
            <span class="tab-close">✕</span>
          </div>
          <div class="workspace-tab-plus" id="tab-item-plus" title="Open Welcome Hub" data-target="hub">+</div>
        `;
      }
      bindDynamicTabEvents();
    }

    // 5. Update Sidebar active node highlight
    document.querySelectorAll('.tree-node').forEach(node => {
      const nodeTarget = node.dataset.target;
      if (nodeTarget === target) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  function bindDynamicTabEvents() {
    document.querySelectorAll('.workspace-tabs [data-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        switchView(el.dataset.target);
      });
    });
  }

  // Bind showcase switcher buttons
  showcaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.target);
    });
  });

  // Bind interactive clicks anywhere with data-target
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      const target = el.dataset.target;
      if (target) {
        switchView(target);
      }
    });
  });

  // Bind new connection / new terminal buttons
  const newConnBtn = document.getElementById('sidebar-new-btn');
  if (newConnBtn) {
    newConnBtn.addEventListener('click', () => switchView('hub'));
  }

  const newTermBtn = document.getElementById('sidebar-term-btn');
  if (newTermBtn) {
    newTermBtn.addEventListener('click', () => switchView('session'));
  }

  // Initial tab bindings
  bindDynamicTabEvents();

  // Smooth copy command helper
  const codeBox = document.getElementById('quick-start-box');
  if (codeBox) {
    codeBox.style.cursor = 'pointer';
    codeBox.title = 'Click to copy command';
    codeBox.addEventListener('click', () => {
      navigator.clipboard.writeText('cargo tauri dev').then(() => {
        const header = codeBox.querySelector('.terminal-code-header span:last-child');
        if (header) {
          const original = header.textContent;
          header.textContent = 'Copied to clipboard!';
          setTimeout(() => { header.textContent = original; }, 2000);
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Mockup tab switching
  const tabs = document.querySelectorAll('.mockup-tab');
  const termPrompt = document.getElementById('term-active-session');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.dataset.mode;
      if (termPrompt) {
        if (mode === 'ssh') {
          termPrompt.innerHTML = `<span class="term-prompt">manohar@prod-eu-west:</span><span class="term-path">~/rustius</span>$ <span class="term-cmd">systemctl status api</span><br>
<span class="term-out">&#9679; api.service - Core Engine API (Rust v0.1.0)<br>&nbsp;&nbsp;&nbsp;Active: active (running) since Sat 2026-10-10 01:20:00 UTC<br>&nbsp;&nbsp;&nbsp;Tasks: 8 (limit: 4915)<br>&nbsp;&nbsp;&nbsp;Memory: 18.2M (load: 0.04)</span><br>
<span class="term-prompt">manohar@prod-eu-west:</span><span class="term-path">~/rustius</span>$ <span class="term-cursor"></span>`;
        } else if (mode === 'pty') {
          termPrompt.innerHTML = `<span class="term-prompt">PS C:\Users\Developer></span> <span class="term-cmd">Get-Process rustius</span><br>
<span class="term-out">Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id ProcessName<br>-------  ------    -----      -----     ------     -- -----------<br>    382      24    32450      38920       0.42   9124 rustius</span><br>
<span class="term-prompt">PS C:\Users\Developer></span> <span class="term-cursor"></span>`;
        } else if (mode === 'rdp') {
          termPrompt.innerHTML = `<span class="term-out">[IronRDP Canvas Session Active]</span><br>
<span class="term-out">Target: windows-jumpbox.internal:3389 (1920x1080@60Hz)<br>FastPath PDU Stream: Established<br>Encryption: TLS 1.3 / Network Level Authentication (NLA)</span><br>
<span class="term-prompt">Remote Desktop:</span> <span class="term-cmd">Connected</span><br>
<span class="term-prompt">&gt;</span> <span class="term-cursor"></span>`;
        }
      }
    });
  });

  // Smooth copy command helper
  const codeBox = document.querySelector('.terminal-code-box');
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

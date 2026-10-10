// Rustius Website Client Script
document.addEventListener('DOMContentLoaded', () => {
  const codeBox = document.getElementById('quick-start-box');
  if (codeBox) {
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

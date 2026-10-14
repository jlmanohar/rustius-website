// Rustius Website Client Script
document.addEventListener('DOMContentLoaded', () => {
  const codeBox = document.getElementById('quick-start-box');
  if (codeBox) {
    codeBox.title = 'Click to copy build commands';
    codeBox.addEventListener('click', () => {
      const commands = 'git clone https://github.com/jlmanohar/rustius.git\ncd rustius\nnpm install\ncargo tauri build';
      navigator.clipboard
        .writeText(commands)
        .then(() => {
          const header = codeBox.querySelector('.terminal-code-header span:last-child');
          if (header) {
            const original = header.textContent;
            header.textContent = 'Copied to clipboard!';
            setTimeout(() => {
              header.textContent = original;
            }, 2000);
          }
        })
        .catch((err) => {
          console.error('Failed to copy to clipboard:', err);
        });
    });
  }
});
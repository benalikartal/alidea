const fs = require('fs');

// 1. Update HTML files
const htmlFiles = ['index.html', 'iarone.html', 'portfolio.html', 'team.html', 'websitesgo.html'];
const closeBtnHtml = `<button id="mobileNavCloseBtn" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; font-size: 3rem; cursor: pointer; color: var(--text-primary); z-index: 10005;">&times;</button>`;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Inject close button if not exists
    if (!content.includes('mobileNavCloseBtn')) {
        content = content.replace(/<div class="mobile-nav-overlay" id="mobileNavOverlay">/, `<div class="mobile-nav-overlay" id="mobileNavOverlay">\n        ${closeBtnHtml}`);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated HTML: ' + file);
    }
});

// 2. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');
if (!css.includes('.mobile-nav-links a.btn { color: #fff !important; }')) {
    css += `\n.mobile-nav-links a.btn { color: #fff !important; }\n`;
    fs.writeFileSync('styles.css', css, 'utf8');
    console.log('Updated styles.css');
}

// 3. Update script.js
let js = fs.readFileSync('script.js', 'utf8');
if (!js.includes('mobileNavCloseBtn')) {
    const jsAppend = `
document.addEventListener('DOMContentLoaded', () => {
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileNavCloseBtn');
    if (closeBtn && mobileOverlay) {
        closeBtn.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});
`;
    fs.appendFileSync('script.js', jsAppend, 'utf8');
    console.log('Updated script.js');
}

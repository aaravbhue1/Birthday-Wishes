// script.js – optimized for performance

(function() {
  // ----- 1. floating hearts (unicode) – reduced count -----
  const heartsContainer = document.getElementById('heartsContainer');
  const heartSymbols = ['❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '❤', '🧡', '💛'];
  const heartCount = 25; // down from 45

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    const size = 0.8 + Math.random() * 2.2;
    heart.style.fontSize = `${size}rem`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 18}s`;
    heart.style.animationDelay = `${Math.random() * -20}s`;
    heart.style.opacity = 0.2 + Math.random() * 0.4;
    heart.style.color = `hsl(${20 + Math.random() * 30}, 80%, 70%)`;
    heartsContainer.appendChild(heart);
  }

  // ----- 2. front page & main container -----
  const frontPage = document.getElementById('frontPage');
  const mainContainer = document.getElementById('mainContainer');
  const beginBtn = document.getElementById('beginBtn');

  beginBtn.addEventListener('click', () => {
    frontPage.style.opacity = '0';
    setTimeout(() => {
      frontPage.style.display = 'none';
      mainContainer.style.display = 'block';
    }, 500);
  });

  // ----- 3. page data & elements -----
  const pages = document.querySelectorAll('.page');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  const pageCounter = document.getElementById('pageCounter');
  const totalPages = pages.length;
  let currentPage = 0;

  // dots generation
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', function() {
      goToPage(parseInt(this.dataset.index));
    });
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll('.dot');

  function goToPage(index) {
    if (index < 0 || index >= totalPages) return;
    pages.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    currentPage = index;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    pageCounter.textContent = `Chapter ${index+1} of ${totalPages}`;
    prevBtn.disabled = (index === 0);
    if (index === totalPages - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-block';
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  });

  goToPage(0);

  // ----- 4. celebrate button & confetti + overlay -----
  const celebrateBtn = document.getElementById('celebrateBtn');
  const overlay = document.getElementById('thankYouOverlay');

  function explosionConfetti() {
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors: ['#ffb3a7', '#ff9f8c', '#fad5c0', '#f5a48e'] });
    setTimeout(() => {
      confetti({ particleCount: 80, spread: 160, origin: { y: 0.5, x: 0.3 }, startVelocity: 25 });
    }, 150);
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.4, x: 0.7 }, startVelocity: 20 });
    }, 300);
    setTimeout(() => {
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    }, 450);
  }

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      overlay.classList.add('show');
      explosionConfetti();
    });
  }

  // close overlay when clicking outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      goToPage(0);
    }
  });
})();
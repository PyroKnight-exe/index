const apologyParagraphs = [
  "Dear vixuu,",
  "I don't know where to start, but I'm really, really sorry. If I hurt you in any way, even unintentionally, please know that it was never my intention. You mean so much to me, you are my Kohinoor ka Heera Jo iiss johri ko Mila hai, and the last thing I would ever want is to be the reason behind your pain.",
  "Our friendship is very special to me. You're not just my best friend - you're someone I trust, care about, and feel lucky to have in my life. The thought of upsetting you honestly hurts me too.",
  "If I said something wrong or behaved in a way that disappointed you, I truly regret it. I'm still learning, still growing, and sometimes I make mistakes... but losing you is not something I can ever handle.",
  "Please forgive me. I promise to understand you better, respect your feelings more, and protect our friendship always.",
  "No ego. No attitude. Just a heart that values you a lot."
];

const apologyContainer = document.getElementById('apology-text');
const specialMessage = document.getElementById('special-message');
const forgiveBtn = document.getElementById('forgive-btn');
const thankYou = document.getElementById('thank-you');
const particlesHost = document.getElementById('floating-particles');

// Build Apology Paragraphs HTML
apologyParagraphs.forEach(text => {
  const p = document.createElement('p');
  p.innerHTML = text; // allow bolding or raw text
  apologyContainer.appendChild(p);
});

// Prepare Special Message for word-by-word reveal
function prepareSpecialText() {
  const text = specialMessage.innerHTML;
  const words = text.split(/(\s+|<br\s*\/?\s*>)/gi);
  
  specialMessage.innerHTML = words.map(chunk => {
    if (!chunk.trim() || /<br\s*\/?\s*>/i.test(chunk)) {
      return chunk;
    }
    return `<span class="word">${chunk}</span>`;
  }).join('');
}
prepareSpecialText();


// Initial State for elements
anime.set('.reveal', { opacity: 0, translateY: 30 });
anime.set('.polaroid', { opacity: 0, translateY: 40 });

// Hero Animation Sequence on Load
window.addEventListener('load', () => {
  const tl = anime.timeline({
    easing: 'easeOutCubic'
  });

  tl.add({
    targets: '#hero .hero-title',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1200,
    delay: 300
  })
  .add({
    targets: '#hero .hero-subtitle',
    opacity: [0, 1],
    translateY: [15, 0],
    duration: 1000
  }, '-=700')
  .add({
    targets: '.scroll-prompt',
    opacity: [0, 0.7],
    duration: 800
  }, '-=400');
});

// Use IntersectionObserver for softer reveal triggers
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

let apologyAnimated = false;
let specialAnimated = false;

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      
      // Specific logic for Letter section
      if (target.closest('#apology') && !apologyAnimated) {
        apologyAnimated = true;
        
        anime({
          targets: target.closest('.letter-paper'),
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1200,
          easing: 'easeOutQuart'
        });

        // Gently fade in each paragraph organically
        anime({
          targets: '#apology-text p',
          opacity: [0, 1],
          translateY: [15, 0],
          delay: anime.stagger(1200, {start: 500}), // Delay between paragraphs heavily to read along
          duration: 1500,
          easing: 'easeOutSine'
        });
        
        obs.unobserve(target);
        return;
      }
      
      // Logic for Special Message words
      if (target.id === 'special-message' && !specialAnimated) {
        specialAnimated = true;
        anime({
          targets: target,
          opacity: [0, 1],
          duration: 500,
          easing: 'linear'
        });
        
        anime({
          targets: '#special-message .word',
          opacity: [0, 1],
          translateY: [10, 0],
          rotate: [2, 0],
          delay: anime.stagger(150, {start: 300}), // Smooth reading stagger
          duration: 800,
          easing: 'easeOutQuad'
        });
        
        obs.unobserve(target);
        return;
      }

      // Standard reveals (Cards, Titles)
      if (target.classList.contains('reveal') && !target.classList.contains('letter-paper') && target.id !== 'special-message') {
        anime({
          targets: target,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          easing: 'easeOutQuart'
        });
        obs.unobserve(target);
      }
    }
  });
}, observerOptions);

// Attach observer
document.querySelectorAll('.reveal, .letter-paper, #special-message, .polaroid').forEach(el => observer.observe(el));


// Softer, organic ambient bokeh/particles instead of rigid hearts
const colors = ['#fce1e4', '#e8dff5', '#fce1f4', '#ffffff'];

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  
  // Random props
  const size = 3 + Math.random() * 8; // 3px to 11px
  const bg = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 10;
  const duration = 8000 + Math.random() * 6000;
  
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.backgroundColor = bg;
  p.style.left = `${startX}px`;
  p.style.top = `${startY}px`;
  p.style.opacity = Math.random() * 0.6 + 0.2; // 0.2 -> 0.8
  
  particlesHost.appendChild(p);
  
  // Float up softly
  anime({
    targets: p,
    translateY: -window.innerHeight - 50,
    translateX: () => (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 40),
    opacity: [
      { value: Math.random() * 0.5 + 0.4, duration: duration / 2 },
      { value: 0, duration: duration / 2 }
    ],
    duration: duration,
    easing: 'linear',
    complete: () => p.remove()
  });
}

// Stagger generation
setInterval(createParticle, 1200);

// Forgive Button Interaction
forgiveBtn.addEventListener('click', () => {
  // Button organic morph and fill
  anime({
    targets: forgiveBtn,
    scale: [1, 0.95, 1],
    backgroundColor: ['transparent', '#f7dadd'],
    color: ['#a85764', '#8c3b4a'],
    borderColor: ['#d49a9f', '#f7dadd'],
    duration: 600,
    easing: 'easeOutElastic(1, .8)'
  });

  // Burst of organic particles around button
  const rect = forgiveBtn.getBoundingClientRect();
  for (let i = 0; i < 20; i++) {
    const spark = document.createElement('div');
    spark.className = 'particle';
    const s = 4 + Math.random() * 6;
    spark.style.width = `${s}px`;
    spark.style.height = `${s}px`;
    spark.style.backgroundColor = i % 3 === 0 ? '#df6879' : '#fff'; // mix of red and white
    spark.style.left = `${rect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top + rect.height / 2}px`;
    spark.style.borderRadius = '50%';
    particlesHost.appendChild(spark);

    anime({
      targets: spark,
      translateX: anime.random(-80, 80),
      translateY: anime.random(-100, -20),
      scale: [1, 0],
      opacity: [1, 0],
      duration: 1000 + Math.random() * 800,
      easing: 'easeOutCirc',
      complete: () => spark.remove()
    });
  }

  // Reveal thank you gracefully
  thankYou.textContent = "My heart is yours. Thank you. 🌸";
  anime({
    targets: thankYou,
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 800,
    delay: 300,
    easing: 'easeOutCubic'
  });
  
  forgiveBtn.textContent = "Thank You ❤️";
  forgiveBtn.style.pointerEvents = "none"; // Disable after click
});

// Light Parallax mapped to scroll
const polaroids = document.querySelectorAll('.polaroid');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  polaroids.forEach(p => {
    const speed = parseFloat(p.getAttribute('data-speed'));
    // Very subtle shift upwards based on scroll
    p.style.transform = `translateY(${scrollY * -speed}px) ${p.classList.contains('p-left') ? 'rotate(-4deg)' : p.classList.contains('p-right') ? 'rotate(5deg)' : 'rotate(-1deg)'}`;
  });
}, {passive: true});
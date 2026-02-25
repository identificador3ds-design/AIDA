gsap.registerPlugin(SplitText);


let split = SplitText.create(".text", {
    type: "chars, words"
});

gsap.from(split.chars, {
    y: 100,
    autoAlpha: 0,
    stagger: 0.009,
});
// Certifique-se de incluir o script do GSAP no seu HTML
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

gsap.from(".card", {
  duration: 1,
  y: 60,          // Vem de baixo
  opacity: 0,     // Começa invisível
  stagger: 0.2,   // Anima um por um com atraso
  ease: "power4.out" // Transição suave e elegante
});

// Efeito de pulso no botão de seta ao passar o mouse no card
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.floating-btn'), {
      scale: 1.1,
      duration: 0.3
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.floating-btn'), {
      scale: 1,
      duration: 0.3
    });
  });
});

const icons = document.querySelectorAll('.icon-wrapper');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function highlightRandomIcons() {
  // Remove active de todos
  icons.forEach(el => el.classList.remove('active'));

  // Quantos ícones vamos destacar (1 a 3)
  const count = getRandomInt(1, 3);

  // Escolhe índices únicos
  const selected = new Set();
  while (selected.size < count) {
    selected.add(getRandomInt(0, icons.length - 1));
  }

  // Ativa os selecionados
  selected.forEach(index => {
    icons[index].classList.add('active');
  });
}

// Inicia imediatamente e repete
function loop() {
  highlightRandomIcons();
  const nextDelay = getRandomInt(900, 1600); // 0.9s a 1.6s
  setTimeout(loop, nextDelay);
}

loop();
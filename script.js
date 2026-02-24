gsap.registerPlugin(SplitText);


let split = SplitText.create(".text", {
    type: "chars, words"
});

gsap.from(split.chars, {
    y: 100,
    autoAlpha: 0,
    stagger: 0.009,
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
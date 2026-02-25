gsap.registerPlugin(SplitText);


//Conexão Banco
const supabaseUrl = 'https://nwzijdudhemuibsyzpub.supabase.co';
const supabaseKey = 'SUA_ANON_KEY_PUBLICA';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- LÓGICA DE REGISTRO ---
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const nome = document.getElementById('regName').value;

    const { data, error } = await _supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nome } }
    });

    if (error) alert("Erro no registro: " + error.message);
    else alert("Usuário criado! Verifique seu e-mail.");
});

// --- LÓGICA DE LOGIN ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Erro no login: " + error.message);
    } else {
        // Salva o nome do usuário para exibir na outra tela
        localStorage.setItem('usuarioNome', data.user.user_metadata.full_name);
        window.location.href = "../seleciona.html";
    }
});



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
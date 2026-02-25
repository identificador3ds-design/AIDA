//Conexão Banco
const supabaseUrl = 'https://nwzijdudhemuibsyzpub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emlqZHVkaGVtdWlic3l6cHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjk5MTAsImV4cCI6MjA4NzYwNTkxMH0.aDHymYEKtyY5m2eaOHoBy4QRpaAvtafi_PVDtrL9gQc';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função para exibir mensagens na tela (Estilizada)
const exibirMensagem = (texto, cor = "red") => {
    const feedback = document.getElementById('mensagem-feedback');
    feedback.innerText = texto;
    feedback.style.color = cor;
    // Limpa a mensagem após 5 segundos
    setTimeout(() => { feedback.innerText = ""; }, 5000);
};

// --- LÓGICA DE REGISTRO ---
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const nome = document.getElementById('regName').value;

    const { data: authData, error: authError } = await _supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nome } }
    });

    if (authError) {
        exibirMensagem("Erro: " + authError.message);
        return;
    }

    // Salva na tabela 'usuarios'
    await _supabase.from('usuarios').insert([{ nome, email }]);

    exibirMensagem("Cadastro realizado! Faça login.", "#10403b");
    
    // REDIRECIONA: Muda a visão para a parte de login após 2 segundos
    setTimeout(() => { toggleView(); }, 2000); 
});

// --- LÓGICA DE LOGIN ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailDigitado = document.getElementById('loginEmail').value;
    const senhaDigitada = document.getElementById('loginPassword').value;

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: emailDigitado,
        password: senhaDigitada
    });

    if (error) {
        exibirMensagem("Erro no login: " + error.message);
    } else {
        const nomeUsuario = data.user.user_metadata.full_name;
        localStorage.setItem('usuarioNome', nomeUsuario);
        
        exibirMensagem("Sucesso! Entrando...", "#10403b");
        
        // REDIRECIONA: Vai para a tela seleciona.html
        setTimeout(() => {
            window.location.href = "../seleciona.html";
        }, 1000);
    }
});



const signinForm = document.querySelector(".form.signin");
const signupForm = document.querySelector(".form.signup");
const cardBg1 = document.querySelector(".card-bg-1");
const cardBg2 = document.querySelector(".card-bg-2");

const toggleView = () => {
  const signinActive = signinForm.classList.contains("active");

  signinForm.classList.toggle("active", !signinActive);
  signupForm.classList.toggle("active", signinActive);

  [cardBg1, cardBg2].forEach((el) =>
    el.classList.toggle("signin", signinActive)
  );
  [cardBg1, cardBg2].forEach((el) =>
    el.classList.toggle("signup", !signinActive)
  );
};

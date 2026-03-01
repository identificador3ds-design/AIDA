// Função para criar o alerta estilizado na tela
function mostrarAlerta(mensagem) {
    // 1. Cria o container se ele não existir
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Cria o card do alerta
    const toast = document.createElement('div');
    toast.className = 'toast-card';
    toast.innerText = mensagem;

    // 3. Adiciona ao container
    container.appendChild(toast);

    // 4. Remove automaticamente após 4 segundos
    setTimeout(() => {
        toast.classList.add('fadeOut');
        setTimeout(() => toast.remove(), 500);
    }, 4000);

    // 5. Fechar ao clicar
    toast.onclick = () => toast.remove();
}

// --- COMO USAR ---
// No lugar de alert("Mensagem"), use: mostrarAlerta("Sua mensagem aqui");

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const imagemPreview = document.getElementById('imagemPreview');
    const placeholderImagem = document.getElementById('placeholderImagem');
    const btnVerificar = document.getElementById('btnVerificar');

    // 1. Tenta recuperar a imagem salva no localStorage
    const imagemSalva = localStorage.getItem('AIDA_ImagemSelecionada');

    if (imagemSalva) {
        // Se houver imagem, exibe ela e esconde o placeholder
        imagemPreview.src = imagemSalva;
        imagemPreview.hidden = false;
        placeholderImagem.hidden = true;
        console.log("AIDA: Imagem carregada do localStorage.");
    } else {
        // Se não houver, avisa e mantém o placeholder
        console.warn("AIDA: Nenhuma imagem encontrada no localStorage. Volte para a tela de seleção.");
        // Opcional: Redirecionar automaticamente após alguns segundos
        // setTimeout(() => { window.location.href = '../Ferramenta/index-seleciona.html'; }, 3000);
    }

    // 2. Ação do Botão VERIFICAR (Exemplo básico)
    btnVerificar.addEventListener('click', () => {
        const tipo = document.getElementById('tipoImagem').value;
        const metodo = document.getElementById('metodoAnalise').value;

        if (!metodo) {
            mostrarAlerta("Por favor, selecione um método de análise.")
            return;
        }

        console.log(`Iniciando análise...`);
        console.log(`Tipo: ${tipo || 'Não informado'}`);
        console.log(`Método: ${metodo}`);
        mostrarAlerta(`Análise iniciada via método '${metodo}'.`);
        
        // Aqui você faria a chamada para o seu backend PHP/Python para processar a imagem
    });
});
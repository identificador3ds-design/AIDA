// 1. Função do Alerta (Essencial estar aqui para o botão funcionar)
function mostrarAlerta(mensagem) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-card';
    toast.innerText = mensagem;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fadeOut');
        setTimeout(() => toast.remove(), 500);
    }, 4000);

    toast.onclick = () => toast.remove();
}

// 2. Lógica Principal
document.addEventListener('DOMContentLoaded', () => {
    const imagemPreview = document.getElementById('imagemPreview');
    const placeholderImagem = document.getElementById('placeholderImagem');
    const btnVerificar = document.getElementById('btnVerificar');

    // Recupera a imagem salva no navegador
    const imagemSalva = localStorage.getItem('AIDA_ImagemSelecionada');

    if (imagemSalva && imagemPreview) {
        imagemPreview.src = imagemSalva;
        imagemPreview.hidden = false;
        if (placeholderImagem) placeholderImagem.hidden = true;
    }

    // CONFIGURAÇÃO DO BOTÃO VERIFICAR
    if (btnVerificar) {
        // Substitua o evento de clique do btnVerificar
        btnVerificar.addEventListener('click', async () => {
            const metodo = document.getElementById('metodoAnalise').value;
            const imagemBase64 = localStorage.getItem('AIDA_ImagemSelecionada'); //
            const loading = document.getElementById('loading');
            const areaResultado = document.getElementById('areaResultado');

            if (!metodo || !imagemBase64) {
                mostrarAlerta("Selecione o método e uma imagem!");
                return;
            }

            // Mostra feedback visual de carregamento
            areaResultado.style.display = 'none';
            loading.style.display = 'block';
            loading.scrollIntoView({ behavior: 'smooth', block: 'center' });

            try {
                // Envia para o Flask (mesmo estando em pastas diferentes no seu PC)
                const response = await fetch('http://localhost:5000/analisar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imagem: imagemBase64 })
                });

                const dados = await response.json();

                if (dados.status === "sucesso") {
                    loading.style.display = 'none';
                    areaResultado.style.display = 'block';

                    // Atualiza os elementos do seu HTML
                    document.getElementById('imagemProcessada').src = dados.imagem_fft;
                    document.getElementById('porcentagemIA').innerText = dados.probabilidade;
                    document.getElementById('tituloMetodo').innerText = "Análise de Frequência (FFT)";
                    document.getElementById('textoMetodo').innerText = `A análise detectou uma energia de alta frequência de ${dados.energia}.`;
                    
                    mostrarAlerta("Análise concluída!");
                    areaResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (erro) {
                loading.style.display = 'none';
                mostrarAlerta("Erro ao conectar com o servidor Python.");
            }
        });
    }
});
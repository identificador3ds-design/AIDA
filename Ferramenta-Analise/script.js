// 1. Função do Alerta
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

    const imagemSalva = localStorage.getItem('AIDA_ImagemSelecionada');

    if (imagemSalva && imagemPreview) {
        imagemPreview.src = imagemSalva;
        imagemPreview.hidden = false;
        if (placeholderImagem) placeholderImagem.hidden = true;
    }

    if (btnVerificar) {
        btnVerificar.addEventListener('click', async () => {
            const metodoSelecionado = document.getElementById('metodoAnalise').value;
            const imagemBase64 = localStorage.getItem('AIDA_ImagemSelecionada');
            const loading = document.getElementById('loading');
            const areaResultado = document.getElementById('areaResultado');

            if (!metodoSelecionado || !imagemBase64) {
                mostrarAlerta("Selecione o método e uma imagem!");
                return;
            }

            areaResultado.style.display = 'none';
            loading.style.display = 'block';
            loading.scrollIntoView({ behavior: 'smooth', block: 'center' });

            try {
                const response = await fetch('http://localhost:5000/analisar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        imagem: imagemBase64,
                        metodo: metodoSelecionado 
                    })
                });

                const dados = await response.json();

                if (dados.status === "sucesso") {
                    loading.style.display = 'none';
                    areaResultado.style.display = 'block';

                    document.getElementById('imagemProcessada').src = dados.imagem_fft;
                    document.getElementById('porcentagemIA').innerText = dados.probabilidade;
                    document.getElementById('tituloMetodo').innerText = dados.metodo;

                    if (dados.energia === "N/A (Assinatura Digital)") {
                        document.getElementById('textoMetodo').innerText = `Identificado via metadados: ${dados.metodo}. Esta imagem possui assinaturas digitais explícitas de IA.`;
                    } else if (dados.energia === "N/A (Marca Visual)") {
                        document.getElementById('textoMetodo').innerText = `Identificado visualmente: ${dados.metodo}. Foi detectada a logomarca padrão de IA no canto da imagem.`;
                    } else {
                        document.getElementById('textoMetodo').innerText = `A análise técnica de frequências detectou uma energia de ${dados.energia}.`;
                    }
                    
                    mostrarAlerta("Análise concluída!");
                    areaResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    throw new Error(dados.mensagem);
                }
            } catch (erro) {
                loading.style.display = 'none';
                mostrarAlerta("Erro ao processar imagem.");
            }
        });
    }
});
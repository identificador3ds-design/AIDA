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
        btnVerificar.addEventListener('click', () => {
            const metodo = document.getElementById('metodoAnalise').value;
            const imagemOriginal = localStorage.getItem('AIDA_ImagemSelecionada');
            const loading = document.getElementById('loading');
            const areaResultado = document.getElementById('areaResultado');

            if (!metodo) {
                mostrarAlerta("Por favor, selecione um método de análise.");
                return;
            }

            // 1. Esconde resultado anterior e mostra o loading
            areaResultado.style.display = 'none';
            loading.style.display = 'block';
            loading.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // 2. Simula o tempo de análise (2 segundos)
            setTimeout(() => {
                loading.style.display = 'none'; // Esconde o loading
                areaResultado.style.display = 'block'; // Mostra o resultado

                // Preenche os dados
                document.getElementById('imagemProcessada').src = imagemOriginal;
                document.getElementById('porcentagemIA').innerText = "87%";
                
                const titMetodo = document.getElementById('tituloMetodo');
                const txtMetodo = document.getElementById('textoMetodo');

                if(metodo === "FFT") {
                    titMetodo.innerText = "Análise de Frequência (FFT)";
                    txtMetodo.innerText = "O método identificou ruídos de alta frequência consistentes com geradores de IA modernos.";
                } else {
                    titMetodo.innerText = `Método: ${metodo}`;
                    txtMetodo.innerText = "Análise concluída com sucesso baseada nos parâmetros estatísticos.";
                }

                mostrarAlerta("Análise concluída!");
                areaResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
            }, 2000); // 2000 milissegundos = 2 segundos
        });
    }
});
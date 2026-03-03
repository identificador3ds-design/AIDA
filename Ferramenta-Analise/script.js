// Mantenha sua função mostrarAlerta(mensagem) aqui em cima...

document.addEventListener('DOMContentLoaded', () => {
    const imagemPreview = document.getElementById('imagemPreview');
    const placeholderImagem = document.getElementById('placeholderImagem');
    const btnVerificar = document.getElementById('btnVerificar');

    // 1. Tenta recuperar a imagem salva
    const imagemSalva = localStorage.getItem('AIDA_ImagemSelecionada');

    if (imagemSalva && imagemPreview) {
        // Exibe a imagem e esconde o placeholder
        imagemPreview.src = imagemSalva;
        imagemPreview.hidden = false;
        if (placeholderImagem) placeholderImagem.hidden = true;
    }

    // 2. Lógica do botão verificar
    if (btnVerificar) {
        btnVerificar.addEventListener('click', () => {
            const metodo = document.getElementById('metodoAnalise').value;
            if (!metodo) {
                mostrarAlerta("Por favor, selecione um método de análise.");
                return;
            }
            mostrarAlerta(`Análise iniciada via método '${metodo}'.`);
        });
    }
});
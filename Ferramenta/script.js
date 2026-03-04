document.addEventListener('DOMContentLoaded', () => {
    const btnAcaoSelecionar = document.getElementById('btnAcaoSelecionar');
    const inputFileBotao = document.getElementById('inputFileBotao');

    if (btnAcaoSelecionar && inputFileBotao) {
        btnAcaoSelecionar.addEventListener('click', () => {
            inputFileBotao.click();
        });

        inputFileBotao.addEventListener('change', () => {
            const arquivo = inputFileBotao.files[0];
            if (arquivo) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Guarda na memória do navegador
                    localStorage.setItem('AIDA_ImagemSelecionada', e.target.result);
                    // Vai para a tela de análise
                    window.location.href = "../Ferramenta-Analise/index-analise.html"; 
                };
                reader.readAsDataURL(arquivo);
            }
        });
    }
});
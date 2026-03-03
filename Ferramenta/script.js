document.addEventListener('DOMContentLoaded', () => {
    const btnAcaoSelecionar = document.getElementById('btnAcaoSelecionar');
    const inputFileBotao = document.getElementById('inputFileBotao');

    if (btnAcaoSelecionar && inputFileBotao) {
        // Abre a janela de seleção de arquivo
        btnAcaoSelecionar.addEventListener('click', () => {
            inputFileBotao.click();
        });

        // Quando o usuário escolhe a imagem
        inputFileBotao.addEventListener('change', () => {
            const arquivo = inputFileBotao.files[0];
            if (arquivo) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    // SALVA A IMAGEM (Mesma chave que a outra tela procura)
                    localStorage.setItem('AIDA_ImagemSelecionada', e.target.result);
                    
                    // DIRECIONA PARA A TELA DE ANÁLISE
                    // Ajuste o caminho abaixo se a pasta for diferente
                    window.location.href = "../Ferramenta-Analise/index-analise.html"; 
                };
                
                reader.readAsDataURL(arquivo);
            }
        });
    }
});
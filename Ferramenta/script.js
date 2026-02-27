// Selecionar Imagem - Ferramenta
const btnAcao = document.getElementById('btnAcaoSelecionar');
const inputFile = document.getElementById('inputFileBotao');


btnAcao.addEventListener('click', () => {
    inputFile.click();
});


inputFile.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
        const nomeArquivo = event.target.files[0].name;
        console.log(`Arquivo selecionado: ${nomeArquivo}`);

    }
});
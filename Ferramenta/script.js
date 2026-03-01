// No seu script.js da pasta "Ferramenta"
const btnAcao = document.getElementById('btnAcaoSelecionar');
const inputFile = document.getElementById('inputFileBotao');

btnAcao.addEventListener('click', () => {
    inputFile.click();
});

inputFile.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            // Salva os dados da imagem no navegador
            localStorage.setItem('AIDA_Image_Preview', e.target.result);
            // Vai para a próxima tela
            window.location.href = "../Ferramenta-Analise/index-analise.html";
        };

        reader.readAsDataURL(file);
    }
});
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value.trim(); // Remove espaços extras
    const numero = document.getElementById('numero').value.trim(); // Remove espaços extras
    const resultDiv = document.getElementById('result');

    // Limpar o conteúdo da div de resultado antes de iniciar uma nova busca
    resultDiv.innerHTML = '';

    const csvUrl = 'base.csv';

    Papa.parse(csvUrl, {
        download: true,
        delimiter: ';', // Define o separador de campo como ponto e vírgula
        header: true,
        complete: function(results) {
            const data = results.data;
            let found = false;

            for (let row of data) {
                if (row.CEP === cep && row.NUMERO === numero) { // Use NUMERO em vez de Numero
                    found = true;
                    break;
                }
            }

            if (found) {
                resultDiv.innerHTML = '<p style="color: green;">Possui Viabilidade.</p>';
            } else {
                resultDiv.innerHTML = '<p style="color: red;">Não possui Viabilidade.</p>';
            }
        },
        error: function(error) {
            resultDiv.innerHTML = `<p style="color: red;">Erro ao processar o arquivo: ${error.message}</p>`;
        }
    });
});

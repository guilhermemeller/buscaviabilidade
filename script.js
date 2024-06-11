document.getElementById('cep').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value.trim(); // Remove espaços extras
    const numero = document.getElementById('numero').value.trim(); // Remove espaços extras
    const resultDiv = document.getElementById('result');
    const modal = document.getElementById('resultModal');
    const modalMessage = document.getElementById('modalMessage');

    // Verifica se o CEP está vazio ou contém apenas espaços
    if (!cep || cep.length === 0) {
        modalMessage.innerHTML = 'Por favor, insira um CEP válido.';
        modal.style.display = 'block';
        return;
    }

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
                modalMessage.innerHTML = `<span style="color: green;">O CEP ${cep}, número ${numero} Possui Viabilidade ✔.</span>`;
            } else {
                modalMessage.innerHTML = `<span style="color: red;">O CEP ${cep}, número ${numero} Não Possui Viabilidade ✖.</span>`;
            }
            modal.style.display = 'block';
        },
        error: function(error) {
            modalMessage.innerHTML = `Erro ao processar o arquivo: ${error.message}`;
            modal.style.display = 'block';
        }
    });
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('cep').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('result').innerHTML = '';
});

document.getElementById('okButton').addEventListener('click', function() {
    document.getElementById('cep').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('resultModal').style.display = 'none';
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('resultModal').style.display = 'none';
});

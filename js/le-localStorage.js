document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data");
    const btnAnterior = document.getElementById("log__data__anterior");
    const btnProximo = document.getElementById("log__data__proximo");
    const form = document.getElementById("log-form");

    // Define a data padrão no input
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const diaAtual = dataAtual.getDate().toString().padStart(2, "0");
    const dataFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`;
    dataInput.value = dataFormatada;
    dataInput.max = dataFormatada; // Define a data máxima como a data atual
    dataInput.min = "1800-01-01"; // Define a data mínima, se necessário

    // Define a função para atualizar os campos do formulário com base na data selecionada
    function updateFormData() {
        const dataSelecionada = dataInput.value;
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logData = logs.find(log => log.data === dataSelecionada);

        if (logData) {
            // Preencha os campos do formulário com os dados salvos
            // Aqui, você deve preencher todos os campos com os valores do logData
        } else {
            // Se não houver dados para a data selecionada, limpe os campos do formulário
            // Aqui, você deve limpar todos os campos do formulário
        }
    }

    // Manipula o evento de clique no botão anterior
    btnAnterior.addEventListener("click", function(event) {
        event.preventDefault();
        const dataSelecionada = new Date(dataInput.value);
        dataSelecionada.setDate(dataSelecionada.getDate() - 1);
        dataInput.value = dataSelecionada.toISOString().split("T")[0];
        updateFormData();
    });

    // Manipula o evento de clique no botão próximo
    btnProximo.addEventListener("click", function(event) {
        event.preventDefault();
        const dataSelecionada = new Date(dataInput.value);
        dataSelecionada.setDate(dataSelecionada.getDate() + 1);
        dataInput.value = dataSelecionada.toISOString().split("T")[0];
        updateFormData();
        
        // Verifica se a data selecionada é igual à data atual
        if (dataInput.value === dataFormatada) {
            // Desabilite o botão próximo
            btnProximo.disabled = true;
        } else {
            // Habilita o botão próximo se a data não for igual à data atual
            btnProximo.disabled = false;
        }
    });

    // Verifica se a data selecionada é igual à data atual e desabilite o botão próximo, se necessário
    if (dataInput.value === dataFormatada) {
        btnProximo.disabled = true;
    }
    
    // Adicione um evento de envio do formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = dataInput.value;
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logData = logs.find(log => log.data === data);

        if (logData) {
            // Se já existe um registro na data selecionada, desabilite o botão de envio
            document.getElementById('envia_log').disabled = true;
        } else {
            // Caso contrário, continue com o processo de envio do log
            const peso = document.getElementById('label-peso').value;
            // Preencha os outros campos como necessário
            const novoLogData = {
                data,
                peso,
                // Preencha os outros campos
            };
            logs.push(novoLogData);
            localStorage.setItem('logs', JSON.stringify(logs));
        }
    });
    
    // Execute a função para preencher os campos do formulário quando a página carregar
    updateFormData();
});
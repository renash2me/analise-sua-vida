document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data");
    const btnAnterior = document.getElementById("log__data__anterior");
    const btnProximo = document.getElementById("log__data__proximo");
    const form = document.getElementById("log-form");
    const submitButton = document.getElementById("envia_log");
    const logRegisteredMessage = document.getElementById("log-registered-message");

    let dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const diaAtual = dataAtual.getDate().toString().padStart(2, "0");
    const dataFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`;

    dataInput.value = dataFormatada;
    dataInput.max = dataFormatada;

    function updateFormData(dataSelecionada) {
        const dataFormatada = dataSelecionada.toISOString().split("T")[0];
        dataInput.value = dataFormatada;
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logData = logs.find(log => log.data === dataFormatada);

        if (logData) {
            document.getElementById('label-peso').value = logData.peso;
            document.getElementById('label-exercicio-peso').checked = logData.exercicioPeso;
            document.getElementById('label-exercicio-aerobio').checked = logData.exercicioAerobio;
            document.getElementById('label-alimentacao').checked = logData.alimentacao;
            document.getElementById('label-medicamento').checked = logData.medicamento;
            document.getElementById('label-applewatch').checked = logData.applewatch;
            document.getElementById('label-sono').checked = logData.sono;
            submitButton.style.display = "none";
            logRegisteredMessage.style.display = "block";
        } else {
            document.getElementById('label-peso').value = '';
            document.getElementById('label-exercicio-peso').checked = false;
            document.getElementById('label-exercicio-aerobio').checked = false;
            document.getElementById('label-alimentacao').checked = false;
            document.getElementById('label-medicamento').checked = false;
            document.getElementById('label-applewatch').checked = false;
            document.getElementById('label-sono').checked = false;
            submitButton.style.display = "block";
            logRegisteredMessage.style.display = "none";
        }

        if (dataFormatada === dataInput.max) {
            btnProximo.disabled = true;
        } else {
            btnProximo.disabled = false;
        }
    }

    btnAnterior.addEventListener("click", function(event) {
        event.preventDefault();
        const dataAnterior = new Date(dataInput.value);
        dataAnterior.setDate(dataAnterior.getDate() - 1);
        updateFormData(dataAnterior);

        btnProximo.disabled = false;
    });

    btnProximo.addEventListener("click", function(event) {
        event.preventDefault();
        const dataSeguinte = new Date(dataInput.value);
        dataSeguinte.setDate(dataSeguinte.getDate() + 1);
        updateFormData(dataSeguinte);

        if (dataSeguinte.toISOString().split("T")[0] === dataInput.max) {
            btnProximo.disabled = true;
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const dataFormatada = dataInput.value;
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const logData = logs.find(log => log.data === dataFormatada);

        if (!logData) {
            const peso = document.getElementById('label-peso').value;
            const exercicioPeso = document.getElementById('label-exercicio-peso').checked;
            const exercicioAerobio = document.getElementById('label-exercicio-aerobio').checked;
            const alimentacao = document.getElementById('label-alimentacao').checked;
            const medicamento = document.getElementById('label-medicamento').checked;
            const applewatch = document.getElementById('label-applewatch').checked;
            const sono = document.getElementById('label-sono').checked;

            const novoLogData = {
                data: dataFormatada,
                peso,
                exercicioPeso,
                exercicioAerobio,
                alimentacao,
                medicamento,
                applewatch,
                sono
            };

            logs.push(novoLogData);
            localStorage.setItem('logs', JSON.stringify(logs));
        }
    });

    updateFormData(dataAtual);
});

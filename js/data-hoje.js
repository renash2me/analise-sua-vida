document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data");
    const btnAnterior = document.getElementById("log__data__anterior");
    const btnProximo = document.getElementById("log__data__proximo");

    // Obtém a data atual
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const diaAtual = dataAtual.getDate().toString().padStart(2, "0");
    const dataFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`;

    // Define a data padrão no input
    dataInput.value = dataFormatada;
    dataInput.max = dataFormatada; // Define a data máxima como a data atual
    dataInput.min = "1800-01-01"; // Define a data mínima, se necessário

    // Manipula o evento de clique no botão anterior
    btnAnterior.addEventListener("click", function(event) {
      event.preventDefault(); // Impede que o formulário seja enviado
      const dataSelecionada = new Date(dataInput.value);
      dataSelecionada.setDate(dataSelecionada.getDate() - 1);
      dataInput.value = dataSelecionada.toISOString().split("T")[0];
      // Habilita o botão próximo
      btnProximo.disabled = false;
    });

    // Manipula o evento de clique no botão próximo
    btnProximo.addEventListener("click", function(event) {
      event.preventDefault(); // Impede que o formulário seja enviado
      const dataSelecionada = new Date(dataInput.value);
      dataSelecionada.setDate(dataSelecionada.getDate() + 1);
      dataInput.value = dataSelecionada.toISOString().split("T")[0];

      // Verifica se a data selecionada é igual à data atual
      if (dataInput.value === dataFormatada) {
        // Desabilita o botão próximo
        btnProximo.disabled = true;
      }
    });

    // Verifica se a data selecionada é igual à data atual e desabilita o botão próximo, se necessário
    if (dataInput.value === dataFormatada) {
      btnProximo.disabled = true;
    }
  });
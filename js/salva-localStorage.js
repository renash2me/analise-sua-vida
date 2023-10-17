            // Adicione um evento de envio do formulário
            document.getElementById('log-form').addEventListener('submit', function (event) {
                event.preventDefault(); // Impede o envio do formulário padrão
        
                // Obtenha os dados do formulário
                const data = document.getElementById('data').value;
                const peso = document.getElementById('label-peso').value;
                const exercicioPeso = document.getElementById('label-exercicio-peso').checked;
                const exercicioAerobio = document.getElementById('label-exercicio-aerobio').checked;
                const alimentacao = document.getElementById('label-alimentacao').checked;
                const medicamento = document.getElementById('label-medicamento').checked;
                const applewatch = document.getElementById('label-applewatch').checked;
                const sono = document.getElementById('label-sono').checked;
        
                // Crie um objeto com os dados
                const logData = {
                    data,
                    peso,
                    exercicioPeso,
                    exercicioAerobio,
                    alimentacao,
                    medicamento,
                    applewatch,
                    sono
                };
        
                // Verifique se já existem registros no localStorage
                let logs = JSON.parse(localStorage.getItem('logs')) || [];
        
                // Adicione o novo registro aos registros existentes
                logs.push(logData);
        
                // Salve os registros atualizados no localStorage
                localStorage.setItem('logs', JSON.stringify(logs));
        
                // Limpe o formulário
                document.getElementById('label-peso').value = '';
                // Limpe outros campos do formulário
        
                // Atualize ou renderize a lista de registros, se necessário
            });
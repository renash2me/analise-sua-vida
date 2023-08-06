// script.js

const dropdowns = document.querySelectorAll('select');
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');

// Evento de mudança nos dropdowns
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', () => {
        // Calcula a média das respostas "sim"
        const averageRating = calculateAverageRating();
        // Atualiza a classificação e a exibição das estrelas
        selectedRating = averageRating;
        updateRating();
    });
});

// Função para calcular a média das respostas "sim"
function calculateAverageRating() {
    const totalDropdowns = dropdowns.length;
    let totalSim = 0;

    dropdowns.forEach(dropdown => {
        if (dropdown.value === 'sim') {
            totalSim++;
        }
    });

    return (totalSim / totalDropdowns) * 5;
}

// Função para atualizar a exibição da classificação
function updateRating() {
    ratingValue.textContent = selectedRating.toFixed(2); // Arredonda para 2 casas decimais
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.remove('star-empty');
            star.classList.add('star-filled');
        } else {
            star.classList.remove('star-filled');
            star.classList.add('star-empty');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-commento');
    const feedbackMessage = document.getElementById('feedback-message');
    const commentiWrapper = document.getElementById('commenti-wrapper');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);

        fetch('salva_commento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                feedbackMessage.textContent = data.message;
                feedbackMessage.style.color = 'green';
                form.reset();
                caricaCommenti(); // Ricarica i commenti dopo l'invio
            } else {
                feedbackMessage.textContent = data.message;
                feedbackMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            feedbackMessage.textContent = 'Si è verificato un errore durante l\'invio del commento.';
            feedbackMessage.style.color = 'red';
        });
    });

    function caricaCommenti() {
        fetch('commenti.txt')
        .then(response => response.text())
        .then(data => {
            const commenti = data.trim().split('\n').map(JSON.parse);
            commentiWrapper.innerHTML = commenti.map(commento => `
                <div class="commento">
                    <div class="commento-contenuto">
                        <h4>${commento.nome}</h4>
                        <p>${commento.commento}</p>
                        <span class="data">${commento.data}</span>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Errore nel caricamento dei commenti:', error);
        });
    }

    // Carica i commenti all'avvio della pagina
    caricaCommenti();
});

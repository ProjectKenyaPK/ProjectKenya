document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-commento');
    const feedbackMessage = document.getElementById('feedback-message');
    const commentiWrapper = document.getElementById('commenti-wrapper');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);

        feedbackMessage.textContent = 'Invio del commento in corso...';
        feedbackMessage.style.color = 'blue';

        fetch('salva_commento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta al server');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                feedbackMessage.textContent = data.message;
                feedbackMessage.style.color = 'green';
                form.reset();
                caricaCommenti();
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento dei commenti');
            }
            return response.text();
        })
        .then(data => {
            if (!data.trim()) {
                commentiWrapper.innerHTML = '<p>Nessun commento presente.</p>';
                return;
            }
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
            commentiWrapper.innerHTML = '<p>Errore nel caricamento dei commenti.</p>';
        });
    }

    caricaCommenti();
});

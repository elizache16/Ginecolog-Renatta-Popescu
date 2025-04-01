document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');

    // Setează limba implicită
    let currentLang = 'ro';

    // Funcția de traducere
    function translatePage(lang) {
        currentLang = lang;

        // Traduce elementele cu clasa 'lang'
        document.querySelectorAll('.lang').forEach(element => {
            const key = element.getAttribute('data-text');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Traduce placeholder-urile
        document.querySelectorAll('.lang-placeholder').forEach(element => {
            const key = element.getAttribute('data-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Actualizează atributul lang al documentului
        document.documentElement.lang = lang;
    }

    // Event listeners pentru steaguri
    languageSelector.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const lang = e.target.getAttribute('data-lang');
            translatePage(lang);
        }
    });

    // Inițializează pagina în română
    translatePage('ro');
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Afișăm un mesaj de așteptare
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Se trimite...';
    
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Solicitarea dumneavoastră a fost trimisă cu succes! Vă vom contacta în cel mai scurt timp.');
            this.reset();
        } else {
            alert('A apărut o eroare. Vă rugăm să încercați din nou sau să ne contactați telefonic.');
        }
    })
    .catch(error => {
        alert('A apărut o eroare. Vă rugăm să încercați din nou sau să ne contactați telefonic.');
    })
    .finally(() => {
        button.textContent = originalText;
    });
}); 
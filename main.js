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

document.getElementById('appointment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    fetch('process-form.php', {
        method: 'POST',
        body: new FormData(this)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                this.reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert('A apărut o eroare. Vă rugăm să încercați din nou sau să ne contactați telefonic.');
        });
}); 
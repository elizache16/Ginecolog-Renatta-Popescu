document.addEventListener('DOMContentLoaded', function () {
    // Verificăm dacă translations există
    if (typeof window.translations === 'undefined') {
        console.error('translations nu este definit!');
        return;
    }

    // Debug - afișăm obiectul translations
    console.log('Obiectul translations:', window.translations);

    // Selectăm toate imaginile steagurilor
    const languageFlags = document.querySelectorAll('.language-selector img');
    console.log('Steaguri găsite:', languageFlags.length);

    // Funcția pentru schimbarea limbii
    function changeLanguage(lang) {
        console.log('Schimbare limbă în:', lang);

        // Verificăm dacă limba există
        if (!window.translations[lang]) {
            console.error('Limba', lang, 'nu există în translations');
            return;
        }

        document.querySelectorAll('.lang').forEach(element => {
            const key = element.getAttribute('data-text');
            console.log('Element:', element);
            console.log('Cheie:', key);
            console.log('Valoare găsită:', window.translations[lang][key]);

            if (window.translations[lang] && window.translations[lang][key]) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = window.translations[lang][key];
                } else {
                    element.textContent = window.translations[lang][key];
                }
            }
        });
    }

    // Adăugăm event listeners pentru fiecare steag
    languageFlags.forEach(flag => {
        flag.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            console.log('Steag click:', lang);
            changeLanguage(lang);
        });
    });

    // Setăm limba implicită la română
    changeLanguage('ro');
});

document.getElementById('appointment-form').addEventListener('submit', function (e) {
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
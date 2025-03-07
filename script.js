'use strict'

// ZIEL
// wenn beim runterscrollen genug platz für nächste content-div
//     dann füge dem content-div klassse .show zu
// wenn beim hochscrollen Platz zu klein wird
//     dann klasse .show von content-div entfernen


// EINGABE



// VERARBEITUNG
document.addEventListener('DOMContentLoaded', function() {
    const contents = document.querySelectorAll('.content');

    // Die ersten drei .Content.divs immer sichtbar machen
    contents.forEach((content, index) => {
        if (index <= 2) {
            content.classList.add('show');
        }
    });

    // Oberserver-Optionen: Hier wird festgelegt, dass ein Element ab als 80% sichtbar gilt
    const observerOptions = {
        threshold: 0.5
    };

    // IntersectionObserver-Callback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ermitteln des Index des beobachteten Elements
            const index = Array.from(contents).indexOf(entry.target);

            // Überprüfung der Sichtbarkeit
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
            else {
                if (index > 2) {
                    entry.target.classList.remove('show');
                }
            }
        })
    }, observerOptions);

    // Beobachtung der entsprechenden Elemente
    contents.forEach((content, index) => {
        if (index > 2) {
            observer.observe(content);
        }
    });

})
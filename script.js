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
        threshold: 0.8,
        // Erweitern der Beobachtung horizontal, sodass X-Verschiebungen ignoriert werden
        rootMargin: '0px 10000px 0px 10000px'
    };

    // IntersectionObserver-Callback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ermitteln des Index des beobachteten Elements
            const index = Array.from(contents).indexOf(entry.target);

            // Zuerst: Bei intersecting-Elementen -> Klasse hinzufügen
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });

        const nonIntersecting = entries.filter(entry => !entry.isIntersecting);
        
        // Überprüfen, ob es nicht-intersecting Elemente gibt
        if (nonIntersecting.length > 0) {

            // Bestimmen des Elements, das am weitesten unten liegt
            const bottomEntry = nonIntersecting.reduce((prev, curr) => {
                return curr.boundingClientRect.top > prev.boundingClientRect.top ? curr : prev;
            });

            // Prüfung, ob das unterste Element tatsächlich vom unteren Rand verschwindet
            if (bottomEntry.boundingClientRect.top > 0) {
                // Ermitteln des Index des Elements in der Gesamtliste
            const index = Array.from(contents).indexOf(bottomEntry.target);

            // Entfernen der Klasse .show bei Erfüllung der Bedingung
            if (index > 2) {
                bottomEntry.target.classList.remove('show');
            }
            }            
        }
    }, observerOptions);

    // Beobachtung der entsprechenden Elemente
    contents.forEach((content, index) => {
        if (index > 2) {
            observer.observe(content);
        }
    });

})
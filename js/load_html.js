async function loadHTML() {
  await loadIndexHTML();
}

async function loadIndexHTML() {
    try {
      const response = await fetch('index.html');
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Datei: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById('index_html').innerHTML = html;
    } catch (error) {
      console.error(error);
    }
}

function reapplyStylesheets() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const href = link.href;
        link.href = ''; // Temporär leeren
        link.href = href; // Original-href wieder setzen, um erneutes Laden zu erzwingen
    });
}

function triggerMediaQueryReflow() {
    const spacer = document.createElement('div');
    spacer.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden; top: -9999px; left: -9999px;';
    document.body.appendChild(spacer);

    // Nudge
    spacer.style.width = '2px';
    spacer.offsetWidth; // Force reflow

    // Clean up and reset
    requestAnimationFrame(() => {
        spacer.style.width = '1px';
        spacer.offsetWidth; // Another reflow
        spacer.remove();
    });
}

// Dies ist die geänderte triggerResizeEvent-Funktion:
function triggerResizeEvent() {
    const body = document.body;
    const originalWidth = body.style.width;

    // Schritt 1: Den Nudge anwenden
    body.style.width = '99.9vw';
    body.offsetWidth; // Dies zwingt den Browser zur sofortigen Neuberechnung des Layouts

    // Schritt 2: Das Event senden
    window.dispatchEvent(new Event('resize'));

    // Schritt 3: Den Originalzustand nach einer weiteren kurzen Verzögerung zurücksetzen.
    // So stellen wir sicher, dass das Event verarbeitet wurde, bevor die Breite zurückspringt.
    requestAnimationFrame(() => {
        body.style.width = originalWidth || '';
    });
}
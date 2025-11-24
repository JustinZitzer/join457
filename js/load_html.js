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
        link.href = '';
        link.href = href;
    });
}

function triggerMediaQueryReflow() {
    const spacer = document.createElement('div');
    spacer.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden; top: -9999px; left: -9999px;';
    document.body.appendChild(spacer);

    spacer.style.width = '2px';
    spacer.offsetWidth;

    requestAnimationFrame(() => {
        spacer.style.width = '1px';
        spacer.offsetWidth;
        spacer.remove();
    });
}

function triggerResizeEvent() {
    const body = document.body;
    const originalWidth = body.style.width;

    body.style.width = '99.9vw';
    body.offsetWidth;

    window.dispatchEvent(new Event('resize'));

    requestAnimationFrame(() => {
        body.style.width = originalWidth || '';
    });
}
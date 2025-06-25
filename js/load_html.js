async function loadHTML() {
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

  /* Eine geänderte Function damit die Media Querys korrekt nach dem iterieren durch das Menu gecheckt werden.
  async function loadHTML() {
  try {
    const response = await fetch('index.html');
    if (!response.ok) throw new Error(`Fehler beim Laden der Datei: ${response.status}`);
    const html = await response.text();
    const container = document.getElementById('index_html');
    container.innerHTML = html;

    // Reflow erzwingen (Hack, aber oft effektiv)
    container.offsetHeight; // Zugriff zwingt Reflow

    // Oder: Klassen/Styles aktiv setzen
    document.body.classList.remove('mobile', 'desktop');
    if (window.innerWidth < 1400) {
      document.body.classList.add('mobile');
    } else {
      document.body.classList.add('desktop');
    }

  } catch (error) {
    console.error(error);
  }
}
  */ 

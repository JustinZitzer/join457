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
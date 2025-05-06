const BASE_URL = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

async function postData(path = '', data = {}) {
    try {
        const url = `${BASE_URL}${path}.json`;
        const options = createPostOptions(data);
        return await fetchData(url, options);
    } catch (error) {
        console.error('Fehler beim Senden der Daten an den Server:', error);
        return null;
    }
}

function createPostOptions(data) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
}

async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP Fehler! Status: ${response.status}`);
    }
    const hasBody = response.headers.get('content-length') !== '0';
    return hasBody ? await response.json() : null;
}

async function loadData(path = '') {
    try {
        const url = `${BASE_URL}${path}.json`;
        const options = { method: 'GET' };
        return await fetchData(url, options);
    } catch (error) {
        console.error('Fehler beim Laden der Daten vom Server:', error);
        return null;
    }
}

async function updateData(path = '', data = {}) {
    try {
        const url = `${BASE_URL}${path}.json`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        return await fetchData(url, options);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Daten:', error);
        return null;
    }
}

async function deleteData(path = '', key = '') {
    try {
        const url = `${BASE_URL}${path}/${key}.json`;
        const options = { method: 'DELETE' };
        return await fetchData(url, options);
    } catch (error) {
        console.error('Fehler beim Löschen der Daten:', error);
        return null;
    }
}
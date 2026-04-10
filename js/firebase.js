const BASE_URL = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

/** Sends data to Firebase using a POST request. */
async function postData(path = '', data = {}) {
    try {
        const url = `${BASE_URL}${path}.json`;
        const options = createPostOptions(data);
        return await fetchData(url, options);
    } catch (error) {
        console.error('Error sending data to the server:', error);
        return null;
    }
}

/** Creates the request options object for a POST request. */
function createPostOptions(data) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
}

/** Executes a fetch request and returns parsed JSON data if available. */
async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const hasBody = response.headers.get('content-length') !== '0';
    return hasBody ? await response.json() : null;
}

/** Loads data from Firebase using a GET request. */
async function loadData(path = '') {
  try {
    const response = await fetch(BASE_URL + path + '.json');
    if (!response.ok) throw new Error(`HTTP Fehler! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

/** Updates existing data in Firebase using a PUT request. */
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
        console.error('Error updating data:', error);
        return null;
    }
}

/** Deletes data from Firebase using a DELETE request. */
async function deleteData(path = '', key = '') {
    try {
        const url = `${BASE_URL}${path}/${key}.json`;
        const options = { method: 'DELETE' };
        return await fetchData(url, options);
    } catch (error) {
        console.error('Error deleting data:', error);
        return null;
    }
}
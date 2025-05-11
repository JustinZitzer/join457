const summaryGreetingTextName = document.getElementById("Summary-Name-Text-Greeting");
const fireBaseUrlSummary = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

async function getInfoForSummaryBoard (path="") {
    let response = await fetch(FireBaseUrl + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}


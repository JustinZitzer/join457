const fireBaseUrlSummary = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

async function initSummaryAndHTML() {
    await loadHTML();
    await initSummaryBoard();
}

async function getInfoForSummaryBoardBaseFunction (path) {
    let response = await fetch(fireBaseUrlSummary + path + ".json");
    return await response.json();

}

async function getInformationSummaryBoard(path) {
    const summaryGreetingTextName = document.getElementById("Summary-Name-Text-Greeting");
    let userDataSummary = await getInfoForSummaryBoardBaseFunction(path);
    const firstUser = Object.values(userDataSummary)[0];
    summaryGreetingTextName.innerHTML = firstUser.name;
}

async function initSummaryBoard() {
    await getInformationSummaryBoard("/userData");
}
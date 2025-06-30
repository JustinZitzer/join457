const fireBaseUrlSummary = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

async function initSummaryAndHTML() {
    await loadHTML();
    await initSummaryBoard();
}

window.addEventListener("load", () => {
    const loadingScreenMobileDiv = document.getElementById("Loading-Screen-Mobile-Z-Container");
    setTimeout(() => {
    loadingScreenMobileDiv.classList.add('hidden');
    }, 1000);
    document.addEventListener('click', function(event) {
        let targetLink = event.target.closest('.sidebar .nav-links a');
        if (targetLink) {
            event.preventDefault(); // Standardverhalten verhindern
            const href = targetLink.getAttribute('href');
            window.location.href = href; // Manuell zur neuen Seite navigieren
        }
    });
});


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

function showSummaryBoardMobile() {
    const resolutionWidth = window.innerWidth;
    const headerIndexHtml = document.getElementById("header-index-html");
    const blueLineDesktopVersion = document.getElementById("Headline-Blue-Line");
    const blueLineMobileContainer = document.getElementById("Headline-Blue-Line-Mobile-Container");

    if (resolutionWidth < 1400) {
    }
}
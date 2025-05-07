function initSummary () {
    getLoginGuest();
}

function login() {
    
}

function loginGuest () {
    const guestName = 'Gast';
    sessionStorage.setItem('username', guestName);
    window.location.href='summary-guest.html'
}

function getLoginGuest () {
    const guestSummary = sessionStorage.getItem('username');
    const summaryNameTextDiv = document.getElementById('Summary-Name-Text-Greeting');

    if (guestSummary) {
        summaryNameTextDiv.classList.add('display-none');
    }
}
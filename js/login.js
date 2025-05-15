const emailInput = document.getElementById('Login-Box-Email-Input');
const passwordInput = document.getElementById('Login-Box-Passwort-Input');
const FireBaseUrl = "https://console.firebase.google.com/u/1/project/join-457/database/join-457-default-rtdb/data/~2F";
const bigLogoLogin = document.getElementById('Loading-Screen-Logo-Big');
const smallLogoLogin = document.getElementById('Loading-Screen-Logo-Mini');
const animationLogoDiv = document.getElementById('Animation-Logo-Div-Z-Index');
const loginBodyDiv = document.getElementById('Login-Body-Div');
const browserResulution = window.innerWidth;

function initSummary () {
    getLoginGuest();
    getLogin();
}

window.addEventListener('load', () => {
  const bigLogoSizeAndPosition   = bigLogoLogin.getBoundingClientRect();
  const smallLogoSizeAndPostion = smallLogoLogin.getBoundingClientRect();
  const differenceXPostion = smallLogoSizeAndPostion.left - bigLogoSizeAndPosition.left;
  const differenceYPostion = smallLogoSizeAndPostion.top  - bigLogoSizeAndPosition.top;
  const scaleFactorForLogo = smallLogoSizeAndPostion.width / bigLogoSizeAndPosition.width;
    requestAnimationFrame(() => {
        bigLogoLogin.style.transform = `
        translate(calc(-50% + ${differenceXPostion}px), calc(-50% + ${differenceYPostion}px))
        scale(${scaleFactorForLogo})
        `;
    });
    hideLoadingScreen();
});

function hideLoadingScreen() {
    if (browserResulution > 652) {
        setTimeout(() => {
            animationLogoDiv.classList.add('display-none');
            smallLogoLogin.classList.remove('Visibility-Hidden');
        }, 710);
        requestAnimationFrame(() => {
            loginBodyDiv.style.opacity = '1';
        });
    } else if (browserResulution < 652) {
        setTimeout(() => {
            animationLogoDiv.classList.add('display-none');
            smallLogoLogin.classList.remove('Visibility-Hidden');
        }, 710);
        requestAnimationFrame(() => {
            loginBodyDiv.style.opacity = '1';
            loginBodyDiv.style.backgroundColor = 'white';
        });
    }
}

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    sessionStorage.setItem('username', email);
    if (email && password) {
        window.location.href='summary.html';
    } else {
        alert('Please enter a valid email and password.');
    }
}

function getLogin () {

}

function loginGuest () {
    const guestName = 'Gast';
    sessionStorage.setItem('guestUsername', guestName);
    window.location.href='summary-guest.html'
}

function getLoginGuest () {
    const usernameGuest = sessionStorage.getItem('guestUsername');
    const summaryNameTextDiv = document.getElementById('Summary-Name-Text-Greeting');

    if (usernameGuest) {
        summaryNameTextDiv.classList.add('display-none');
    }
}
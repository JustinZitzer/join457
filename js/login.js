const emailInput = document.getElementById('Login-Box-Email-Input');
const passwordInput = document.getElementById('Login-Box-Passwort-Input');
const FireBaseUrl = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const bigLogoLogin = document.getElementById('Loading-Screen-Logo-Big');
const smallLogoLogin = document.getElementById('Loading-Screen-Logo-Mini');
const animationLogoDiv = document.getElementById('Animation-Logo-Div-Z-Index');
const loginBodyDiv = document.getElementById('Login-Body-Div');
const rightHeaderDiv = document.getElementById('Header-Login-Right');
const rightHeaderDivMobileVersion = document.getElementById('Header-Login-Right-Mobile-Version-Div');
const headerDiv = document.getElementById('Header-Login');
const browserResulution = window.innerWidth;

function initSummary() {
    getLoginGuest();
}

function initLogin() {
    showMobileVersion();
}


window.addEventListener('resize', showMobileVersion);

window.addEventListener('load', () => {
    if (!window.location.pathname.endsWith("login.html")) return;
    const bigLogoSizeAndPosition   = bigLogoLogin.getBoundingClientRect();
    const smallLogoSizeAndPostion = smallLogoLogin.getBoundingClientRect();
    const differenceXPostion = smallLogoSizeAndPostion.left - bigLogoSizeAndPosition.left;
    const differenceYPostion = smallLogoSizeAndPostion.top  - bigLogoSizeAndPosition.top;
    const scaleFactorForLogo = smallLogoSizeAndPostion.width / bigLogoSizeAndPosition.width;
    requestAnimationFrame(() => {
        bigLogoLogin.style.transform = `
            translate(calc(-50% + ${differenceXPostion}px), calc(-50% + ${differenceYPostion}px)) scale(${scaleFactorForLogo})
        `;
    });
    hideLoadingScreen();
});

function showMobileVersion() {
    if (!window.location.pathname.endsWith("login.html")) return;
    const currentWidth = window.innerWidth;
    if (currentWidth < 652) {
        if (!rightHeaderDivMobileVersion.contains(rightHeaderDiv)) {
            rightHeaderDivMobileVersion.appendChild(rightHeaderDiv);
        }
    } else {
        if (!headerDiv.contains(rightHeaderDiv)) {
            headerDiv.appendChild(rightHeaderDiv);
        }
    }
}

function handleMobileLoadingAnimation(bigLogoLogin, animationLogoDiv, smallLogoLogin, loginBodyDiv) {
    requestAnimationFrame(() => {
        bigLogoLogin.src = './assets/img/join-logo-white.svg';
        animationLogoDiv.style.opacity = '0';
        smallLogoLogin.classList.remove('Visibility-Hidden');
        loginBodyDiv.style.opacity = '1';
    });
    setTimeout(() => {
        animationLogoDiv.classList.add('display-none');
    }, 710);
}

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
        handleMobileLoadingAnimation(bigLogoLogin, animationLogoDiv, smallLogoLogin, loginBodyDiv);
    }
}

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    sessionStorage.setItem('username', email);
    if (email && password) {
        window.location.href='./summary.html';
    } else {
        alert('Please enter a valid email and password.');
    }
}

async function fetchUserDataFromFirebaseLogin(path = "") {
    try {
        let response = await fetch(FireBaseUrl + path + ".json",);
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function loginUserForSummary() {
  const email = document.getElementById("Login-Box-Email-Input").value.trim();
  const password = document.getElementById("Login-Box-Passwort-Input").value;
  
  const userData = await fetchUserDataFromFirebaseLogin("userData");

  let loginSuccessful = false;
  let loggedInUserName = "";

  for (let userName in userData) {
    const user = userData[userName];

    if (user.email === email && user.password === password) {
      loginSuccessful = true;
      loggedInUserName = user.name;
      break;
    }
  }

  handleLoginResult(loginSuccessful, loggedInUserName);
}

function handleLoginResult(loginSuccessful, loggedInUserName) {
  if (loginSuccessful) {
    localStorage.setItem("loggedInUserName", loggedInUserName);
    window.location.href = "summary.html";
  } else {
    changeColorAndShowErrorMessage();
  }
}

function changeColorAndShowErrorMessage() {
    const errorMessageDiv = document.getElementById("error-message-login");

    emailInput.classList.add("border-color-grey");
    passwordInput.classList.add("border-color-grey");
    errorMessageDiv.classList.remove("display-none");
    emailInput.classList.add("border-color-red");
    passwordInput.classList.add("border-color-red");
}

function loginAsAGuest() {
    let loggedInUserName = 'Guest';
    localStorage.setItem("loggedInUserName", loggedInUserName);
    window.location.href='./summary.html'
}

function loginGuest () {
    const guestName = 'Gast';
    sessionStorage.setItem('guestUsername', guestName);
    window.location.href='./summary-guest.html'
}

function getLoginGuest () {
    const usernameGuest = sessionStorage.getItem('guestUsername');
    const summaryNameTextDiv = document.getElementById('Summary-Name-Text-Greeting');

    if (usernameGuest) {
        summaryNameTextDiv.classList.add('display-none');
    }
}

function showClosedEyeIconLogin() {
    const closedEyeIcon = document.getElementById('closed-eye-icon-login');
    const lockIcon = document.getElementById('input-icon-login');
    
    if (!lockIcon.classList.contains('display-none')) {
        lockIcon.classList.add('display-none');
        closedEyeIcon.classList.remove('display-none');
    }
}

function showOpenEyeIconLogin() {
    const closedEyeIcon = document.getElementById('closed-eye-icon-login');
    const openEyeIcon = document.getElementById('open-eye-icon-login');
    const passwordInput = document.getElementById('Login-Box-Passwort-Input');

    if (!closedEyeIcon.classList.contains('display-none')) {
        closedEyeIcon.classList.add('display-none');
        openEyeIcon.classList.remove('display-none');
        passwordInput.type = 'text';
    }
}

function showClosedEyeIconLoginToggle() {
    const closedEyeIcon = document.getElementById('closed-eye-icon-login');
    const openEyeIcon = document.getElementById('open-eye-icon-login');

    if (!openEyeIcon.classList.contains('display-none')) {
        openEyeIcon.classList.add('display-none');
        closedEyeIcon.classList.remove('display-none');
        passwordInput.type = 'password';
    }
}
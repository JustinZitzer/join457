const FireBaseUrl = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const nameInputSignUp = document.getElementById('inputfield-name');
const emailInputSignUp = document.getElementById('inputfield-email');
const passwordInputSignUp = document.getElementById('inputfield-password');
const confirmPasswordInputSignUp = document.getElementById('inputfield-confirm');
const checkboxSignUp = document.getElementById('privacy-policy-accept-button');
const failureAllFieldsDiv = document.getElementById('failure-signup-div');
const failureAllFieldsMessage = document.getElementById('failure-signup-div-message');


async function initSignUp() {
  await loadDataSignUp();
}

async function loadDataSignUp(path="") {
  let response = await fetch(FireBaseUrl + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
  return responseToJson;
}

async function checkIfEmailExists() {
  const emailInput = document.getElementById("inputfield-email").value.trim().toLowerCase();
  const userData = await loadDataSignUp("userData");

  if (!userData) return false;

  for (const userName in userData) {
    const storedEmail = userData[userName]?.email?.toLowerCase();

    if (storedEmail === emailInput) {
      return true; // ❌ E-Mail existiert bereits
    }
  }

  return false; // ✅ E-Mail ist neu
}

async function emailExistsError() {
  if(await checkIfEmailExists()) {
    showEmailAlreadyExistsError();
  }
}

function showEmailAlreadyExistsError() {
  const emailInput = document.getElementById("inputfield-email");
  const errorMessage = document.getElementById("failure-signup-div-message-email");

  errorMessage.classList.remove("display-none");
  errorMessage.innerHTML = "E-Mail existiert bereits";
  emailInput.classList.add("red-border");
  emailInput.classList.remove("grey-border");
}

function valueOfInputFields() {
  let name = nameInputSignUp.value;
  let email = emailInputSignUp.value;
  let password = passwordInputSignUp.value;
  let confirmPassword = confirmPasswordInputSignUp.value;

  return { name, email, password, confirmPassword };
}

function clearInputFields() {
  nameInputSignUp.value = "";
  emailInputSignUp.value = "";
  passwordInputSignUp.value = "";
  confirmPasswordInputSignUp.value = "";
  checkboxSignUp.checked = false;
}

async function postRegistryDataBaseFunction(path= "", data= {}) {
  let response = await fetch (FireBaseUrl + path + ".json", {
    method : "PUT",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  });
  return responseToJson = await response.json();
}

async function postValueDataIntoFirebase() {
  if (checkboxSignUp.checked && passwordInputSignUp.value === confirmPasswordInputSignUp.value) {
    const userData = valueOfInputFields();
    const safeName = userData.name.replace(/\s+/g, "_");
    const dataPost = await postRegistryDataBaseFunction(`userData/${safeName}`, userData);
    clearInputFields();
    console.log(dataPost);
  } else if (!checkboxSignUp.checked) {
    failureMessage();
  } else if (passwordInputSignUp.value !== confirmPasswordInputSignUp.value) {
    failureMessage();
  }
}

function enterFullInformation() {
  const isNameValid = enterNameSignUp();
  const isEmailValid = enterEmailSignUp();
  const isPasswordValid = enterPasswordSignUp();
  const isPasswordMatch = checkPasswordMatch();
  const isCheckboxValid = checkboxSignUp.checked;

  if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch && isCheckboxValid) {
    postValueDataIntoFirebase();
    grayBodyEffect();
    showSuccessMessage();
  } else {
    failureMessage();
    failureMessageInputFields();
  }
}

function failureMessage() {
  failureAllFieldsDiv.classList.remove("display-none");
  failureAllFieldsMessage.innerText = "*Please enter all fields and accept the privacy policy";
}

function showSuccessMessage() {
  const successButtonDiv = document.getElementById("button-position-success-message");
  successButtonDiv.classList.remove("display-none");
  successButtonDiv.classList.add("show-success");
  setTimeout(() => {
    window.location.href='./login.html';
  }, 1000);
}

function grayBodyEffect() {
  const grayBodyDiv = document.getElementById("gray-background-for-body");
  grayBodyDiv.classList.remove("display-none");
  grayBodyDiv.classList.add("gray-background-for-body-effect");
}

function changeLockIconToEyeIconFirstField() {
  const firstLockIcon = document.getElementById("lock-icon-size-first");
  const eyeIcon = document.getElementById("closed-eye-icon");

  if(!firstLockIcon.classList.contains("display-none")) {
    firstLockIcon.classList.add("display-none");
    eyeIcon.classList.remove("display-none");
  }
}

function changeLockIconToEyeIconSecondField() {
  const secondLockIcon = document.getElementById("lock-icon-size-second");
  const eyeIconConfirm = document.getElementById("closed-eye-icon-confirm")
  if(!secondLockIcon.classList.contains("display-none")) {
    secondLockIcon.classList.add("display-none");
    eyeIconConfirm.classList.remove("display-none");
  }
}

function changeClosedToOpenEye() {
  const closedEyeIcon = document.getElementById("closed-eye-icon");
  const openEyeIcon = document.getElementById("open-eye-icon");

  if(!closedEyeIcon.classList.contains("display-none")) {
    closedEyeIcon.classList.add("display-none");
    openEyeIcon.classList.remove("display-none");
    passwordInputSignUp.type = "text";
  } else {
    closedEyeIcon.classList.remove("display-none");
    openEyeIcon.classList.add("display-none");
    passwordInputSignUp.type = "password";
  }
}

function changeClosedToOpenEyeConfirm() {
  const closedEyeIconConfirm = document.getElementById("closed-eye-icon-confirm");
  const openEyeIconConfirm = document.getElementById("open-eye-icon-confirm");

  if(!closedEyeIconConfirm.classList.contains("display-none")) {
    closedEyeIconConfirm.classList.add("display-none");
    openEyeIconConfirm.classList.remove("display-none");
    confirmPasswordInputSignUp.type = "text";
  } else {
    closedEyeIconConfirm.classList.remove("display-none");
    openEyeIconConfirm.classList.add("display-none");
    confirmPasswordInputSignUp.type = "password";
  }
}

function failureMessageInputFields() {
  enterNameSignUp();
  enterEmailSignUp();
  enterPasswordSignUp();
  checkPasswordMatch();
  showEmailAlreadyExistsError();
}

function enterNameSignUp() {
  const nameErrorDiv = document.getElementById("failure-signup-div-message-name");
  const name = nameInputSignUp.value.trim();

  if(name.length < 3 )  {
    nameErrorDiv.classList.remove("display-none");
    nameErrorDiv.innerText = "*Name must be at least 3 characters long";
    nameInputSignUp.classList.remove("grey-border");
    nameInputSignUp.classList.add("red-border");
    return false;
  } else {
    nameErrorDiv.classList.add("display-none");
    nameInputSignUp.classList.remove("red-border");
    return true;
  }
}

function enterEmailSignUp() {
  const emailErrorDiv = document.getElementById("failure-signup-div-message-email");
  const email = emailInputSignUp.value.trim();

  if(!isValidEmail(email)) {
    emailErrorDiv.classList.remove("display-none");
    emailErrorDiv.innerText = "*Please enter a valid email address";
    emailInputSignUp.classList.add("red-border");
    emailInputSignUp.classList.remove("grey-border");
    return false;
  } else {
    emailErrorDiv.classList.add("display-none");
    emailInputSignUp.classList.remove("red-border");  
    return true;
  }
}

function enterPasswordSignUp() {
  const passwordErrorDiv = document.getElementById("failure-signup-div-message-password");
  const password = passwordInputSignUp.value.trim();

  if(password.length < 6 )  {
    passwordErrorDiv.classList.remove("display-none");
    passwordErrorDiv.innerText = "*Password must be at least 6 characters long";
    passwordInputSignUp.classList.add("red-border");
    passwordInputSignUp.classList.remove("grey-border");
    return false;
  } else {
    passwordErrorDiv.classList.add("display-none");
    passwordInputSignUp.classList.remove("red-border");
    passwordInputSignUp.classList.add("grey-border");
    return true;
  }
}

function checkPasswordMatch() {
  if (!confirmPasswordEmptyFailure()) return false;

  if (!confirmPasswordMatchFailure()) return false;

  confirmPasswordMatchSuccess();
  return true;
}

function confirmPasswordEmptyFailure() {
  const failureMessage = document.getElementById("failure-signup-div-message-confirm-password");
  const confirmPassword = confirmPasswordInputSignUp.value.trim();

  if (confirmPassword === "") {
    failureMessage.classList.remove("display-none");
    failureMessage.innerText = "*Please confirm your password";
    confirmPasswordInputSignUp.classList.add("red-border");
    confirmPasswordInputSignUp.classList.remove("grey-border");
    return false;
  }

  return true;
}

function confirmPasswordMatchFailure() {
  const failureMessage = document.getElementById("failure-signup-div-message-confirm-password");
  const password = passwordInputSignUp.value.trim();
  const confirmPassword = confirmPasswordInputSignUp.value.trim();

  if (password !== confirmPassword) {
    failureMessage.classList.remove("display-none");
    failureMessage.innerText = "*Your passwords don't match, please try again";
    confirmPasswordInputSignUp.classList.add("red-border");
    confirmPasswordInputSignUp.classList.remove("grey-border");
    return false;
  }

  return true;
}

function confirmPasswordMatchSuccess() {
  const failureMessage = document.getElementById("failure-signup-div-message-confirm-password");

  failureMessage.classList.add("display-none");
  failureMessage.innerText = "";
  confirmPasswordInputSignUp.classList.remove("red-border");
  confirmPasswordInputSignUp.classList.add("grey-border");
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
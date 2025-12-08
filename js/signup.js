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
    window.location.href='./login.html'
  } else if (!checkboxSignUp.checked) {
    alert("Please accept the privacy policy");
  } else if (passwordInputSignUp.value !== confirmPasswordInputSignUp.value) {
    alert("Please check your Password they do not match");
  }
}

function enterFullInformation() {
  if(nameInputSignUp.value !== "" && emailInputSignUp.value !== "" && 
  passwordInputSignUp.value !== "" && confirmPasswordInputSignUp.value !== ""
  && checkboxSignUp.checked) {
    postValueDataIntoFirebase();
  } else {
    failureAllFieldsDiv.classList.remove("display-none");
    failureAllFieldsMessage.innerText = "*Please enter all the fields and accept the privacy policy";
  }
}

function showSuccessMessage() {
  
}

function checkPasswordMatch() {
  if (passwordInputSignUp.value !== confirmPasswordInputSignUp.value) {
    failureAllFieldsDiv.classList.remove("display-none");
    failureAllFieldsMessage.innerText = "*Your passwords don't match, please try again";
    confirmPasswordInputSignUp.classList.remove("grey-border");
    confirmPasswordInputSignUp.classList.add("red-border");
  } else {
    failureAllFieldsDiv.classList.add("display-none");
    failureAllFieldsMessage.innerText = "";
    confirmPasswordInputSignUp.classList.remove("red-border");
    confirmPasswordInputSignUp.classList.add("grey-border");
  }
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
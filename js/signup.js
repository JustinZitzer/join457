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
    method : "POST",
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
    const dataPost = await postRegistryDataBaseFunction("userData", userData);
    clearInputFields();
    console.log(dataPost);
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

function checkPasswordMatch() {
  if (passwordInputSignUp.value !== confirmPasswordInputSignUp.value) {
    failureAllFieldsDiv.classList.remove("display-none");
    failureAllFieldsMessage.innerText = "*Passwords do not match";
  } else {
    failureAllFieldsDiv.classList.add("display-none");
    failureAllFieldsMessage.innerText = "";
  }
}
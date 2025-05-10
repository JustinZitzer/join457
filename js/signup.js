const FireBaseUrl = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const nameInputSignUp = document.getElementById('inputfield-name');
const emailInputSignUp = document.getElementById('inputfield-email');
const passwordInputSignUp = document.getElementById('inputfield-password');
const confirmPasswordInputSignUp = document.getElementById('inputfield-confirm');
const checkboxSignUp = document.getElementById('privacy-policy-accept-button');


async function init() {
  await loadData();
}

async function loadData(path="") {
  let response = await fetch(FireBaseUrl+ path + ".json");
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


const FireBaseUrl = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const nameInputSignUp = document.getElementById('inputfield-name');
const emailInputSignUp = document.getElementById('inputfield-email');
const passwordInputSignUp = document.getElementById('inputfield-password');
const confirmPasswordInputSignUp = document.getElementById('inputfield-confirm');


async function init() {
  await loadData();
}

async function loadData() {
  const url = FireBaseUrl + ".json";
  let response = await fetch(url);
  let responseToJson = await response.json();
  console.log(responseToJson);
}

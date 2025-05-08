const FireBaseUrl = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";

async function init() {
  await loadData();
}

async function loadData() {
  const url = FireBaseUrl + ".json";
  let response = await fetch(url);
  let responseToJson = await response.json();
  console.log(responseToJson);
}

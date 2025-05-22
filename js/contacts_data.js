let allContacts = {};

async function fetchContacts() {
  try {
    const data = await loadData('contacts');
    return data || {};
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {};
  }
}

async function loadContacts() {
  const container = document.getElementById('contact_list');
  try {
    const contacts = await fetchContacts();
    allContacts = contacts
    for (const key in contacts) {
        container.innerHTML += getContactCard(contacts[key]);
        console.log(contacts[key]);
    }
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

async function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  container.innerHTML += getContactCard(contacts);
}

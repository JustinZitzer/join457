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
  try {
    const contacts = await fetchContacts();
    renderContacts(contacts);
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  for (const key in contacts) {
    if (contacts.hasOwnProperty(key)) {
      const contact = contacts[key];
      container.innerHTML += getContactCard(contact);
    }
  }
}

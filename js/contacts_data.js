let allContacts = [];

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
    const contactsUnsorted = await fetchContacts();
    const contacts = Object.values(contactsUnsorted);
    contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    allContacts = contacts;
    let lastFirstLetter = "";
    for (const key in contacts) {
      const currentFirstLetter = contacts[key].firstName[0].toUpperCase();
      if (currentFirstLetter !== lastFirstLetter) {
        container.innerHTML += getLetterGroup(currentFirstLetter);
        lastFirstLetter = currentFirstLetter;
      }
      container.innerHTML += getContactCard(contacts[key]);
    }
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

async function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  container.innerHTML += getContactCard(contacts);
}

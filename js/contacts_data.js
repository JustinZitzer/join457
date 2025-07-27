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
  container.innerHTML = '';
  try {
    const contactsUnsorted = await fetchContacts();
    if (!contactsUnsorted) {
      container.innerHTML = '<p>Keine Kontakte gefunden.</p>';
      return;
    }
    const contacts = Object.entries(contactsUnsorted).map(([key, value]) => ({
      ...value,
      key,
    }));
    contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    allContacts = contacts;
    let lastFirstLetter = "";
    for (const contact of contacts) {
      const currentFirstLetter = contact.firstName[0].toUpperCase();

      if (currentFirstLetter !== lastFirstLetter) {
        container.innerHTML += getLetterGroup(currentFirstLetter);
        lastFirstLetter = currentFirstLetter;
      }

      container.innerHTML += getContactCard(contact);
    }
  } catch (error) {
    console.error("Error loading contacts:", error);
    container.innerHTML = '<p>Fehler beim Laden der Kontakte.</p>';
  }
}

async function renderContacts(contacts) {
  const container = document.getElementById('contact_list');
  container.innerHTML += getContactCard(contacts);
}

async function deleteContact(key) {
  try {
    await deleteData('contacts', key);
    console.log(`Kontakt gelöscht :, ${key}`);
    loadContacts();
  } catch (error) {
    console.error("Error deleting contacts:", error);
  }
}

async function createNewContact(event) {
  event.preventDefault();
  const nameInput = document.querySelector('.add-contact-name-input').value.trim();
  const emailInput = document.querySelector('.add-contact-email-input').value.trim();
  const phoneInput = document.querySelector('.add-contact-phone-input').value.trim();
  if (!nameInput || !emailInput || !phoneInput) {
    alert("Bitte alle Felder ausfüllen.");
    return;
  }
  const nameParts = nameInput.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "-";
  const id = Date.now();
  const newContact = {
    firstName,
    lastName,
    email: emailInput,
    phoneNumber: phoneInput,
    id
  };
  try {
    const result = await postData('contacts', newContact);
console.log("Ergebnis vom postData:", result);
    console.log("Kontakt gespeichert:", newContact);
    removeAddNewContactOverlay();
    loadContacts();
  } catch (error) {
    console.error("Fehler beim Speichern des Kontakts:", error);
    alert("Fehler beim Speichern. Bitte versuche es erneut.");
  }
}

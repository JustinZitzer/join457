function getContactOverlay(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="contacts_side_overlay" class="contacts-overlay-container">
                <div class="contacts-overlay-header">
                    <div class="contacts-overlay-user-profile" style="background-color:${color};">
                        <p>${contact.firstName[0]}${contact.lastName[0]}</p>
                    </div>
                    <div class="contacts-info-container">
                        <h3 class="name-contacts-template-div">${contact.firstName} ${contact.lastName}</h3>
                        <div class="contacts-overlay-action-buttons-container" id="contacts-overlay-action-buttons-container">
                            <div onclick="openEditContactOverlay(${contact.id})" class="contacts-overlay-edit-container">
                                <img src="./assets/icons/edit-icon.svg" alt="edit-icon">
                                <p>Edit</p>
                            </div>
                            <div onclick="deleteContact('${contact.key}')" class="contacts-overlay-delete-container">
                                <img src="./assets/icons/delete-icon.svg" alt="delete-icon">
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span>Contact Information</span>
                <div class="contacts-details-container">
                    <div class="contacts-email-details-container">
                        <h4>Email</h4>
                        <a href="mailto:${contact.email}" class="blue-color">${contact.email}</a>
                    </div>
                    <div class="contacts-phone-details-container">
                        <h4>Phone</h4>
                        <a href="tel:${contact.phoneNumber}">+${contact.phoneNumber}</a>
                    </div>
                </div>
            </div>
                <div id="delete-edit-dropdown-contacts" class="delete-edit-dropdown-contacts-mobile display-none">
                    <div onclick="openEditContactOverlay(${contact.id})" class="edit-flexbox-contacts2">
                        <svg class="edit-svg-margin" width="25" height="25" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_313493_6285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
                            <rect x="0.5" width="32" height="32" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_313493_6285)">
                            <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="#2A3647"/>
                            </g>
                        </svg>
                        <p>Edit</p>
                    </div>
                    <div onclick="deleteContact('${contact.key}')" class="edit-flexbox-contacts1">
                        <svg class="delete-svg-margin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_314135_4497)">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                            </g>
                        </svg>
                        <p>Delete</p>
                    </div>
                </div>
                <svg onclick="closeContactsSideCardOverlay(${contact.id})" id="close-side-contact-arrow-icon" class="close-side-contact-arrow-icon" width="32" height="32" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0361 16.9129H29.2135C30.0626 16.9129 30.751 17.6013 30.751 18.4504C30.751 19.2996 30.0626 19.988 29.2135 19.988H12.0361L19.1964 27.1483C19.7968 27.7486 19.7968 28.722 19.1964 29.3223C18.596 29.9227 17.6227 29.9227 17.0223 29.3223L7.5646 19.8646C6.78356 19.0836 6.78356 17.8173 7.5646 17.0362L17.0223 7.57849C17.6227 6.97814 18.596 6.97814 19.1964 7.57849C19.7968 8.17885 19.7968 9.15222 19.1964 9.75257L12.0361 16.9129Z" fill="#29ABE2"/>
                </svg>
    `;
}

function getAddContactOverlay() {
    return `
    <div id="bg_contact_overlay" class="bg-contact-overlay">
    <div id="add_contact_overlay" class="add-contact-overlay">
            <div class="add-contact-left-section">
                <div class="add-contact-left-section-content">
                    <img class="add-contact-join-logo" src="./assets/img/join-logo-white.svg" alt="join-logo-white">
                    <div class="add-contact-headline">
                        <h1 class="add-contact-headline-text">Add contact</h1>
                        <h2>Tasks are better with a team!</h2>
                        <div class="add-contact-underlined"></div>
                    </div>
                </div>
            </div>
            <div class="add-contact-right-section">
                <img onclick="removeAddNewContactOverlay()" class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container">
                    <img src="./assets/img/contacts-person.svg" alt="contact-person">
                </div>
                <form>
                    <div class="add-contact-input-containers">
                        <input id="add-contact-name-input" class="add-contact-name-input" type="text" placeholder="Name">
                    </div>
                    <div id="failure-message-add-contact-name" class="failure-message-add-contact display-none">
                        *Namen mit mindestens 3 Zeichen eingeben.
                    </div>
                    <div class="add-contact-input-containers">
                        <input id="add-contact-email-input" class="add-contact-email-input" type="text" placeholder="Email">
                    </div>
                    <div id="failure-message-add-contact-email" class="failure-message-add-contact display-none">
                        Bitte eine gültige E-Mail-Adresse eingeben.
                    </div>
                    <div class="add-contact-input-containers">
                        <input id="add-contact-phone-input" class="add-contact-phone-input" type="text" placeholder="Phone">
                    </div>
                    <div id="failure-message-add-contact" class="failure-message-add-contact display-none">
                        *Bitte alle Felder ausfüllen.
                    </div>
                    <div class="add-contact-btn-section">
                        <button onclick="removeAddNewContactOverlay()" class="add-contact-cancel-btn">Cancel <img src="./assets/icons/contacts-close-icon.svg" alt="close-icon"></button>
                        <button onclick="createNewContact(event)" class="add-contact-create-contact-btn">Create Contact <img src="./assets/icons/check-icon.svg" alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        `;
}

function getEditContactOverlay(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="bg_contact_overlay" class="bg-contact-overlay">
        <div id="edit_contact_overlay" class="add-contact-overlay">
            <div class="add-contact-left-section">
                <div class="add-contact-left-section-content">
                    <img class="add-contact-join-logo" src="./assets/img/join-logo-white.svg" alt="join-logo-white">
                    <div class="add-contact-headline">
                        <h1>Edit contact</h1>
                        <div class="add-contact-underlined"></div>
                    </div>
                </div>
            </div>
            <div class="add-contact-right-section">
                <img onclick="removeEditContactOverlay(), handleActiveCard(${contact.id})" class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container" style="background-color:${color};">
                    <p>${contact.firstName[0]}${contact.lastName[0]}</p>
                </div>
                <form onsubmit="saveEditedContact(event, '${contact.key}')">
                    <div class="add-contact-input-containers">
                        <input class="add-contact-name-input" type="text" placeholder="Name" value="${contact.firstName} ${contact.lastName}">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-email-input" type="text" placeholder="Email" value="${contact.email}">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-phone-input" type="text" placeholder="Phone" value="${contact.phoneNumber}">
                    </div>
                    <div class="add-contact-btn-section">
                        <button onclick="deleteContact('${contact.key}')" class="add-contact-cancel-btn">Delete<img src="./assets/icons/delete-icon.svg"
                                alt="close-icon"></button>
                        <button class="add-contact-create-contact-btn">Save<img src="./assets/icons/check-icon.svg"
                                alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

function getContactCard(contact) {
    const color = getColorForContact(contact.id);
    return `
    <div id="contact_card_${contact.id}" class="contact-card"
         onclick="openContactsSideCardOverlayById(${contact.id})">
      <div class="contact-profile" style="background-color:${color}">${contact.firstName[0]}${contact.lastName[0]}</div>
      <div class="contact-info">
        <span>${contact.firstName} ${contact.lastName}</span>
        <a>${contact.email}</a>
      </div>
    </div>
  `;
}

function getLetterGroup(currentFirstLetter) {
    return `
    <div class="contacts-letter-group">
        <p>${currentFirstLetter}</p>
        <div class="contact-list-seperator"></div>
    </div>
        `;
}

function showDeleteAndEditContactButton() {
    return `
    <div class="delete-edit-dropdown-contacts">
        <div>
            <p>Edit</p>
            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_313493_6285" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
                <rect x="0.5" width="32" height="32" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_313493_6285)">
                <path d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" fill="white"/>
                </g>
            </svg>
        </div>
        <div>
            <p>Delete</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_314135_4497" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_314135_4497)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
            </svg>
        </div>
    </div>
    `;
}

function getCreatedContactOverlay() {
    return `
    <div id="bg_contact_succesfully" class="bg-contact-overlay">
        <div class="created-contact-successfully-container">
            <p>Contact successfully created</p>
        </div>
    </div>
    `;
}

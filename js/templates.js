function getNavLinkLogInTemplate() {
    return `
        <ul class="nav-links">
            <li>
                <a>
                    <img src="./assets/icons/log-in-icon.svg" alt="log-in-icon">
                    <span>Log In</span>
                </a>
            </li>
        </ul>
    `;
}

function getAddContactOverlay() {
    return `
    <div class="add-contact-overlay">
            <div class="add-contact-left-section">
                <div class="add-contact-left-section-content">
                    <img class="add-contact-join-logo" src="./assets/img/join-logo-white.svg" alt="join-logo-white">
                    <div class="add-contact-headline">
                        <h1>Add contact</h1>
                        <h2>Tasks are better with a team!</h2>
                        <div class="add-contact-underlined"></div>
                    </div>
                </div>
            </div>
            <div class="add-contact-right-section">
                <img class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container">
                    <img src="./assets/img/contacts-person.svg" alt="contact-person">
                </div>
                <form>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-name-input" type="text" placeholder="Name">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-email-input" type="text" placeholder="Email">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-phone-input" type="text" placeholder="Phone">
                    </div>
                    <div class="add-contact-btn-section">
                        <button class="add-contact-cancel-btn">Cancel <img src="./assets/icons/contacts-close-icon.svg" alt="close-icon"></button>
                        <button class="add-contact-create-contact-btn">Create Contact <img src="./assets/icons/check-icon.svg" alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
        `;
}

function getEditContactOverlay() {
    return `
    <div class="add-contact-overlay">
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
                <img class="add-contact-close-btn" src="./assets/icons/contacts-close-icon.svg" alt="close-button">
                <div class="add-contact-person-svg-container">
                    <p>AZ</p>
                </div>
                <form>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-name-input" type="text" placeholder="Name">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-email-input" type="text" placeholder="Email">
                    </div>
                    <div class="add-contact-input-containers">
                        <input class="add-contact-phone-input" type="text" placeholder="Phone">
                    </div>
                    <div class="add-contact-btn-section">
                        <button class="add-contact-cancel-btn">Delete<img src="./assets/icons/delete-icon.svg"
                                alt="close-icon"></button>
                        <button class="add-contact-create-contact-btn">Save<img src="./assets/icons/check-icon.svg"
                                alt="check-icon"></button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function getUserProfileMenuOverlay() {
    return `
    <div class="user-profile-menu"> <!--in JS implementieren-->
            <div class="user-profile-content">
                <a href="legal_notice.html">Legal Notice</a>
                <a href="privacy_policy.html">Privacy Policy</a>
                <a href="">Log Out</a> <!--href ergänzen-->
            </div>
        </div>
    `;
}
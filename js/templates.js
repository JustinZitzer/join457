function getNavLinkLogInTemplate() {
    return `
        <ul class="nav-links">
            <li>
                <a href="index.html">
                    <img src="./assets/icons/log-in-icon.svg" alt="log-in-icon">
                    <span>Log In</span>
                </a>
            </li>
        </ul>
    `;
}

function getUserProfileMenuOverlay() {
    return `
    <div class="user-profile-menu">
            <div class="user-profile-content">
                <a href="legal_notice.html">Legal Notice</a>
                <a href="privacy_policy.html">Privacy Policy</a>
                <a href="index.html">Log Out</a>
            </div>
        </div>
    `;
}
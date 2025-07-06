function toggleUserProfileOverlay() {
    const userProfileMenu = document.getElementById('user_profile_menu');
    userProfileMenu.classList.toggle('hide')
}

function goToSummaryHtml() {
    window.location.href = 'summary.html';
    window.dispatchEvent(new Event('resize'));
}

function goToAddTaskHtml() {
    window.location.href = 'add_task.html';
    window.dispatchEvent(new Event('resize'));
}

function goToBoardHtml() {
    window.location.href = 'board.html';
    window.dispatchEvent(new Event('resize'));
}

function goToContactsHtml() {
    window.location.href = 'contacts.html';
    window.dispatchEvent(new Event('resize'));
}
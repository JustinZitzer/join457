function openOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("overlay-visible");

  overlay.onclick = function (event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  };

  const overlayContent = document.getElementById("content-add-task-overlay");
  overlayContent.innerHTML = `
        <div id="overlay-content" class="overlay-content" onclick="event.stopPropagation()">
            <div class="container-both-sides">
            <div class="inputfield-box-left-side">
                <div class="text-title">
                    <div class="text-title-mark">
                        <span>Title</span>
                    </div>
                    <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title">
                </div>
                <div class="description-main-box">
                    <div class="description-text">
                        <span>Description</span>
                        <input type="text" placeholder="Enter Description" class="inputfield-description">
                    </div>
                    <div class="inputfield-due-date-container">
                        <img class="calendar-clock" src="./assets/icons/calendar_clock.png" alt="clock-calendar">

                        <div class="due-date-mark">
                            <span>Due date</span>
                        </div>
                        <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field">
                    </div>
                </div>
            </div>
            <img class="line-middle-of-both-container" src="./assets/icons/Vector 4.png"
                alt="line between bothcontainers">

            <div class="inputfield-box-right-side">
                <div class="text-priority">
                    <div class="priority-box">
                        <span>Priority</span>

                        <div class="main-box-inputfield">
                            <div class="arrow-container-main-red">
                                <button onclick="toggleRed(this)" class="arrow-container-red">
                                    <h4>Urgent</h4>
                                    <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                                        alt="red-arrow">
                                </button>
                            </div>

                            <input type="text" placeholder="Medium =" class="text-inputfield-medium">

                            <div class="arrow-container-main-green">
                                <button onclick="toggleGreen(this)"class="arrow-container-green">
                                    <h5>Low</h5>
                                    <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png"
                                        alt="green-arrow">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="assigned-inputfield-box">
                        <span>Assigned to</span>
                        <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign">

                        <img class="assigned-arrow-icon" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">

                    </div>
                    <div class="task-inputfield-box">
                        <div class="category-mark">
                            <span>Category</span>
                        </div>
                        <input type="text" placeholder="Select task category" class="inputfield-category-assign">
                        <img class="assigned-arrow-icon-down" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">
                    </div>

                    <div class="subtask-inputfield-box">
                        <span>Subtasks</span>
                        <div class="subtask-inputfield-container">
                            <img class="add-icon-container" src="./assets/icons/subtask-plus-icon.svg"
                                alt="subtask-plus-icon">
                            <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign">
                        </div>
                    </div>
                    
                </div>
                <div class="field-required">
                    <span>This field is required</span>
                    
                </div>
            </div>
            
        </div>
        
    <div class="clear-create-container">
        <div class="clear-field">
            <div class="clear-text">Cancel</div>
            <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
        </div>

        <div class="create-field">
            <div class="text-create-field">Create Task</div>
            <img class="check-button" src="./assets/icons/check.png" alt="check-button">
        </div>
    </div>
    </div>
    </div>
    </div>

    `;

  const content = document.getElementById("overlay-content");
  if (content) {
    content.style.animation = "none";
    void content.offsetWidth;
    content.style.animation = "";
    content.classList.add("slide-in");
  }
}

function closeOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("overlay-visible");
  }
}

function overlayToDo() {
  const overlayToDoContainer = document.getElementById("overlay-todo");
  overlayToDoContainer.classList.add("overlay-visible");

  overlayToDoContainer.onclick = function (event) {
    if (event.target === overlayToDoContainer) {
      closeOverlayToDo();
    }
  };

  const overlayContentToDo = document.getElementById(
    "content-add-task-overlay-todo"
  );
  overlayContentToDo.innerHTML = `
        <div id="overlay-content-todo" class="overlay-todo-contentTodo" onclick="event.stopPropagation()">
            <div class="container-both-sides">
            <div class="inputfield-box-left-side">
                <div class="text-title">
                    <div class="text-title-mark">
                        <span>Title</span>
                    </div>
                    <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title">
                </div>
                <div class="description-main-box">
                    <div class="description-text">
                        <span>Description</span>
                        <input type="text" placeholder="Enter Description" class="inputfield-description">
                    </div>
                    <div class="inputfield-due-date-container">
                        <img class="calendar-clock" src="./assets/icons/calendar_clock.png" alt="clock-calendar">

                        <div class="due-date-mark">
                            <span>Due date</span>
                        </div>
                        <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field">
                    </div>
                </div>
            </div>
            <img class="line-middle-of-both-container" src="./assets/icons/Vector 4.png"
                alt="line between bothcontainers">

            <div class="inputfield-box-right-side">
                <div class="text-priority">
                    <div class="priority-box">
                        <span>Priority</span>

                        <div class="main-box-inputfield">
                            <div class="arrow-container-main-red">
                                <button onclick="toggleRed(this)" class="arrow-container-red">
                                    <h4>Urgent</h4>
                                    <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                                        alt="red-arrow">
                                </button>
                            </div>

                            <input type="text" placeholder="Medium =" class="text-inputfield-medium">

                            <div class="arrow-container-main-green">
                                <button onclick="toggleGreen(this)" class="arrow-container-green">
                                    <h5>Low</h5>
                                    <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png"
                                        alt="green-arrow">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="assigned-inputfield-box">
                        <span>Assigned to</span>
                        <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign">

                        <img class="assigned-arrow-icon" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">

                    </div>
                    <div class="task-inputfield-box">
                        <div class="category-mark">
                            <span>Category</span>
                        </div>
                        <input type="text" placeholder="Select task category" class="inputfield-category-assign">
                        <img class="assigned-arrow-icon-down" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">
                    </div>

                    <div class="subtask-inputfield-box">
                        <span>Subtasks</span>
                        <div class="subtask-inputfield-container">
                            <img class="add-icon-container" src="./assets/icons/subtask-plus-icon.svg"
                                alt="subtask-plus-icon">
                            <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign">
                        </div>
                    </div>
                    
                </div>
                <div class="field-required">
                    <span>This field is required</span>
                    
                </div>
            </div>
            
        </div>
        
    <div class="clear-create-container">
        <div class="clear-field">
            <div class="clear-text">Cancel</div>
            <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
        </div>

        <div class="create-field">
            <div class="text-create-field">Create Task</div>
            <img class="check-button" src="./assets/icons/check.png" alt="check-button">
        </div>
    </div>
    </div>
    </div>
    </div>
    `;

  const content = document.getElementById("overlay-content-todo");
  if (content) {
    content.style.animation = "none";
    void content.offsetWidth;
    content.style.animation = "";
    content.classList.add("slide-in");
  }
}

function closeOverlayToDo() {
  const overlayToDo = document.getElementById("overlay-todo");
  if (overlayToDo) {
    overlayToDo.classList.remove("overlay-visible");
  }
}

function openOverlayInProgress() {
  const overlayInProgress = document.getElementById("overlay-in-progress");
  overlayInProgress.classList.add("overlay-visible");

  overlayInProgress.onclick = function (event) {
    if (event.target === overlayInProgress) {
      closeOverlayInProgress();
    }
  };

  const overlayContentProgress = document.getElementById(
    "content-add-task-overlay-in-progress"
  );
  overlayContentProgress.innerHTML = `
        <div id="overlay-content-progress" class="overlay-content" onclick="event.stopPropagation()">
        <div class="container-both-sides">
            <div class="inputfield-box-left-side">
                <div class="text-title">
                    <div class="text-title-mark">
                        <span>Title</span>
                    </div>
                    <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title">
                </div>
                <div class="description-main-box">
                    <div class="description-text">
                        <span>Description</span>
                        <input type="text" placeholder="Enter Description" class="inputfield-description">
                    </div>
                    <div class="inputfield-due-date-container">
                        <img class="calendar-clock" src="./assets/icons/calendar_clock.png" alt="clock-calendar">

                        <div class="due-date-mark">
                            <span>Due date</span>
                        </div>
                        <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field">
                    </div>
                </div>
            </div>
            <img class="line-middle-of-both-container" src="./assets/icons/Vector 4.png"
                alt="line between bothcontainers">

            <div class="inputfield-box-right-side">
                <div class="text-priority">
                    <div class="priority-box">
                        <span>Priority</span>

                        <div class="main-box-inputfield">
                            <div class="arrow-container-main-red">
                                <button onclick="toggleRed(this)" class="arrow-container-red">
                                    <h4>Urgent</h4>
                                    <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                                        alt="red-arrow">
                                </button>
                            </div>

                            <input type="text" placeholder="Medium =" class="text-inputfield-medium">

                            <div class="arrow-container-main-green">
                                <button onclick="toggleGreen(this)" class="arrow-container-green">
                                    <h5>Low</h5>
                                    <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png"
                                        alt="green-arrow">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="assigned-inputfield-box">
                        <span>Assigned to</span>
                        <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign">

                        <img class="assigned-arrow-icon" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">

                    </div>
                    <div class="task-inputfield-box">
                        <div class="category-mark">
                            <span>Category</span>
                        </div>
                        <input type="text" placeholder="Select task category" class="inputfield-category-assign">
                        <img class="assigned-arrow-icon-down" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">
                    </div>

                    <div class="subtask-inputfield-box">
                        <span>Subtasks</span>
                        <div class="subtask-inputfield-container">
                            <img class="add-icon-container" src="./assets/icons/subtask-plus-icon.svg"
                                alt="subtask-plus-icon">
                            <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign">
                        </div>
                    </div>
                    
                </div>
                <div class="field-required">
                    <span>This field is required</span>
                    
                </div>
            </div>
            
        </div>
        
    <div class="clear-create-container">
        <div class="clear-field">
            <div class="clear-text">Cancel</div>
            <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
        </div>

        <div class="create-field">
            <div class="text-create-field">Create Task</div>
            <img class="check-button" src="./assets/icons/check.png" alt="check-button">
        </div>
    </div>
    </div>
    </div>
    </div>
        </div>
    `;

  const content = document.getElementById("overlay-content-progress");
  if (content) {
    content.style.animation = "none";
    void content.offsetWidth;
    content.style.animation = "";
    content.classList.add("slide-in");
  }
}

function closeOverlayInProgress(event) {
  document
    .getElementById("overlay-in-progress")
    .classList.remove("overlay-visible");
}

function openOverlayFeedback() {
  const openOverlayAwaitFeedback = document.getElementById(
    "overlay-await-feedback"
  );
  openOverlayAwaitFeedback.classList.add("overlay-visible");
  let overlayAwaitFeedback = document.getElementById(
    "content-add-task-overlay-await-feedback"
  );
  overlayAwaitFeedback.innerHTML += `
   <div id="overlay-content-progress" class="overlay-content" onclick="event.stopPropagation()">
        <div class="container-both-sides">
            <div class="inputfield-box-left-side">
                <div class="text-title">
                    <div class="text-title-mark">
                        <span>Title</span>
                    </div>
                    <input type="text" placeholder="Enter a title" class="title-inputfield-enter-title">
                </div>
                <div class="description-main-box">
                    <div class="description-text">
                        <span>Description</span>
                        <input type="text" placeholder="Enter Description" class="inputfield-description">
                    </div>
                    <div class="inputfield-due-date-container">
                        <img class="calendar-clock" src="./assets/icons/calendar_clock.png" alt="clock-calendar">

                        <div class="due-date-mark">
                            <span>Due date</span>
                        </div>
                        <input type="text" placeholder="dd/mm/yyy" class="due-date-text-field">
                    </div>
                </div>
            </div>
            <img class="line-middle-of-both-container" src="./assets/icons/Vector 4.png"
                alt="line between bothcontainers">

            <div class="inputfield-box-right-side">
                <div class="text-priority">
                    <div class="priority-box">
                        <span>Priority</span>

                        <div class="main-box-inputfield">
                            <div class="arrow-container-main-red">
                                <button onclick="toggleRed(this)" class="arrow-container-red">
                                    <h4>Urgent</h4>
                                    <img class="arrow-red" src="./assets/icons/double-arrow-up-14221.png"
                                        alt="red-arrow">
                                </button>
                            </div>

                            <input type="text" placeholder="Medium =" class="text-inputfield-medium">

                            <div class="arrow-container-main-green">
                                <button onclick="toggleGreen(this)" class="arrow-container-green">
                                    <h5>Low</h5>
                                    <img class="arrow-green" src="./assets/icons/double-arrow-down-14228.png"
                                        alt="green-arrow">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="assigned-inputfield-box">
                        <span>Assigned to</span>
                        <input type="text" placeholder="Select contacts to assign" class="inputfield-text-assign">

                        <img class="assigned-arrow-icon" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">

                    </div>
                    <div class="task-inputfield-box">
                        <div class="category-mark">
                            <span>Category</span>
                        </div>
                        <input type="text" placeholder="Select task category" class="inputfield-category-assign">
                        <img class="assigned-arrow-icon-down" src="./assets/icons/arrow_drop_down.png"
                            alt="assigned-arrow-button">
                    </div>

                    <div class="subtask-inputfield-box">
                        <span>Subtasks</span>
                        <div class="subtask-inputfield-container">
                            <img class="add-icon-container" src="./assets/icons/subtask-plus-icon.svg"
                                alt="subtask-plus-icon">
                            <input type="text" placeholder="Add new subtask" class="inputfield-subtask-assign">
                        </div>
                    </div>
                    
                </div>
                <div class="field-required">
                    <span>This field is required</span>
                    
                </div>
            </div>
            
        </div>
        
    <div class="clear-create-container">
        <div class="clear-field">
            <div class="clear-text">Cancel</div>
            <img class="close-button" src="./assets/icons/close.png" alt="close-icon">
        </div>

        <div class="create-field">
            <div class="text-create-field">Create Task</div>
            <img class="check-button" src="./assets/icons/check.png" alt="check-button">
        </div>
    </div>
    </div>
    </div>
    </div>
        </div>
    `;

  // Animation erneut triggern (falls mehrfach geöffnet)
  const contentAwait = openOverlayAwaitFeedback.querySelector(
    ".overlay-await-feedback-contentAwait"
  );
  contentAwait.style.animation = "none";
  void contentAwait.offsetWidth; // Reflow erzwingen
  contentAwait.style.animation = "";
  contentAwait.classList.add("slide-in");
}

function closeOverlayFeedback(event) {
  document
    .getElementById("overlay-await-feedback")
    .classList.remove("overlay-visible");
}

function selectContacts() {
  const dropdown = document.getElementById("contacts-dropdown");
  dropdown.classList.toggle("hidden");
}

function toggleRed(button) {
  button.classList.toggle("active");
}

function toggleOrange(button) {
  button.classList.toggle("active");
}

function toggleGreen(button) {
  button.classList.toggle("active");
}

function toggleDropdown() {
  var dropdown = document.getElementById("category-dropdown");
  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
  } else {
    dropdown.classList.add("dropdown-open");
  }
}

function selectCategory(category) {
  var input = document.getElementById("category-input");
  input.value = category;

  var dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("dropdown-open");
}

function validateInput() {
  const input = document.getElementById("titleInput");
  const errorMsg = document.getElementById("error-message");

  if (input.value.trim() === "") {
    errorMsg.textContent = "This field is required.";
    errorMsg.style.display = "block";
    input.classList.add("input-error");
  } else {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    input.classList.remove("input-error");
  }
}

function validateDueDateInput() {
  const input = document.getElementById("dueDateInput");
  const errorMsg = document.getElementById("due-date-error");

  if (input.value.trim() === "") {
    errorMsg.textContent = "This field is required.";
    errorMsg.style.display = "block";
    input.classList.add("input-error");
  } else {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    input.classList.remove("input-error");
  }
}

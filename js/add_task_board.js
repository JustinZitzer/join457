const contactColors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1",
  "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B"];

/** Initializes the board view and loads all required data. */
async function initBoard() {
  await loadHTML();
  await loadAllTasksFromFirebase();
  await loadDataBoard();
  selectedSiteBackgroundStyle();
  checkTodaysDate();
}

/** Activates the medium priority button in the add-task view. */
function loadMediumButtonPriority() {
  const mediumButton = document.getElementById('arrow-container-orange');
  mediumButton.classList.add('active');
}

/** Activates the medium priority button in the board overlay. */
function loadMediumButtonPriorityBoard() {
  const mediumButton = document.getElementById('arrow-container-orange-board');
  mediumButton.classList.add('active');
}

/** Sets up the overlay close behavior for button and background interaction. */
function setupOverlayClose(overlay, overlayContent) {
  const closeButton = overlayContent.querySelector(".x-close-button-add-task-overlay");

  closeButton.addEventListener("click", () => {
    overlayContent.classList.remove("slide-in");
    overlayContent.classList.add("slide-out");

    setTimeout(() => {
      overlay.classList.add("display-none");
      overlay.classList.remove("overlay-visible");

      overlayContent.classList.remove("slide-out");
      overlayContent.innerHTML = "";
    }, 200);
  });

  closeOverlayBackground(overlay, overlayContent);
}

/** Closes the overlay when the background is clicked. */
function closeOverlayBackground(overlay, overlayContent) {
  overlay.addEventListener("click", () => {
    overlayContent.classList.remove("slide-in");
    overlayContent.classList.add("slide-out");

    setTimeout(() => {
      overlay.classList.add("display-none");
      overlay.classList.remove("overlay-visible");

      overlayContent.classList.remove("slide-out");
      overlayContent.innerHTML = "";
    }, 200);
  });
}

/** Opens the add-task overlay or redirects to the add-task page on smaller screens. */
function openOverlay(status) {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("content-add-task-overlay");

  overlay.classList.remove("display-none");
  overlay.classList.add("overlay-visible");

  if (window.innerWidth > 1400) {
    overlayContent.innerHTML = getTaskOverlayTemplate(status);
    overlayContent.classList.add("slide-in");

    setupOverlayClose(overlay, overlayContent);
    checkTodaysDate();
  } else {
    window.location.href = "./add_task.html";
  }
}

/** Closes the overlay by removing its visible state. */
function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("overlay-visible");
}

if (window.location.pathname.endsWith("board.html")) {
  document.getElementById("overlay").addEventListener("click", closeOverlay);
}

if (window.location.pathname.endsWith("board.html")) {
  document.getElementById("content-add-task-overlay").addEventListener("click", function (event) {
      event.stopPropagation();
    });
}

/** Toggles the visibility of the contacts dropdown. */
function selectContacts() {
  const fieldRequiered = document.getElementById("field-required");
  const windowWidth = window.innerWidth;
  const dropdown = document.getElementById("contacts-dropdown");
  const isHidden = dropdown.classList.contains("hidden");
  dropdown.classList.toggle("hidden");
  if (windowWidth <= 1400) {
    if (isHidden) {
      fieldRequiered.style.top = "1100px";
    } else {
      fieldRequiered.style.top = "870px";
    }
  }
}

/** Toggles the active state of a priority button and resets others if needed. */
function togglePriority(button) {
  const anyActive = arrowContainerRed.classList.contains("active") || arrowContainerOrange.classList.contains("active") || arrowContainerGreen.classList.contains("active");

  if (button.classList.contains("active")) {
    button.classList.remove("active");
  } else if (anyActive) {
    arrowContainerRed.classList.remove("active");
    arrowContainerOrange.classList.remove("active");
    arrowContainerGreen.classList.remove("active");
    button.classList.add("active");
  } else {
    button.classList.add("active");
  }
}

/** Opens the category dropdown and adjusts input border styling. */
function openDropdown(taskSubtask, dropdown) {
  dropdown.classList.remove("display-none");

  setTimeout(() => {
    dropdown.classList.add("dropdown-open");
  }, 1);

  if (taskSubtask.value.trim() !== "") {
    taskSubtask.style.borderTop = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderBottom = "none";
  }
}

/** Toggles the category dropdown in the add-task form. */
function toggleDropdown() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  const dropdown = document.getElementById("category-dropdown");

  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");

    setTimeout(() => {
      dropdown.classList.add("display-none");
    }, 300);

    taskSubtask.style.borderBottom = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderTop = "none";

    validateGetCategoryForNewTask();
  } else {
    openDropdown(taskSubtask, dropdown);
  }
}

/** Opens the category dropdown in the overlay and adjusts input border styling. */
function openDropdownOverlay(taskSubtask, dropdown) {
  dropdown.classList.remove("display-none");

  setTimeout(() => {
    dropdown.classList.add("dropdown-open");
  }, 1);

  if (taskSubtask.value.trim() !== "") {
    taskSubtask.style.borderTop = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderBottom = "none";
  }
}

/** Toggles the category dropdown inside the overlay form. */
function toggleDropdownOverlay() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign1");
  const dropdown = document.getElementById("category-dropdown");

  if (dropdown.classList.contains("dropdown-open")) {

    dropdown.classList.remove("dropdown-open");

    setTimeout(() => {
      dropdown.classList.add("display-none");
    }, 300);

    taskSubtask.style.borderBottom = "1px solid #29ABE2";
    taskSubtask.style.borderRight = "1px solid #29ABE2";
    taskSubtask.style.borderTop = "none";

    validateGetCategoryForNewTask();

  } else {
    openDropdownOverlay(taskSubtask, dropdown);
  }
}

/** Selects a category and closes the dropdown in the add-task form. */
function selectCategory(category) {
  var input = document.getElementById("category-input");
  input.value = category;

  var dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("dropdown-open");
  dropdown.classList.add("display-none");
  validateGetCategoryForNewTask();
}

/** Selects a category and closes the dropdown in the overlay form. */
function selectCategoryOverlay(category) {
  var input = document.getElementById("category-input1");
  input.value = category;

  var dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("dropdown-open");
  dropdown.classList.add("display-none");
}

/** Validates the title input field in the add-task form. */
function validateInput() {
  const input = document.getElementById("titleInput");
  const errorMsg = document.getElementById("error-message");

  if (input.value.trim() === "") errorMsg.innerHTML = "*This field is required.";
  else if (input.value.trim().length < 3) errorMsg.innerHTML = "*Title must be 3 characters long.";
  else if (/[.#$[\]\/?]/.test(input.value)) errorMsg.innerHTML = "*Invalid characters: . # $ [ ] / ?";
  else {
    errorMsg.classList.add("display-none");
    return input.value;
  }
  errorMsg.classList.remove("display-none");
}

/** Validates the title input field in the overlay form. */
function validateInputOverlay() {
  const input = document.getElementById("titleInput1");
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

/** Displays an error message for an invalid input field. */
function showInputError(input, errorMsgElement, message) {
  errorMsgElement.textContent = message;
  errorMsgElement.style.display = "block";
  input.classList.add("input-error");
}

/** Clears the error message of an input field. */
function clearInputError(input, errorMsgElement) {
  errorMsgElement.textContent = "";
  errorMsgElement.style.display = "none";
  input.classList.remove("input-error");
}

/** Validates the due date input in the add-task form. */
function validateDueDateInput() {
  const input = document.getElementById("dueDateInput");
  const errorMsg = document.getElementById("due-date-error");
  const value = input.value.trim();

  const dateCheck = /^\d{4}-\d{2}-\d{2}$/;

  if (!value) {
    showInputError(input, errorMsg, "*This field is required.");
    return false;
  } else if (!dateCheck.test(value)) {
    showInputError(input, errorMsg, "*Please pick a date.");
    return false;
  } else {
    clearInputError(input, errorMsg);
    return true;
  }
}

/** Opens the native date picker for the due date input. */
function openDatePicker(event) {
  const input = document.getElementById("dueDateInput");
  input.focus();

  // Chrome/Edge: öffnet sicher
  if (typeof input.showPicker === "function") {
    input.showPicker();
  }
}

/** Validates the due date input in the overlay form. */
function validateDueDateInputOverlay() {
  const input = document.getElementById("dueDateInput1");
  const errorMsg = document.getElementById("due-date-error");
  const value = input.value.trim();

  const dateCheckSlash = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showInputError(input, errorMsg, "*This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showInputError(input, errorMsg, "*Please pick a date.");
  } else {
    clearInputError(input, errorMsg);
  }
}

/** Loads contacts, sorts them, and renders them into the given container. */
async function loadAndRenderContacts(container) {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);

  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;

  for (const contact of contacts) {
    container.innerHTML += getContactCardForDropdown(contact);
  }
}

/** Loads contacts into the dropdown if not already rendered. */
async function loadContactsForDropdown() {
  const container = document.getElementById("contacts-dropdown");
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      await loadAndRenderContacts(container);
      showCirclesInDropdownAddTask();
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
    selectContacts();
  } else {
    selectContacts();
  }
}

/** Toggles the border styling of the assign-to input field. */
function changeinputFieldAssignToStyle() {
  if (inputFieldAssignTo.classList.contains("custom-border")) {
    inputFieldAssignTo.style.borderTop = "";
    inputFieldAssignTo.style.borderRight = "";
    inputFieldAssignTo.classList.remove("custom-border");
  } else {
    inputFieldAssignTo.style.borderTop = "1px solid #29ABE2";
    inputFieldAssignTo.style.borderRight = "1px solid #29ABE2";
    inputFieldAssignTo.classList.add("custom-border");
  }
}

/** Collects and returns all entered values for creating a new task. */
function getInfoForNewTask() {
  let titel = taskTitel.value || "New Task";
  let description = taskDescription.value || "No description";
  let dueDate = taskDueDate.value;
  let priority = getPriorityForNewTask();
  let assignedTo = getAssignedToValue();
  let categoryUserOrTechnicalTask = getCategoryForNewTask();
  let subtasks = updateSubtasksArray() || "No subtasks";
  return { titel, description, dueDate, priority, assignedTo, categoryUserOrTechnicalTask, subtasks };
}

/** Returns the selected category for a new task. */
function getCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");

  if (!taskCategory.value == "") {
    return taskCategory.value;
  } else {
    alert("Please select a valid category: 'Technical Task' or 'User Story'");
  }
}

/** Validates the selected category for a new task. */
function validateGetCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");
  const fieldRequired = document.getElementById("error-field-category");
  if (taskCategory.value == "Technical Task" || taskCategory.value == "User Story") {
    fieldRequired.classList.add("display-none");
    taskCategory.classList.remove("border-red-add-task");
    return taskCategory.value;
  } else {
    if (taskCategory.value == "") {
      fieldRequired.classList.remove("display-none");
    }
  }
}
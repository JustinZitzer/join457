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

  if (input.value.trim() === "") {
    errorMsg.classList.remove("display-none");
  } else {
    errorMsg.classList.add("display-none");
  }
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

/** Makes the category dropdown visible for animation. */
function addStyleForDropdownAnimation() {
  const dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("display-none");
}

/** Adds a subtask object to the subtasks array. */
function pushSubtaskToArray(subtasksArray, subtaskTextElement) {
  const subtask = subtaskTextElement.textContent.trim().replace("• ", "");
  subtasksArray.push({
    subtaskText: subtask,
    statusCheckbox: false
  });
}

/** Rebuilds and returns the current subtasks array from the DOM. */
function updateSubtasksArray() {
  let subtasksArray = [];

  for (let index = 0; index < subtaskSavedCounter; index++) {
    const subtaskElement = document.getElementById(`subtask-${index}`);
    const subtaskTextElement = document.getElementById(`subtask-list-element-div${index}`);
    const checkboxElement = document.getElementById(`subtask-checkbox${index}`);

    if (subtaskElement && subtaskTextElement && checkboxElement) {
      pushSubtaskToArray(subtasksArray, subtaskTextElement);
    }
  }
  return subtasksArray;
}

/** Adds the current subtask input as a new subtask element. */
function addSubtaskInContainer() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  const savedSubtasks = document.getElementById("subtask-added-tasks");
  const buttonDiv = document.getElementById("clear-create-container");
  let subtask = taskSubtask.value.trim();

  if (subtask) {
    savedSubtasks.innerHTML += getSubtaskListElementTemplate(subtask, subtaskSavedCounter);
    subtaskSavedCounter++;
    taskSubtask.value = "";
    updateSubtasksArray();
  }
}

/** Replaces the plus icon with check and cross icons in the subtask input. */
function hidePlusIconShowCheckAndCrossIcon() {
  const plusIcon = document.getElementById("add-icon-container");
  const checkIcon = document.getElementById("subtask-icon-cross");
  const separatorIcon = document.getElementById("subtask-icon-separator");
  const checkIconCheck = document.getElementById("subtask-icon-check");
  plusIcon.classList.add("display-none");
  checkIcon.classList.remove("display-none");
  separatorIcon.classList.remove("display-none");
  checkIconCheck.classList.remove("display-none");
}

/** Clears the subtask input field and restores the default icons. */
function clearSubtaskInputField(event) {
  if (event) event.stopPropagation();
  const plusIcon = document.getElementById("add-icon-container");
  const checkIcon = document.getElementById("subtask-icon-cross");
  const separatorIcon = document.getElementById("subtask-icon-separator");
  const checkIconCheck = document.getElementById("subtask-icon-check");
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  taskSubtask.value = "";
  plusIcon.classList.remove("display-none");
  checkIcon.classList.add("display-none");
  separatorIcon.classList.add("display-none");
  checkIconCheck.classList.add("display-none");
}

/** Replaces a saved subtask with an editable input field. */
function editSavedSubtask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(`subtask-list-element-div${subtaskSavedCounter}`);
  subTaskElement.innerHTML = getSubtaskEditInputFieldTemplate(subtask, subtaskSavedCounter);
}

/** Saves the edited subtask text and updates the DOM. */
function saveEditedSubtask(subtaskSavedCounter) {
  const input = document.getElementById(`edit-subtask-inputfield${subtaskSavedCounter}`);
  if (!input) return;
  const newValue = input.value;

  const subTaskElementDiv = document.getElementById(`subtask-list-element-div${subtaskSavedCounter}`);
  if (!subTaskElementDiv) return;
  const liElement = subTaskElementDiv.parentElement;

  liElement.outerHTML = getSubtaskListElementTemplate(newValue, subtaskSavedCounter);

  updateSubtasksArray();
}

/** Deletes a saved subtask from the DOM. */
function deleteSavedSubTask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(`subtask-${subtaskSavedCounter}`);
  if (subTaskElement) subTaskElement.remove();

  updateSubtasksArray();
}

/** Returns an array of all selected contacts. */
function getAssignedToValue() {
  let assignedTo = [];

  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const checkbox = document.getElementById(`contact-checkbox-${contact.id}`);
    const nameElem = document.getElementById(`contact-name-${contact.id}`);

    if (checkbox && checkbox.checked && nameElem) {
      assignedTo.push(nameElem.textContent.trim());
    }
  }

  return assignedTo;
}

/** Updates the background styling of selected contacts in the dropdown. */
function addBackgroundForDropwdown() {
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const checkbox = document.getElementById(`contact-checkbox-${contact.id}`);
    const nameBox = document.getElementById(`contact-option-add-task${contact.id}`);

    if (checkbox.checked) {
      nameBox.style.backgroundColor = "rgba(42, 54, 71, 1)";
      nameBox.style.color = "white";
    } else {
      nameBox.style.backgroundColor = "";
      nameBox.style.color = "";
    }
  }
}

/** Toggles the selected background styling for a contact in edit mode. */
function toggleContactEditBackground(contactId, taskKey) {
  const checkbox = document.getElementById(`contact-checkbox-${contactId}${taskKey}`);
  const container = document.getElementById(`contact-option-edit${contactId}${taskKey}`);

  if (!checkbox || !container) return;

  if (checkbox.checked) {
    container.style.backgroundColor = "rgba(42, 54, 71, 1)";
    container.style.color = "white";
  } else {
    container.style.backgroundColor = "";
    container.style.color = "";
  }
}

/** Renders initials circles for all contacts in the add-task dropdown. */
function showCirclesInDropdownAddTask() {
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];

    const nameElement = document.getElementById(`contact-name-${contact.id}`);
    const circleElement = document.getElementById(`circle-initials-in-dropdown${contact.id}`);

    const fullName = nameElement.textContent;
    const names = fullName.split(" ");

    let initials = "";

    if (names[0]) initials += names[0][0].toUpperCase();
    if (names[1]) initials += names[1][0].toUpperCase();

    const color = contactColors[i % contactColors.length];

    circleElement.innerHTML = getContactCircleTemplateDropwdown("circle-initials-in-dropdown", initials, color);
  }
}

/** Returns a contact color based on its index. */
function getContactColor(index) {
  return contactColors[index % contactColors.length];
}

/** Creates initials for assigned contacts and triggers circle rendering. */
function getContactForCircle() {
  let assignedContacts = getAssignedToValue();
  assignedContacts = assignedContacts.filter((contact) => contact !== "Not Assigned to anyone");
  let nameInitialesArray = [];

  for (let i = 0; i < assignedContacts.length; i++) {
    const fullNames = assignedContacts[i].trim();
    const names = fullNames.split(" ");
    let initials = "";
    if (names[0]) initials += names[0][0].toUpperCase();
    if (names[1]) initials += names[1][0].toUpperCase();
    nameInitialesArray.push(initials);
  }
  renderCirclesForAssignedContacts(nameInitialesArray);
  return nameInitialesArray;
}

/** Determines whether assigned contact circles should be hidden. */
function shouldHideAssignedCircles(nameInitialesArray, contactsDropdown) {
  return (
    nameInitialesArray.length === 0 ||
    nameInitialesArray.includes("Not Assigned to anyone") ||
    !contactsDropdown.classList.contains("hidden")
  );
}

/** Renders up to three initials circles for assigned contacts. */
function renderCirclesForAssignedContacts(nameInitialesArray) {
  circleRenderContainer.innerHTML = "";

  if (shouldHideAssignedCircles(nameInitialesArray, contactsDropdown)) {
    circleFlexContainer.classList.add("display-none");
    return;
  }

  const circleClasses = ["single-circle-first", "single-circle-second", "single-circle-third"];

  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += getContactCircleTemplate(circleClasses[i], initials);
  }
  if (nameInitialesArray.length > 3) {
    circleRenderContainer.innerHTML += `+${nameInitialesArray.length - 3}`;
  }

  circleFlexContainer.classList.remove("display-none");
}

/** Clears all relevant input values and subtask content. */
function clearInnerHtmlAndValues() {
  taskTitel.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskCategory.value = "";
  taskSubtask.value = "";
  savedSubtasks.innerHTML = "";
}

/** Resets all input fields and UI states for creating a new task. */
function clearInputFieldsForNewTask() {
  const contacts = document.getElementsByClassName("contact-checkbox");
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const threeCirclesContainer = document.getElementById("three-circle-container");

  clearInnerHtmlAndValues();

  taskPriorityUrgent.classList.remove("active");
  taskPriorityMedium.classList.remove("active");
  taskPriorityLow.classList.remove("active");
  resetAllErrorMessages();
  errorMessage.classList.add("display-none");
  threeCirclesContainer.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    contacts[i].checked = false;
  }
  loadMediumButtonPriority();
}

/** Resets all visible error messages and input error styles. */
function resetAllErrorMessages() {
  const titleInput = document.getElementById("titleInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const categoryInput = document.getElementById("category-input");
  const titleErrorMessage = document.getElementById("error-message");
  const dueDateErrorMessage = document.getElementById("due-date-error");
  const categoryErrorMessage = document.getElementById("error-field-category");


  titleInput.classList.remove("border-red-add-task");
  dueDateInput.classList.remove("border-red-add-task");
  categoryInput.classList.remove("border-red-add-task");

  titleErrorMessage.classList.add("display-none");
  dueDateErrorMessage.classList.add("display-none");
  categoryErrorMessage.classList.add("display-none");
}

/** Returns the currently selected task priority. */
function getPriorityForNewTask() {
  if (taskPriorityUrgent.classList.contains("active")) {
    return "Urgent";
  } else if (taskPriorityMedium.classList.contains("active")) {
    return "Medium";
  } else if (taskPriorityLow.classList.contains("active")) {
    return "Low";
  } else {
    return "No priority selected";
  }
}

/** Validates and posts a new task to Firebase. */
async function postNewTaskToFirebase() {
  if (taskTitel.value && taskCategory.value && validateDueDateInput()) {
    const inputsForTask = getInfoForNewTask();
    const newTaskKey = taskTitel.value;
    const dataPost = await putRegistryDataBaseFunction("tasks/toDo/" + newTaskKey, inputsForTask);
    clearInputFieldsForNewTask();
    showTaskAddedMessage();
    resetAllErrorMessages();
    goToBoardHtml();
  } else {
    allErrorRulesForNewTask();
  }
}

/** Applies all validation error rules for an invalid new task form. */
function allErrorRulesForNewTask() {
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const subtaskDiv = document.getElementById("subtask-added-tasks");
  showErrorForNewTaskTitle();
  showErrorForNewTaskDueDate();
  showErrorForNewTaskCategory();
  errorMessage.classList.remove("display-none");
}

/** Shows an error state for the title input if it is empty. */
function showErrorForNewTaskTitle() {
  const titleInput = document.getElementById("titleInput");
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const titleErrorMessage = document.getElementById("error-message");

  if (!titleInput.value) {
    errorMessage.classList.add("display-none");
    titleInput.classList.add("border-red-add-task");
    titleErrorMessage.classList.remove("display-none");
  }
}

/** Shows an error state for the due date input if it is empty. */
function showErrorForNewTaskDueDate() {
  const dueDateInput = document.getElementById("dueDateInput");
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const dueDateErrorMessage = document.getElementById("due-date-error");

  if (!dueDateInput.value) {
    errorMessage.classList.add("display-none");
    dueDateInput.classList.add("border-red-add-task");
    dueDateErrorMessage.classList.remove("display-none");
    dueDateErrorMessage.textContent = "*Please pick a date TT/MM/YYYY.";
  }
}

/** Shows an error state for the category input if it is empty. */
function showErrorForNewTaskCategory() {
  const categoryInput = document.getElementById("category-input");
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const categoryErrorMessage = document.getElementById("error-field-category");

  if (!categoryInput.value) {
    errorMessage.classList.add("display-none");
    categoryInput.classList.add("border-red-add-task");
    categoryErrorMessage.classList.remove("display-none");
  }
}

/** Shows the check and cross icons for subtask input in the board overlay. */
function addCrossAndCheckIconStyle() {
  const plusIcon = document.getElementById("add-icon-container-board");
  const inputfieldDiv = document.getElementById("inputfield-and-icons-subtask-board-overlay-open");

  plusIcon.classList.add("display-none");
  inputfieldDiv.classList.remove("display-none");
}

/** Clears the current subtask text in the board overlay input. */
function deleteCurrentSubtaskText() {
  const input = document.getElementById("inputfield-subtask-assign-in-board");
  const plusIcon = document.getElementById("add-icon-container-board");
  const inputfieldDiv = document.getElementById("inputfield-and-icons-subtask-board-overlay-open");

  input.value = "";

  plusIcon.classList.remove("display-none");
  inputfieldDiv.classList.add("display-none");
}

/** Displays the success message after adding a task. */
function showTaskAddedMessage() {
  const taskAddedDiv = document.getElementById("task-added-add-task-div");
  taskAddedDiv.classList.remove("display-none");
  taskAddedDiv.classList.add("show-success");
  setTimeout(() => {
    taskAddedDiv.classList.remove("show-success");
    taskAddedDiv.classList.add("display-none");
  }, 1000);
}

/** Displays the success message after adding a task in the board view. */
function showTaskAddedMessageBoard() {
  const taskAddedDiv = document.getElementById("task-added-in-board-div");
  taskAddedDiv.classList.remove("display-none");
  setTimeout(() => {
    taskAddedDiv.classList.add("display-none");
  }, 1000);
}

/** Toggles the move-to-category dropdown icon menu for mobile view. */
function showMoveToCategoryIcon(event, taskKey) {
  event.stopPropagation();
  const moveToDropdown = document.getElementById(`user-profile-menu-mobile${taskKey}`);
  if (moveToDropdown.classList.contains("display-none")) {
    moveToDropdown.classList.remove("display-none");
  } else {
    moveToDropdown.classList.add("display-none");
  }
}

/** Moves a task from one category to another in Firebase. */
async function moveTaskToCategory(event, taskId, newCategory) {
  event.preventDefault(); event.stopPropagation();
  const dropdownMenu = document.getElementById(`user-profile-menu-mobile${taskId}`);
  const task = todosArray.find(t => t.id == taskId); if (!task) return;
  const oldCategory = task.category;
  if (oldCategory === newCategory) { dropdownMenu?.classList.add("display-none"); return; }

  await fetch(FireBaseUrl + `tasks/${oldCategory}/${task.id}.json`, { method: "DELETE" });
  task.category = newCategory;

  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {
    method: "PUT", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  dropdownMenu?.classList.add("display-none"); loadAllTasksFromFirebase();
}

/** Validates the category input field in the board overlay. */
function validateCategoryInBoardInput() {
  const inputField = document.getElementById("inputfield-category-assign-board");
  const value = inputField.value.trim();
  const errorField = document.getElementById("field-required-in-board-category");

  if (value !== "Technical Task" && value !== "User Story") {
    inputField.classList.add("border-red-board");
    errorField.classList.remove("display-none");
  } else {
    inputField.classList.remove("border-red-board");
    errorField.classList.add("display-none");
  }
}

/** Resets all validation messages and styles in the board overlay. */
function resetAllInfosInBoardOverlay() {
  const errorTitle = document.getElementById("field-required-in-board");
  const errorDueDate = document.getElementById("due-date-required-board-error");
  const errorCategory = document.getElementById("field-required-in-board-category");
  const titleInput = document.getElementById("titleInputBoard");
  const dueDateInput = document.getElementById("dueDateInputBoard");
  const categoryInput = document.getElementById("inputfield-category-assign-board");

  errorTitle.classList.add("display-none");
  errorDueDate.classList.add("display-none");
  errorCategory.classList.add("display-none");
  titleInput.style.border = "";
  dueDateInput.style.border = "";
  categoryInput.classList.remove("border-red-board");
}

/** Clears all board overlay input values and related container content. */
function resetBoardInputValues(taskTitel, taskDescription, taskDueDate, taskCategory, taskSubtask, savedSubtasks, circleContainer) {
  taskTitel.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskCategory.value = "";
  taskSubtask.value = "";
  savedSubtasks.innerHTML = "";
  circleContainer.innerHTML = "";
}

/** Resets all priority button states in the board overlay. */
function resetBoardPriority(taskPriorityUrgent, taskPriorityMedium, taskPriorityLow) {
  taskPriorityUrgent.classList.remove("active");
  taskPriorityMedium.classList.remove("active");
  taskPriorityLow.classList.remove("active");
}

/** Unchecks all selected contacts in the board overlay. */
function resetBoardContacts(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact.checked = false;
  }
}

/** Clears and resets all input fields in the board overlay. */
function clearInputFieldsForNewTaskBoard() {
  const taskTitel = document.getElementById("titleInputBoard");
  const taskDescription = document.getElementById("inputfield-description-board");
  const taskDueDate = document.getElementById("dueDateInputBoard");
  const taskPriorityUrgent = document.getElementById("arrow-container-red-board");
  const taskPriorityMedium = document.getElementById("arrow-container-orange-board");
  const taskPriorityLow = document.getElementById("arrow-container-green-board");
  const contacts = document.getElementsByClassName("contact-checkbox");
  const taskCategory = document.getElementById("inputfield-category-assign-board");
  const taskSubtask = document.getElementById("inputfield-subtask-assign-in-board");
  const savedSubtasks = document.getElementById("subtasks-in-board");
  const circleContainer = document.getElementById("three-circle-container-board");

  resetBoardInputValues(taskTitel, taskDescription, taskDueDate, taskCategory, taskSubtask, savedSubtasks, circleContainer);
  resetBoardPriority(taskPriorityUrgent, taskPriorityMedium, taskPriorityLow);
  resetBoardContacts(contacts);
  resetAllInfosInBoardOverlay();
}

/** Opens the native date picker for the board due date input. */
function openDatePickerBoard() {
  const input = document.getElementById("dueDateInputBoard");
  input.focus();

  if (input.showPicker) {
    input.showPicker();
  }
}

/** Opens the native date picker for the edit-task due date input. */
function openDatePickerEditTask(taskKey) {
  const input = document.getElementById(`due-date-edit-task-big${taskKey}`);
  input.focus();

  if (input.showPicker) {
    input.showPicker();
  }

}

/** Validates the task title while editing a task. */
function validateEditTaskTitle(taskKey) {
  const input = document.getElementById(`titel-edit-task-big${taskKey}`);
  const error = document.getElementById(`error-title-edit${taskKey}`);
  if (!input) return;
  const value = input.value.trim();

  if (value.length < 3) {
    input.classList.add("border-red-board");
    error.classList.remove("display-none");
    return false;
  } else {
    input.classList.remove("border-red-board");
    error.classList.add("display-none");
    return true;
  }
}

/** Validates the due date while editing a task. */
function validateEditTaskDueDate(taskKey) {
  const input = document.getElementById(`due-date-edit-task-big${taskKey}`);
  const error = document.getElementById(`error-due-date-edit-error${taskKey}`);
  if (!input) return false;

  const value = input.value.trim();

  if (!validateEditTaskDueDateEmpty(input, value, error)) return false;
  if (!validateEditTaskDueDateFormat(input, value, error)) return false;
  if (!validateEditTaskDueDateNotPast(input, value, error)) return false;

  input.classList.remove("border-red-board");
  error.classList.add("display-none");
  return true;
}

/** Validates that the edit-task due date is not empty. */
function validateEditTaskDueDateEmpty(input, value, error) {
  if (!input) return false;

  if (!value) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

/** Validates the format of the edit-task due date. */
function validateEditTaskDueDateFormat(input, value, error) {
  const isValidDate = !isNaN(new Date(value).getTime());
  if (!isValidDate) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

/** Closes open dropdowns when clicking outside of them. */
function dropdownCloseOnClickOutside(event) {
  dropdownCloseOnClickOutsideContacts(event);
  dropdownCloseOnClickOutsideCategory(event);
}

/** Closes the contacts dropdown when clicking outside of it. */
async function dropdownCloseOnClickOutsideContacts(event) {
  const dropdown = document.getElementById("contacts-dropdown");
  const input = document.getElementById("inputfield-text-assign");
  const icon = document.getElementById("contact-list");

  if (!dropdown || dropdown.classList.contains("hidden")) return;

  if (dropdown.contains(event.target) || input.contains(event.target) || icon.contains(event.target)) {
    return;
  }

  await loadContactsForDropdown();
  getContactForCircle();
}

/** Closes the category dropdown when clicking outside of it. */
function dropdownCloseOnClickOutsideCategory(event) {
  const dropdown = document.getElementById("category-dropdown");
  const input = document.getElementById("category-input");
  const icon = document.getElementById("dropdown-toggle-btn");

  if (!dropdown) return;
  if (dropdown.classList.contains("display-none")) return;

  if (dropdown.contains(event.target) || input.contains(event.target) || icon.contains(event.target)) {
    return;
  }

  toggleDropdown();
}

/** Validates that the edit-task due date is not in the past. */
function validateEditTaskDueDateNotPast(input, value, error) {
  if (!value) return false;

  const selected = new Date(value + "T00:00:00");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    error.textContent = "Date cannot be in the past";
    return false;
  }

  return true;
}

/** Sets the minimum selectable date for all due date inputs to today. */
function checkTodaysDate() {
  const today = new Date().toISOString().split("T")[0];
  const dueDateBoard = document.getElementById("dueDateInputBoard");
  const dueDateAddTask = document.getElementById("dueDateInput");

  if (dueDateBoard) {
    dueDateBoard.min = today;
  }

  if (dueDateAddTask) {
    dueDateAddTask.min = today;
  }
}

/** Removes highlight styles from all contacts. */
function clearHighlightedContacts() {
  const contacts = document.getElementsByClassName("contact-option");
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    contact.style.backgroundColor = "";
    contact.style.color = "";
  }
}

/** Toggles body scrolling depending on overlay visibility. */
function backgroundNotScrollable() {
  const overlay = document.getElementById("task-big-container-absolute");

  if (!overlay.classList.contains("display-none")) {
    document.body.classList.add("overflow-hidden");
  } else if (overlay.classList.contains("display-none")){
    document.body.classList.remove("overflow-hidden");
  }
}

/** Highlights all board drop zones during drag operations. */
function highlightDropZones() {
  const todo = document.getElementById("todo-content-task");
  const inprogress = document.getElementById("inprogress-content-task");
  const awaitFeedback = document.getElementById("await-feedback-content-task");
  const done = document.getElementById("done-content-task");

  todo.classList.add("drop-highlight");
  inprogress.classList.add("drop-highlight");
  awaitFeedback.classList.add("drop-highlight");
  done.classList.add("drop-highlight");
}

/** Removes the highlight from all board drop zones. */
function removeDropHighlight() {
  const todo = document.getElementById("todo-content-task");
  const inprogress = document.getElementById("inprogress-content-task");
  const awaitFeedback = document.getElementById("await-feedback-content-task");
  const done = document.getElementById("done-content-task");

  todo.classList.remove("drop-highlight");
  inprogress.classList.remove("drop-highlight");
  awaitFeedback.classList.remove("drop-highlight");
  done.classList.remove("drop-highlight");
}

/** Ends the dragging state and removes all drop zone highlights. */
function endDragging() {
  removeDropHighlight();
}

/** Filters visible tasks based on the search input. */
function filterTasksBySearch(taskTitles, descriptions, toDos, inputStart) {
  for (let i = 0; i < taskTitles.length; i++) {
    const title = taskTitles[i].textContent.trim().toLowerCase();
    const description = descriptions[i].textContent.trim().toLowerCase();
    const titleWords = title.split(" "), descriptionWords = description.split(" ");
    let match = false;

    for (let j = 0; j < titleWords.length; j++) {
      if (titleWords[j].startsWith(inputStart)) { match = true; break; }
    }

    for (let j = 0; j < descriptionWords.length; j++) {
      if (descriptionWords[j].startsWith(inputStart)) { match = true; break; }
    }

    toDos[i].classList.toggle("display-none", !match);
  }
}

/** Searches tasks by title or description and updates visibility. */
function searchTask() {
  const inputValue = document.getElementById("title-findtask-inputfield").value.trim().toLowerCase();
  const taskTitles = document.getElementsByClassName("task-titel-mini-task");
  const descriptions = document.getElementsByClassName("task-board-big-description");
  const toDos = document.getElementsByClassName("todo-content-box");
  const inputStart = inputValue.substring(0, 3);

  if (inputValue.length < 1) {
    for (let i = 0; i < toDos.length; i++) {
      toDos[i].classList.remove("display-none");
    }
    return;
  }

  filterTasksBySearch(taskTitles, descriptions, toDos, inputStart);
}

/** Toggles the category dropdown in the board overlay. */
function categoryUserOrTechnicalTaskBoard() {
  const input = document.getElementById("inputfield-category-assign-board");
  const dropdown = document.getElementById("category-dropdown-board");
  const isOpen = dropdown.classList.contains("open");
  dropdown.classList.toggle("open");
  input.classList.toggle("inputfield-blue-border-top-right");
  if (isOpen) {
    validateCategoryInBoardInput();
  }
}

/** Selects the User Story category in the board overlay. */
function selectUserCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "User Story";
  categoryUserOrTechnicalTaskBoard();
}

/** Selects the Technical Task category in the board overlay. */
function selectTechnicalCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "Technical Task";
  categoryUserOrTechnicalTaskBoard();
}

/** Replaces a board subtask with an editable input field. */
function changeSubtasksInBoard(i, subtaskText) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = changeSubtasksIntoInputfield(i, subtaskText);
}

/** Saves the changed subtask text in the board overlay. */
function changedSubtasksBoard(i) {
  const input = document.getElementById(`new-subtask-text-field${i}`);
  const newSubtaskText = input.value.trim();
  if (!newSubtaskText) return;

  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = subtasksInBoard(i, newSubtaskText);
}

/** Deletes a subtask from the board overlay. */
function deleteSubtasksInBoard(i) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  if (subtaskDiv) {
    subtaskDiv.remove();
  }
}
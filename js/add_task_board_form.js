/** Makes the category dropdown visible for animation. */
function addStyleForDropdownAnimation() {
  const dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("display-none");
}

/** Adds a subtask object to the subtasks array. *
 * @param {Array} subtasksArray - The array to which the new subtask object will be added.
 * @param {HTMLElement} subtaskTextElement - The DOM element containing the subtask text./
/** Rebuilds and returns the current subtasks array from the DOM. */
function updateSubtasksArray() {
  let subtasksArray = [];

  for (let index = 0; index < subtaskSavedCounter; index++) {
    const subtaskElement = document.getElementById(`subtask-${index}`);
    const subtaskTextElement = document.getElementById(
      `subtask-list-element-div${index}`
    );
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
    savedSubtasks.innerHTML += getSubtaskListElementTemplate(
      subtask,
      subtaskSavedCounter
    );
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

/** Clears the subtask input field and restores the default icons. 
 *@param {Event} event - Optional event used to stop propagation when triggered by user interaction.
*/
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

/** Replaces a saved subtask with an editable input field.
 * @param {number} subtaskSavedCounter - The index or identifier used to locate the subtask element.
 * @param {string} subtask - The current subtask text to prefill the input field.
 */
function editSavedSubtask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(
    `subtask-list-element-div${subtaskSavedCounter}`
  );
  subTaskElement.innerHTML = getSubtaskEditInputFieldTemplate(
    subtask,
    subtaskSavedCounter
  );
}

/** Saves the edited subtask text and updates the DOM.
 * @param {number} subtaskSavedCounter - The index or identifier used to locate the subtask element.
 */
function saveEditedSubtask(subtaskSavedCounter) {
  const input = document.getElementById(
    `edit-subtask-inputfield${subtaskSavedCounter}`
  );
  if (!input) return;
  const newValue = input.value;

  const subTaskElementDiv = document.getElementById(
    `subtask-list-element-div${subtaskSavedCounter}`
  );
  if (!subTaskElementDiv) return;
  const liElement = subTaskElementDiv.parentElement;

  liElement.outerHTML = getSubtaskListElementTemplate(
    newValue,
    subtaskSavedCounter
  );

  updateSubtasksArray();
}

/** Deletes a saved subtask from the DOM. 
 * @param {number} subtaskSavedCounter - The identifier used to locate the subtask element.
 * @param {string} subtask - (Unused in this function) The subtask text.
*/
function deleteSavedSubTask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(
    `subtask-${subtaskSavedCounter}`
  );
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
    const nameBox = document.getElementById(
      `contact-option-add-task${contact.id}`
    );

    if (checkbox.checked) {
      nameBox.style.backgroundColor = "rgba(42, 54, 71, 1)";
      nameBox.style.color = "white";
    } else {
      nameBox.style.backgroundColor = "";
      nameBox.style.color = "";
    }
  }
}

/** Toggles the selected background styling for a contact in edit mode.
 * @param {string|number} contactId - The unique identifier of the contact.
 * @param {string|number} taskKey - The identifier used to target the correct task context.
 */

function toggleContactEditBackground(contactId, taskKey) {
  const checkbox = document.getElementById(
    `contact-checkbox-${contactId}${taskKey}`
  );
  const container = document.getElementById(
    `contact-option-edit${contactId}${taskKey}`
  );

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
    const circleElement = document.getElementById(
      `circle-initials-in-dropdown${contact.id}`
    );

    const fullName = nameElement.textContent;
    const names = fullName.split(" ");

    let initials = "";

    if (names[0]) initials += names[0][0].toUpperCase();
    if (names[1]) initials += names[1][0].toUpperCase();

    const color = contactColors[i % contactColors.length];

    circleElement.innerHTML = getContactCircleTemplateDropwdown(
      "circle-initials-in-dropdown",
      initials,
      color
    );
  }
}

/** Returns a contact color based on its index. 
 * @param {number} index - The index used to select a color.
 * @returns {string} - The selected color value.
*/
function getContactColor(index) {
  return contactColors[index % contactColors.length];
}

/** Creates initials for assigned contacts and triggers circle rendering. */
function getContactForCircle() {
  let assignedContacts = getAssignedToValue();
  assignedContacts = assignedContacts.filter(
    (contact) => contact !== "Not Assigned to anyone"
  );
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

/** Determines whether assigned contact circles should be hidden.
 * @param {Array<string>} nameInitialesArray - Array of assigned contact identifiers or labels.
 * @param {HTMLElement} contactsDropdown - The dropdown element used to select contacts.
 * @returns {boolean} - Returns true if the circles should be hidden, otherwise false.
 */
function shouldHideAssignedCircles(nameInitialesArray, contactsDropdown) {
  return (
    nameInitialesArray.length === 0 ||
    nameInitialesArray.includes("Not Assigned to anyone") ||
    !contactsDropdown.classList.contains("hidden")
  );
}

/** Renders up to three initials circles for assigned contacts. 
* @param {Array<string>} nameInitialesArray - Array of assigned contact identifiers or labels.
*/
function renderCirclesForAssignedContacts(nameInitialesArray) {
  circleRenderContainer.innerHTML = "";

  if (shouldHideAssignedCircles(nameInitialesArray, contactsDropdown)) {
    circleFlexContainer.classList.add("display-none");
    return;
  }

  const circleClasses = [
    "single-circle-first",
    "single-circle-second",
    "single-circle-third",
  ];

  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += getContactCircleTemplate(
      circleClasses[i],
      initials
    );
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
  const threeCirclesContainer = document.getElementById(
    "three-circle-container"
  );

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
  const isTitleValid = validateInput();
  const isDateValid = validateDueDateInput();

  if (isTitleValid && taskCategory.value && isDateValid) {
    const inputsForTask = getInfoForNewTask();
    const newTaskKey = taskTitel.value;
    const dataPost = await putRegistryDataBaseFunction(
      "tasks/toDo/" + newTaskKey,
      inputsForTask
    );
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
  const inputfieldDiv = document.getElementById(
    "inputfield-and-icons-subtask-board-overlay-open"
  );

  plusIcon.classList.add("display-none");
  inputfieldDiv.classList.remove("display-none");
}

/** Clears the current subtask text in the board overlay input. */
function deleteCurrentSubtaskText() {
  const input = document.getElementById("inputfield-subtask-assign-in-board");
  const plusIcon = document.getElementById("add-icon-container-board");
  const inputfieldDiv = document.getElementById(
    "inputfield-and-icons-subtask-board-overlay-open"
  );

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

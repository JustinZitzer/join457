/** Switches a task into edit mode. 
 *@param {string|number} taskKey - Identifier used to locate the task elements in the DOM.
*/
async function editTask(taskKey) {
  const show = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const edit = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (show) show.classList.add("display-none"), task.classList.add("height-zero");
  if (edit) edit.classList.remove("display-none");

  await initEditTaskContacts(taskKey);
}

/** Cancels edit mode and restores original task view. 
 * @param {string|number} taskKey - Identifier used to locate the task elements in the DOM.

*/
function cancelEditTask(taskKey) {
  const show = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const edit = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (show) show.classList.remove("display-none"), task.classList.remove("height-zero");
  if (edit) edit.classList.add("display-none");
}

/** Deletes a task from Firebase and updates UI. 
 * @param {string} category - The task category in Firebase.
 * @param {string} taskKey - The unique key/identifier of the task to delete.
*/
async function deleteTask(category, taskKey) {
  const url = `${FireBaseUrl}tasks/${category}/${taskKey}.json`;
  try {
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) await loadAllTasksFromFirebase(), hideBigTaskInfo(taskKey);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

/** Renders assigned contacts in edit mode. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {string[]} assignedTo - Array of assigned contact names.
*/
function assignedContactsEdit(taskKey, assignedTo) {
  const containerTaskEdit = document.getElementById(`three-circle-container-edit${taskKey}`);
  const circleClassesTask = ["single-circle-first-edit", "single-circle-second-edit", "single-circle-third-edit",];

  if (!assignedTo || assignedTo === "Not Assigned to anyone" || assignedTo.length === 0) {
    return;
  }
  for (let i = 0; i < Math.min(assignedTo.length, 3); i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);
    if (name == "undefined") return;
    containerTaskEdit.innerHTML += getAssignedContactEditTemplate(taskKey, circleClassesTask[i], initials);
  }
  if (assignedTo.length > 3) {
    containerTaskEdit.innerHTML += `<div class="plus-counter-edit">+${assignedTo.length - 3}</div>`;
  }
}

/** Renders all contacts inside the edit dropdown. 
 * @param {HTMLElement} container - The dropdown container element.
 * @param {string|number} taskKey - Identifier for the task context.
*/
async function renderContactsForEditDropdown(container, taskKey) {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;

  for (let i = 0; i < contacts.length; i++) {
    const color = contactColors[i % contactColors.length];
    container.innerHTML += getContactCardForDropdownInEdit(contacts[i], taskKey, color);
  }
}

/** Initializes contacts in edit mode if not already loaded. 
 * @param {string|number} taskKey - Identifier used to locate edit mode elements.
*/
async function initEditTaskContacts(taskKey) {
  const container = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      await renderContactsForEditDropdown(container, taskKey);
      setAssignedContactsCheckedEdit(taskKey);
      changeContactCircleInEditTemplate(taskKey);
    } catch (error) {
      console.error("Error initializing contacts in edit mode:", error);
    }
  }
}

/** Toggles the visibility of the edit contacts dropdown. 
 *@param {string|number} taskKey - Identifier used to locate edit mode elements.
*/
async function loadContactsForDropdownInEdit(taskKey) {
  const container = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const circles = document.getElementById(`three-circle-container-edit${taskKey}`);

  await initEditTaskContacts(taskKey);

  container.classList.toggle("hidden"), container.classList.toggle("height-zero");
  circles.classList.toggle("hidden");
}

/** Sets assigned contacts as checked in edit mode. 
 * @param {string|number} taskKey - Identifier used to locate the task in loadedTasks and DOM.
*/
function setAssignedContactsCheckedEdit(taskKey) {
  const task = loadedTasks[taskKey];
  if (!task || !task.assignedTo) return;

  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  if (!dropdown) return;

  const inputs = dropdown.getElementsByClassName("contact-checkbox-edit");

  for (let j = 0; j < inputs.length; j++) {
    const checkbox = inputs[j];
    checkbox.checked = false;
    const contactId = checkbox.dataset.contactId;
    toggleContactEditBackground(contactId, taskKey);
  }
  setAssignedContactsLoopEdit(task, inputs, taskKey);
}

/** Matches assigned contacts with checkboxes in edit mode. 
 * @param {Object} task - Task object containing assigned contacts.
 * @param {HTMLCollection} inputs - Collection of contact checkbox elements.
 * @param {string|number} taskKey - Identifier used for UI updates.
*/
function setAssignedContactsLoopEdit(task, inputs, taskKey) {
  for (let i = 0; i < task.assignedTo.length; i++) {
    const assignedName = task.assignedTo[i].trim();

    for (let j = 0; j < inputs.length; j++) {
      const checkbox = inputs[j];
      const checkboxName = checkbox.dataset.contactName.trim();

      if (checkboxName === assignedName) {
        checkbox.checked = true;

        const contactId = checkbox.dataset.contactId;
        toggleContactEditBackground(contactId, taskKey);
      }
    }
  }
}

/** Generates a contact card for edit dropdown. 
 * * @param {Object} contact - Contact object containing user data.
 * @param {string|number} taskKey - Identifier used for edit mode context.
 * @param {string} color - Assigned color for the contact circle.
 * @returns {string} HTML string for the contact dropdown card.
*/
function getContactCardForDropdownInEdit(contact, taskKey, color) {
  const name = contact.lastName? `${contact.firstName} ${contact.lastName}`: contact.firstName;
  const initials = getInitials(contact.firstName, contact.lastName);
  return contactCardDropdownEditTemplate(contact, taskKey, initials, name, color);
}

/** Extracts initials and full name for selected contacts. 
 * @param {string} fullName - Full name of the selected contact.
 * @param {string[]} initialsArray - Array collecting generated initials.
 * @param {string[]} fullNamesArray - Array collecting full contact names.
*/
function handleCheckedContact(fullName, initialsArray, fullNamesArray) {
  const names = fullName.split(" ");
  let initials = "";

  if (names[0]) initials += names[0][0].toUpperCase();
  if (names[1]) initials += names[1][0].toUpperCase();

  initialsArray.push(initials);
  fullNamesArray.push(fullName);
}

/** Updates assigned contact circles in edit mode. 
 * @param {string|number} taskKey - Identifier used for DOM element selection.
 * @returns {string[]} Array of selected contact full names.
*/
function changeContactCircleInEditTemplate(taskKey) {
  let initialsArray = [];
  let fullNamesArray = [];

  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i];
    const checkbox = document.getElementById(`contact-checkbox-${contact.id}${taskKey}`);
    const nameElem = document.getElementById(`contact-name-edit${contact.id}${taskKey}`);

    if (checkbox && checkbox.checked && nameElem) {
      handleCheckedContact(nameElem.textContent.trim(), initialsArray, fullNamesArray);
    }
  }
  renderCirclesInEditTemplate(taskKey, initialsArray);
  return fullNamesArray || ["Not Assigned to anyone"];
}

/** Renders contact circles in edit mode. 
 * @param {string|number} taskKey - Identifier used for DOM selection.
 * @param {string[]} initialsArray - Array of contact initials to render.
*/
function renderCirclesInEditTemplate(taskKey, initialsArray) {
  const container = document.getElementById(`three-circle-container-edit${taskKey}`);
  container.innerHTML = "";
  const circleClasses = ["single-circle-first-edit", "single-circle-second-edit", "single-circle-third-edit"];

  for (let i = 0; i < Math.min(initialsArray.length, 3); i++) {
    container.innerHTML += getEditCircleTemplate(circleClasses[i], initialsArray[i]);
  }
  if (initialsArray.length > 3) {
    container.innerHTML += `<div class="plus-counter-edit">+${initialsArray.length - 3}</div>`;
  }
  showAndHideCirclesInEditTemplate(container, initialsArray, taskKey);
}

/** Handles visibility of contact circles in edit mode. 
 * @param {HTMLElement} container - The circle container element.
 * @param {string[]} initialsArray - Array of contact initials.
 * @param {string|number} taskKey - Identifier used for DOM selection.
*/
function showAndHideCirclesInEditTemplate(container, initialsArray, taskKey) {
  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const hide = !initialsArray.length || !dropdown.classList.contains("hidden");

  container.classList.toggle("hidden", hide);
  container.classList.toggle("height-zero", hide);
}

/** Returns initials from first and last name. 
 * @param {string} firstName - First name of the contact.
 * @param {string} lastName - Last name of the contact.
 * @returns {string} Generated initials.
*/
function getInitials(firstName, lastName) {
  let initials = "";
  if (firstName && firstName.length > 0) initials += firstName[0].toUpperCase();
  if (lastName && lastName.length > 0) initials += lastName[0].toUpperCase();
  return initials;
}

/** Shows subtask input icons in edit mode. 
 * @param {string|number} taskKey - Identifier used for DOM element selection.
*/
function showInputFieldEditSubtasksIcons(taskKey) {
  const input = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clear = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const sep = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const add = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clear.classList.remove("hidden"), sep.classList.remove("hidden"), add.classList.remove("hidden");
  input.classList.add("input-border-left-bottom");
}

/** Clears subtask input and hides icons. 
 * @param {string|number} taskKey - Identifier used for DOM element selection.
*/
function clearInputHideIconsSubtasksInput(taskKey) {
  const input = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clear = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const sep = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const add = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clear.classList.add("hidden"), sep.classList.add("hidden"), add.classList.add("hidden");
  input.classList.remove("input-border-left-bottom");
  input.value = "";
}

/** Applies active styling to priority buttons in edit mode. 
 * @param {string|number} taskKey - Identifier used for DOM element selection.
 * @param {string} priority - Priority level ("Urgent", "Medium", "Low").
*/
function buttonPriorityStyle(taskKey, priority) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);

  if (priority == "Urgent") buttonUrgent.classList.add("active-red");
  else if (priority == "Medium") buttonMedium.classList.add("active-yellow");
  else if (priority == "Low") buttonLow.classList.add("active-green");
}

/** Changes the selected priority in edit mode. 
 * @param {string|number} taskKey - Identifier used for DOM element selection.
 * @param {string} priority - Selected priority ("Urgent", "Medium", "Low").
*/
function changePriorityInEdit(taskKey, priority) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);
  const isUrgentActive = buttonUrgent.classList.contains("active-red");
  const isMediumActive = buttonMedium.classList.contains("active-yellow");
  const isLowActive = buttonLow.classList.contains("active-green");

  removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow);
  addPriorityAndActive(buttonUrgent, buttonMedium, buttonLow, priority, isUrgentActive, isMediumActive, isLowActive);
}

/** Removes active state from all priority buttons. 
 * @param {HTMLElement} buttonUrgent - Urgent priority button.
 * @param {HTMLElement} buttonMedium - Medium priority button.
 * @param {HTMLElement} buttonLow - Low priority button.
*/
function removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow) {
  buttonUrgent.classList.remove("active-red");
  buttonMedium.classList.remove("active-yellow");
  buttonLow.classList.remove("active-green");
}

/** Adds active state to selected priority button.
 * @param {HTMLElement} buttonUrgent - Urgent priority button.
 * @param {HTMLElement} buttonMedium - Medium priority button.
 * @param {HTMLElement} buttonLow - Low priority button.
 * @param {string} priority - Selected priority ("Urgent", "Medium", "Low").
 * @param {boolean} isUrgentActive - Whether urgent is currently active.
 * @param {boolean} isMediumActive - Whether medium is currently active.
 * @param {boolean} isLowActive - Whether low is currently active.
 * @returns {string} The resulting priority state or fallback message.
*/
function addPriorityAndActive(buttonUrgent, buttonMedium, buttonLow, priority, isUrgentActive, isMediumActive, isLowActive) {
  if (priority === "Urgent" && !isUrgentActive) return buttonUrgent.classList.add("active-red"), "Urgent";
  if (priority === "Medium" && !isMediumActive) return buttonMedium.classList.add("active-yellow"), "Medium";
  if (priority === "Low" && !isLowActive) return buttonLow.classList.add("active-green"), "Low";
  return "No priority selected";
}

/** Replaces subtask content with input field for editing. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {number} i - Index of the subtask.
 * @param {string} subtaskText - Current text of the subtask.
 * @returns {number} The subtask index.
*/
function changeSubtaskContent(taskKey, i, subtaskText) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  subtaskContainer.innerHTML = getEditSubtaskInputTemplate(taskKey, i, subtaskText);
  return i;
}

/** Cancels editing of a subtask. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {number} i - Index of the subtask.
*/
function cancelEditSubtask(taskKey, i) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  if (subtaskContainer) {
    subtaskContainer.remove();
  }
}

/** Saves edited subtask content. 
 * @param {string|number} taskKey - Identifier for the task.
 * @param {number} i - Index of the subtask.
*/
function confirmChangeForEditSubtask(taskKey, i) {
  const oldSubtaskDiv = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  const inputfieldSubtask = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  let newSubtaskText = inputfieldSubtask.value;

  const newSubtaskDiv = document.createElement('div');
  newSubtaskDiv.innerHTML = getEditSubtaskTemplate(taskKey, i, newSubtaskText);

  const newSubtaskDivFirstElementChild = newSubtaskDiv.firstElementChild;
  oldSubtaskDiv.parentNode.replaceChild(newSubtaskDivFirstElementChild, oldSubtaskDiv);
}

/** Adds a new subtask in edit mode. 
 ** @param {string|number} taskKey - Identifier for the task.
*/
function addNewSubtaskInEdit(taskKey) {
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  const input = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const subtaskText = input.value.trim();

  if (!subtaskText) return;
  const currentSubtasks = subtasksEditDiv.getElementsByClassName("subtasks-board-first-task-edit");
  const newIndex = currentSubtasks.length;

  subtasksEditDiv.innerHTML += getEditSubtaskTemplate(taskKey, newIndex, subtaskText);

  input.value = "";

  document.getElementById(`delete-subtask-edit-check-icon${taskKey}`).classList.add("hidden");
  document.getElementById(`seperator-subtasks-edit${taskKey}`).classList.add("hidden");
  document.getElementById(`add-new-subtask-edit-icon${taskKey}`).classList.add("hidden");
}

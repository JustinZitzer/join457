/** Switches a task into edit mode. */
async function editTask(taskKey) {
  const showTaskPanel = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (showTaskPanel) {
    showTaskPanel.classList.add("display-none");
    task.classList.add("height-zero");
  }

  if (editTaskPanel) {
    editTaskPanel.classList.remove("display-none");
  }

  await initEditTaskContacts(taskKey);
}

/** Cancels edit mode and restores original task view. */
function cancelEditTask(taskKey) {
  const showTaskPanel = document.getElementById(`big-task-show-hide-div${taskKey}`);
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  const task = document.getElementById(`big-task-${taskKey}`);

  if (showTaskPanel) {
    showTaskPanel.classList.remove("display-none");
    task.classList.remove("height-zero");
  }
  if (editTaskPanel) {
    editTaskPanel.classList.add("display-none");
  }
}

/** Deletes a task from Firebase and updates UI. */
async function deleteTask(category, taskKey) {
  const url = `${FireBaseUrl}tasks/${category}/${taskKey}.json`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      await loadAllTasksFromFirebase();
      hideBigTaskInfo(taskKey);
    }
  } catch (error) {
    error = console.error("Error deleting task:", error);
  }
}

/** Renders subtasks inside the big task view. */
function renderSubtasksInBigTask(taskKey, subtasks, titel, category) {
  const subtaksContainer = document.getElementById(`subtasks-board-tasks-div${taskKey}`);
  const subtasksEditDiv = document.getElementById(`subtasks-edit-div${taskKey}`);
  subtaksContainer.innerHTML = "";
  if (!subtasks) return;

  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;

    const text = subtask.subtaskText;

    if (subtask.statusCheckbox === false) {
      subtaksContainer.innerHTML += getSubtaskUncheckedTemplate(taskKey, i, category, titel, text);
    } else {
      subtaksContainer.innerHTML += getSubtaskCheckedTemplate(taskKey, i, category, titel, text);
    }

    subtasksEditDiv.innerHTML += getEditSubtaskTemplate(taskKey, i, text);
  }
}

/** Updates the subtask progress text. */
function progressBarStyle(taskKey, subtasks) {
  const progressBarCounter = document.getElementById(`subtask-text${taskKey}`);
  if (!subtasks) return;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    progressBarCounter.innerHTML = `${i + 1}/${subtasks.length} subtasks`;
  }
}

/** Renders assigned contacts in edit mode. */
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

/** Renders all contacts inside the edit dropdown. */
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

/** Initializes contacts in edit mode if not already loaded. */
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

/** Toggles the visibility of the edit contacts dropdown. */
async function loadContactsForDropdownInEdit(taskKey) {
  const container = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const threeCircleDivEdit = document.getElementById(`three-circle-container-edit${taskKey}`);

  await initEditTaskContacts(taskKey);

  container.classList.toggle("hidden");
  container.classList.toggle("height-zero");
  threeCircleDivEdit.classList.toggle("hidden");
}

/** Sets assigned contacts as checked in edit mode. */
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

/** Matches assigned contacts with checkboxes in edit mode. */
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

/** Generates a contact card for edit dropdown. */
function getContactCardForDropdownInEdit(contact, taskKey, color) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;

  const initials = getInitials(contact.firstName, contact.lastName);

  return contactCardDropdownEditTemplate(contact, taskKey, initials, name, color);
}

/** Extracts initials and full name for selected contacts. */
function handleCheckedContact(fullName, initialsArray, fullNamesArray) {
  const names = fullName.split(" ");
  let initials = "";

  if (names[0]) initials += names[0][0].toUpperCase();
  if (names[1]) initials += names[1][0].toUpperCase();

  initialsArray.push(initials);
  fullNamesArray.push(fullName);
}

/** Updates assigned contact circles in edit mode. */
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

/** Renders contact circles in edit mode. */
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

/** Handles visibility of contact circles in edit mode. */
function showAndHideCirclesInEditTemplate(container, initialsArray, taskKey) {
  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  if (initialsArray.length === 0) {
    container.classList.add("hidden");
    container.classList.add("height-zero");
  } else if (!dropdown.classList.contains("hidden")) {
    container.classList.add("hidden");
    container.classList.add("height-zero");
  }
  else {
    container.classList.remove("hidden");
    container.classList.remove("height-zero");
  }
}

/** Returns initials from first and last name. */
function getInitials(firstName, lastName) {
  let initials = "";
  if (firstName && firstName.length > 0) initials += firstName[0].toUpperCase();
  if (lastName && lastName.length > 0) initials += lastName[0].toUpperCase();
  return initials;
}

/** Shows subtask input icons in edit mode. */
function showInputFieldEditSubtasksIcons(taskKey) {
  const inputfield = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clearIcon = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const seperatorIcon = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const addIcon = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clearIcon.classList.remove("hidden");
  seperatorIcon.classList.remove("hidden");
  addIcon.classList.remove("hidden");
  inputfield.classList.add('input-border-left-bottom');
}

/** Clears subtask input and hides icons. */
function clearInputHideIconsSubtasksInput(taskKey) {
  const inputfield = document.getElementById(`inputfield-subtask-edit-div${taskKey}`);
  const clearIcon = document.getElementById(`delete-subtask-edit-check-icon${taskKey}`);
  const seperatorIcon = document.getElementById(`seperator-subtasks-edit${taskKey}`);
  const addIcon = document.getElementById(`add-new-subtask-edit-icon${taskKey}`);

  clearIcon.classList.add("hidden");
  seperatorIcon.classList.add("hidden");
  addIcon.classList.add("hidden");
  inputfield.classList.remove('input-border-left-bottom');
  inputfield.value = "";
}

/** Applies active styling to priority buttons in edit mode. */
function buttonPriorityStyle(taskKey, priority) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);

  if (priority == "Urgent") {
    buttonUrgent.classList.add("active-red");
  } else if (priority == "Medium") {
    buttonMedium.classList.add("active-yellow");
  } else if (priority == "Low") {
    buttonLow.classList.add("active-green");
  }
}

/** Changes the selected priority in edit mode. */
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

/** Removes active state from all priority buttons. */
function removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow) {
  buttonUrgent.classList.remove("active-red");
  buttonMedium.classList.remove("active-yellow");
  buttonLow.classList.remove("active-green");
}

/** Adds active state to selected priority button. */
function addPriorityAndActive(buttonUrgent, buttonMedium, buttonLow, priority, isUrgentActive, isMediumActive, isLowActive) {
  if (priority === "Urgent" && !isUrgentActive) {
    buttonUrgent.classList.add("active-red");
    return "Urgent";
  }
  if (priority === "Medium" && !isMediumActive) {
    buttonMedium.classList.add("active-yellow");
    return "Medium";
  }
  if (priority === "Low" && !isLowActive) {
    buttonLow.classList.add("active-green");
    return "Low";
  }
  return "No priority selected";
}

/** Replaces subtask content with input field for editing. */
function changeSubtaskContent(taskKey, i, subtaskText) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  subtaskContainer.innerHTML = getEditSubtaskInputTemplate(taskKey, i, subtaskText);
  return i;
}

/** Cancels editing of a subtask. */
function cancelEditSubtask(taskKey, i) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  if (subtaskContainer) {
    subtaskContainer.remove();
  }
}

/** Saves edited subtask content. */
function confirmChangeForEditSubtask(taskKey, i) {
  const oldSubtaskDiv = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  const inputfieldSubtask = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  let newSubtaskText = inputfieldSubtask.value;

  const newSubtaskDiv = document.createElement('div');
  newSubtaskDiv.innerHTML = getEditSubtaskTemplate(taskKey, i, newSubtaskText);

  const newSubtaskDivFirstElementChild = newSubtaskDiv.firstElementChild;

  oldSubtaskDiv.parentNode.replaceChild(newSubtaskDivFirstElementChild, oldSubtaskDiv);
}

/** Adds a new subtask in edit mode. */
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
/** line 401-793 add_task.js */
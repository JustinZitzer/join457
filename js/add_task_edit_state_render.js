/** Collects all edited task data for saving. */
function getInformationForEditTask(taskKey, category, categoryUserOrTechnicalTask) {
  const titel = document.getElementById(`titel-edit-task-big${taskKey}`).value;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;
  const description = document.getElementById(`description-edit-task-big${taskKey}`).value;
  const dueDate = document.getElementById(`due-date-edit-task-big${taskKey}`).value;
  const priority = saveEditTaskPriority(taskKey);
  const assignedTo = changeContactCircleInEditTemplate(taskKey);
  const subtasks = getEditedSubtasksForFirebase(taskKey);
  const id = titel;
  return {titel, description, dueDate, priority, assignedTo, subtasks, categoryUserOrTechnicalTask, id, category};
}

/** Iterates through subtasks and builds Firebase array. */
function getEditedSubtasksLoop(taskKey, allSubtasks, subtasks) {
  for (let i = 0; i < allSubtasks.length; i++) {
    const span = document.getElementById(`subtask-task-text-edit${taskKey}${i}`);
    const checkbox = document.getElementById(`checkbox-board-subtasks${taskKey}${i}`);

    if (!span) continue;

    const text = span.textContent.trim();
    if (!text) continue;

    subtasks.push({subtaskText: text, statusCheckbox: checkbox ? checkbox.checked : false});
  }
}

/** Retrieves all edited subtasks for Firebase. */
function getEditedSubtasksForFirebase(taskKey) {
  const subtasks = [];
  const container = document.getElementById(`subtasks-edit-div${taskKey}`);
  if (!container) return subtasks;

  const allSubtasks = container.getElementsByClassName("subtasks-board-first-task-edit");

  getEditedSubtasksLoop(taskKey, allSubtasks, subtasks);

  return subtasks;
}

/** Returns selected priority in edit mode. */
function saveEditTaskPriority(taskKey) {
  const buttonUrgent = document.getElementById(`urgent-edit-button-div${taskKey}`);
  const buttonMedium = document.getElementById(`medium-edit-button-div${taskKey}`);
  const buttonLow = document.getElementById(`low-edit-button-div${taskKey}`);

  if (buttonUrgent.classList.contains("active-red")) {
    return "Urgent";
  } else if (buttonMedium.classList.contains("active-yellow")) {
    return "Medium";
  } else if (buttonLow.classList.contains("active-green")) {
    return "Low";
  } else {
    return "No priority selected";
  }
}

/** Saves edited task data to Firebase. */
async function saveEditedTaskToFirebase(taskKey, category, categoryUserOrTechnicalTask) {
  if (!validateEditTaskTitle(taskKey) || !validateEditTaskDueDate(taskKey)) return;

  const inputsForTask = getInformationForEditTask(taskKey, category, categoryUserOrTechnicalTask);
  const newTitle = inputsForTask.titel;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;

  if (newTitle !== oldTitle) {
    await putRegistryDataBaseFunction(`tasks/${category}/${newTitle}`, inputsForTask);
    await deleteTask(category, oldTitle);
  } else {
    await putRegistryDataBaseFunction(`tasks/${category}/${oldTitle}`, inputsForTask);
  }

  hideBigTaskInfo(taskKey);
  await loadAllTasksFromFirebase();
}

/** Saves the checkbox state of a subtask. */
async function saveSubtaskStatus(taskKey, category, titel, i) {
  const checkbox = document.getElementById(`checkbox-board-subtasks${taskKey}${i}`);
  if (!checkbox) return;
  const isChecked = checkbox.checked;
  try {
    await patchRegistryDataBaseFunction(`tasks/${category}/${titel}/subtasks/${i}`,{ statusCheckbox: isChecked });
  } catch (error) {
    console.error("Error saving subtask status:", error);
  }
}

/** Sends a PATCH request to Firebase. */
async function patchRegistryDataBaseFunction(path, data) {
  const url = `${FireBaseUrl}${path}.json`;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

/** Updates subtask progress bar and counter. */
function updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv) {
  if (subtasksCheckboxes.length > 0) {
    subtaskDiv.innerHTML = `${counter}/${subtasksCheckboxes.length} subtasks`;

    const progressBarFillDiv = document.getElementById(`progressbar-fill${taskKey}`);
    const progressPercentage = (counter / subtasksCheckboxes.length) * 100;

    progressBarFillDiv.style.width = `${progressPercentage}%`;
  }
}

/** Calculates and displays subtask completion progress. */
function subtaskCounter(taskKey) {
  const subtaskDiv = document.getElementById(`subtask-text${taskKey}`);
  const subtasksCheckboxes = document.getElementsByClassName(`checkbox-board-subtasks${taskKey}`);
  const progressBarDiv = document.getElementById(`progressbar-box${taskKey}`);
  const priorityIcon = document.getElementById(`priority-icon-task-little${taskKey}`);

  let counter = 0;

  if (!subtasksCheckboxes || subtasksCheckboxes.length === 0) {
    if (progressBarDiv) progressBarDiv.style.display = "none";
    priorityIcon.style.marginTop = "50px";
    return;
  }

  for (let i = 0; i < subtasksCheckboxes.length; i++) {
    if (subtasksCheckboxes[i].checked) {
      counter++;
    }
  }

  updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv);
}

/** Collects all task input data for Firebase (board view). */
function taskInfosForFirebaseBoard() {
  let titel = validateInputBoard() || "New Task";
  let description = document.getElementById("inputfield-description-board").value || "No description";
  let dueDate = validateDueDateInputBoard();
  let priority = getSelectedPriority();
  let assignedTo = getAssignedToValue() || "Not Assigned to anyone";
  let categoryUserOrTechnicalTask = document.getElementById("inputfield-category-assign-board").value;
  let subtasks = subtasksInfoForFirebase() || "No subtasks";
  return { titel, description, dueDate, priority, assignedTo, categoryUserOrTechnicalTask, subtasks, };
}

/** Validates task title input and shows error message. */
function validateInputBoard() {
  const input = document.getElementById("titleInputBoard").value;
  const errorMsg = document.getElementById("field-required-in-board");

  if (input.trim() == "") errorMsg.innerHTML = "This field is required";
  else if (input.trim().length < 3) errorMsg.innerHTML = "Title must be 3 characters long.";
  else if (/[.#$[\]\/?]/.test(input)) errorMsg.innerHTML = "Invalid characters: . # $ [ ] / ?";
  else {
    errorMsg.classList.add("display-none");
    return input;
  }
  errorMsg.classList.remove("display-none");
}

/** Validates due date input. */
function validateDueDateInputBoard() {
  const input = document.getElementById("dueDateInputBoard");
  const errorMsg = document.getElementById("due-date-required-board-error");
  const value = input.value.trim();
  const result = isValidDDMMYYYYRealDate(value);

  if (!result.valid) {
    errorMsg.innerHTML = result.message;
    errorMsg.classList.remove("display-none");
    return false;
  }
  errorMsg.classList.add("display-none");
  return value;
}

/** Validates a real date in YYYY-MM-DD format. */
function isValidDDMMYYYYRealDate(value) {
  const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!value) return { valid: false, message: "Please pick a valid date." };
  if (!regex.test(value)) return { valid: false, message: "*Please pick a valid date." };

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day); date.setHours(0, 0, 0, 0);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day)
    return { valid: false, message: "Please enter a real, valid date." };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (date < today) return { valid: false, message: "The due date cannot be in the past." };

  return { valid: true, message: "" };
}

/** Toggles priority selection in board view. */
function togglePriorityBoard(priority) {
  const urgentButton = document.getElementById("arrow-container-red-board");
  const mediumButton = document.getElementById("arrow-container-orange-board");
  const lowButton = document.getElementById("arrow-container-green-board");

  if (toggleIfActive(priority, urgentButton, mediumButton, lowButton)) {
    return getSelectedPriority();
  }

  urgentButton.classList.remove("active");
  mediumButton.classList.remove("active");
  lowButton.classList.remove("active");

  if (priority === "Urgent") urgentButton.classList.add("active");
  if (priority === "Medium") mediumButton.classList.add("active");
  if (priority === "Low") lowButton.classList.add("active");

  return getSelectedPriority();
}

/** Returns selected priority from board buttons. */
function getSelectedPriority() {
  const urgentButton = document.getElementById("arrow-container-red-board");
  const mediumButton = document.getElementById("arrow-container-orange-board");
  const lowButton = document.getElementById("arrow-container-green-board");

  if (urgentButton.classList.contains("active")) return "Urgent";
  if (mediumButton.classList.contains("active")) return "Medium";
  if (lowButton.classList.contains("active")) return "Low";
  return "No priority selected";
}

/** Toggles off active priority if already selected. */
function toggleIfActive(priority, urgentButton, mediumButton, lowButton) {
  if (priority === "Urgent" && urgentButton.classList.contains("active")) {
    urgentButton.classList.remove("active");
    return true;
  }
  if (priority === "Medium" && mediumButton.classList.contains("active")) {
    mediumButton.classList.remove("active");
    return true;
  }
  if (priority === "Low" && lowButton.classList.contains("active")) {
    lowButton.classList.remove("active");
    return true;
  }
  return false;
}

/** Loads and sorts contacts alphabetically. */
async function loadAndSortContacts() {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;
  return contacts;
}

/** Loads contacts into board dropdown. */
async function loadContactsForDropdownInBoard() {
  const container = document.getElementById("contacts-dropdown-board");
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      const contacts = await loadAndSortContacts();
      for (const key in contacts) {
        container.innerHTML += getContactCardForDropdown(contacts[key]);
      }
      showCirclesInDropdownAddTask();
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }

  container.classList.toggle("display-none");
}

/** Extracts initials for assigned contacts in board view. */
function getContactForCircleBoard() {
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
  renderCirclesForAssignedContactsBoard(nameInitialesArray);
  return nameInitialesArray;
}

/** Toggles styling of assigned-to input field. */
function changeAssignedToBoardInputStyle() {
  const inputfield = document.getElementById("inputfield-text-assign-board");
  inputfield.classList.toggle("inputfield-blue-border-top-right");
}

/** Renders contact circles (shared helper). */
function renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray) {
  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += getAssignedCircleTemplate(circleClasses[i], initials);
  }
}

/** Renders assigned contact circles in board view. */
function renderCirclesForAssignedContactsBoard(nameInitialesArray) {
  const circleRenderContainer = document.getElementById("three-circle-container-board");
  circleRenderContainer.innerHTML = "";

  const circleClasses = ["single-circle-first", "single-circle-second", "single-circle-third"];

  if (nameInitialesArray.length === 0) {
    circleRenderContainer.classList.add("display-none");
    circleRenderContainer.classList.add("hidden");
    return;
  }

  renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray);
  circleRenderContainer.classList.remove("display-none", "hidden");

  if (nameInitialesArray.length > 3) {
    circleRenderContainer.innerHTML += `<div class="plus-counter">+${nameInitialesArray.length - 3}</div>`;
  }
}

/** Adds a subtask in board view. */
function subtaskIntoBoard() {
  const subtasksContainer = document.getElementById("subtasks-in-board");
  const inputfield = document.getElementById("inputfield-subtask-assign-in-board");
  const subtaskText = inputfield.value.trim();
  const i = document.getElementsByClassName("subtask-board-dot-and-text-div").length;

  if (!subtaskText) return;
  subtasksContainer.classList.remove("display-none");
  subtasksContainer.innerHTML += subtasksInBoard(i, subtaskText);
  inputfield.value = "";

}

/** Collects subtasks for Firebase (board view). */
function subtasksInfoForFirebase() {
  let subtasksArray = [];
  subtasksArray = [];
  const subtasksText = document.getElementsByClassName("subtasks-in-container");
  for (let i = 0; i < subtasksText.length; i++) {
    const subtask = subtasksText[i].textContent.trim();
    const notChecked = false;
    subtasksArray.push({subtaskText: subtask, statusCheckbox: notChecked});
  }
  return subtasksArray;
}

/** Handles creation of a new task in Firebase. */
async function handleTaskCreationBoard(status, taskTitel) {
  const inputsForTask = taskInfosForFirebaseBoard();
  const newTaskKey = taskTitel.value;
  const dataPost = await putRegistryDataBaseFunction(`tasks/${status}/` + newTaskKey, inputsForTask);
  clearInputFieldsForNewTaskBoard();
  showTaskAddedMessageBoard();
}

/** Validates and submits a new task to Firebase. */
async function postTaskIntoFirebaseBoard(status) {
  const taskTitel = document.getElementById("titleInputBoard");
  const taskDueDate = document.getElementById("dueDateInputBoard");
  const taskCategory = document.getElementById("inputfield-category-assign-board");
  const isTitleValid = validateInputBoard();
  const isDateValid = validateDueDateInputBoard();

  if (isTitleValid && taskDueDate.value && taskCategory.value && isDateValid) {
    await handleTaskCreationBoard(status, taskTitel);
    await loadAllTasksFromFirebase();
  } else {
    validateInputBoard();
    validateDueDateInputBoard();
    validateCategoryInBoardInput();
  }
}
async function initBoard() {
  await loadHTML();
  await loadAllTasksFromFirebase();
  await loadDataBoard();
  selectedSiteBackgroundStyle();
}

function loadMediumButtonPriority() {
  const mediumButton = document.getElementById('arrow-container-orange');
  mediumButton.classList.add('active');
}

function loadMediumButtonPriorityBoard() {
  const mediumButton = document.getElementById('arrow-container-orange-board');
  mediumButton.classList.add('active');
}

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


function openOverlay(status) {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("content-add-task-overlay");

  overlay.classList.remove("display-none");
  overlay.classList.add("overlay-visible");

  if (window.innerWidth > 1400) {
    overlayContent.innerHTML = getTaskOverlayTemplate(status);
    overlayContent.classList.add("slide-in");

    setupOverlayClose(overlay, overlayContent);
  } else {
    window.location.href = "./add_task.html";
  }
}

function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("overlay-visible");
}

if (window.location.pathname.endsWith("board.html")) {
  document.getElementById("overlay").addEventListener("click", closeOverlay);
}

if (window.location.pathname.endsWith("board.html")) {
  document
    .getElementById("content-add-task-overlay")
    .addEventListener("click", function (event) {
      event.stopPropagation();
    });
}

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


function selectCategory(category) {
  var input = document.getElementById("category-input");
  input.value = category;

  var dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("dropdown-open");
  dropdown.classList.add("display-none");
  validateGetCategoryForNewTask();
}

function selectCategoryOverlay(category) {
  var input = document.getElementById("category-input1");
  input.value = category;

  var dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("dropdown-open");
  dropdown.classList.add("display-none");
}

function validateInput() {
  const input = document.getElementById("titleInput");
  const errorMsg = document.getElementById("error-message");

  if (input.value.trim() === "") {
    errorMsg.classList.remove("display-none");
  } else {
    errorMsg.classList.add("display-none");
  }
}

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

function showInputError(input, errorMsgElement, message) {
  errorMsgElement.textContent = message;
  errorMsgElement.style.display = "block";
  input.classList.add("input-error");
}

function clearInputError(input, errorMsgElement) {
  errorMsgElement.textContent = "";
  errorMsgElement.style.display = "none";
  input.classList.remove("input-error");
}

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

function openDatePicker(event) {
  const input = document.getElementById("dueDateInput");
  input.focus();

  // Chrome/Edge: öffnet sicher
  if (typeof input.showPicker === "function") {
    input.showPicker();
  }
}

function showInputError(input, errorMsgElement, message) {
  errorMsgElement.textContent = message;
  errorMsgElement.classList.remove("display-none");
}

function clearInputError(input, errorMsgElement) {
  errorMsgElement.textContent = "";
  errorMsgElement.classList.add("display-none");
}

function validateDueDateInputOverlay() {
  const input = document.getElementById("dueDateInput1");
  const errorMsg = document.getElementById("due-date-error");
  const value = input.value.trim();

  const dateCheckSlash =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showInputError(input, errorMsg, "*This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showInputError(input, errorMsg, "*Please pick a date.");
  } else {
    clearInputError(input, errorMsg);
  }
}

async function loadAndRenderContacts(container) {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);

  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;

  for (const contact of contacts) {
    container.innerHTML += getContactCardForDropdown(contact);
  }
}

async function loadContactsForDropdown() {
  const container = document.getElementById("contacts-dropdown");
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      await loadAndRenderContacts(container);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
    selectContacts();
  } else {
    selectContacts();
  }
}

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

function getCategoryForNewTask() {
  const taskCategory = document.getElementById("category-input");

  if (!taskCategory.value == "") {
    return taskCategory.value;
  } else {
    alert("Please select a valid category: 'Technical Task' or 'User Story'");
  }
}

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

function addStyleForDropdownAnimation() {
  const dropdown = document.getElementById("category-dropdown");
  dropdown.classList.remove("display-none");
}

function pushSubtaskToArray(subtasksArray, subtaskTextElement) {
  const subtask = subtaskTextElement.textContent.trim().replace("• ", "");
  subtasksArray.push({
    subtaskText: subtask,
    statusCheckbox: false
  });
}

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

function addSubtaskInContainer() {
  const taskSubtask = document.getElementById("inputfield-subtask-assign");
  const savedSubtasks = document.getElementById("subtask-added-tasks");
  const buttonDiv = document.getElementById("clear-create-container");
  let currentMargin = parseInt(window.getComputedStyle(buttonDiv).marginTop) || 0;
  let subtask = taskSubtask.value.trim();

  if (subtask) {
    savedSubtasks.innerHTML += getSubtaskListElementTemplate(subtask, subtaskSavedCounter);
    subtaskSavedCounter++;
    taskSubtask.value = "";
    updateSubtasksArray();
  }
}

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

function editSavedSubtask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(
    `subtask-list-element-div${subtaskSavedCounter}`
  );
  subTaskElement.innerHTML = getSubtaskEditInputFieldTemplate(
    subtask,
    subtaskSavedCounter
  );
}

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

function deleteSavedSubTask(subtaskSavedCounter, subtask) {
  const subTaskElement = document.getElementById(`subtask-${subtaskSavedCounter}`);
  if (subTaskElement) subTaskElement.remove();

  updateSubtasksArray();
}

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
  if (assignedTo.length === 0) {
    assignedTo = ["Not Assigned to anyone"];
  }
  return assignedTo;
}

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

function shouldHideAssignedCircles(nameInitialesArray, contactsDropdown) {
  return (
    nameInitialesArray.length === 0 ||
    nameInitialesArray.includes("Not Assigned to anyone") ||
    !contactsDropdown.classList.contains("hidden")
  );
}

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

function clearInnerHtmlAndValues() {
  taskTitel.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskCategory.value = "";
  taskSubtask.value = "";
  savedSubtasks.innerHTML = "";
}

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

async function postNewTaskToFirebase() {
  if (taskTitel.value && taskCategory.value && validateDueDateInput()) {
    const inputsForTask = getInfoForNewTask();
    const newTaskKey = taskTitel.value;
    const dataPost = await putRegistryDataBaseFunction("tasks/toDo/" + newTaskKey, inputsForTask);
    clearInputFieldsForNewTask();
    showTaskAddedMessage();
    resetAllErrorMessages();
  } else {
    allErrorRulesForNewTask();
  }
}

function allErrorRulesForNewTask() {
  const errorMessage = document.getElementById("error-please-fill-inputs");
  const subtaskDiv = document.getElementById("subtask-added-tasks");
  showErrorForNewTaskTitle();
  showErrorForNewTaskDueDate();
  showErrorForNewTaskCategory();
  errorMessage.classList.remove("display-none");
  subtaskDiv.style.marginTop = "20px";
}

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

function addCrossAndCheckIconStyle() {
  const input = document.getElementById("inputfield-subtask-assign-in-board");
  const plusIcon = document.getElementById("add-icon-container-board");
  const inputfieldDiv = document.getElementById("inputfield-and-icons-subtask-board-overlay-open");

  plusIcon.classList.add("display-none");
  inputfieldDiv.classList.remove("display-none");
}


function deleteCurrentSubtaskText() {
  const input = document.getElementById("inputfield-subtask-assign-in-board");
  const plusIcon = document.getElementById("add-icon-container-board");
  const inputfieldDiv = document.getElementById("inputfield-and-icons-subtask-board-overlay-open");

  input.value = "";

  plusIcon.classList.remove("display-none");
  inputfieldDiv.classList.add("display-none");
}

function showTaskAddedMessage() {
  const taskAddedDiv = document.getElementById("task-added-add-task-div");
  taskAddedDiv.classList.remove("display-none");
  taskAddedDiv.classList.add("show-success");
  setTimeout(() => {
    taskAddedDiv.classList.remove("show-success");
    taskAddedDiv.classList.add("display-none");
  }, 1000);
}

function showTaskAddedMessageBoard() {
  const taskAddedDiv = document.getElementById("task-added-in-board-div");
  taskAddedDiv.classList.remove("display-none");
  setTimeout(() => {
    taskAddedDiv.classList.add("display-none");
  }, 1000);
}

function showMoveToCategoryIcon(event, taskKey) {
  event.stopPropagation();
  const moveToDropdown = document.getElementById(`user-profile-menu-mobile${taskKey}`);
  if (moveToDropdown.classList.contains("display-none")) {
    moveToDropdown.classList.remove("display-none");
  } else {
    moveToDropdown.classList.add("display-none");
  }
}

async function moveTaskToCategory(event, taskId, newCategory) {
  event.preventDefault();
  event.stopPropagation();
  const dropdownMenu = document.getElementById(`user-profile-menu-mobile${taskId}`);

  const task = todosArray.find(t => t.id === taskId);
  if (!task) return;

  const oldCategory = task.category;
  if (oldCategory === newCategory) {
    dropdownMenu?.classList.add("display-none");
    return;
  }

  await fetch(FireBaseUrl + `tasks/${oldCategory}/${task.id}.json`, { method: "DELETE" });

  task.category = newCategory;
  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  dropdownMenu?.classList.add("display-none");

  loadAllTasksFromFirebase();
}

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

function openDatePickerBoard() {
  const input = document.getElementById("dueDateInputBoard");
  input.focus();

  if (input.showPicker) {
    input.showPicker();
  }
}

function openDatePickerEditTask(taskKey) {
  const input = document.getElementById(`due-date-edit-task-big${taskKey}`);
  input.focus();

  if (input.showPicker) {
    input.showPicker();
  }

}

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

function validateEditTaskDueDate(taskKey) {
  const input = document.getElementById(`due-date-edit-task-big${taskKey}`);
  const error = document.getElementById(`error-due-date-edit-error${taskKey}`);
  if (!input) return false;

  const value = input.value.trim();

  if (!validateEditTaskDueDateEmpty(input, value, error)) return false;
  if (!validateEditTaskDueDateFormat(input, value, error)) return false;

  input.classList.remove("border-red-board");
  error.classList.add("display-none");
  return true;
}

function validateEditTaskDueDateEmpty(input, value, error) {
  if (!input) return false;

  if (!value) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

function validateEditTaskDueDateFormat(input, value, error) {
  const isValidDate = !isNaN(new Date(value).getTime());
  if (!isValidDate) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

function dropdownCloseOnClickOutside(event) {
  dropdownCloseOnClickOutsideContacts(event);
  dropdownCloseOnClickOutsideCategory(event);
}

function dropdownCloseOnClickOutsideContacts(event) {
  const dropdown = document.getElementById("contacts-dropdown");
  const input = document.getElementById("inputfield-text-assign");
  const icon = document.getElementById("contact-list");

  if (!dropdown || dropdown.classList.contains("hidden")) return;

  // Klick im Dropdown oder auf Öffner → nichts tun
  if (
    dropdown.contains(event.target) ||
    input.contains(event.target) ||
    icon.contains(event.target)
  ) {
    return;
  }

  // echter Klick daneben → toggle schließen
  selectContacts();
}

function dropdownCloseOnClickOutsideCategory(event) {
  const dropdown = document.getElementById("category-dropdown");
  const input = document.getElementById("category-input");
  const icon = document.getElementById("dropdown-toggle-btn");

  if (dropdown.classList.contains("display-none")) return;

  if (
    dropdown.contains(event.target) ||
    input.contains(event.target) ||
    icon.contains(event.target)
  ) {
    return;
  }

  toggleDropdown();
}
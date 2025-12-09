function setupOverlayClose(overlay, overlayContent) {
  const closeButton = overlayContent.querySelector(".x-close-button-add-task-overlay");

  if (!closeButton) {
    console.warn("Close Button nicht gefunden!");
    return;
  }

  closeButton.addEventListener("click", () => {
    overlayContent.classList.remove("slide-in");
    overlayContent.classList.add("slide-out");

    setTimeout(() => {
      overlay.classList.remove("overlay-visible");
      overlay.classList.add("overlay-hidden");
      overlayContent.classList.remove("slide-out");
    }, 0);
  });
}

function openOverlay(status) {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("content-add-task-overlay");

  overlay.classList.remove("overlay-hidden");
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
}

function selectCategoryOverlay(category) {
  var input = document.getElementById("category-input1");
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

  const dateCheckSlash =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showInputError(input, errorMsg, "This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showInputError(
      input,
      errorMsg,
      "Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein."
    );
  } else {
    clearInputError(input, errorMsg);
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

function validateDueDateInputOverlay() {
  const input = document.getElementById("dueDateInput1");
  const errorMsg = document.getElementById("due-date-error");
  const value = input.value.trim();

  const dateCheckSlash =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!value) {
    showInputError(input, errorMsg, "This field is required.");
  } else if (!dateCheckSlash.test(value)) {
    showInputError(input, errorMsg, "Bitte gib ein gültiges Datum im Format TT.MM.JJJJ ein.");
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
  return {titel, description, dueDate, priority, assignedTo, categoryUserOrTechnicalTask, subtasks};
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
  if (taskCategory == "Technical Task" || taskCategory == "User Story") {
    return taskCategory.value;
  } else {
    fieldRequired.classList.remove("display-none");
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

  clearInnerHtmlAndValues();

  taskPriorityUrgent.classList.remove("active");
  taskPriorityMedium.classList.remove("active");
  taskPriorityLow.classList.remove("active");

  for (let i = 0; i < contacts.length; i++) {
    contacts[i].checked = false;
  }
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
  if (taskTitel.value && taskDueDate.value && taskCategory.value) {
    const inputsForTask = getInfoForNewTask();
    const newTaskKey = taskTitel.value;
    const dataPost = await putRegistryDataBaseFunction("tasks/toDo/" + newTaskKey, inputsForTask);
    clearInputFieldsForNewTask();
    console.log(dataPost);
  } else if (!taskTitel.value) {
    alert("Please enter a title for the task.");
  } else if (!taskDueDate.value) {
    alert("Please enter a due date for the task.");
  } else if (!taskCategory.value) {
    alert("Please select a category for the task.");
  }
}
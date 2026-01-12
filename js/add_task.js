const toDoContent = document.getElementById("todo-content-box");
const toDoContentFinalDiv = document.getElementById("todo-content-task");
const bigTaskDiv = document.getElementById("task-big-container");
const inProgressContent = document.getElementById("inprogress-content-task");
const awaitFeedbackContent = document.getElementById("await-feedback-content-task");
const doneContent = document.getElementById("done-content-task");
const arrowContainerRed = document.getElementById("arrow-container-red");
const arrowContainerOrange = document.getElementById("arrow-container-orange");
const arrowContainerGreen = document.getElementById("arrow-container-green");
const taskTitel = document.getElementById("titleInput");
const taskDescription = document.getElementById("inputfield-description");
const taskDueDate = document.getElementById("dueDateInput");
const taskPriorityUrgent = document.getElementById("arrow-container-red");
const taskPriorityMedium = document.getElementById("arrow-container-orange");
const taskPriorityLow = document.getElementById("arrow-container-green");
const taskCategory = document.getElementById("category-input");
const taskSubtask = document.getElementById("inputfield-subtask-assign");
const savedSubtasks = document.getElementById("subtask-added-tasks");
const subtaskInputFieldContainer = document.getElementById("subtask-inputfield-container");
const inputFieldAssignTo = document.getElementById("inputfield-text-assign");
const circleFlexContainer = document.getElementById("three-circle-todo");
const circleRenderContainer = document.getElementById("three-circle-container");
const contactsDropdown = document.getElementById("contacts-dropdown");
let currentStatusForNewTask = "toDo";
let currentDraggedElement = null;
let currentDraggedCategory = null;
let currentTaskKey = null;
let subtaskSavedCounter = 1;
let todosArray = [];
let fullTaskInfoArray = [];
const loadedTasks = {};

const taskTitel1 = document.getElementById("titleInput1");
const taskDescription1 = document.getElementById("inputfield-description1");
const taskDueDate1 = document.getElementById("dueDateInput1");
const inputFieldAssignTo1 = document.getElementById("inputfield-text-assign1");
const taskCategory1 = document.getElementById("category-input1");
const subtaskInputFieldContainer1 = document.getElementById("subtask-inputfield-container1");
const taskSubtask1 = document.getElementById("inputfield-subtask-assign1");

async function putRegistryDataBaseFunction(path = "", data = {}) {
  let response = await fetch(FireBaseUrl + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function renderTodoTasks(keys, data, container) {
  for (let i = 0; i < keys.length; i++) {
    const taskKey = keys[i];
    const task = data[taskKey];
    container.innerHTML += getTaskFromFirebaseTemplate(task, taskKey);
  }
}

async function loadToDoTasksFromFirebase() {
  const response = await fetch(FireBaseUrl + "tasks/toDo.json");
  const data = await response.json();

  try {
    if (data) {
      const keys = Object.keys(data);
      renderTodoTasks(keys, data, toDoContentFinalDiv);
    } else {
      toDoContentFinalDiv.innerHTML = getEmptyTodoTemplate();
    }
  } catch (error) {
    console.error("Error loading can not load tasks data:", error);
  }
}

async function initAddTask() {
  await loadDataSignUp();
  selectedSiteBackgroundStyle();
}

function pushTasksIntoArray(data, todosArray) {
  for (const categoryKey in data) {
    const categoryTasks = data[categoryKey];
    for (const taskKey in categoryTasks) {
      const task = categoryTasks[taskKey];
      task.id = taskKey;
      task.category = categoryKey;
      todosArray.push(task);
    }
  }
}

async function loadAllTasksFromFirebase() {
  todosArray = [];
  const response = await fetch(FireBaseUrl + "tasks.json");
  const data = await response.json();

  if (data) {
    pushTasksIntoArray(data, todosArray);
  }

  updateTasksHtml();
}

function filterTasksByCategory() {
  let toDoTasks = todosArray.filter((task) => task.category === "toDo");
  let inProgressTasks = todosArray.filter(
    (task) => task.category === "inProgress"
  );
  let awaitFeedbackTasks = todosArray.filter(
    (task) => task.category === "awaitFeedback"
  );
  let doneTasks = todosArray.filter((task) => task.category === "done");
  return { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks };
}

function renderSingleTask(task) {
  loadedTasks[task.id] = task;
  bigTaskDiv.innerHTML += getTaskFromFirebaseBigTaskTemplate(task, task.id);
  bigTaskDiv.innerHTML += getTaskEditTemplate(task, task.id);
  userStoryOrTechnicalTaskStyle(task.id);
  priorityStyle(task.id);
  renderAssignedContacts(task.id, task.assignedTo);
  renderSubtasksInBigTask(task.id, task.subtasks, task.titel, task.category);
  assignedContactsEdit(task.id, task.assignedTo);
  buttonPriorityStyle(task.id, task.priority);
  subtaskCounter(task.id);
}

function renderTasksForColumn(tasks, columnElement) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    columnElement.innerHTML += getTaskFromFirebaseTemplate(task, task.id);
    renderSingleTask(task);
  }
}

function updateTasksHtml() {
  const { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks } = filterTasksByCategory();
  clearAllTasks();
  bigTaskDiv.innerHTML = "";


  if (toDoTasks.length === 0) {
    toDoContentFinalDiv.innerHTML = getEmptyTodoTemplate();
  } else {
    renderTasksForColumn(toDoTasks, toDoContentFinalDiv);
  }
  renderTasksForColumn(inProgressTasks, inProgressContent);
  renderTasksForColumn(awaitFeedbackTasks, awaitFeedbackContent);
  renderTasksForColumn(doneTasks, doneContent);
}

function clearAllTasks() {
  toDoContentFinalDiv.innerHTML = "";
  inProgressContent.innerHTML = "";
  awaitFeedbackContent.innerHTML = "";
  doneContent.innerHTML = "";
}

function startDragging(taskId, category) {
  currentDraggedElement = taskId;
  currentDraggedCategory = category;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(newCategory) {
  const taskIndex = todosArray.findIndex((t) => t.id === currentDraggedElement && t.category === currentDraggedCategory);
  if (taskIndex === -1) return;
  const task = todosArray[taskIndex];

  await fetch(FireBaseUrl + `tasks/${currentDraggedCategory}/${task.id}.json`, {
    method: "DELETE",
  });

  task.category = newCategory;
  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  loadAllTasksFromFirebase();
}

function userStoryOrTechnicalTaskStyle(taskKey) {
  const userOrTechnicalTextBox = document.getElementById(`user-story-or-technical-task-box${taskKey}`);
  const userOrTechnicalDiv = document.getElementById(`user-story-box${taskKey}`);
  const userOrTechnicalDivBig = document.getElementById(`big-board-user-or-technical${taskKey}`);

  if (!userOrTechnicalTextBox || !userOrTechnicalDiv) return;

  if (userOrTechnicalTextBox.innerHTML == "User Story") {
    userOrTechnicalDiv.classList.add("user-story-box");
    userOrTechnicalDivBig.classList.add("user-story-box-big");
  } else if (userOrTechnicalTextBox.innerHTML == "Technical Task") {
    userOrTechnicalDiv.classList.add("technical-task-box");
    userOrTechnicalDivBig.classList.add("technical-task-box-big");
  }
}

function applyPriorityIcon(priorityBoxText, priorityBoxLogo, priorityBoxPicture) {
  if (priorityBoxText.innerHTML == "No priority selected") {
    priorityBoxPicture.classList.add("display-none");
  } else if (priorityBoxText.innerHTML == "Urgent") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-up-14221.png";
    priorityBoxPicture.src = "./assets/icons/double-arrow-up-14221.png";
  } else if (priorityBoxText.innerHTML == "Medium") {
    priorityBoxLogo.src = "./assets/icons/medium-priority-icon.png";
    priorityBoxPicture.src = "./assets/icons/medium-priority-icon.png";
  } else if (priorityBoxText.innerHTML == "Low") {
    priorityBoxLogo.src = "./assets/icons/double-arrow-down-14228.png";
    priorityBoxPicture.src = "./assets/icons/double-arrow-down-14228.png";
  }
}

function priorityStyle(taskKey) {
  const priorityBoxText = document.getElementById(`task-board-big-priority${taskKey}`);
  const priorityBoxLogo = document.getElementById(`task-board-big-priority-icon${taskKey}`);
  const priorityBoxPicture = document.getElementById(`priority-icon-task-little${taskKey}`);

  applyPriorityIcon(priorityBoxText, priorityBoxLogo, priorityBoxPicture);
}

function getClassFromName(name, classArray) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return classArray[hash % classArray.length];
}

function renderAssignedContactItems(assignedTo, container, containerTask, circleClasses, circleClassesTask) {
  for (let i = 0; i < assignedTo.length; i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);

    if (name == "undefined") return;

    const circleClass = getClassFromName(name, circleClasses);

    container.innerHTML += getAssignedContactBigTemplate(circleClass, initials, name);
  }
  for (let i = 0 ; i < Math.min(assignedTo.length, 3); i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);

    if (name == "undefined") return;

    const circleClass = getClassFromName(name, circleClasses);
    
    containerTask.innerHTML += getAssignedContactLittleTemplate(circleClassesTask[i], initials);
  }
  assignedToPlusNumber(assignedTo, containerTask);
}

function assignedToPlusNumber(assignedTo, containerTask) {
  if(assignedTo.length > 3) {
    containerTask.innerHTML += `<div class="text-align-contacts-counter">+${assignedTo.length - 3}</div>`;
  }
}

function renderAssignedContacts(taskKey, assignedTo) {
  const container = document.getElementById(`task-board-big-assigned-to-contacts-div${taskKey}`);
  const containerTask = document.getElementById(`three-circle-container${taskKey}`);

  const circleClasses = ["single-circle-first-big", "single-circle-second-big", "single-circle-third-big","single-circle-fourth-big","single-circle-fifth-big"];

  const circleClassesTask = [ "single-circle-first-little", "single-circle-second-little", "single-circle-third-little",];

  container.innerHTML = "";
  containerTask.innerHTML = "";

  if (assignedTo) {
    renderAssignedContactItems(assignedTo, container, containerTask, circleClasses, circleClassesTask);
  }
}

async function loadDataBoard(path = "") {
  let response = await fetch(FireBaseUrl + path + ".json");
  let responseToJson = await response.json();
  fullTaskInfoArray.push(responseToJson);
  console.log(fullTaskInfoArray);
}

function showBigTaskOverlay(overlay, wrapper) {
  overlay.classList.remove("display-none");
  wrapper.classList.remove("display-none");
  overlay.classList.add("active");
  wrapper.classList.add("active");
}

function showBigTaskInfo(taskKey) {
  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");

  const panels = wrapper.getElementsByClassName("big-task-panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.add("display-none");
  }

  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);
  if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) {
    cancelEditTask(taskKey);
  }

  const task = document.getElementById(`big-task-${taskKey}`);
  if (task) task.classList.remove("display-none");

  showBigTaskOverlay(overlay, wrapper);

  currentTaskKey = taskKey;
}

function handleHideEditPanel(taskKey, editTaskPanel) {
  setTimeout(() => {
    if (editTaskPanel && !editTaskPanel.classList.contains("display-none")) {
      cancelEditTask(taskKey);
      return;
    }
  }, 500);
}

function hideBigTaskUI(overlay, wrapper, taskKey) {
  setTimeout(() => {
    overlay.classList.add("display-none");
    wrapper.classList.add("display-none");

    if (taskKey) {
      const task = document.getElementById(`big-task-${taskKey}`);
      if (task) task.classList.add("display-none");
    }

    currentTaskKey = null;
  }, 500);
}

function hideBigTaskInfo(taskKey) {
  if (!taskKey) {
    taskKey = currentTaskKey;
  }

  const overlay = document.getElementById("task-big-container-absolute");
  const wrapper = document.getElementById("task-big-container");
  const editTaskPanel = document.getElementById(`big-task-edit${taskKey}`);

  handleHideEditPanel(taskKey, editTaskPanel);

  overlay.classList.remove("active");
  wrapper.classList.remove("active");

  hideBigTaskUI(overlay, wrapper, taskKey);
}

function initBigTaskInfoOverlay() {
  const overlay = document.getElementById("task-big-container-absolute");
  const taskWindow = document.getElementById("task-big-container");
  if (window.location.pathname.endsWith("board.html")) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        hideBigTaskInfo();
      }
    });

    taskWindow.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
}

function editTask(taskKey) {
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
}

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

async function deleteTask(category, taskKey) {
  const url = `${FireBaseUrl}tasks/${category}/${taskKey}.json`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task ${taskKey} aus Kategorie "${category}" gelöscht.`);
      await loadAllTasksFromFirebase();
      hideBigTaskInfo(taskKey);
    }
  } catch (error) {
    error = console.error("Error deleting task:", error);
  }
}

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

function progressBarStyle(taskKey, subtasks) {
  const progressBar = document.getElementById(`progressbar-content${taskKey}`);
  const progressBarCounter = document.getElementById(`subtask-text${taskKey}`);
  if (!subtasks) return;
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    if (!subtask) return;
    progressBarCounter.innerHTML = `${i + 1}/${subtasks.length} subtasks`;
  }
}

function assignedContactsEdit (taskKey, assignedTo) {
  const containerTaskEdit = document.getElementById(`three-circle-container-edit${taskKey}`);
  const circleClassesTask = ["single-circle-first-edit","single-circle-second-edit","single-circle-third-edit",];
  
  if (!assignedTo || assignedTo === "Not Assigned to anyone" || assignedTo.length === 0) {
    return;
  }
  for (let i = 0; i < Math.min(assignedTo.length, 3); i++) {
    const name = assignedTo[i];
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("").substring(0, 2);
    if (name == "undefined") return;
    containerTaskEdit.innerHTML += getAssignedContactEditTemplate(taskKey, circleClassesTask[i], initials);
  }
  if(assignedTo.length > 3) {
    containerTaskEdit.innerHTML += `<div class="plus-counter-edit">+${assignedTo.length - 3}</div>`;
  }
}

async function renderContactsForEditDropdown(container, taskKey) {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);

  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;

  for (let i = 0; i < contacts.length; i++) {
    container.innerHTML += getContactCardForDropdownInEdit(contacts[i], taskKey);
  }
}

async function loadContactsForDropdownInEdit(taskKey) {
  const container = document.getElementById(`contacts-dropdown-edit${taskKey}`);
  const threeCircleDivEdit = document.getElementById(`three-circle-container-edit${taskKey}`);

  if (container.innerHTML == "") {
    try {
      await renderContactsForEditDropdown(container, taskKey);

    } catch (error) {
      console.error("Error loading contacts in Editing Dropdown:", error);
    }
  }

  container.classList.toggle("hidden");
  threeCircleDivEdit.classList.toggle("hidden");
}


function getContactCardForDropdownInEdit(contact, taskKey) {
  const name = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;

  const initials = getInitials(contact.firstName, contact.lastName);

  return contactCardDropdownEditTemplate(contact, taskKey, initials, name);
}

function handleCheckedContact(fullName, initialsArray, fullNamesArray) {
  const names = fullName.split(" ");
  let initials = "";

  if (names[0]) initials += names[0][0].toUpperCase();
  if (names[1]) initials += names[1][0].toUpperCase();

  initialsArray.push(initials);
  fullNamesArray.push(fullName);
}

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

function renderCirclesInEditTemplate(taskKey, initialsArray) {
  const container = document.getElementById(`three-circle-container-edit${taskKey}`);
  container.innerHTML = "";
  const circleClasses = ["single-circle-first-edit", "single-circle-second-edit", "single-circle-third-edit"];

  for (let i = 0; i < Math.min(initialsArray.length, 3); i++) {
    container.innerHTML += getEditCircleTemplate(circleClasses[i], initialsArray[i]);
  }
  if(initialsArray.length > 3) {
    container.innerHTML += `<div class="plus-counter-edit">+${initialsArray.length - 3}</div>`;
  }

  showAndHideCirclesInEditTemplate(container, initialsArray, taskKey);
}

function showAndHideCirclesInEditTemplate (container, initialsArray, taskKey) {
  const dropdown = document.getElementById(`contacts-dropdown-edit${taskKey}`);
   if (initialsArray.length === 0) {
    container.classList.add("hidden");
    container.classList.add("height-zero");
  } else if(!dropdown.classList.contains("hidden")){
    container.classList.add("hidden");
    container.classList.add("height-zero");
  }
    else {
    container.classList.remove("hidden");
    container.classList.remove("height-zero");
  }
}

function getInitials(firstName, lastName) {
  let initials = "";
  if (firstName && firstName.length > 0) initials += firstName[0].toUpperCase();
  if (lastName && lastName.length > 0) initials += lastName[0].toUpperCase();
  return initials;
}

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

function hideIconsInEditSubtasks(taskKey, i) {
  const penIcon = document.getElementById(`edit-pencil-icon${taskKey}${i}`);
  const seperator = document.getElementById(`seperator-for-subtasks${taskKey}${i}`);
  const wasteIcon = document.getElementById(`waste-icon${taskKey}${i}`);
  const inputfield = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);

  if (!inputfield) {
    penIcon.classList.add("hidden");
    seperator.classList.add("hidden");
    wasteIcon.classList.add("hidden");
  }
}

function showIconsInEditSubtasks(taskKey, i) {
  const penIcon = document.getElementById(`edit-pencil-icon${taskKey}${i}`);
  const seperator = document.getElementById(`seperator-for-subtasks${taskKey}${i}`);
  const wasteIcon = document.getElementById(`waste-icon${taskKey}${i}`);
  const inputfield = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  if (!inputfield) {
    penIcon.classList.remove("hidden");
    seperator.classList.remove("hidden");
    wasteIcon.classList.remove("hidden");
  }
}

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

function removeActiveFromButtons(buttonUrgent, buttonMedium, buttonLow) {
  buttonUrgent.classList.remove("active-red");
  buttonMedium.classList.remove("active-yellow");
  buttonLow.classList.remove("active-green");
}

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

function changeSubtaskContent(taskKey, i, subtaskText) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  subtaskContainer.innerHTML = getEditSubtaskInputTemplate(taskKey, i, subtaskText);
  return i;
}

function cancelEditSubtask(taskKey, i) {
  const subtaskContainer = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  if (subtaskContainer) {
    subtaskContainer.remove();
  }
}

function confirmChangeForEditSubtask(taskKey, i) {
  const oldSubtaskDiv = document.getElementById(`subtasks-board-first-task-edit${taskKey}${i}`);
  const inputfieldSubtask = document.getElementById(`subtask-edit-inputfield${taskKey}${i}`);
  let newSubtaskText = inputfieldSubtask.value;

  const newSubtaskDiv = document.createElement('div');
  newSubtaskDiv.innerHTML = getEditSubtaskTemplate(taskKey, i, newSubtaskText);

  const newSubtaskDivFirstElementChild = newSubtaskDiv.firstElementChild;

  oldSubtaskDiv.parentNode.replaceChild(newSubtaskDivFirstElementChild, oldSubtaskDiv);
}

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

function getInformationForEditTask(taskKey,category, categoryUserOrTechnicalTask) {
  const titel = document.getElementById(`titel-edit-task-big${taskKey}`).value;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;
  const description = document.getElementById(`description-edit-task-big${taskKey}`).value;
  const dueDate = document.getElementById(`due-date-edit-task-big${taskKey}`).value;
  const priority = saveEditTaskPriority(taskKey);
  const assignedTo = changeContactCircleInEditTemplate(taskKey);
  const subtasks = getEditedSubtasksForFirebase(taskKey);
  const id = titel;
  return {titel, description, dueDate, priority, assignedTo, subtasks,
  categoryUserOrTechnicalTask, id, category};
}

function getEditedSubtasksLoop(taskKey, allSubtasks, subtasks) {
  for (let i = 0; i < allSubtasks.length; i++) {
    const span = document.getElementById(`subtask-task-text-edit${taskKey}${i}`);
    if (span) {
      const text = span.textContent.trim();
      if (text) {
        subtasks.push({
          subtaskText: text,
          statusCheckbox: false
        });
      }
    }
  }
}

function getEditedSubtasksForFirebase(taskKey) {
  const subtasks = [];
  const container = document.getElementById(`subtasks-edit-div${taskKey}`);
  if (!container) return subtasks;

  const allSubtasks = container.getElementsByClassName("subtasks-board-first-task-edit");

  getEditedSubtasksLoop(taskKey, allSubtasks, subtasks);

  return subtasks;
}

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

async function saveEditedTaskToFirebase(taskKey, category, categoryUserOrTechnicalTask) {
  const inputsForTask = getInformationForEditTask(taskKey, category, categoryUserOrTechnicalTask);
  const newTitle = inputsForTask.titel;
  const oldTitle = document.getElementById(`task-board-big-headline${taskKey}`).textContent;

  if (newTitle !== oldTitle) {
    await putRegistryDataBaseFunction(`tasks/${category}/${newTitle}`, inputsForTask);
    await deleteTask(category, oldTitle);
  } else {
    await putRegistryDataBaseFunction(`tasks/${category}/${oldTitle}`, inputsForTask);
  }

  alert("Task erfolgreich gespeichert!");
  hideBigTaskInfo(taskKey);
  loadAllTasksFromFirebase();
}

async function saveSubtaskStatus(taskKey, category, titel, i) {
  const checkbox = document.getElementById(`checkbox-board-subtasks${taskKey}${i}`);
  if (!checkbox) return;
  const isChecked = checkbox.checked;
  try {
    await patchRegistryDataBaseFunction(
      `tasks/${category}/${titel}/subtasks/${i}`,
      { statusCheckbox: isChecked }
    );
  } catch (error) {
    console.error("Error saving subtask status:", error);
  }
}

async function patchRegistryDataBaseFunction(path, data) {
  const url = `${FireBaseUrl}${path}.json`;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

function updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv) {
  if (subtasksCheckboxes.length > 0) {
    subtaskDiv.innerHTML = `${counter}/${subtasksCheckboxes.length} subtasks`;

    const progressBarFillDiv = document.getElementById(`progressbar-fill${taskKey}`);
    const progressPercentage = (counter / subtasksCheckboxes.length) * 100;

    progressBarFillDiv.style.width = `${progressPercentage}%`;
  } else {
    progressBarDiv.classList.add("display-none");
  }
}

function subtaskCounter(taskKey) {
  const subtaskDiv = document.getElementById(`subtask-text${taskKey}`);
  const subtasksCheckboxes = document.getElementsByClassName(`checkbox-board-subtasks${taskKey}`);
  const progressBarDiv = document.getElementById(`progressbar-box${taskKey}`);
  let counter = 0;

  for (let i = 0; i < subtasksCheckboxes.length; i++) {
    const checkbox = subtasksCheckboxes[i];
    if (checkbox.checked) {
      counter++;
    }
  }

  updateSubtaskProgress(taskKey, counter, subtasksCheckboxes, subtaskDiv, progressBarDiv);
}

function taskInfosForFirebaseBoard() {
  let titel = validateInputBoard() || "New Task";
  let description = document.getElementById("inputfield-description-board").value || "No description";
  let dueDate = validateDueDateInputBoard();
  let priority = getSelectedPriority();
  let assignedTo = getAssignedToValue() || "Not Assigned to anyone";
  let categoryUserOrTechnicalTask = document.getElementById("inputfield-category-assign-board").value;
  let subtasks = subtasksInfoForFirebase() || "No subtasks";
  return { titel, description, dueDate, priority, assignedTo, categoryUserOrTechnicalTask, subtasks,};
}

function validateInputBoard() {
  const input = document.getElementById("titleInputBoard").value;
  const inputfield = document.getElementById("titleInputBoard");
  const errorMsg = document.getElementById("field-required-in-board");

  if (input.trim() == "") {
    errorMsg.classList.remove("display-none");
    inputfield.style.border = "1px solid red";
  } else {
    if (!errorMsg.classList.contains("display-none"))
    errorMsg.classList.add("display-none");
  }
  return input;
}

function validateDueDateInputBoard() {
  const input = document.getElementById("dueDateInputBoard");
  const errorMsg = document.getElementById("due-date-required-board-error");
  const value = input.value.trim();

  const result = isValidDDMMYYYYRealDate(value);

  if (!result.valid) {
    errorMsg.innerHTML = result.message;
    errorMsg.classList.remove("display-none");
    input.style.border = "1px solid red";
    return false;
  }

  errorMsg.classList.add("display-none");
  return value;
}

function isValidDDMMYYYYRealDate(value) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (!value) return { valid: false, message: "This field is required." };
  if (!dateRegex.test(value)) return { valid: false, message: "Please enter a valid date in DD/MM/YYYY format." };

  const [, day, month, year] = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    parsedDate.getFullYear() !== Number(year) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getDate() !== Number(day)
  ) return { valid: false, message: "Please enter a real, valid date." };

  return { valid: true, message: "" };
}

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

function getSelectedPriority() {
  const urgentButton = document.getElementById("arrow-container-red-board");
  const mediumButton = document.getElementById("arrow-container-orange-board");
  const lowButton = document.getElementById("arrow-container-green-board");

  if (urgentButton.classList.contains("active")) return "Urgent";
  if (mediumButton.classList.contains("active")) return "Medium";
  if (lowButton.classList.contains("active")) return "Low";
  return "No priority selected";
}

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

async function loadAndSortContacts() {
  const contactsUnsorted = await fetchContacts();
  const contacts = Object.values(contactsUnsorted);
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  allContacts = contacts;
  return contacts;
}

async function loadContactsForDropdownInBoard() {
  const container = document.getElementById("contacts-dropdown-board");
  if (!container) return;

  if (container.innerHTML === "") {
    try {
      const contacts = await loadAndSortContacts();
      for (const key in contacts) {
        container.innerHTML += getContactCardForDropdown(contacts[key]);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }

  container.classList.toggle("display-none");
}

function getContactForCircleBoard() {
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
  renderCirclesForAssignedContactsBoard(nameInitialesArray);
  return nameInitialesArray;
}

function changeAssignedToBoardInputStyle() {
  const inputfield = document.getElementById("inputfield-text-assign-board");
  inputfield.classList.toggle("inputfield-blue-border-top-right");
}

function renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray) {
  for (let i = 0; i < Math.min(nameInitialesArray.length, 3); i++) {
    const initials = nameInitialesArray[i];
    circleRenderContainer.innerHTML += getAssignedCircleTemplate(circleClasses[i], initials);
  }
}

function renderCirclesForAssignedContactsBoard(nameInitialesArray) {
  const circleRenderContainer = document.getElementById("three-circle-container-board");
  circleRenderContainer.innerHTML = "";

  const circleClasses = ["single-circle-first","single-circle-second","single-circle-third"];

  if (nameInitialesArray.length === 0) {
    circleRenderContainer.classList.add("display-none");
    circleRenderContainer.classList.add("hidden");
    return;
  }

  renderCircleItems(circleRenderContainer, circleClasses, nameInitialesArray);

  circleRenderContainer.classList.remove("display-none");
  circleRenderContainer.classList.remove("hidden");
}

function categoryUserOrTechnicalTaskBoard() {
  const input = document.getElementById("inputfield-category-assign-board");
  const dropdown = document.getElementById("category-dropdown-board");
  dropdown.classList.toggle("open");
  input.classList.toggle("inputfield-blue-border-top-right");
}

function selectUserCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "User Story";
  categoryUserOrTechnicalTaskBoard();
}

function selectTechnicalCategoryBoard() {
  const inputfield = document.getElementById("inputfield-category-assign-board");
  inputfield.value = "Technical Task";
  categoryUserOrTechnicalTaskBoard();
}

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

function deleteSubtasksInBoard(i) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  if (subtaskDiv) {
    subtaskDiv.remove();
  }
}

function changeSubtasksInBoard(i, subtaskText) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = changeSubtasksIntoInputfield(i, subtaskText);
}

function changedSubtasksBoard(i) {
  const input = document.getElementById(`new-subtask-text-field${i}`);
  const newSubtaskText = input.value.trim();
  if (!newSubtaskText) return;

  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = subtasksInBoard(i, newSubtaskText);
}

function subtasksInfoForFirebase() {
  let subtasksArray = [];
  subtasksArray = [];
  const subtasksText = document.getElementsByClassName("subtasks-in-container");
  for (let i = 0; i < subtasksText.length; i++) {
    const subtask = subtasksText[i].textContent.trim();
    const notChecked = false;
    subtasksArray.push({
      subtaskText: subtask,
      statusCheckbox: notChecked
    });
  }
  console.log(subtasksArray);
  return subtasksArray;
}

async function handleTaskCreationBoard(status, taskTitel) {
  const inputsForTask = taskInfosForFirebaseBoard();
  const newTaskKey = taskTitel.value;
  const dataPost = await putRegistryDataBaseFunction(`tasks/${status}/` + newTaskKey, inputsForTask);
  clearInputFieldsForNewTaskBoard();
  showTaskAddedMessageBoard();
  console.log(dataPost);
}

async function postTaskIntoFirebaseBoard(status) {
  const taskTitel = document.getElementById("titleInputBoard");
  const taskDueDate = document.getElementById("dueDateInputBoard");
  const taskCategory = document.getElementById("inputfield-category-assign-board");

  if (taskTitel.value && taskDueDate.value && taskCategory.value) {
    await handleTaskCreationBoard(status, taskTitel);
  } else if (!taskTitel.value) {
    validateInputBoard();
  } else if (!taskDueDate.value) {
    validateDueDateInputBoard();
  } else if (!taskCategory.value) {
    alert("Please select a category for the task.");
  }
}

function resetBoardInputValues(taskTitel, taskDescription, taskDueDate, taskCategory, taskSubtask, savedSubtasks, circleContainer) {
  taskTitel.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskCategory.value = "";
  taskSubtask.value = "";
  savedSubtasks.innerHTML = "";
  circleContainer.innerHTML = "";
}

function resetBoardPriority(taskPriorityUrgent, taskPriorityMedium, taskPriorityLow) {
  taskPriorityUrgent.classList.remove("active");
  taskPriorityMedium.classList.remove("active");
  taskPriorityLow.classList.remove("active");
}

function resetBoardContacts(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact.checked = false;
  }
}

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

  resetBoardInputValues( taskTitel, taskDescription, taskDueDate, taskCategory, taskSubtask, savedSubtasks, circleContainer);

  resetBoardPriority(taskPriorityUrgent, taskPriorityMedium, taskPriorityLow);

  resetBoardContacts(contacts);
}

function filterTasksBySearch(taskTitles, toDos, inputStart) {
  for (let i = 0; i < taskTitles.length; i++) {
    const titleElement = taskTitles[i];
    const title = titleElement.textContent.trim().toLowerCase();
    const titleStart = title.substring(0, 3);

    if (inputStart === titleStart) {
      toDos[i].classList.remove("display-none");
    } else {
      toDos[i].classList.add("display-none");
    }
  }
}

function searchTask() {
  const inputValue = document.getElementById("title-findtask-inputfield").value.trim().toLowerCase();
  const taskTitles = document.getElementsByClassName("task-titel-mini-task");
  const toDos = document.getElementsByClassName("todo-content-box");
  const inputStart = inputValue.substring(0, 3);

  if (inputValue.length < 1) {
    for (let i = 0; i < toDos.length; i++) {
      toDos[i].classList.remove("display-none");
    }
    return;
  }

  filterTasksBySearch(taskTitles, toDos, inputStart);
}
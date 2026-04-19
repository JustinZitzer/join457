/** Toggles the move-to-category dropdown icon menu for mobile view.
 * @param {Event} event - The click event triggered by the user interaction.
 * @param {string|number} taskKey - A unique identifier used to target the corresponding
 */
function showMoveToCategoryIcon(event, taskKey) {
  event.stopPropagation();
  const moveToDropdown = document.getElementById(`user-profile-menu-mobile${taskKey}`);
  if (moveToDropdown.classList.contains("display-none")) {
    moveToDropdown.classList.remove("display-none");
  } else {
    moveToDropdown.classList.add("display-none");
  }
}

/**
 * Handles moving a task between categories (Kanban columns).
 * Prevents default event behavior, validates whether the move is necessary,
 * and closes the dropdown if no change is needed.
 *
 * @param {Event} event - The triggering UI event.
 * @param {string|number} taskId - Unique identifier of the task.
 * @param {string} newCategory - Target category/column for the task.
 * @returns {Promise<void>}
 */

async function moveTaskToCategory(event, taskId, newCategory) {
  event.preventDefault();
  event.stopPropagation();
  const dropdownMenu = document.getElementById(`user-profile-menu-mobile${taskId}`);
  const task = todosArray.find((t) => t.id == taskId);
  if (!task) return;
  const oldCategory = task.category;
  if (oldCategory === newCategory) {
    dropdownMenu?.classList.add("display-none");
    return;
  }

  await fetch(FireBaseUrl + `tasks/${oldCategory}/${task.id}.json`, {method: "DELETE",});
  task.category = newCategory;

  await fetch(FireBaseUrl + `tasks/${newCategory}/${task.id}.json`, {method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  dropdownMenu?.classList.add("display-none");
  loadAllTasksFromFirebase();
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

/** Unchecks all selected contacts in the board overlay.
 *@param {HTMLInputElement[]} contacts - Collection of contact checkbox elements.
 */
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

  resetBoardInputValues( taskTitel, taskDescription, taskDueDate, taskCategory, taskSubtask, savedSubtasks, circleContainer);
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

/** Opens the native date picker for the edit-task due date input.
 * @param {string|number} taskKey - A unique identifier used to target the corresponding
 */
function openDatePickerEditTask(taskKey) {
  const input = document.getElementById(`due-date-edit-task-big${taskKey}`);
  input.focus();
  if (input.showPicker) {
    input.showPicker();
  }
}

/** Validates the task title while editing a task.
 * @param {string|number} taskKey - A unique identifier used to target the corresponding
 */
function validateEditTaskTitle(taskKey) {
  const input = document.getElementById(`titel-edit-task-big${taskKey}`);
  const error = document.getElementById(`error-title-edit${taskKey}`);
  if (!input) return;
  const value = input.value.trim();

  if (value.length < 3) {
    input.classList.add("border-red-board");
    error.classList.remove("display-none");
    error.textContent = "Min. 3 characters";
    return false;
  }

  if (!validateInvalidChars(input, error, value)) return false;
  input.classList.remove("border-red-board");
  error.classList.add("display-none");
  return true;
}

/**
 * Validates an input value against disallowed characters and updates the UI
 * to display an error state if invalid characters are found.
 * @param {HTMLElement} input - The input element to apply validation styling to.
 * @param {HTMLElement} error - The element used to display the error message.
 * @param {string} value - The input value to be validated.
 * @returns {boolean} - Returns true if the value is valid, otherwise false.
 */

function validateInvalidChars(input, error, value) {
  const invalidChars = /[.#$\[\]/?]/;
  if (invalidChars.test(value)) {
    input.classList.add("border-red-board");
    error.classList.remove("display-none");
    error.textContent = "No . # $ [ ] / ? characters allowed";
    return false;
  }
  return true;
}

/** Validates the due date while editing a task.
 * @param {string|number} taskKey - A unique identifier used to target the corresponding
 */
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

/** Validates that the edit-task due date is not empty.
 * @param {HTMLElement} input - The input element to apply validation styling to.
 * @param {HTMLElement} error - The element used to display the error message.
 * @param {string} value - The input value to be validated.
 */
function validateEditTaskDueDateEmpty(input, value, error) {
  if (!input) return false;

  if (!value) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

/** Validates the format of the edit-task due date.
 * @param {HTMLElement} input - The input element to apply validation styling to.
 * @param {HTMLElement} error - The element used to display the error message.
 * @param {string} value - The input value to be validated.
 */
function validateEditTaskDueDateFormat(input, value, error) {
  const isValidDate = !isNaN(new Date(value).getTime());
  if (!isValidDate) {
    error.classList.remove("display-none");
    input.classList.add("border-red-board");
    return false;
  }
  return true;
}

/** Closes open dropdowns when clicking outside of them. 
 *@param {Event} event - The click event used to detect outside interactions.
*/
function dropdownCloseOnClickOutside(event) {
  dropdownCloseOnClickOutsideContacts(event);
  dropdownCloseOnClickOutsideCategory(event);
}

/** Closes the contacts dropdown when clicking outside of it. 
 *@param {Event} event - The click event used to detect outside interactions.
*/
async function dropdownCloseOnClickOutsideContacts(event) {
  const dropdown = document.getElementById("contacts-dropdown");
  const input = document.getElementById("inputfield-text-assign");
  const icon = document.getElementById("contact-list");

  if (!dropdown || dropdown.classList.contains("hidden")) return;
  if (dropdown.contains(event.target) ||input.contains(event.target) ||icon.contains(event.target)) {
    return;
  }
  await loadContactsForDropdown();
  getContactForCircle();
}

/** Closes the category dropdown when clicking outside of it. 
 * @param {Event} event - The click event used to detect outside interactions.
*/
function dropdownCloseOnClickOutsideCategory(event) {
  const dropdown = document.getElementById("category-dropdown");
  const input = document.getElementById("category-input");
  const icon = document.getElementById("dropdown-toggle-btn");

  if (!dropdown) return;
  if (dropdown.classList.contains("display-none")) return;
  if (dropdown.contains(event.target) ||input.contains(event.target) ||icon.contains(event.target)) {
    return;
  }
  toggleDropdown();
}

/** Validates that the edit-task due date is not in the past. 
 * @param {HTMLElement} input - The date input element.
 * @param {string} value - The selected date value from the input field.
 * @param {HTMLElement} error - The element used to display validation errors.
 * @returns {boolean} - Returns true if the date is valid, otherwise false.
*/
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

/** Sets the minimum selectable date for all due date inputs to today. 
 * @param {HTMLElement} input - The input element to apply validation styling to.
 * @param {HTMLElement} error - The element used to display the error message.
 * @param {string} value - The input value to be validated.
*/
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
  } else if (overlay.classList.contains("display-none")) {
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

/** Filters visible tasks based on the search input.
 * @param {HTMLElement[]} taskTitles - Array of elements containing task titles.
 * @param {HTMLElement[]} descriptions - Array of elements containing task descriptions.
 * @param {HTMLElement[]} toDos - Array of task container elements to show or hide.
 * @param {string} inputStart - The lowercase search string to match against task content.
 */
function filterTasksBySearch(taskTitles, descriptions, toDos, inputStart) {
  for (let i = 0; i < taskTitles.length; i++) {
    const title = taskTitles[i].textContent.trim().toLowerCase();
    const description = descriptions[i].textContent.trim().toLowerCase();
    const titleWords = title.split(" "),
      descriptionWords = description.split(" ");
    let match = false;

    for (let j = 0; j < titleWords.length; j++) {
      if (titleWords[j].startsWith(inputStart)) {
        match = true;
        break;
      }
    }

    for (let j = 0; j < descriptionWords.length; j++) {
      if (descriptionWords[j].startsWith(inputStart)) {
        match = true;
        break;
      }
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

/** Replaces a board subtask with an editable input field.
 * @param {number} i - The index or identifier used to locate the subtask element.
 * @param {string} subtaskText - The current subtask text to prefill the input field.
 */
function changeSubtasksInBoard(i, subtaskText) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = changeSubtasksIntoInputfield(i, subtaskText);
}

/** Saves the changed subtask text in the board overlay.
 * @param {number} i - The index or identifier used to locate the subtask in the board overlay.
 */
function changedSubtasksBoard(i) {
  const input = document.getElementById(`new-subtask-text-field${i}`);
  const newSubtaskText = input.value.trim();
  if (!newSubtaskText) return;

  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  subtaskDiv.innerHTML = subtasksInBoard(i, newSubtaskText);
}

/** Deletes a subtask from the board overlay.
 * @param {number} i - The index or identifier used to locate the subtask element.
 */
function deleteSubtasksInBoard(i) {
  const subtaskDiv = document.getElementById(`subtasks-in-container-board${i}`);
  if (subtaskDiv) {
    subtaskDiv.remove();
  }
}

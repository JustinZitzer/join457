let taskArray = [];
const fireBaseUrlSummary = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const toDoCounterElement = document.getElementById("Counter-To-Do");
const doneCounterElement = document.getElementById("Counter-Done");
const urgenCounterElement = document.getElementById("Counter-Urgent");
const taskInBoardElement = document.getElementById("Counter-All-Tasks");
const inProgressCounterElement = document.getElementById("Counter-Tasks-In-Progress");
const awaitFeedbackCounterElement = document.getElementById("Counter-Await-Feedback");
const dueDateUrgentDiv = document.getElementById("Date-Of-The-Deadline");
const bodySummaryHtml = document.getElementById("Body-Summary-Html");
let toDoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;
let urgentCounter = 0;
let allTasksCounter = 0;

/** Initializes the summary page, loads tasks, and updates all summary elements. */
async function initSummaryAndHTML() {
  await loadHTML();
  await initSummaryBoard();
  await loadTasksFromFirebaseSummary();
  counterTasksSummary();
  showOldestUrgentDueDate();
  selectedSiteBackgroundStyle();
}

/** Handles sidebar navigation clicks and redirects to the selected page. */
function handleSidebarNavClick(event) {
  let targetLink = event.target.closest('.sidebar .nav-links a');
  if (targetLink) {
    event.preventDefault();
    const href = targetLink.getAttribute('href');
    window.location.href = href;
  }
}

/** Handles nav link activation, stores the active link, and redirects to the target page. */
function handleSidebarNavClick(event) {
  const targetLink = event.target.closest('.nav-links a');
  if (!targetLink) return;

  const links = document.querySelectorAll('.nav-links a');

  links.forEach(l => l.classList.remove('active'));
  targetLink.classList.add('active');

  localStorage.setItem('activeNav', targetLink.getAttribute('href'));
  window.location.href = targetLink.getAttribute('href');
}

window.addEventListener("load", () => {
  const loadingScreenMobileDiv = document.getElementById("Loading-Screen-Mobile-Z-Container");
  const whiteBackground = document.getElementById("White-Loading-Background-Mobile");

  if (window.location.pathname.endsWith("summary.html")) {
    setTimeout(() => {
      loadingScreenMobileDiv.classList.add('hidden');
      whiteBackground.classList.add('hidden');
      bodySummaryHtml.style.overflowY = 'auto';
    }, 1000);

    document.addEventListener('click', function (event) {
      handleSidebarNavClick(event);
    });
  }
});

/** Fetches summary-related data from Firebase for the given path. */
async function getInfoForSummaryBoardBaseFunction(path) {
  let response = await fetch(fireBaseUrlSummary + path + ".json");
  return await response.json();
}

/** Displays the correct greeting and logged-in user name on the summary page. */
function getInformationSummaryBoard(path) {
  const summaryGreetingTextName = document.getElementById("Summary-Name-Text-Greeting");
  const storedName = localStorage.getItem("loggedInUserName");
  const goodMorningText = document.getElementById("Good-Morning-Text");

  if (storedName === 'Guest') {
    summaryGreetingTextName.classList.add('display-none');
    goodMorningText.innerHTML = 'Good morning!';
    return;
  }

  if (storedName) {
    summaryGreetingTextName.innerHTML = storedName;
    return;
  }
}

/** Initializes the summary board greeting information. */
async function initSummaryBoard() {
  await getInformationSummaryBoard("/userData");
}

/** Extracts all tasks from Firebase data and stores them in the task array. */
function extractTasksFromFirebaseDataSummary(data, taskArray) {
  for (const categoryKey in data) {
    const categoryTasks = data[categoryKey];
    for (const taskKey in categoryTasks) {
      const task = categoryTasks[taskKey];
      task.id = taskKey;
      task.category = categoryKey;
      taskArray.push(task);
    }
  }
}

/** Loads all tasks from Firebase into the summary task array. */
async function loadTasksFromFirebaseSummary() {
  taskArray = [];
  const response = await fetch(fireBaseUrlSummary + "tasks.json");
  const data = await response.json();

  if (data) {
    extractTasksFromFirebaseDataSummary(data, taskArray);
  }
}

/** Checks whether a task is a valid task object and not a placeholder. */
function isRealTask(task) {
  return (
    task &&
    typeof task === 'object' &&
    task.title !== 'Workaround' &&
    task.title !== ''
  );
}

/** Filters tasks into categories and returns grouped summary data. */
function filterTasksByCategorySummary() {
  const realTasks = taskArray.filter(isRealTask);

  const toDoTasks = realTasks.filter((task) => task.category === 'toDo');
  const inProgressTasks = realTasks.filter((task) => task.category === 'inProgress');
  const awaitFeedbackTasks = realTasks.filter((task) => task.category === 'awaitFeedback');
  const doneTasks = realTasks.filter((task) => task.category === 'done');

  return { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks, realTasks };
}

/** Renders all summary task counters into the DOM. */
function renderSummaryCounters(toDoCounter, inProgressCounter, awaitFeedbackCounter, doneCounter, urgentCounter, allTasksCounter) {
  toDoCounterElement.innerHTML = toDoCounter;
  inProgressCounterElement.innerHTML = inProgressCounter;
  awaitFeedbackCounterElement.innerHTML = awaitFeedbackCounter;
  doneCounterElement.innerHTML = doneCounter;
  urgenCounterElement.innerHTML = urgentCounter;
  taskInBoardElement.innerHTML = allTasksCounter;
}

/** Counts tasks by category and priority and updates the summary counters. */
function counterTasksSummary() {
  const { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks, realTasks } = filterTasksByCategorySummary();

  toDoCounter = toDoTasks.length;
  inProgressCounter = inProgressTasks.length;
  awaitFeedbackCounter = awaitFeedbackTasks.length;
  doneCounter = doneTasks.length;
  urgentCounter = realTasks.filter((task) => task.priority === 'Urgent').length;
  allTasksCounter = realTasks.length;

  renderSummaryCounters(toDoCounter, inProgressCounter, awaitFeedbackCounter, doneCounter, urgentCounter, allTasksCounter);

  const urgentTasks = realTasks.filter((task) => task.priority === 'Urgent');
  return urgentTasks;
}

/** Finds and displays the oldest due date among all urgent tasks. */
function showOldestUrgentDueDate() {
  const urgentTasks = counterTasksSummary();
  const dueDateArray = urgentTasks.map(task => task.dueDate);

  const parseDate = (value) => {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return match ? new Date(match[3], match[2] - 1, match[1]) : new Date(value);
  };

  if (!dueDateArray.length) return dueDateUrgentDiv.innerHTML = 'No upcoming Deadline';

  const sortedDates = dueDateArray
    .map(parseDate)
    .filter(date => !isNaN(date))
    .sort((a, b) => a - b);

  if (!sortedDates.length) return dueDateUrgentDiv.innerHTML = 'No valid dates';

  const oldestDate = sortedDates[0];
  dueDateUrgentDiv.innerHTML = oldestDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
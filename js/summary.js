let taskArray = [];
const fireBaseUrlSummary = "https://join-457-default-rtdb.europe-west1.firebasedatabase.app/";
const toDoCounterElement = document.getElementById("Counter-To-Do");
const doneCounterElement = document.getElementById("Counter-Done");
const urgenCounterElement = document.getElementById("Counter-Urgent");
const taskInBoardElement = document.getElementById("Counter-All-Tasks");
const inProgressCounterElement = document.getElementById("Counter-Tasks-In-Progress");
const awaitFeedbackCounterElement = document.getElementById("Counter-Await-Feedback");
let toDoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;
let urgentCounter = 0;
let allTasksCounter = 0;

async function initSummaryAndHTML() {
    await loadHTML();
    await initSummaryBoard();
    await loadTasksFromFirebaseSummary();
    counterTasksSummary();
}

window.addEventListener("load", () => {
    const loadingScreenMobileDiv = document.getElementById("Loading-Screen-Mobile-Z-Container");
    if (window.location.pathname === "/summary.html") {
        setTimeout(() => {
        loadingScreenMobileDiv.classList.add('hidden');
        }, 1000);
        document.addEventListener('click', function(event) {
            let targetLink = event.target.closest('.sidebar .nav-links a');
            if (targetLink) {
                event.preventDefault(); // Standardverhalten verhindern
                const href = targetLink.getAttribute('href');
                window.location.href = href; // Manuell zur neuen Seite navigieren
            }
        });
    }
});


async function getInfoForSummaryBoardBaseFunction (path) {
    let response = await fetch(fireBaseUrlSummary + path + ".json");
    return await response.json();
}

async function getInformationSummaryBoard(path) {
    const summaryGreetingTextName = document.getElementById("Summary-Name-Text-Greeting");
    let userDataSummary = await getInfoForSummaryBoardBaseFunction(path);
    const firstUser = Object.values(userDataSummary)[0];
    summaryGreetingTextName.innerHTML = firstUser.name;
}

async function initSummaryBoard() {
    await getInformationSummaryBoard("/userData");
}

function showSummaryBoardMobile() {
    const resolutionWidth = window.innerWidth;
    const headerIndexHtml = document.getElementById("header-index-html");
    const blueLineDesktopVersion = document.getElementById("Headline-Blue-Line");
    const blueLineMobileContainer = document.getElementById("Headline-Blue-Line-Mobile-Container");

    if (resolutionWidth < 1400) {
    }
}

async function loadTasksFromFirebaseSummary() {
  taskArray = []; // Leeren!
  const response = await fetch(fireBaseUrlSummary + "tasks.json");
  const data = await response.json();
  console.log(data);

  if (data) {
    for (const categoryKey in data) {
      // z.B. "toDo", "done", ...
      const categoryTasks = data[categoryKey];
      for (const taskKey in categoryTasks) {
        const task = categoryTasks[taskKey];
        // Schreibe Info dazu (für Filter, Drag&Drop usw.)
        task.id = taskKey; // z.B. "task1"
        task.category = categoryKey; // z.B. "toDo"
        taskArray.push(task);
      }
    }
  }
}

function isRealTask(task) {
  return (
    task &&
    typeof task === 'object' &&
    task.title !== 'Workaround' &&
    task.title !== ''
  );
}

function filterTasksByCategorySummary() {
  const realTasks = taskArray.filter(isRealTask);

  const toDoTasks = realTasks.filter((task) => task.category === 'toDo');
  const inProgressTasks = realTasks.filter((task) => task.category === 'inProgress');
  const awaitFeedbackTasks = realTasks.filter((task) => task.category === 'awaitFeedback');
  const doneTasks = realTasks.filter((task) => task.category === 'done');

  return { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks, realTasks };
}

function counterTasksSummary() {
  const { toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks, realTasks } =
    filterTasksByCategorySummary();

  toDoCounter = toDoTasks.length;
  inProgressCounter = inProgressTasks.length;
  awaitFeedbackCounter = awaitFeedbackTasks.length;
  doneCounter = doneTasks.length;
  urgentCounter = realTasks.filter((task) => task.priority === 'Urgent').length;
  allTasksCounter = realTasks.length;

  toDoCounterElement.innerHTML = toDoCounter;
  inProgressCounterElement.innerHTML = inProgressCounter;
  awaitFeedbackCounterElement.innerHTML = awaitFeedbackCounter;
  doneCounterElement.innerHTML = doneCounter;
  urgenCounterElement.innerHTML = urgentCounter;
  taskInBoardElement.innerHTML = allTasksCounter;
}
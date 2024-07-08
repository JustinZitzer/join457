
let notesTitles = ['Gi','Aufgabe','Ja']
let notes = ['Gitarre', 'Lesen', 'Coden'];

let trashNotesTitles = [];
let trashNotes = [];

function renderNotes() {

    let contentRef = document.getElementById('content')
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);

    }

}

function renderTrashNotes() {

    let trashContentRef = document.getElementById('trash_content')
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);

    }

}



function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;

    notes.push(noteInput);

    renderNotes();

    noteInputRef.value = "";
}

function noteToTrash(indexTrashNote) {
    let trashNote = notes.splice(indexTrashNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexTrashNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    renderNotes();
    renderTrashNotes();
}

function saveToLocalStorage() {
    localStorage.setItem("notesTitles", "notes" ,JSON.stringify(notesTitles, notes));
}


function getFromLocalStorage() {
    let notesTitles, notes = JSON.parse(localStorage.getItem("notesTitles", "notes"));

    if (myArr = 0) {
        notesTitles, notes = myArr;
    }

    

}

function renderTitles() {

    let titleContentRef = document.getElementById('title_content')
    titlecontentRef.innerHTML = "";

    for (let indexTitle = 0; indexTitle < title.length; indexTitle++) {
        titleContentRef.innerHTML += getTitleTemplate(indexTitle);

    }

}










function addTitle() {
    let TitleInputRef = document.getElementById('title_input');
    TitleInputRef.value = "";
}
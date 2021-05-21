//TODO DELETE TRASH AFTER 7 DAYS
let notes = [];
let trashes = [];

init();

function init(){
    loadAll();
    showNotes();
}

function loadAll() {
   notes = getStorageArray("notes");
   trashes = getStorageArray("trashes");
}

function updateAll() {
    updateStorageArray("notes", notes);
    updateStorageArray("trashes", trashes);
}

function toggleMainNav() {
    const mainNav = document.getElementById("main-nav");
    const mainNavPlaceholder = document.getElementById("main-nav-placeholder");
    mainNav.classList.toggle("main-nav-expand");
    mainNav.classList.toggle("main-nav-schrinked");
    mainNavPlaceholder.classList.toggle("main-nav-placeholder-expand");
    mainNavPlaceholder.classList.toggle("main-nav-placeholder-schrinked");
}

function createNote(noteTitle, noteText) {
    return {
        title: noteTitle,
        text: noteText,
        id: new Date().getTime()
    };
}

function showNewNoteBox(self) {
    setSelectedMenu(self);
    showElement("new-note-box");
    hideElement("trash-info-box");
    showNotes();
}

function showTrashBox(self) {
    setSelectedMenu(self);
    showElement("trash-info-box");
    hideElement("new-note-box");
    showTrash();
}

function saveNote() {
    let newTitle = document.getElementById("new-title");
    let newText = document.getElementById("new-text");
    newText.value = newText.value.replace(/\n\r?/g, "<br />");
    let newNote = createNote(newTitle.value, newText.value);
    newTitle.value = "";
    newText.value = "";
    notes.push(newNote);
    updateStorageArray("notes", notes);
    showNotes();
}

function deleteNote(id) {
    trashes.push(notes.find(note => note.id == id));
    notes = notes.filter(note => note.id != id);
    updateAll();
    showNotes();
}

function deleteTrash(id) {
    trashes = trashes.filter(trash => trash.id != id);
    updateStorageArray("trashes", trashes);
    showTrash();
}

function restoreTrash(id) {
    notes.push(trashes.find(trash => trash.id == id));
    trashes = trashes.filter(trash => trash.id != id);
    updateAll();
    showTrash();
}

function emptyTrash(){
    trashes = [];
    updateStorageArray("trashes", trashes);
    showTrash();
}

function showNotes() {
    let notesContainer = document.getElementById("notes-container");
    if (notes.length == 0) {
        notesContainer.innerHTML = generateContainerEmpty("Notes you add appear here");
    } else {
        notesContainer.innerHTML = "";
        notes.forEach((note) => {
            notesContainer.innerHTML += generateNoteCard(note);
        });
    }
}

function showTrash() {
    let notesContainer = document.getElementById("notes-container");
    let emptyTrash = document.getElementById("trash-empty");
    if (trashes.length == 0) {
        notesContainer.innerHTML = generateContainerEmpty("No notes in Trash");
        emptyTrash.classList.add("d-none");
    } else {
        emptyTrash.classList.remove("d-none");
        notesContainer.innerHTML = "";
        trashes.forEach((trash) => {
            notesContainer.innerHTML += generateTrashCard(trash);
        });
    }
}

function generateContainerEmpty(message){
    return `
    <div class="empty-box">
        <span>${message}</span>
    </div>`;
}

function generateTrashCard(trash) {
    return `
        <div id="note${trash.id}" class="card note-container">
            <span>${trash.title}</span>
            <span>${trash.text}</span>
            <span>${trash.id}</span>
            <button onclick="deleteTrash(${trash.id})">Delete</button>
            <button onclick="restoreTrash(${trash.id})">Restore</button>
        </div>
    `;
}

function generateNoteCard(note) {
    return `
        <div id="note${note.id}" class="card note-container">
            <span>${note.title}</span>
            <span>${note.text}</span>
            <span>${note.id}</span>
            <button onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `;
}

function expand(self){
    self.classList.remove("main-nav-schrinked");
    self.classList.add("main-nav-expand");
}

function schrink(self){
    const mainNavPlaceholder = document.getElementById("main-nav-placeholder");
    mainNavPlaceholder.classList.remove("main-nav-placeholder-expand");
    mainNavPlaceholder.classList.add("main-nav-placeholder-schrinked");
    self.classList.remove("main-nav-expand");
    self.classList.add("main-nav-schrinked");
}

function setSelectedMenu(selectedElement){
    const mainNavBtnBox = document.getElementById("main-nav-btn-box");
    const allBtns = Array.from(document.getElementsByTagName("button"));
    allBtns.forEach( btn => btn.classList.remove("selected-main-nav"));
    selectedElement.classList.add("selected-main-nav");
}

function transitFocusIn(self){
    self.classList.add("search-focus-in");
}

function transitFocusOut(self){
    self.classList.remove("search-focus-in");
}

function showParentContent(){
    const parent = document.getElementById("new-note-box");
    const hiddebarContents = Array.from(document.getElementsByClassName("hiddebar"));

    hiddebarContents.forEach( content => content.classList.remove("d-none"));
}

function hiddeParentContent(){
    const parent = document.getElementById("new-note-box");
    const hiddebarContents = Array.from(document.getElementsByClassName("hiddebar"));

    hiddebarContents.forEach( content => content.classList.add("d-none"));
}
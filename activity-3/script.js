// Trova input, button, list e counter nell'HTML in modo da poterli utilizzare.
const titleInput = document.getElementById("titleInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("noteList");

// Leggi le note salvate. Se non ce ne sono, inizia con un array vuoto []
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Trasforma la lista delle note in una stringa e salvala nell'archivio locale.
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Disegna ogni nota sullo schermo dall'array delle note
function render() {
    list.innerHTML = ""; // Cancella la lista prima

    // Passa attraverso ogni nota per indice
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const li = document.createElement("li"); // Crea un nuovo elemento <li> per ogni nota
        
        const header = document.createElement("div");
        header.className = "note-header";

        const titleEl = document.createElement("span");        
        titleEl.className = "note-title"; // Inserisci il titolo all'interno
        titleEl.textContent = note.title;

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete"; // Il pulsante Elimina
        deleteBtn.title = "Delete";
        
        // Quando si fa clic su Elimina: rimuove la nota, salva e ridisegna
        deleteBtn.addEventListener("click", () => {
            notes.splice(i, 1);     // Rimuovi 1 elemento da questo indice
            saveNotes();            // Salva il nuovo array
            render();               // Ridisegna lo schermo            
        });

        header.appendChild(titleEl);
        header.appendChild(deleteBtn);

        const dateEl = document.createElement("div");
        dateEl.className = "note-date";
        dateEl.textContent = note.date; // Mostra la data salvata

        const textEl = document.createElement("div");
        textEl.className = "note-text";
        textEl.textContent = note.note; // Mostra il testo della nota

        li.appendChild(header);
        li.appendChild(dateEl);
        li.appendChild(textEl);
        list.appendChild(li);
    }
}

// Quando si fa clic sul pulsante, aggiunge una nuova nota all'array
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();  // Ottieni il titolo, ritaglia gli spazi
    const note = noteInput.value.trim();    // Ottieni il testo della nota, ritaglia gli spazi

    if (title === "" || note === "") return; // Non fa nulla se una delle caselle è vuota

    // Aggiunge la data automaticamente
    const date = new Date().toLocaleDateString();

    notes.push({ title: title, note: note, date: date });    // Aggiungi un oggetto all'array
    saveNotes();                                            // Salva nell'archivio locale
    render();                                               // Ridisegna lo schermo
    titleInput.value = "";                                  // Cancella la casella del titolo
    noteInput.value = "";                                   // Cancella la casella delle note
});

// Chiama render() una volta alla fine in modo che vengano visualizzate le note salvate
render();
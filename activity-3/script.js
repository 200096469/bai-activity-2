// ==========================================
// RIFERIMENTI AGLI ELEMENTI HTML
// ==========================================

// Prendiamo il riferimento alla casella di testo per il titolo della nota
const titleInput = document.getElementById("titleInput");

// Prendiamo il riferimento all'area di testo per il contenuto della nota
const noteInput = document.getElementById("noteInput");

// Prendiamo il riferimento al pulsante "Add Note"
const addBtn = document.getElementById("addBtn");

// Prendiamo il riferimento alla lista <ul> dove verranno mostrate le note
const list = document.getElementById("noteList");

// Prendiamo il riferimento al pulsante "Delete All Notes" (svuota tutte le note)
const clrBtn = document.getElementById("clrBtn");

// Prendiamo il riferimento al campo di ricerca
const searchInput = document.getElementById("searchInput");

// ==========================================
// DATI: CARICAMENTO DELLE NOTE SALVATE
// ==========================================

// Leggiamo le note salvate nel Local Storage.
// localStorage.getItem("notes") restituisce una STRINGA (o null se non c'è nulla salvato).
// JSON.parse() trasforma quella stringa in un vero array JavaScript.
// L'operatore || [] dice: "se il risultato è null/undefined, usa un array vuoto".
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ==========================================
// FUNZIONE: SALVA LE NOTE NEL LOCAL STORAGE
// ==========================================

// Trasforma l'array delle note in una stringa (JSON.stringify) e la salva
// nel Local Storage del browser, così sopravvive a un refresh della pagina.
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// ==========================================
// FUNZIONE: DISEGNA LA LISTA SULLO SCHERMO
// ==========================================

// Legge l'array "notes" e ricrea tutta la lista HTML da zero ogni volta che viene chiamata.
function render() {
    list.innerHTML = ""; // Svuota il contenuto della lista prima di ridisegnarla

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchInput.value.toLowerCase()));

    // Cicliamo su ogni nota dell'array, usando l'indice "i" per poterla poi eliminare
    for (let i = 0; i < filteredNotes.length; i++) {
        const note = filteredNotes[i];            // La nota corrente (un oggetto con title, note, date)
        const li = document.createElement("li");  // Creiamo un nuovo elemento <li> per contenerla

        // --- Intestazione della nota (titolo + pulsante elimina) ---
        const header = document.createElement("div");
        header.className = "note-header";

        const titleEl = document.createElement("span");        
        titleEl.className = "note-title"; // Applichiamo lo stile del titolo
        titleEl.textContent = note.title; // Inseriamo il testo del titolo

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete"; // Testo visibile del pulsante Elimina
        deleteBtn.title = "Delete";       // Tooltip che appare al passaggio del mouse
        
        // Quando si clicca su "Delete" per QUESTA nota specifica:
        deleteBtn.addEventListener("click", () => {
            const realIndex = notes.indexOf(note);  // Trova la posizione REALE di questa nota in "notes"
            notes.splice(realIndex, 1);             // Rimuove dall'array completo
            saveNotes();                            // Salva l'array aggiornato nel Local Storage
            render();                               // Ridisegna la lista senza la nota eliminata
        });

        // Uniamo titolo e pulsante elimina dentro l'intestazione
        header.appendChild(titleEl);
        header.appendChild(deleteBtn);

        // --- Data della nota ---
        const dateEl = document.createElement("div");
        dateEl.className = "note-date";
        dateEl.textContent = note.date; // Mostra la data salvata quando la nota fu creata

        // --- Testo della nota ---
        const textEl = document.createElement("div");
        textEl.className = "note-text";
        textEl.textContent = note.note; // Mostra il contenuto scritto dall'utente

        // Assembliamo tutti i pezzi dentro il <li>, e il <li> dentro la lista <ul>
        li.appendChild(header);
        li.appendChild(dateEl);
        li.appendChild(textEl);
        list.appendChild(li);
    }
}

searchInput.addEventListener("input", () => {
    render();
});

// ==========================================
// EVENTO: CANCELLA LE NOTE
// ==========================================

// Aggiungiamo un "ascoltatore di eventi" (event listener) al pulsante clrBtn:
// la funzione tra le graffe verrà eseguita ogni volta che l'utente ci clicca sopra
clrBtn.addEventListener("click", () => {

    notes = [];
    // Svuotiamo l'array "notes" assegnandogli un array vuoto.
    // Questo funziona perché "notes" è stato dichiarato con "let" (non "const"),
    // quindi possiamo riassegnargli un nuovo valore.

    localStorage.removeItem("notes");
    // Rimuoviamo la chiave "notes" dal Local Storage del browser.
    // Questo passaggio è FONDAMENTALE: senza di esso, anche se l'array
    // in memoria è vuoto, i dati resterebbero comunque salvati nel browser
    // e ricomparirebbero al prossimo refresh della pagina.

    render();
    // Ridisegniamo la lista sullo schermo. Dato che "notes" ora è vuoto,
    // il ciclo for dentro render() non troverà nulla da disegnare,
    // quindi la lista apparirà vuota.

});

// ==========================================
// EVENTO: AGGIUNGI UNA NUOVA NOTA
// ==========================================

// Quando si clicca sul pulsante "Add Note"
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();  // Legge il titolo scritto e toglie gli spazi inutili
    const note = noteInput.value.trim();    // Legge il testo della nota e toglie gli spazi inutili

    if (title === "" || note === "") return; // Se titolo o nota sono vuoti, non fare nulla ed esci

    // Genera automaticamente la data odierna nel formato del browser (es. 18/8/2026)
    const date = new Date().toLocaleDateString();

    // Crea un nuovo oggetto nota e lo aggiunge in fondo all'array "notes"
    notes.push({ title: title, note: note, date: date });
    
    saveNotes();           // Salva subito l'array aggiornato nel Local Storage
    render();              // Ridisegna la lista con la nuova nota inclusa
    titleInput.value = ""; // Svuota la casella del titolo per il prossimo inserimento
    noteInput.value = "";  // Svuota la casella della nota per il prossimo inserimento
});

// ==========================================
// AVVIO: MOSTRA LE NOTE SALVATE ALL'APERTURA
// ==========================================

// Chiamiamo render() una sola volta, subito, così se ci sono note già salvate
// nel Local Storage vengono mostrate appena la pagina si carica.
render();
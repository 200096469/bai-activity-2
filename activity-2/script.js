// Trova input, button, list e counter nell'HTML in modo da poterli utilizzare.
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

// Un array vuoto per contenere tutte le attività.
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Converti l'array delle attività in una stringa e salvalo nella memoria locale
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Disegna ogni attività sullo schermo dall'array delle attività
function render() {
    taskList.innerHTML = ""; // Cancella la lista prima.

    // Scorri ogni attività tramite l'indice
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document. createElement("li"); // Crea una nuova <li>

        const taskText = document.createElement('span'); // Crea un nuovo <span>
        taskText.textContent = task; // Imposta il testo del <span> sull'attività

        const deleteBtn = document.createElement('span'); // Crea un nuovo <span> per il pulsante di eliminazione
        deleteBtn.textContent = "Delete"; // Imposta il testo del pulsante di eliminazione
        deleteBtn.title = "Delete"; // Imposta il titolo del pulsante di eliminazione

        // Quando Delete viene cliccato, rimuovi l'attività dall'array e ridisegna la lista
        deleteBtn.addEventListener("click", () => {
            tasks.splice(i, 1); // Rimuovi una attività dall'array
            saveTasks();        // Salva la nuova lista
            render();           // Riscrive la lista sul browser
        });

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
    // Aggiorna il contatore con la lunghezza corrente
    count.textContent = tasks.length + " tasks";
}

// Quando si fa clic sul pulsante, aggiungi l'attività digitata all'array
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim(); // Ottieni il valore dell'input e rimuovi gli spazi bianchi

    if (task === "") return; // Non fare nulla se la casella è vuota
    
    tasks.push(task);        // Aggiungi la nuova attività alla fine dell'array
    saveTasks();             // Salva l'array aggiornato nella memoria locale
    render();                // Ridisegna lo schermo
    taskInput.value = "";    // Pulisci la casella di input
});

// Premendo Invio nella casella di input, viene cliccato automaticamente il pulsante Aggiungi
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addBtn.click();
});

// Chiama render() una volta alla fine in modo che il contatore e l'elenco vengano visualizzati
render();
const NUM = 5;

let loadMoreRequests = 1;


async function loadMore(){

    const from = (loadMoreRequests) * NUM;
    const to = from + NUM;

    const response = await fetch(`/notes?from=${from}&to=${to}`);

    const newNotes = await response.text();
  
    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML += newNotes;

    loadMoreRequests++;
}
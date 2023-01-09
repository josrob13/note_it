const NUM = 5;

let loadMoreRequests = 1;

let id = 1;


async function loadMore(){                              // funcion para cargar mas elementos de 5 en 5

    const from = (loadMoreRequests) * NUM;
    const to = from + NUM;

    const response = await fetch(`/notes?from=${from}&to=${to}`);

    const newNotes = await response.text();
  
    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML += newNotes;

    loadMoreRequests++;
}

function CargarInputs(){                                // funcion para cargar inputs y añadir los items a la nota
    $('#items').append(`
			<div id="${id}" class="flex">
                <input style="margin-left:auto" type="text" name="item" class="form-control flat"> 
            </div>
            `);
    id = id + 1;
}

function BorrarInput(id){                                   // funcion para borrar inputs
    let respuesta = window.confirm("Desea borrar el item definitivamente?");
    if (respuesta == true) {
        $(`#items #${id}`).remove();
    }
}

function getKeyByValue(object, value) {                     // funcion para conseguir la llave correspondiente a un valor
    return Object.keys(object).find(key => object[key] === value);
}
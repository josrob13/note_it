let notas = [
    {
        titulo: "Lista de la compra",
        items: "Pan, Leche, Huevos, Queso, etc"
    },
    {
        titulo: "Lista de tareas",
        items: "Limpiar, Barrer, Fregar, etc"
    }
];

let gestor= $("#gestor");
let content = $("#content");
let gestor2= $("#gestor2");


function MostrarOcultarMasInfo(id){
    gestor.toggle();
    $("#"+id).toggle();
}

function MostrarOcultarModificar(id){
    $("#modificar"+id).toggle();
    $("#"+id).toggle();
}

function Eliminar(id){
    $("#"+id).remove();
    $("#nota"+id).remove();
    $("#modificar"+id).remove();
    MostrarOcultarMasInfo(id);
}

function Guardar(id){
    let titulomod = $("#titulomod"+id).val();
    let itemsmod = $("#itemsmod"+id).val();
    
    $("#"+id).empty();
    $("#nota"+id).empty();
    $("#modificar"+id).empty();

    $("#"+id).append(`
        <h2>${titulomod}</h2>
        <p>${itemsmod}</p>
        <button onclick="Eliminar(${id})">Eliminar</button>
        <button onclick="MostrarOcultarModificar(${id})">Modificar</button>
        <button onclick="MostrarOcultarMasInfo(${id})">Volver</button>
    `);
    
    $("#nota"+id).append(`
        ${titulomod}
        <button onclick="MostrarOcultarMasInfo(${id})">Más Info</button>
    `);

    $("#modificar"+id).append(`
        <h2> Modificacion "${titulomod}"</h2>
        <label for="titulomod${id}">Titulo:</label>
        <br>
        <input id="titulomod${id}" type="text" value="${titulomod}">
        <br>
        <label for="itemsmod${id}">Items:</label>
        <br>
        <textarea id="itemsmod${id}" type="text" rows="6">${itemsmod}</textarea>
        <br>
        <button onclick="Guardar(${id})">Guardar</button>
        <button onclick="MostrarOcultarModificar(${id})">Cancelar</button>
    `);

    MostrarOcultarModificar(id);
}

function añadirNota(nota,i){

    content.append(
        `<div id="nota${i}">
            ${nota.titulo}
            <button onclick="MostrarOcultarMasInfo(${i})">Más Info</button>
        </div>`);

    gestor2.append(
        `<div id="${i}" style="display: none">
            <h2>${nota.titulo}</h2>
            <p>${nota.items}</p>
            <button onclick="Eliminar(${i})">Eliminar</button>
            <button onclick="MostrarOcultarModificar(${i})">Modificar</button>
            <button onclick="MostrarOcultarMasInfo(${i})">Volver</button>
        </div>
        
        <div id="modificar${i}" style="display: none">
            <h2> Modificacion "${nota.titulo}"</h2>
            <label for="titulomod${i}">Titulo:</label>
            <br>
            <input id="titulomod${i}" type="text" value="${nota.titulo}">
            <br>
            <label for="itemsmod${i}">Items:</label>
            <br>
            <textarea id="itemsmod${i}" type="text" rows="6">${nota.items}</textarea>
            <br>
            <button onclick="Guardar(${i})">Guardar</button>
            <button onclick="MostrarOcultarModificar(${i})">Cancelar</button>
        </div>`);
}

function nuevaNota(){
    let titulo = $("#titulo").val();
    let items = $("#items").val();

    let nota = {titulo: titulo, items: items};

    notas.push(nota);
    añadirNota(nota,notas.length);
}

for (let i = 0; i < notas.length; i++) {
    let nota = notas[i];
    añadirNota(nota, i+1);
}



console.log(notas);

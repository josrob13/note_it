let notas = [
    {
        titulo: "Lista de la compra",
        items: "Pan, Leche, Huevos, Queso, etc"
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
    notas.splice(id,1);
    MostrarOcultarMasInfo(id);
}

function Guardar(id){
    
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
            <label for="titulo">Titulo:</label>
            <input id="titulo" type="text" placeholder="${nota.titulo}">
            <label for="items">Items:</label>
            <input id="items" type="text" placeholder="${nota.items}">
            <br>
            <button onclick="Guardar(${i})")>Guardar</button>
            <button onclick="MostrarOcultarModificar(${i})">Cancelar</button>
        </div>`);
}

function nuevaNota(){
    let titulo = $("#titulo").val();
    let items = $("#items").val();

    let nota = {titulo: titulo, items: items};

    notas.push(nota);
    añadirNota(nota,notas.length-1);
}

for (let i = 0; i < notas.length; i++) {
    let nota = notas[i];
    añadirNota(nota, i);
}




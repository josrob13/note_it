let notas = [
    {
        titulo: "Lista de la compra",
        items: "Pan, Leche, Huevos, Queso, etc"
    }
];

let gestor= $("#gestor");
let content = $("#content");
let gestor2= $("#gestor2");

function MostrarOcultar(id){
    gestor.toggle();
    $("#"+id).toggle();
}

function Eliminar(id){
    $("#"+id).remove();
    $("#nota"+id).remove();
    notas.splice(id,1);
    gestor.toggle();
}

function añadirNota(nota,i){

    content.append(
        `<div id="nota${i}">
            ${nota.titulo}
            <button onclick="MostrarOcultar(${i})">Más Info</button>
        </div>`);

    gestor2.append(
        `<div id="${i}" style="display: none">
            <h2>${nota.titulo}</h2>
            <p>${nota.items}</p>
            <button onclick="Eliminar(${i})">Eliminar</button>
            <button onclick="MostrarOcultar(${i})">Volver</button>
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

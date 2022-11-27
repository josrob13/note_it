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

let num_divs = $("#gestor #content div").length;
let no_elem = $("#NoElement");

function MostrarOcultarMasInfo(id){
    gestor.toggle();
    $("#"+id).toggle();
}

function Cancelar(id){
    $("#modificar"+id).remove();
    gestor.toggle();
}

function Eliminar(id){
    $("#"+id).remove();
    $("#nota"+id).remove();
    $("#modificar"+id).remove();
    MostrarOcultarMasInfo(id);
    ActualizarNoElem ();
}

function Volver(id){
    $("#modificar"+id).hide();
    $("#"+id).show();
}

function MostrarOcultarModificar(id){
    $("#"+id).toggle();
    let custom = $("#modificar"+id+" h2");
    custom.html(`Modificaci&oacuten de "${notas[id].titulo}"`);
    $("#titulomod"+id).attr("value", notas[id].titulo);
    $("#itemsmod"+id).attr("value", notas[id].items);
    $("#cancel"+id).attr("onclick", "Volver("+id+")");
    $("#cancel"+id).html("Cancelar");
    
    $("#modificar"+id).toggle();
}

function ActualizarNoElem () {
    num_divs = $("#gestor #content div").length;
    no_elem = $("#NoElement");

    if (num_divs > 0) {
        no_elem.hide();
    }else {
        no_elem.show();
    }
}

function PasoIntermedio (id, titulomod, itemsmod) {
    gestor2.append(                                         // crea el paso intermedio que aparecerá cuando se pulse más info
            `<div id="${id}" style="display: none">
            <h2>${titulomod}</h2>
            <p>${itemsmod}</p>
            <button onclick="Eliminar(${id})">Eliminar</button>
            <button onclick="MostrarOcultarModificar(${id})">Modificar</button>
            <button onclick="MostrarOcultarMasInfo(${id})">Volver</button>
            </div>`
        );
}

function PlantillaModificar (i) {
    gestor2.append(                                         // crea interfaz de crear nota, boton de cancelar = borrar; boton de guardar = guarda la plantilla
    `<div id="modificar${i}" style="display: block">
        <h2>Creaci&oacuten de nota</h2>
        <label for="titulomod${i}">Titulo:</label>
        <br>
        <input id="titulomod${i}" type="text">
        <br>
        <label for="itemsmod${i}">Items:</label>
        <br>
        <textarea id="itemsmod${i}" type="text" rows="6"></textarea>
        <br>
        <button id="save${i}" onclick="Guardar(${i})">Guardar</button>
        <button id="cancel${i}" onclick="Cancelar(${i})">Cancelar</button>
    </div>`);
}

function Guardar(id){
    let titulomod = $("#titulomod"+id).val();
    let itemsmod = $("#itemsmod"+id).val();
    let nota = {titulo: titulomod, items: itemsmod};        // recoge la informacion de los inputs

    console.log(id);

    if (id > notas.length-1){                                 // si id > longitud de nota, es decir, si es una nueva nota, crea el menu necesario
        anadirNota(nota, id);                                   // añade la nota a la lista del menu principal

        notas.push(nota);                                       // añade la nota al array de notas
    
        PasoIntermedio(id, titulomod, itemsmod);
    }else {                                                // si no, solo actualiza los valores
        notas[id].titulo = titulomod;
        notas[id].items = itemsmod;
        $("#nota"+id+" span").html(titulomod)
        $("#"+id+" h2").html(titulomod);
        $("#"+id+" p").html(itemsmod);
    }

    ActualizarNoElem ();

    $("#modificar"+id).hide();                              // vuelve al menu principal escondiendo la plantilla de la creacion y mostrando el gestor principal
    gestor.toggle();
}

function anadirNota(nota,i){

    content.append(
        `<div id="nota${i}">
            <span>${nota.titulo}</span>
            <button onclick="MostrarOcultarMasInfo(${i})">M&aacutes Info</button>
        </div>`);

}

function nuevaNota(){                                       // primer paso al pulsar el boton de nuevo elemento

    let i = notas.length;
    gestor.toggle();
    PlantillaModificar(i);
        
}

/* gestor2.append(                                         // crea interfaz de crear nota, boton de cancelar = borrar; boton de guardar = guarda la plantilla
    `<div id="modificar${i}" style="display: block">
        <h2>Creaci&oacuten de nota</h2>
        <label for="titulomod${i}">Titulo:</label>
        <br>
        <input id="titulomod${i}" type="text">
        <br>
        <label for="itemsmod${i}">Items:</label>
        <br>
        <textarea id="itemsmod${i}" type="text" rows="6"></textarea>
        <br>
        <button id="save${i}" onclick="Guardar(${i})">Guardar</button>
        <button id="cancel${i}" onclick="Cancelar(${i})">Cancelar</button>
    </div>`); */

for (let i = 0; i < notas.length; i++) {
    let nota = notas[i];
    anadirNota(nota, i);
    /*gestor2.append(
        `<div id="modificar${i}" style="display: none">
            <h2>Modificacion de "${nota.titulo}"</h2>
            <label for="titulomod${i}">Titulo:</label>
            <br>
            <input id="titulomod${i}" type="text" value="${nota.titulo}">
            <br>
            <label for="itemsmod${i}">Items:</label>
            <br>
            <textarea id="itemsmod${i}" type="text" rows="6">${nota.items}</textarea>
            <br>
            <button id="save${i}" onclick="Guardar(${i})">Guardar</button>
            <button id="cancel${i}" onclick="MostrarOcultarMasInfo(${i})">Volver</button>
        </div>`);*/
    PlantillaModificar(i);
    $("#modificar"+i).hide();
    $("#modificar"+i+" h2").html("Modificacion de "+nota.titulo+"");
    $("#titulomod"+i).attr("value", nota.titulo);
    $("#itemsmod"+i).html(nota.items);
    $("#cancel"+i).attr("onclick", `MostrarOcultarMasInfo${i}`);
    $("#cancel"+i).html("Volver");
    PasoIntermedio(i, nota.titulo, nota.items);
}

ActualizarNoElem ();

console.log(num_divs);
console.log(notas);

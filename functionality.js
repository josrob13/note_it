let notas = [                                               // notas de ejemplo
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
let content = $("#content");                                // variables varias para controlar el contenido del html
let gestor2= $("#gestor2");

let num_divs = $("#gestor #content div").length;            // variables para contar el numero de notas creadas
let no_elem = $("#NoElement");

function MostrarOcultarMasInfo(id){                         // accion del boton mas info
    gestor.toggle();
    $("#"+id).toggle();
}

function Cancelar(id){                                      // accion del boton cancelar (borra el menu creado)
    $("#modificar"+id).remove();
    gestor.toggle();
}

function Eliminar(id){                                      // accion del boton eliminar (borra todos los divs asociados a la nota y actualiza el numero de notas que hay)
    let respuesta = window.confirm("Desea borrar la nota definitivamente?");
    if (respuesta == true) {
        $("#"+id).remove();
        $("#nota"+id).remove();
        $("#modificar"+id).remove();
        MostrarOcultarMasInfo(id);
    }
    ActualizarNoElem ();
}

function Volver(id){                                        // accion del boton volver (esconde el menu modificar y enseña el paso intermedio)
    $("#modificar"+id).hide();
    $("#"+id).show();
}

function MostrarOcultarModificar(id){                       // accion del boton modificar (modifica la plantilla ya creada por nueva nota para que sea una modificacion)
    $("#"+id).toggle();                                     // esconde el paso intermedio
    let custom = $("#modificar"+id+" h2");
    custom.html(`Modificaci&oacuten de "${notas[id].titulo}"`);
    $("#titulomod"+id).attr("value", notas[id].titulo);
    $("#itemsmod"+id).attr("value", notas[id].items);
    $("#cancel"+id).attr("onclick", "Volver("+id+")");
    $("#cancel"+id).html("Cancelar");
    
    $("#modificar"+id).toggle();                            // y muestra la plantilla
}

function ActualizarNoElem () {                              // funcion para ir actualizando el numero de notas creadas y el NoElement
    num_divs = $("#gestor #content div").length;
    no_elem = $("#NoElement");

    if (num_divs > 0) {
        no_elem.hide();
    }else {
        no_elem.show();
    }
}

function PasoIntermedio (id, titulomod, itemsmod) {         // crea el paso intermedio que aparecerá cuando se pulse más info
    gestor2.append(
            `<div id="${id}" style="display: none; margin-top: 250px;">
            <h2>${titulomod}</h2>
            <p>${itemsmod}</p>
            <button class="btn btn-danger" onclick="Eliminar(${id})">Eliminar</button>
            <button class="btn btn-primary" onclick="MostrarOcultarModificar(${id})">Modificar</button>
            <button class="btn btn-default" onclick="MostrarOcultarMasInfo(${id})">Volver</button>
            </div>`
        );
}

function PlantillaModificar (i) {                           // crea interfaz de crear nota, boton de cancelar = borrar; boton de guardar = guarda la plantilla
    gestor2.append(
    `<div id="modificar${i}" style="display: block; margin-top: 150px;">
        <h2>Creaci&oacuten de nota</h2>
        <label for="titulomod${i}">Titulo:</label>
        <br>
        <input id="titulomod${i}" type="text">
        <br>
        <label for="itemsmod${i}">Items:</label>
        <br>
        <textarea id="itemsmod${i}" type="text" rows="6"></textarea>
        <br>
        <button class="btn btn-embossed btn-primary" id="save${i}" onclick="Guardar(${i})">Guardar</button>
        <button class="btn btn-default" id="cancel${i}" onclick="Cancelar(${i})">Cancelar</button>
    </div>`);
}

function Guardar(id){
    let titulomod = $("#titulomod"+id).val();
    let itemsmod = $("#itemsmod"+id).val();
    let nota = {titulo: titulomod, items: itemsmod};        // recoge la informacion de los inputs

    console.log(id);

    if (id > notas.length-1){                               // si id > longitud de nota, es decir, si es una nueva nota, crea el menu necesario
        anadirNota(nota, id);                               // añade la nota a la lista del menu principal

        notas.push(nota);                                   // añade la nota al array de notas
    
        PasoIntermedio(id, titulomod, itemsmod);
    }else {                                                 // si no, solo actualiza los valores
        notas[id].titulo = titulomod;
        notas[id].items = itemsmod;
        $("#nota"+id+" span").html(titulomod)
        $("#"+id+" h2").html(titulomod);
        $("#"+id+" p").html(itemsmod);
    }

    ActualizarNoElem ();                                    // actualiza el NoElement

    $("#modificar"+id).hide();                              // vuelve al menu principal escondiendo la plantilla de la creacion y mostrando el gestor principal
    gestor.toggle();
}

function anadirNota(nota,i){

    content.append(
        `<div id="nota${i}">
            <span>${nota.titulo}</span>
            <button class="btn btn-info" onclick="MostrarOcultarMasInfo(${i})">M&aacutes Info</button>
        </div>`);

}

function nuevaNota(){                                       // primer paso al pulsar el boton de nuevo elemento

    let i = notas.length;
    gestor.toggle();
    PlantillaModificar(i);
        
}

for (let i = 0; i < notas.length; i++) {                    // muestra las notas de ejemplo
    let nota = notas[i];
    anadirNota(nota, i);

    PlantillaModificar(i);
    $("#modificar"+i).hide();
    $("#modificar"+i+" h2").html("Modificacion de "+nota.titulo+"");
    $("#titulomod"+i).attr("value", nota.titulo);
    $("#itemsmod"+i).html(nota.items);
    $("#cancel"+i).attr("onclick", `MostrarOcultarMasInfo${i}`);
    $("#cancel"+i).html("Volver");
    PasoIntermedio(i, nota.titulo, nota.items);
}

ActualizarNoElem ();                                        // actualiza el NoElement para las notas de ejemplo

console.log(num_divs);
console.log(notas);

let notas = [                                               // Notas de ejemplo
    {
        titulo: "Lista de la compra",
        items: [" Pan", " Leche", " Huevos", " Queso", " etc"]
    },
    {
        titulo: "Lista de tareas",
        items: [" Limpiar", " Estudiar", " Entrenar", " etc"]
    }
];

let gestor= $("#gestor");
let content = $("#content");                                // Variables varias para controlar el contenido del html
let gestor2= $("#gestor2");

let num_divs = $("#gestor #content div").length;            // Variables para contar el numero de notas creadas
let no_elem = $("#NoElement");

function MostrarOcultarMasInfo(id){                         // Accion del boton mas info (esconde el gestor1 y muestra la info)
    gestor.toggle();
    $("#"+id).toggle();
}

function Cancelar(id){                                      // Accion del boton cancelar (borra el menu creado y todo lo relacionado con la nota)
    $("#modificar"+id).remove();
    $("#"+id).remove();
    $("#nota"+id).remove();
    gestor.toggle();
}

function Eliminar(id){                                      // Accion del boton eliminar (borra todos los divs asociados a la nota y actualiza el numero de notas que hay)
    let respuesta = window.confirm("Desea borrar la nota definitivamente?");
    if (respuesta == true) {
        $("#"+id).remove();
        $("#nota"+id).remove();
        $("#modificar"+id).remove();
        MostrarOcultarMasInfo(id);
    }
    ActualizarNoElem ();
}

function EliminarSub(id, i){                                // Accion del boton eliminar subelemento (si confirma se borra el apartado del input y se deja como undefined en el array)

    let respuesta = window.confirm("Desea borrar el apartado definitivamente?");
    if (respuesta == true) {
        $("#inputs"+i).remove();
        notas[id].items.slice(i, 1);
    }
}

function Volver(id){                                        // Accion del boton volver (esconde el menu modificar y enseña el paso intermedio)
    $("#modificar"+id).hide();
    $("#"+id).show();
}

function Subelementos (id){                                 // Funcion que borra el menu y mete con append los distintos items en distintos inputs (para actualizarlo con nuevos valores)
    $("#itemsmod"+id).empty();
    for (let i = 0; i < notas[id].items.length; i++) {
        if (notas[id].items[i] != undefined) {
            $("#itemsmod"+id).append(
                `<div class="flex" id="inputs${i}">
                <input style="margin-left:435px" class="form-control flat" id="item${i}" type="text" value="${notas[id].items[i]}">
                <button id="elim${i}" onclick="EliminarSub(${id},${i})" style="margin-right:410px" class="btn btn-g btn-danger">B</button>
                </div>`);
        }
    }
}

function MostrarOcultarModificar(id){                       // Accion del boton modificar (modifica la plantilla ya creada por nueva nota para que sea una modificacion)
    $("#"+id).toggle();                                     // Esconde el paso intermedio
    let custom = $("#modificar"+id+" h2");
    custom.html(`Modificaci&oacuten de "${notas[id].titulo}"`);
    $("#titulomod"+id).attr("value", notas[id].titulo);
    Subelementos(id);                                       // Actualiza los subelementos
    $("#cancel"+id).attr("onclick", "Volver("+id+")");
    $("#cancel"+id).html("Cancelar");
    
    $("#modificar"+id).toggle();                            // Muestra la plantilla
}

function ActualizarNoElem () {                              // Funcion para ir actualizando el numero de notas creadas y el NoElement
    num_divs = $("#gestor #content div").length;
    no_elem = $("#NoElement");

    if (num_divs > 0) {
        no_elem.hide();
    }else {
        no_elem.show();
    }
}

function PasoIntermedio (id, titulomod, itemsmod) {         // Crea el paso intermedio que aparecerá cuando se pulse más info
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

function PlantillaModificar (i) {                           // Crea interfaz de crear nota, boton de cancelar = borrar; boton de guardar = guarda la plantilla
    gestor2.append(
    `<div id="modificar${i}" style="display: block">
        <h2>Creaci&oacuten de nota</h2>
        <label for="titulomod${i}">Titulo:</label>
        <br>
        <input class="form-control flat" id="titulomod${i}" type="text">
        
        <label for="itemsmod${i}">Items:</label>
        <br>
        <div class="container" id="itemsmod${i}">
        </div>

        <div class="container">
            <button onclick="AnadirSubelemento(${i})" class="btn btn-md btn-success">+</button>
        </div>

        <button class="btn btn-embossed btn-primary" id="save${i}" onclick="Guardar(${i})">Guardar</button>
        <button class="btn btn-default" id="cancel${i}" onclick="Cancelar(${i})">Cancelar</button>
    </div>`);
}

function AnadirSubelemento (id) {                           // Funcion para añadir subelemento a la nota, actualizando los valores si la nota ya esta creada o creandola si no se ha creado aun
    $("#itemsmod"+id).append(
            `<div class="flex" id="inputs">
            <input style="margin-left:435px" class="form-control flat" id="item" type="text" value="">
            <button id="elim" onclick="EliminarSub(${id})" style="margin-right:410px" class="btn btn-g btn-danger">B</button>
            </div>`);
    
    if (notas[id] != undefined) {
        $("#itemsmod"+id+" #item").attr("id", "item"+notas[id].items.length);
        $("#itemsmod"+id+" #inputs").attr("id", "inputs"+notas[id].items.length);
        $("#itemsmod"+id+" #elim").attr("id", "elim"+notas[id].items.length);
        $("#itemsmod"+id+" #elim"+notas[id].items.length).attr("onclick", "EliminarSub("+id+","+notas[id].items.length+")");
        notas[id].items.push($("#item"+notas[id].items.length).val());
    }else {
        notas.push({titulo: $("#titulomod"+id).val(), items: [$("#item").val()]});
        $("#itemsmod"+id+" #item").attr("id", "item0");
        $("#itemsmod"+id+" #inputs").attr("id", "inputs0");
        $("#itemsmod"+id+" #elim").attr("id", "elim0");
        $("#itemsmod"+id+" #elim0").attr("onclick", "EliminarSub("+id+",0)");
        PasoIntermedio(id, $("#titulomod"+id).val(), notas[id].items);
        anadirNota(notas[id], id);
    }
}

function Guardar(id){                                       // Funcion para guardar la nota creada
    let titulomod = $("#titulomod"+id).val();
    let itemsmod = [];

    if (notas[id] !== undefined) {
        for (let i = 0; i < notas[id].items.length; i++) {
            itemsmod.push($("#item"+i).val());
        }
    }

    let nota = {titulo: titulomod, items: itemsmod};        // Recoge la informacion de los inputs

    if (id > notas.length-1){                               // Si id > longitud de nota - 1, es decir, si es una nueva nota, crea el menu necesario

        if (notas[id] == undefined) {
            anadirNota(nota, id);                           // Añade la nota a la lista del menu principal
            notas.push(nota);                               // Añade la nota al array de notas
            PasoIntermedio(id, titulomod, itemsmod);
        }
    
    }else {                                                 // Si no, solo actualiza los valores
        notas[id].titulo = titulomod;
        notas[id].items = itemsmod;
        $("#nota"+id+" span").html(titulomod)
        $("#"+id+" h2").html(titulomod);
        $("#"+id+" p").html(itemsmod);
    }

    ActualizarNoElem ();                                    // Actualiza el NoElement

    $("#modificar"+id).hide();                              // Vuelve al menu principal escondiendo la plantilla de la creacion y mostrando el gestor principal
    gestor.toggle();
}

function anadirNota(nota,i){                                // Funcion que añade la nota al menu principal

    content.append(
        `<div id="nota${i}">
            <span>${nota.titulo}</span>
            <button class="btn btn-info" onclick="MostrarOcultarMasInfo(${i})">M&aacutes Info</button>
        </div>`);

}

function nuevaNota(){                                       // Primer paso al pulsar el boton de nuevo elemento

    let i = notas.length;
    gestor.toggle();
    PlantillaModificar(i);
        
}

for (let i = 0; i < notas.length; i++) {                    // Muestra las notas de ejemplo
    let nota = notas[i];
    anadirNota(nota, i);

    PlantillaModificar(i);
    $("#modificar"+i).hide();
    $("#modificar"+i+" h2").html("Modificacion de "+nota.titulo+"");
    $("#titulomod"+i).attr("value", nota.titulo);
    $("#cancel"+i).attr("onclick", `MostrarOcultarMasInfo${i}`);
    $("#cancel"+i).html("Volver");
    PasoIntermedio(i, nota.titulo, nota.items);
}

ActualizarNoElem ();                                        // Actualiza el NoElement para las notas de ejemplo

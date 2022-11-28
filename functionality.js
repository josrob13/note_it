// VARIABLES

let notas = [                                               // Notas como ejemplo
    {
        titulo: "Lista de la compra",
        items: "Pan, Leche, Huevos, Queso, etc"
    },
    {
        titulo: "Lista de tareas",
        items: "Limpiar, Estudiar, Entrenar, etc"
    }
];

let gestor= $("#gestor");
let content = $("#content");                                // Variables para simplificar el código
let gestor2= $("#gestor2");

let num_divs = $("#gestor #content div").length;            // Variables para contar el número de elementos
let no_elem = $("#NoElement");
//---------------------------------------------------------------------------------------------------------------------

//FUNCIONES

function MostrarOcultarMasInfo(id){                         // Muestra o oculta el gestor principal
    gestor.toggle();
    $("#"+id).toggle();
}

function Cancelar(id){                                      // Borra la nota que se iba a modificar y muestra el gestor
    $("#modificar"+id).remove();
    gestor.toggle();
}

function Eliminar(id){                                      // Si el usuario acepta la alerta se borra la nota seleccionada y se actualiza el número de elementos
    let respuesta = window.confirm("Desea borrar la nota definitivamente?");
    if (respuesta == true) {
        $("#"+id).remove();
        $("#nota"+id).remove();
        $("#modificar"+id).remove();
        MostrarOcultarMasInfo(id);
    }
    ActualizarNoElem ();
}

function Volver(id){                                        // Vuelve a mostrar los elementos de la nota seleccionada
    $("#modificar"+id).hide();
    $("#"+id).show();
}

function MostrarOcultarModificar(id){                       // Muestra o oculta la modificación de la nota
    let custom = $("#modificar"+id+" h2");
    custom.html(`Modificaci&oacuten de "${notas[id].titulo}"`);
    $("#titulomod"+id).attr("value", notas[id].titulo);
    $("#itemsmod"+id).attr("value", notas[id].items);
    $("#cancel"+id).attr("onclick", "Volver("+id+")");
    $("#cancel"+id).html("Cancelar");

    $("#modificar"+id).toggle();                         
}

function ActualizarNoElem () {                              // Muestra o oculta "Sin elementos", dependiendo del número de elementos
    num_divs = $("#gestor #content div").length;
    no_elem = $("#NoElement");

    if (num_divs > 0) {
        no_elem.hide();
    }else {
        no_elem.show();
    }
}

function PasoIntermedio (id, titulomod, itemsmod) {         // Crea el código HTML de la nota nueva
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

function PlantillaModificar (i) {                           // Crea el código HTML para modificar la nota nueva
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
    let nota = {titulo: titulomod, items: itemsmod};        // Recoge la información de los inputs del HTML y crea la nota

    if (id > notas.length-1){                               
        notas.push(nota);                                   // Añade la nota al array "notas"
        PasoIntermedio(id, titulomod, itemsmod);
        
    } else {                                                 // Si no se cumple la condicion, actualiza los valores
        notas[id].titulo = titulomod;
        notas[id].items = itemsmod;
        $("#nota"+id+" span").html(titulomod)
        $("#"+id+" h2").html(titulomod);
        $("#"+id+" p").html(itemsmod);
    }

    ActualizarNoElem ();                                   

    $("#modificar"+id).hide();                              // Muestra el gestor principal
    gestor.toggle();
}

function anadirNota(nota,i){                                // Crea el códgio HTML de la nota creada en el gestor principal
    content.append(
        `<div id="nota${i}">
            <span>${nota.titulo}</span>
            <button class="btn btn-info" onclick="MostrarOcultarMasInfo(${i})">M&aacutes Info</button>
        </div>`);
}

function nuevaNota(){                                       // Muestra la creación de la nota y la añade al listado
    let j = notas.length;
    gestor.toggle();
    PlantillaModificar(j);       
}
//------------------------------------------------------------------------------------------------------------------------------
// MAIN

for (let i = 0; i < notas.length; i++) {                    // Carga el array "notas" en la página web
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

ActualizarNoElem ();                                        // Actualiza el número de elementos por si acaso es necesario mostrar "Sin Elementos"
//--------------------------------------------------------------------------------------------------------------------------------
let notas = [
    {
        titulo: "Lista de la compra",
        items: "Pan, Leche, Huevos, Queso, etc"
    }
];

function MasInfo(idNota){

    let masInfoNota = document.getElementById(idNota);
    let display = masInfoNota.style.display;

    if (display === "none"){
        masInfoNota.style.display = "block";
    } else {
        masInfoNota.style.display = "none";
    }
}


function añadirNotaDOM(nota,i){
    let div = document.createElement("div");
    content.appendChild(div);

    let TituloDOM = document.createElement("p");
    div.appendChild(TituloDOM);

    TituloDOM.textContent = nota.titulo + ' ';

    let button = document.createElement("button");
    TituloDOM.appendChild(button);
    button.textContent = "MÁS INFO";
    button.onclick = function(){MasInfo(i)};

    let ItemsDOM = document.createElement("p");
    div.appendChild(ItemsDOM);

    ItemsDOM.style.display = "none";
    ItemsDOM.id = i;
    ItemsDOM.textContent = nota.items + ' ';

    let button2 = document.createElement("button");
    ItemsDOM.appendChild(button2);
    button2.textContent = "ELIMINAR";
    button2.onclick = function(){div.remove()};

}

function añadirNota(nuevaNota){

    notas.push(nuevaNota);

    añadirNotaDOM(nuevaNota,notas.length-1);
}

function nuevaNota(){

    let tituloInput = document.getElementById("titulo");
    let titulo = tituloInput.value;
    

    let itemsInput = document.getElementById("items");
    let items = itemsInput.value;
    

    let nota = {titulo: titulo, items: items};

    añadirNota(nota);

}


let content = document.getElementById("content");


for (let i = 0; i < notas.length; i++) {

    let nota = notas[i];

    añadirNotaDOM(nota, i);
}
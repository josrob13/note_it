const notes = new Map();
export let nextId = 0;

//                      FUNCIONES PARA LAS NOTAS

export function addNote(note) {
    let id = nextId++;
    note.id = id.toString();
    notes.set(note.id, note);
}

export function getNotes(from, to) {
    let values = [...notes.values()];
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}

export function updateNote(id, title, items) {
    notes.get(id).title = title;
    notes.get(id).items = items;
}

export function deleteNote(id){
    notes.delete(id);
}

export function getNote(id){
    //console.log(notes);
    let nota_id = notes.get(id);
    //console.log(nota_id);
    let itemsarray = new Array();
    let noteitems = [...nota_id.items];
    //console.log(noteitems);
    for (let index = 0; index < noteitems.length; index++) {
        itemsarray[index] = {item:noteitems[index][1]};
    }
    return {title: nota_id.title, items: itemsarray, id:id}
}

//                          FUNCIONES PARA LOS ITEMS
/*
export function addItem(item, note_id) {
    let id = nextItemId++;
    item.id = id.toString();
    notes.get(note_id).items.set(id, item);
}

export function getItems(from, to, note_id) {
    let values = [...notes.get(note_id).items.values()];
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}

export function deleteItem(id, note_id){
    notes[note_id].items.delete(id);
}

export function getItem(id, note_id){
    return notes[note_id].items.get(id);
}

export function getItemValues (note_id) {
    let values_items = Object.keys(notes[note_id].items).map(function(key){
        return items[key];
    });
    return values_items;
}
*/
//                          FUNCION PARA CARGAR LAS NOTAS INICIALES

export function loadSampleData() {

    //addNote({title: "Weekly grocery list", items: "Rice, Beans, Meat, Vegetables, Fruit"});
    addNote({title: "Weekly grocery list", items: new Map([[0,"Rice"],[1,"Beans"],[2,"Meat"],[3,"Vegetables"],[4,"Fruit"]])});
    addNote({title: "Pending tasks", items: new Map([[0,"Call insurance company"],[1,"Email office"],[2,"Book flight for vacation"]])});
    addNote({title: "Weekend shopping list", items: new Map([[0,"Beer"],[1,"Pizza"],[2,"Popcorn"],[3,"DVD movies"]])});
    addNote({title: "Exercise routine", items: new Map([[0,"Run in the morning"],[1,"Lift weights in the afternoon"],[2,"Do yoga at night"]])});
    addNote({title: "Recipes to cook this week", items: new Map([[0,"Vegetable soup"],[1,"Curry chicken"],[2,"Fried rice"]])});
    addNote({title: "Books to read", items: new Map([[0,"To Kill a Mockingbird"],[1,"1984"],[2,"The Great Gatsby"]])});
    addNote({title: "Movies to watch", items: new Map([[0,"Fight Club"],[1,"Blade Runner"],[2,"The Lord of the Rings"]])});
    addNote({title: "Ideas for next trip", items: new Map([[0,"Visit the Grand Canyon"],[1,"Go on a bike tour through Napa Valley"],[2,"Camp in Yosemite"]])});
    addNote({title: "Birthday gifts", items: new Map([[0,"A book for my sister"],[1,"A card for my grandmother"],[2,"A board game for my friend"]])});
    addNote({title: "Work projects", items: new Map([[0,"Develop a new website"],[1,"Design a marketing campaign"],[2,"Write research reports"]])});
    addNote({title: "Garden to-do list", items: new Map([[0,"Plant new flowers"],[1,"Pull weeds"],[2,"Water plants"]])});
    addNote({title: "Weekly meal plan", items: new Map([[0,"Monday: Spaghetti and meatballs"],[1,"Tuesday: Grilled chicken and vegetables"],[2,"Wednesday: Salmon and quinoa"],[3,"Thursday: Beef stir-fry"],[4,"Friday: Taco night"]])});
    addNote({title: "Gift ideas for Christmas", items: new Map([[0,"A scarf for my mom"],[1,"A book for my dad"],[2,"A puzzle for my sister"]])});
    addNote({title: "Home improvement projects", items: new Map([[0,"Paint living room"],[1,"Fix leaking faucet"],[2,"Install new light fixtures"]])});
    addNote({title: "Upcoming appointments", items: new Map([[0,"Dentist on Monday at 10am"],[1,"Haircut on Wednesday at 2pm"],[2,"Doctor on Friday at 9am"]])});
    addNote({title: "Bucket list", items: new Map([[0,"Skydiving"],[1,"Visit all seven continents"],[2,"Learn a new language"]])});
    addNote({title: "Wedding to-do list", items: new Map([[0,"Book venue"],[1,"Choose wedding party"],[2,"Order invitations"]])});
    addNote({title: "Financial goals", items: new Map([[0,"Save for a down payment on a house"],[1,"Pay off credit card debt"],[2,"Start a retirement fund"]])});
    addNote({title: "Travel packing list", items: new Map([[0,"Passport"],[1,"Clothes"],[2,"Toiletries"],[3,"Medications"]])});
    addNote({title: "Spring cleaning tasks", items: new Map([[0,"Declutter closets"],[1,"Wash windows"],[2,"Deep clean carpets"]])});
}

loadSampleData();

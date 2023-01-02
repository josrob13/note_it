const notes = new Map();
let nextId = 0;

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

export function deleteNote(id){
    notes.delete(id);
}

export function getNote(id){
    return notes.get(id);
}

export function loadSampleData() {

    addNote({title: "Weekly grocery list", items: "Rice, Beans, Meat, Vegetables, Fruit"});
    addNote({title: "Pending tasks", items: "Call insurance company, Email office, Book flight for vacation"});
    addNote({title: "Weekend shopping list", items: "Beer, Pizza, Popcorn, DVD movies"});
    addNote({title: "Exercise routine", items: "Run in the morning, Lift weights in the afternoon, Do yoga at night"});
    addNote({title: "Recipes to cook this week", items: "Vegetable soup, Curry chicken, Fried rice"});
    addNote({title: "Books to read", items: "To Kill a Mockingbird, 1984, The Great Gatsby"});
    addNote({title: "Movies to watch", items: "Fight Club, Blade Runner, The Lord of the Rings"});
    addNote({title: "Ideas for next trip", items: "Visit the Grand Canyon, Go on a bike tour through Napa Valley, Camp in Yosemite"});
    addNote({title: "Birthday gifts", items: "A book for my sister, A card for my grandmother, A board game for my friend"});
    addNote({title: "Work projects", items: "Develop a new website, Design a marketing campaign, Write research reports"});
    addNote({title: "Garden to-do list", items: "Plant new flowers, Pull weeds, Water plants"});
    addNote({title: "Weekly meal plan", items: "Monday: Spaghetti and meatballs, Tuesday: Grilled chicken and vegetables, Wednesday: Salmon and quinoa, Thursday: Beef stir-fry, Friday: Taco night"});
    addNote({title: "Gift ideas for Christmas", items: "A scarf for my mom, A book for my dad, A puzzle for my sister"});
    addNote({title: "Home improvement projects", items: "Paint living room, Fix leaking faucet, Install new light fixtures"});
    addNote({title: "Upcoming appointments", items: "Dentist on Monday at 10am, Haircut on Wednesday at 2pm, Doctor on Friday at 9am"});
    addNote({title: "Bucket list", items: "Skydiving, Visit all seven continents, Learn a new language"});
    addNote({title: "Wedding to-do list", items: "Book venue, Choose wedding party, Order invitations"});
    addNote({title: "Financial goals", items: "Save for a down payment on a house, Pay off credit card debt, Start a retirement fund"});
    addNote({title: "Travel packing list", items: "Passport, Clothes, Toiletries, Medications"});
    addNote({title: "Spring cleaning tasks", items: "Declutter closets, Wash windows, Deep clean carpets"});
}

loadSampleData();
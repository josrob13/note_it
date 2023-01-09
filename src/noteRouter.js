import express from 'express';
import * as noteService from './noteService.js';
const router = express.Router();

router.get('/', (req,res) => {
    
    const notes = noteService.getNotes(0,5);

    res.render('index', { 
        notes: notes
    });
});

router.get('/notes', (req, res) => {

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const notes = noteService.getNotes(from,to);

    res.render('notes', {
        notes: notes
    });
});

router.post('/note/new', (req, res) => {

    let title = req.body.title;
    let items = new Map();

    console.log(items);
    console.log(typeof(noteService.nextId));
    console.log(noteService.notes);

    //let lala = noteService.getNote(0);
    //console.log(lala.title);
    if (typeof(req.body.item) == 'string') {
        items.set(0, req.body.item);
    } else {
        for (let i = 0; i < req.body.item.length; i++) {
            let item = req.body.item[i];
    
            console.log(noteService.nextId-1);
            console.log(item); // Muestra cada elemento de la matriz
    
            items.set(i, item);
        }
    }

    console.log(items);
    console.log(req.body.item);
    console.log(typeof(req.body.item));
    
    noteService.addNote({title, items});

    res.render('saved_note');
});

router.post('/note/:id/modify', (req, res) => {

    let title = req.body.title;
    let items = new Map();

    /*console.log(items);
    console.log(typeof(noteService.nextId));
    console.log(noteService.notes);*/

    //let lala = noteService.getNote(0);
    //console.log(lala.title);
    if (typeof(req.body.item) == 'string') {
        items.set(0, req.body.item);
    } else {
        for (let i = 0; i < req.body.item.length; i++) {
            let item = req.body.item[i];
    
            console.log(noteService.nextId-1);
            console.log(item); // Muestra cada elemento de la matriz
    
            items.set(i, item);
        }
    }

    /*console.log(items);
    console.log(req.body.item);
    console.log(typeof(req.body.item));

    console.log(title);
    console.log(items);*/

    noteService.updateNote(req.params.id, title, items);
    res.render('saved_note');

});

router.get('/note/:id/modify', (req, res) => {
    
    //console.log(req.params.id);
    let note = noteService.getNote(req.params.id);
    /*console.log(note);
    console.log(typeof(note.items));
    console.log(note.items[0]);*/
    res.render('modify_note', note);
});

router.get('/note/:id', (req, res) => {
    
    //console.log(req.params.id);
    let note = noteService.getNote(req.params.id);
    console.log(note);
    console.log(typeof(note.items));
    console.log(note.items[0]);
    res.render('show_note', note);
});

router.get('/note/:id/delete', (req, res) => {
    
    noteService.deleteNote(req.params.id);
    res.render('deleted_note');
});

router.get('/functionality.js', (req, res) => {
    res.sendFile(__dirname + '/functionality.js');
  });

export default router;
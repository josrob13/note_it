import express from 'express';
import * as noteService from './noteService.js';
const router = express.Router();

router.get('/', (req,res) => {                          // hacemos un get de la raiz da la pagina para obtener las notas de 0 a 5
    
    const notes = noteService.getNotes(0,5);

    res.render('index', { 
        notes: notes
    });
});

router.get('/notes', (req, res) => {                    // conseguimos las notas de tanto a tanto y renderizamos notes.mustache con las notas obtenidas

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const notes = noteService.getNotes(from,to);

    res.render('notes', {
        notes: notes
    });
});

router.post('/note/new', (req, res) => {                // post del formulario

    let title = req.body.title;
    let items = new Map();

    if (typeof(req.body.item) == 'string') {
        items.set(0, req.body.item);
    } else {
        for (let i = 0; i < req.body.item.length; i++) {
            let item = req.body.item[i];
            items.set(i, item);
        }
    }
    
    noteService.addNote({title, items});
    res.render('saved_note');
});

router.post('/note/:id/modify', (req, res) => {                 //post del modificar

    let title = req.body.title;
    let items = new Map();

    if (typeof(req.body.item) == 'string') {
        items.set(0, req.body.item);
    } else {
        for (let i = 0; i < req.body.item.length; i++) {
            let item = req.body.item[i];
            items.set(i, item);
        }
    }
    noteService.updateNote(req.params.id, title, items);
    res.render('saved_note');

});

router.get('/note/:id/modify', (req, res) => {              // get de la ventana de la nota correspondiente
    
    let note = noteService.getNote(req.params.id);
    res.render('modify_note', note);
});

router.get('/note/:id', (req, res) => {                 // renderizar show note con la nota obtenida con el getNote

    let note = noteService.getNote(req.params.id);
    res.render('show_note', note);
});

router.get('/note/:id/delete', (req, res) => {          // get para el delete de una nota
    
    noteService.deleteNote(req.params.id);
    res.render('deleted_note');
});

router.get('/functionality.js', (req, res) => {         // get para el sendfile
    res.sendFile(__dirname + '/functionality.js');
  });

export default router;
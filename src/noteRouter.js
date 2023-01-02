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

    let {title, items} = req.body;
    noteService.addNote({title, items});
    res.render('saved_note');
});

router.get('/note/:id', (req, res) => {
    
    let note = noteService.getNote(req.params.id);
    res.render('show_note', {note});
});

router.get('/note/:id/delete', (req, res) => {
    
    noteService.deleteNote(req.params.id);
    res.render('deleted_note');
});

export default router;
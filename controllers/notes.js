// NOTES CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Note = require('../models/queries').notes;

// routes
router.get('/', (req, res) => {
  db.any(Note.all)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'found all notes' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not get all notes' })
    }); 
});

router.post('/', (req, res) => {
  db.one(Note.add, req.body)
    .then(data => {
      res.status(201).json({ status: 'success', data: data, message: 'created a note!' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not create note' })
    });
});

module.exports = router;

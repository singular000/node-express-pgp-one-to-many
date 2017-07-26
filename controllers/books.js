// BOOKS CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Book = require('../models/index').books;
const Note = require('../models/index').notes;

// routes
router.get('/', (req, res) => {
  db.any(Book.all)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'found all books' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not get all books' })
    }); 
});

// chained queries
router.get('/:id', async (req, res) => {
  try {
    const book = await db.one(Book.find, req.params.id);
    book.notes = await db.any(Note.find, req.params.id);
    res.status(201).json({ status: 'success', data: book, message: 'found a book' })
  } catch(err) {
    res.status(400).json({ status: 'failure', data: err.message, message: 'could not get book' })
  }
});

router.post('/', (req, res) => {
  db.one(Book.add, req.body)
    .then(data => {
      res.status(201).json({ status: 'success', data: data, message: 'created book' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not create book' })
    }); 
});

router.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  db.one(Book.update, req.body)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'updated book' })
    })
    .catch(err => {
      res.status(422).json({ status: 'failed', err: err.message, message: 'could not update book' })
    }); 
});

router.delete('/:id', (req, res) => {
  db.one(Book.remove, req.params.id)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'deleted book' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not delete book' })
    }); 
});

module.exports = router;

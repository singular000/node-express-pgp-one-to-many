# Node, Express, Postgres
## One to many - RESTFul API

"Books App" 📚

[single-model]()

[many-to-many]()

differences from single model:
removed notes column from books
added notes model/schema


## setup

Run create db file in bash

```
$ psql -f db/create_db.sql
```

Run schema file in bash

```
$ psql books_app_api -f models/books/schema.sql
```


## multiple queries: async / await

* books show route uses **async / await** for retrieving relational data with multiple queries (and then packaging it inside the book object). 

* In production multiple queries should done with a pg-promise **task**, but it is a little verbose and abstract when being introduced to pg-promise:

```javascript
router.get('/:id'. (req, res) => {
  db.task(async t => {
    const book = await t.one(Book.find, req.params.id);
    book.notes = await t.any(Note.all, req.params.id);
    return book;
  })
  .then(data => {
    res.status(200).json({ status: 'success', data, message: 'found a book' });
  })
  .catch(err => {
    res.status(400).json({ status: 'failure', data: err.message, message: 'could not find book' });
  });
});
```

Therefore, for multiple queries I stick with basic awaits within a try/catch:

```javascript
router.get('/:id', async (req, res) => {
  try {
    const book = await db.one(Book.find, req.params.id);
    book.notes = await db.any(Note.all, req.params.id);
    res.status(200).json({ status: 'success', data: book, message: 'found a book' });
  } catch (err) {
    res.status(400).json({ status: 'failure', data: err.message, message: 'could not find book' })
  }
});
```

## CONSTRAINTS

A Note has a **constraint** of **REFERENCES** to its parent book. This means if a user attempts to delete a book, the note would be orphaned, therefore an error kicks up denying the deletion of the book.

Because of this, a Note also has an **ON DELETE CASCADE**, which mean that instead of getting an error, all related notes will also be deleted in order to avoid orphans.

_Deleting a book will also delete all associated notes_


## ENDPOINTS with relational data

`/books/1`

show a single book -- with an array of all notes related to the book.

![](https://i.imgur.com/BZaWqfg.png)

`/notes`

show all notes - each note is joined with the book to which it belongs

![](https://i.imgur.com/C0CFXmZ.png)



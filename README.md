# Node, Express, Postgres
## One to many - RESTFul API

"Books App" 📚

[single-model]()

[many-to-many]()

differences from single model:
removed notes column from books
added notes model/schema


## setup

Clone repo

Create db from bash

```
$ psql -f db/create_db.sql
```

Create books table by running schema file from bash

```
$ psql books_multi_app_api -f models/books/schema.sql
```

Create notes table

```
$ psql books_multi_app_api -f models/notes/schema.sql
```

## CONSTRAINTS

A Note has a **constraint** of **REFERENCES** to its parent book. This means if a user attempts to delete a book, the note would be orphaned, therefore an error kicks up denying the deletion of the book.

Because of this, a Note also has an **ON DELETE CASCADE**, which mean that instead of getting an error, all related notes will also be deleted in order to avoid orphans.

_Deleting a book will also delete all associated notes_


## ENDPOINTS with relational data

`/books/1`

show a single book -- with an array of all notes related to the book.

![](https://i.imgur.com/BZaWqfg.png)

![](https://i.imgur.com/AmuISV3.png)

`/notes`

show all notes - each note is joined with the book to which it belongs

![](https://i.imgur.com/C0CFXmZ.png)

![](https://i.imgur.com/voLumEh.png)



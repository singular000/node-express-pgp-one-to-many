SELECT *
FROM notes
JOIN books
ON notes.book_id = books.id;

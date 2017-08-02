// SQL provider file

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  books: {
    all: sql('books/all.sql'),
    find: sql('books/find.sql'),
    add: sql('books/add.sql'),
    update: sql('books/update.sql'),
    remove: sql('books/remove.sql')
  },
  notes: {
    all: sql('notes/all.sql'),
    search: sql('notes/search.sql'),
    add: sql('notes/add.sql'), 
    update: sql('notes/update.sql'),
    remove: sql('notes/remove.sql')
  }
}

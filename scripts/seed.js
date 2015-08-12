var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('wiki.db');

db.run('INSERT INTO content (title, article, user_id) VALUES (?,?,?)',
  'What is this?',
  'This is a wiki',
  1,
  function(err) {
  if (err) {
    throw err;
  }
});

db.run('INSERT INTO users (username) VALUES (?)', 
  'Miles', 
  function(err) {
  if (err) {
    throw err;
  }
});
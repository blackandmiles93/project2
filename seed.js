var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('wiki.db');

db.run('INSERT INTO content (title, article, user_id) VALUES (?,?,?)',
  'The French Revolution',
  "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
  1,
  function(err) {
  if (err) {
    throw err;
  }
});

db.run('INSERT INTO users (username, user_email) VALUES (?,?)', 
  'Exquisitine Buble-Schwinslow',
  'mperkins1993@gmail.com', 
  function(err) {
  if (err) {
    throw err;
  }
});
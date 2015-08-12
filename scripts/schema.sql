DROP TABLE IF EXISTS articles
DROP TABLE IF EXISTS users

CREATE TABLE articles (
  id INTEGER PRIMARY KEY autoincrement,
  title TEXT,
  article TEXT
  FOREIGN KEY(author_id) REFERENCES users(id)
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY autoincrement,
  username TEXT
);

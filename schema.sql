DROP TABLE IF EXISTS content;
DROP TABLE IF EXISTS users;

PRAGMA foreign_keys = ON;

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY autoincrement,
  username TEXT,
  user_email TEXT
);
CREATE TABLE content (
  content_id INTEGER PRIMARY KEY autoincrement,
  title TEXT,
  article TEXT,
  user_id INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

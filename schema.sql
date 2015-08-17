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
  user_email TEXT,
  username TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(user_email) REFERENCES users(user_email),
  FOREIGN key(username) REFERENCES users(username)
);

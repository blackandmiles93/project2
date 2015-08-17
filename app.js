var express = require('express');
var app = express();
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('wiki.db');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var marked = require('marked');

var sendgrid = require('sendgrid')(api_key);

app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

// reroute to main page
app.get('/', function(req, res) {
  res.redirect('/VCP');
});

// rendering the front page which lists all articles
app.get('/VCP', function(req, res) {
  db.all('SELECT * FROM content', function(err, display) {
    if (err) throw err;
    else {
      res.render('example.ejs', {display: display});
    }
  });
});

app.get('/VCP/results', function(req, res) {
  // console.log(req.query)
  db.all('SELECT * FROM content', function(err, search) {
    if (err) throw err;
    else {
      res.render('search.ejs', {results: search});
    }
  });
}); 

// rendering the page to input a new article
app.get('/VCP/new', function(req, res) {
  db.all('SELECT * FROM content, users', function(err, rows) {
    res.render('new.ejs', {users: rows});
  })
});

// Posting the new article and information and storing it in the wiki.db (database)
app.post('/VCP/new', function(req, res) {
  db.run('INSERT INTO content (user_email, title, article, user_id) VALUES (?,?,?,?)', req.body.user_email, req.body.title, req.body.article, req.body.user_id, function(err) {
    if (err) throw err;
    else {
      res.redirect('/VCP');
      console.log('content added');
    }
  });
});

// this shows the full article and content with name and date that it was edited
app.get('/VCP/:id', function(req, res) {
  db.get('SELECT content.*, users.username FROM content INNER JOIN users ON users.user_id = content.user_id WHERE content_id = ?', parseInt(req.params.id), function (err, row) {
    if (err) throw err;
    else {
      // console.log(typeof marked(row.article));
      res.render('show.ejs', {article: row, markdown: marked(row.article)});
    }
  });
});

app.get('/VCP/:id/edit', function(req, res) {
  db.get('SELECT * FROM content WHERE content_id = ?', parseInt(req.params.id), function(err, info) {
      if (err) {
      throw err;
    }
    else {
      res.render('edit.ejs', {content: info});
    }
  });
});

app.put('/VCP/:id', function(req, res) {
  db.run('UPDATE content SET title = ?, article = ? WHERE content_id = ?', req.body.title, req.body.article, req.params.id, function(err) {
    if (err) throw err;
    else {
      console.log('content updated');
      res.redirect('/VCP');
      db.get('SELECT users.user_email FROM users INNER JOIN content ON users.user_id = content.user_id WHERE content.content_id = ?', req.body.user_id, function(err, row) {
        var email = new sendgrid.Email({
          to: row.user_email,
          from: 'mperkins1993@gmail.com',
          subject: 'A Vitriolic Cherry Pitt Update',
          text: "Hi!\n You're article, has been edited! Please check the edits to see what has been done to it!\n Thanks for contributing to the wiki!\n -Admin"
        });
        sendgrid.send(email, function(err, json) {
          if (err) { 
            return console.error(err); 
          }
          else {
            console.log(json);
          }
        });
      });
    }
  });
});

app.delete('/VCP/:id', function(req, res) {
  db.run('DELETE FROM content WHERE content_id = ?', parseInt(req.params.id), function(err) {
    if (err) throw err;
    else {
        res.redirect('/VCP');
        console.log('content deleted');   
    }
  });
});

app.listen(3000, function(){
    console.log('listening on port 3000!');
});


var express = require('express');
var app = express();
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('wiki.db');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var marked = require('marked');

app.use(express.static('/Users/mperkins/dev/wdi/diana_students/projects/project2/stylesheets'));
app.use(express.static("https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.css"));
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');

app.get('/', function(req, res) {
	res.redirect('/VCP');
});

// app.get('/VCP/search', function(req, res) {
//   res.render('search.ejs');
// });

app.get('/VCP', function(req, res) {
  db.all('SELECT * FROM content', function(err, display) {
    if (err) throw err;
    else {
      res.render('index.ejs', {display: display});
    }
  });
});

app.get('/VCP/new', function(req, res) {
  db.all("SELECT * FROM users", function(err, rows){
  res.render('new.ejs', {users: rows});
  })
});

app.post('/VCP/new', function(req, res) {
  db.run('INSERT INTO content (title, article, user_id) VALUES (?,?,?)', req.body.title, req.body.article, req.body.user_id, function(err) {
    if (err) throw err;
    else {
      res.redirect('/VCP');
      console.log('content added');
    }
  });
});

app.get('/VCP/:id', function(req, res) {
  db.get('SELECT content, users.username FROM content INNER JOIN users ON users.user_id = content.user_id WHERE content_id = ?', req.params.id, function (err, row) {
    if (err) {
      throw err;
    } else {
      console.log("this is " + row)
      res.render('show.ejs', {article: row});
    }
  });
});




// app.get('/VCP/:id/edit', function(req, res) {
//   db.get('SELECT * FROM content WHERE content_id = ?', parseInt(req.params.id), function(err, content) {
//     if (err) {
//       throw err;
//     }
//     else {
//       res.render('edit.ejs', {content: content});
//     }
//   });
// });

// app.put('/VCP/:id/edit', function(req, res) {
//   db.run('UPDATE content SET title = ?, article = ? WHERE content_id = ?', req.body.title, req.body.article, req.params.id, function(err) {
//     if (err) throw err;
//     else {
//       console.log('content updated');
//       res.redirect('/VCP');
//     }
//   });
// });

// app.delete('/VCP/:id', function(req, res) {
//   db.run('DELETE FROM content WHERE content_id = ?', parseInt(req.params.id), function(err) {
//     if (err) throw err;
//     else {
//       res.redirect('/VCP');
//       console.log('content deleted');
//     }
//   });
// });

app.listen(3000, function(){
    console.log('listening on port 3000!');
});


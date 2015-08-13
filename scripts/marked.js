var marked = require('marked');
marked.setOptions({
  renderer: new marked.renderer();
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
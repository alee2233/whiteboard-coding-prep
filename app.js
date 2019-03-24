const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Set up handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
const routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.listen(port, () => {
  console.log('Listening on port '+ port);
});

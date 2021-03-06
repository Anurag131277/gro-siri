const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db =require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const fridgeRoutes = require('./routes/fridge');
const errorController = require('./controllers/error');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(fridgeRoutes);
app.use(errorController.get404);

app.listen(3000);

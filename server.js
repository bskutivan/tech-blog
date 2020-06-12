const express = require('express');
// const routes = require('./controllers');
const sequelize = require('./config/connection');
// const path = require('path');
const exphbs = require('express-handlebars');
// const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3003;

app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
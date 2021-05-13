const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Keep it on the hush hush',
    cookie: { maxAge: 36000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App running on Port ${PORT}`))
});


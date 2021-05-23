var express = require('express');
var app = express();
var db = require('./db').sequelize;
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')
const authorization = require('./middleware/validate-session');
const { PORT } = require('./config');

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use(express.json());

app.use('/api/auth', user);
app.use(authorization.checkAuthorization);
app.use('/api/game', game);

app.listen(PORT, () => {
    console.log("App is listening on 4000");
    db.sync({ force: true });
})
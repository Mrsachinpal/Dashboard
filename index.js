const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const pageRoute = require('./routes/pages');
const seatRoute = require('./routes/seats');
const feesRoute = require('./routes/fees');


// let URL="mongodb+srv://dashboard:KMZpDzMfCiGL1TBQ@cluster0.9klte3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.log(err) });

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(configSession));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(pageRoute);
app.use(seatRoute);
app.use(feesRoute);



const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is connected at port:', PORT);
});

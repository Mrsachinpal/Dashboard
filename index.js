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
const authRoute = require('./routes/auth');
const Admin = require('./model/Admin');

const passport = require('passport')
const LocalStrategy = require('passport-local')


const paymentRoute = require('./routes/payment');



let URL = "mongodb+srv://sachin:sachin@cluster0.p7cma3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/dashboard')
mongoose.connect(URL)
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

// use static authenticate method of model in LocalStrategy
app.use(passport.initialize()); //password
app.use(passport.session());    //password
passport.use(new LocalStrategy(Admin.authenticate())); //password
// use static serialize and deserialize of model for passport session support
passport.serializeUser(Admin.serializeUser());   //password
passport.deserializeUser(Admin.deserializeUser());   //password

app.use((req, res, next) => {
    res.locals.currentUser = req.Admin;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(pageRoute);
app.use(seatRoute);
app.use(feesRoute);
app.use(paymentRoute);
app.use(authRoute);





const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is connected at port:', PORT);
});

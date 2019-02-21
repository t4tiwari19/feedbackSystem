const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]

    })
);



// Proper Order of the middleware hookup is very important. check office documentataion of passport for proper order
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./models/User');
//Since passport require user schema before it loads so the proper order of require statement matters
require('./services/passport');
 
if (process.env.NODE_ENV === 'production'){
    // Express wil servers up production assets of client side
    app.use(express.static('client/build'));

    //Express will serves up index.html file 
    //if it doesnt matches any routes of its own

    const path = require('path');
    app.get('*', ( req, res ) =>{
        req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

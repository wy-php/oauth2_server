'use strict';

const express        = require('express');
const expressSession = require('express-session');
const bodyParser     = require('body-parser');
const fs             = require('fs');
const path           = require('path');
const passport       = require('passport');
const https          = require('https');
const cookieParser   = require('cookie-parser');

const client         = require('./client');
const config         = require('./config');
const db             = require('./db');
const oauth2         = require('./helper/oauth2');
const site           = require('./site');
const token          = require('./helper/token');
const user           = require('./user');
const userCtrl       = require('./controller/user');

const MemoryStore = expressSession.MemoryStore;

// Express configuration
const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());

// Session Configuration
app.use(expressSession({
    saveUninitialized : true,
    resave            : true,
    secret            : config.session.secret,
    store             : new MemoryStore(),
    key               : 'authorization.sid',
    cookie            : { maxAge: config.session.maxAge },
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./helper/auth');

app.get('/', site.index);
app.get('/login', site.loginForm);
app.post('/login', site.login);
app.get('/logout', site.logout);
app.get('/account', site.account);

app.get('/authorize',                   oauth2.authorization);
app.post('/dialog/authorize/decision',  oauth2.decision);
app.post('/oauth/token',                oauth2.token);

// =======================================
// Mimicking google's token revoke endpoint from
app.get('/api/revoke', token.revoke);
app.get('/api/userinfo',   user.info);
app.get('/api/clientinfo', client.info);
app.get('/api/tokeninfo', token.info);
// =======================================

// static resources for stylesheets, images, javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Catch all for error messages.  Instead of a stack
// trace, this will log the json of the error message
// to the browser and pass along the status with it
app.use((err, req, res, next) => {
    if (err){
        if (err.status == null){
            console.error('Internal unexpected error from:', err.stack);
            res.status(500);
            res.json(err);
        } else {
            res.status(err.status);
            res.json(err);
        }
    } else {
        next();
    }
});

// From time to time we need to clean up any expired tokens in the database
setInterval(() => {
    db.accessTokens.removeExpired().catch(err => console.error('Error trying to remove expired tokens:', err.stack));
}, config.db.timeToCheckExpiredTokens * 1000);

// TODO: Change these for your own certificates.  This was generated through the commands:
const options = {
    key  : fs.readFileSync(path.join(__dirname, 'certs/privatekey.pem')),
    cert : fs.readFileSync(path.join(__dirname, 'certs/certificate.pem')),
};

// Create our HTTPS server listening on port.
https.createServer(options, app).listen(2018);
console.log('OAuth 2.0 Authorization Server started on port 2018');
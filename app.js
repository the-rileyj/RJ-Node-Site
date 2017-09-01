var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
require('dotenv').config({ path: '../vars.env' });
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use((req, res, next) => {
    fs.readFile('visi.json', 'utf8', function (err, data) {
        if (err) {
            var obj = {numb: 1};
            obj[getClientIP(req)] = 1;
            var been = false;
        } else {
            var obj = JSON.parse(data);
            if(obj[getClientIP(req)] == undefined){
                obj.numb++;
                obj[getClientIP(req)] = obj.numb;
                var been = false;
            } else {
                var been = true;
            }
        }
        fs.writeFile("visi.json", JSON.stringify(obj), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Another one!");
        });
        console.log(getClientIP(req));
        req.numr = obj.numb;
        req.vnumr = obj[getClientIP(req)];
        req.vstr = been ? "Welcome back visitor #" + req.vnumr : "Welcome to RJ's site #" + req.vnumr;
        next();
    });
})
function getClientIP(req){
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
*/

app.use((req, res, next) => {
    fs.readFile('numer.json', 'utf8', (err, data) => {
        if (err){
            var obj = {numb: 1};
        } else {
            var obj = JSON.parse(data);
            if(process.env.NODE_ENV != "development" && req.query.check == undefined){
                obj.numb++;
                if(obj["ips"].indexOf(req.headers['x-real-ip']) == -1){
                    obj.uniq++;
                    obj["ips"].push(req.headers['x-real-ip']);
                }
                fs.writeFile("numer.json", JSON.stringify(obj), 'utf8', (err) => {
                    if (err){
                        console.log(err);
                    } else {
                        console.log("Another one!");
                    }
                });
            }
        }
        if(Math.floor((Math.random() * 2) + 1) == 1){
            req.jcash = "snapcode_cash";
        } else {
            req.jcash = "snapcode_casher";
        }
        req.numr = obj.numb;
        req.uniq = obj.uniq
        next();
    });
})

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

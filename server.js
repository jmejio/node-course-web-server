const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
})

//Uncomment this to block traffic when site is under maintenance:
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance page'
//     });
// });


hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear(); //calc only once
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!!!!</h1>');
    // res.send({
    //     name: 'Juan',
    //     like: [
    //         'Cycling',
    //         'Footbol'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page heee',
        //currentYear: new Date().getFullYear(), --moved
        welcomeMessage: 'Welcome to my new website JCM !!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page heee',
        //currentYear: new Date().getFullYear() --moved
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is the error message'
    })
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
}); 
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//index route
app.get('/', function(req, res){
    res.render('index');
});

//route to availability page
app.get('/availability', function(req, res){
    res.render('availability');
});

//route to book page
app.get('/book', function(req, res){
    res.render('book');
});

//listener
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Hollaway Scheduler');
});
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        app         = express();

//config
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});        
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//schema setup
const scheduleSchema = new mongoose.Schema({
    name: String,
    date: Date,
    duration: Number
});
const Timeslot = mongoose.model('Timeslot', scheduleSchema);

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
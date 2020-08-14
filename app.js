const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        app         = express();

//config
mongoose.connect('mongodb://localhost:27017/hollaway_scheduler', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});        
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

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

//show availability page
app.get('/availability', function(req, res){
    Timeslot.find({}, function(err, slots){
        if(err){
            console.log(err);
        } else {
            res.render('availability', {slots: slots});
        };
    });
});

//show book page
app.get('/book', function(req, res){
    res.render('book');
});

//submit new timeslot
app.post('/book', function(req, res){
    //get data from form and add to timeslot array
    let name = req.body.name;
    let date = req.body.date;
    let duration = req.body.duration; 
    let newTimeSlot = {name: name, date: date, duration: duration};
    //create new timeslot
    Timeslot.create(newTimeSlot, (err, newSlot) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/availability');
        };
    });  
});

//listener
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Hollaway Scheduler');
});
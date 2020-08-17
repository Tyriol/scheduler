const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        methodOverride = require('method-override'),
        app         = express();

//config
mongoose.connect('mongodb://localhost:27017/hollaway_scheduler', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});        
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

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

//show booked time slots
app.get('/slots', function(req, res){
    Timeslot.find({}, function(err, slots){
        if(err){
            console.log(err);
        } else {
            res.render('slots', {slots: slots});
        };
    });
});

//show booking page
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
            res.redirect('/slots');
        };
    });  
});

//show management screen
app.get('/slots/:id', function(req, res) {
    Timeslot.findById(req.params.id, function(err, selectedSlot){
        if(err){
            console.log(err);
            alert('There was an error, try again');
        } else {
            res.render('show', {slot: selectedSlot});
        };
    });
});

//edit

//update

//delete
app.delete('/slots/:id', function(req, res){
    Timeslot.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
            alert('There was an error, try again');
        } else {
            res.redirect('/slots');
        };
    });
});

//listener
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Hollaway Scheduler');
});
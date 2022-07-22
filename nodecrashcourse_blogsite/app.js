const express = require('express');
const { result } = require('lodash');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');

const blogRoutes  = require('./routes/blogRoutes')

//express app
const app = express();

//Connect to Mongo DB 
const dbURI = 'mongodb+srv://RML_Sagar:routepass@clusterone.qkfan.mongodb.net/BlogStore?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then((result) => app.listen(1000))
    .catch((err) => console.log(err));

//listen for requests 


// register view engine
app.set('view engine', 'ejs')

// Middleware & static files
//app.use(morgan('dev'));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    res.redirect('/blogs');

});

// redirects 

app.get('/about', (req, res) => {
    res.render('About', { title: 'About' });
});


//blog routes :
app.use('/blogs', blogRoutes);


//express when executed will traverse through all abive code
//when none of the condition satisfies then it goes to last in this case .use so redirected to 404.html
//if any condition matches and sendFile is done or response is done then it won't execute ahead
//and this .use should be written at last only else the previous redirects won't work , kind a default in switch case

app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html' , { root : __dirname } );
    res.status(404).render('404', { 'title': 'Oops 404 !!' });
})


//404 Page
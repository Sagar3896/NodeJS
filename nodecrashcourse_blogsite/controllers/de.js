const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const Blog =  require('./models/blog');

//express app
const app = express();

//Connect to Mongo DB 
const dbURI = 'mongodb+srv://RML_Sagar:routepass@clusterone.qkfan.mongodb.net/BlogStore?retryWrites=true&w=majority';
mongoose.connect(dbURI,  {useNewUrlParser : true}, {useUnifiedTopology : true})
.then((result) => app.listen(1000))
.catch((err) => console.log(err));

//listen for requests 


// register view engine
app.set('view engine', 'ejs')

//app.use(morgan('dev'));
app.use(morgan('tiny'));

app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title : 'New Blog 2',
        snippet : 'Snippet save',
        body : 'Body for snippet'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req,res) =>{
    Blog.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req,res) => {
    Blog.findById('62d14036d57974c20eebea76')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})


// ---------------------------app.use  - intead of this part we use morgan
// app.use((req,res, next) => {
//     console.log("New Request Made :");
//     console.log("Host : ", req.hostname);
//     console.log("Path :" , req.path);
//     console.log("Method :  ", req.method);
//     next(); // As express does not know what to do after this middleware and we are not sending any response we include this to proceed ahead
// });

// //If any app.use is used after app.get which is internally sendinf response than express won't reach the app.use as app.get has already sent response
// app.use((req,res, next) => {
//     console.log("New Middleware.........");

//     next(); // As express does not know what to do after this middleware and we are not sending any response we include this to proceed ahead
// });

// ---------------------------app.use 

app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send('<p>Thats the HomePage</p>');
    // res.sendFile('./views/index.html' , { root : __dirname });

    const blogs =[
        {title: 'T1', snippet: 'This is Title 1........' },
        {title: 'T2', snippet: 'This is Title 2........' },
        {title: 'T3', snippet: 'This is Title 3........' },
    ];

    res.render('index' , { 'title' : 'Home', blogs});
}); 



app.get('/about', (req, res) => {
    // res.send('<p>Thats the AboutPage</p>');
    // res.sendFile('./views/About.html' , { root : __dirname } );
    res.render('About',  { 'title' : 'About'});
}); 

// redirects 
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req,res) => {
    res.render('create' , { 'title' : 'Create' });
})

//express when executed will traverse through all abive code
//when none of the condition satisfies then it goes to last in this case .use so redirected to 404.html
//if any condition matches and sendFile is done or response is done then it won't execute ahead
//and this .use should be written at last only else the previous redirects won't work , kind a default in switch case

app.use((req,res) => {
    // res.status(404).sendFile('./views/404.html' , { root : __dirname } );
    res.status(404).render('404',  { 'title' : 'Oops 404 !!'});
})


//404 Page
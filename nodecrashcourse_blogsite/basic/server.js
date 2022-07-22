const http = require('http');
const fs = require('fs');

const _ = require('lodash');


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const num = _.random(0,5);
    console.log(num);

    const greet = _.once(() => {
        console.log("Only Once Hello !!");
    }); 

    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');


    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'About.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //res.write(data);

            res.end(data);
        }

    });


});

server.listen(1000, 'localhost', () => {
    console.log('Listening for request on port : 1000');
});
const fs = require('fs');

// Reading Files
// fs.readFile('./docs/blog1.txt', (err,data) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

console.log("Code Not Blocked\n")

//Writing Files

// fs.writeFile('./docs/blog2.txt', 'This new blog from WriteFile..........', () => {
//     console.log('File was written');
// })

//Directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err)
        }
        console.log('folder deleted')
    })
}


//Delete Files 

if(fs.existsSync('./docs/delete.txt')) {
    fs.unlink('./docs/delete.txt', (err) => {
        if(err){
            console.log(err)
        }
        console.log('File Deleted');
    })
}



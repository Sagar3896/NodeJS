const {people, ages} = require ('./people');

console.log("From Module")
console.log(people , ages);
//console.log(people);

const osdet = require('os');
console.log(osdet.platform(), osdet.homedir());
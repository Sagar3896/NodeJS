const nam = 'm;lama';

console.log(nam);

const greet = (nam) => {
    console.log(`Hello, ${nam}`);
}

greet('A');
greet('B');
greet('Third');

console.log(global);

setTimeout(() => {
    console.log("Time out");
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log("Interval")
},1000);

console.log(__dirname);
console.log(__filename);
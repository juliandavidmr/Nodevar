var Nodevar = require('../index');

var myvar = new Nodevar();

myvar.watch('data1', function (oldval, val) {
    console.log("Changed to", val)
});

myvar.data1 = 32;
myvar.data1 = 52;

myvar.watch('unicorn', function (oldval, val) {
    console.log(`The unicorn is ${val} color`)
});

myvar.unicorn = "white";
myvar.unicorn = "pink";

myvar.unwatch('unicorn');

myvar.unicorn = "black";

myvar.unicorn = "black";

myvar.unicorn = "black";
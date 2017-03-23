var Nodevar = require('../index');

var myvar = new Nodevar({
    a: 1,
    b: 2
});

myvar.data = {
    a: 32,
    b: 65
};
myvar.data = "Hello";

console.log(myvar.getTrace())
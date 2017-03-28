# **Nodevar**

Creates objects with steroids.

## **Installation**
```
$ npm install nodevar --save-dev
```

## **Features**
* Creating dynamic objects.
* History of changes in variables.
* Automatic handling of native methods.
* Observe changes.

## **Usage**

### **History changes**
```js
var Nodevar = require('nodevar');

var pet = new Nodevar();

pet.data = "Pecas";
pet.data = "Misingo";

console.log(pet.getTrace())
/**
[
  { val: 'Pecas', date: 2017-03-23T04:21:51.529Z },
  { val: 'Misingo', date: 2017-03-23T04:21:51.529Z }
]
*/
```
Use `pet.clear()` to clear the history.


### **Using native methods**
Full control of the native methods of an object with Nodevar. The `onChage` function is called when there is a state change in the variable, ie it is activated when the `=` operator is used. The `onGet` function is called before displaying the variable `data`.

```js
// Declare options
var options = {
  data: 'Picasso',
  onChange: function ($old, $new) {
    console.log(`Change ${$old} to ${$new}`)
  },
  onGet: function (value) {
    return `My pet is ${value}`;
  }
}

var pet = new Nodevar(options);

pet.data = "Pecas";   //=> Change Picasso to Pecas
pet.data = "Misingo"; //=> Change Pecas to Misingo
pet.data = "Caesar";  //=> Change Misingo to Caesar

console.log(pet.data) //=> My pet is Caesar

console.log(pet.getTrace())
/*=>
[ { val: 'Picasso', date: 2017-03-23T04:32:00.748Z },
  { val: 'Pecas', date: 2017-03-23T04:32:00.757Z },
  { val: 'Misingo', date: 2017-03-23T04:32:00.758Z },
  { val: 'Caesar', date: 2017-03-23T04:32:00.758Z }]
*/
```

### **Observe changes**

Create observable variable.
```js
var myvar = new Nodevar();

myvar.watch('unicorn', function (oldval, val) {
    console.log(`The unicorn is ${val} color`)
});

myvar.unicorn = "white";  //=> The unicorn is white color
myvar.unicorn = "pink";   //=> The unicorn is pink color
```

Use the method `unwatch` for remove watch. ie:
```js
myvar.unwatch('unicorn');
```


For more information [see examples](./examples)


## **License**

**MIT**

_By [@juliandavidmr](https://github.com/juliandavidmr)_

Public Domain.
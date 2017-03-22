# Nodevar

Creates objects with steroids.


```js
var Nodevar = require('nodevar');

var pet = new Nodevar();

pet.data = "Pecas";
pet.data = "Misingo";

pet.getTrace()
//=> [{ val: 'Pecas' }, { val: 'Misingo' }]
```

# In progress
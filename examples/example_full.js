var Nodevar = require('../index');

var options = {
  data: 'Picasso',
  onChange: function ($old, $new) {
    console.log(`Change ${$old} to ${$new}`)
  },
  onGet: function (value) {
    return `Mi pet is ${value}`;
  }
}

var pet = new Nodevar(options);

pet.data = "Pecas";
pet.data = "Misingo";
pet.data = "Caesar";

console.log(pet.data)

console.log(pet.getTrace())
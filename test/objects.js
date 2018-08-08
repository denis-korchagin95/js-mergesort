var mergeSort = require('../index');

var srcValues = [ // fake people for example
  {
    name: 'Mark D. Koons',
    age: 83
  },
  {
    name: 'Helena L. Sanchez',
    age: 34
  },
  {
    name: 'Roger O. Tooley',
    age: 24
  },
  {
    name: 'Michael R. Chapman',
    age: 75
  },
  {
    name: 'Nicole J. Ross',
    age: 66
  },
  {
    name: 'Edith F. Curtis',
    age: 96
  },
  {
    name: 'Peter A. Freeman',
    age: 48
  },
];

var sortedValues = mergeSort(srcValues, function(a,b) {
  return a.age > b.age ? 1 : -1; // the 'older' first...
});


console.log(sortedValues);

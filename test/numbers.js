var mergeSort = require('../index');

var srcValues = [4, 5, 7, 6, 2, 8, 10, 150];

let sortedValues = mergeSort(srcValues, function(a,b) {
  return a > b ? -1 : 1;
});

console.log(sortedValues);

var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// var month = []
// console.log(date.getMonth());


var date = moment();
// date.add(6, 'days')
console.log(date.format('Do MMMM YYYY'));

console.log(date.format('HH:mm'));


var someTimestamp = moment().valueOf();
console.log(someTimestamp);

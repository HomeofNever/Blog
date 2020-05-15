import tinydate from 'tinydate';
var format = tinydate('{YYYY}-{MM}-{DD}');
export default (function (date) {
  return date instanceof Date ? format(date) : format(new Date(date));
});
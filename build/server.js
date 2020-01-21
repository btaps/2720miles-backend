'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 8080;
app.use(_express2.default.json());

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.listen(PORT, function () {
  return console.log('We clapping on port ' + PORT);
});
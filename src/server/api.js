var express = require('express')
var router = express.Router()

var meetings = [];
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  console.log('get api//////////////////////');
  var cnt = meetings.length;
  var birds = {birds: "lots of birds" + cnt};
  meetings.push(birds);
  res.send(meetings)
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})
// Routes
// router.use('/charge', require('./api/charge.js'));
router.use('/', require('./routes/meetings.js'));
module.exports = router
var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose') //mongo connection
// var Geomeetings = require('../models/db');
const MeetingGuide = require("./MeetingGuide");
const md = MeetingGuide();
var FgRed = "\x1b[31m",
FgGreen = "\x1b[32m",
FgYellow = "\x1b[33m",
FgBlue = "\x1b[34m",
FgMagenta = "\x1b[35m",
FgCyan = "\x1b[36m",
FgWhite = "\x1b[37m";
router.get('/meetingsx', function(req, res, next) {
  var miles = req.query.miles;
  var lat = req.query.lat;
  var lng = req.query.lng;
  if (miles == undefined) {
    miles = 3000;
  }
  console.log(FgBlue, 'I am cyan','i am blue');
  console.log(FgRed, 'I am cyan','i am blue');
  console.log('\x1b[36m%s\x1b[34m%s\x1b[0m', 'I am cyan','i am blue');
  console.log('\x1b[36m%s\x1b[34m%s\x1b[0m', 'I am cyan','i am blue');
  console.log('\x1b[36m%s\x1b[34m%s\x1b[0m', 'I am cyan','i am blue');
  console.warn("%cThis is a green text", "color:green");
  console.log("routes/meetings.js/meetingsx: got miles= " + miles + " lat=" + lat + " lng=" + lng)
  console.log("got miles= " + miles + " lat=" + lat + " lng=" + lng)
  const mymeetings = md.geofind(miles,lat,lng);
  // const mymeetings = md.geofind(50,lat,lng);
  console.log("got meetings = " + mymeetings.length)
  res.status(200).json(mymeetings)
});



// router.get('/meetings', function(req, res, next) {
//  console.log("api getting meetings....")
//   var miles = req.params.miles;
//   var lat = req.params.lat;
//   var lng = req.params.lng;
//   if (miles == undefined) {
//     miles = 3000;
//   }
//   console.log("got miles= " + miles + " lat=" + lat + " lng=" + lng)
//   var limit = 9000;//3000;//req.query.limit || 10;
//   var maxDistance = miles * 1600;// 3963.2;//req.query.distance || 8;
//   var coords = [];
//   coords[0] = -93.2409158;//req.query.longitude;
//   coords[1] = 44.9666072;//req.query.latitude;
//   console.log("find at " + coords + " max dist: " + maxDistance)
//   console.time('retrieved');
//   Geomeetings.find({
//       loc: {
//         $near :
//           {
//             $geometry : {
//               //  $near : {
//               type : "Point" ,
//               coordinates : [ -93.443919, 44.916980 ] },
//             $maxDistance : maxDistance
//           }
//       }
//     }
//   ).limit(limit).exec(function(err, locations) {
//     if (err) {
//       console.log("error found: " + err)
      
//       return res.json(500, err);
//     }
//     console.timeEnd('retrieved');
//     console.log("locations found: " + locations.length)
//     res.status(200).json(locations)
//   });
// });


// router.get('/:name', function(req, res, next) {
 
//   var name = req.params.name;
//   console.log("NAME: meeting=" + name);
//   console.log("%cThis is a green text", "color:green");
//   //var name = "sahara-sunrise-1st-step";
//   Geomeetings.findOne({ 'slug': name },  function (err, data) {
//   if (err) return handleError(err);
//   console.log(JSON.stringify(data,null, 3))
//   res.locals = {
//         some_value: 'foo bar',
//         list: ['cat', 'dog'],
//         mymeeting: data
//     }
//   res.render('index', {
//      title: data.name,
     
//      // Override `foo` helper only for this rendering.
//         helpers: {
//             meeting: function () { return data.name; }
//         }
//        });
//   //console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
// })
 
// });

  function handleError(err) {
    console.log("geomeeting error: " + err)
  }
router.post('/create', function(req, res){
  
})
// router.get('/create', function(req, res, next) {
//   console.dir('hostname: ' + req.hostname)
//   console.log("createing aalinks local")
//  //res.send("created aalinks local")

// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   console.time("mongoose meetings")
// //
// //   mongoose.model('meetings').find({}).exec(function(err, data){
// //     //mongoose.model('meetings').find.toArray(function (err,meetings) {
// //     // res.send(data);
// //     console.log("meetings length= " + data.length)
// //     console.timeEnd("mongoose meetings")
// //     // console.log("meeting: " + JSON.stringify(data, null, 3))
// //     res.render('index', { title: 'Express', list: data });
// //   })
// //
// // });
// var stockMeetings = require('../public/js/mongoMeetings.js')
// //var Note = require('../models/noteModel')//(mongoose);
// //console.log("intergroupResponse file length = " + interGroupResponse.length)
// //interGroupResponse.forEach(function (m, i) {
//   if (!stockMeetings) {
//     console.log("can't find mongoMeetings.js...........");

//   }
//   stockMeetings.forEach(function(m, i){
//     console.log(" meeting " + i + ".  " + JSON.stringify(m, null, 3));
//   })
  // for (var i = 0; i < interGroupResponse.length; i++) {
  // var m = interGroupResponse[i];
  //   var newMeeting = {
  //     "name" : m.name,
  //     "slug": m.slug,
  //     "updated":  new Date(),
  //     "day" : m.day,
  //     "time" : m.time,
  //     "time_formatted": m.time_formatted,
  //     "types": m.types,
  //     "id": m.id,
  //     "location_id": m.location_id, // raw meetings now sequential ids
  //     "address": m.address,
  //     "city": m.city,
  //     "state":m.state,
  //     "postal_code": m.postal_code,
  //     "country": m.country,
  //     "loc": {
  //       "coordinates": [m.longitude * 1,m.latitude * 1],  // [<longitude>, <latitude>]
  //       "type": "Point"      // create the geospatial index
  //     },
  //     // "latitude": m.latitude,
  //     // "longitude": m.longitude,
  //     "location": m.location,
  //     "location_slug": m.location_slug,
  //     "location_notes": m.location_notes,
  //     "location_updated": new Date(),
  //     "group": m.group,
  //     "group_notes": m.group_notes
  //   }
  //   // console.log("meeting = " + i + ".  " + JSON.stringify(newMeeting,null,4));
  //     Geomeetings.create(newMeeting, function (err, data) {
  //         if (err) return handleError(err);
  //         // saved!
  //         // console.log('meeting saved with create for NewMeetings: ' + JSON.stringify(data,null,4))
  //       })
  //   //if (i > 1) break;
  // }
//});// end of /create
module.exports = router;
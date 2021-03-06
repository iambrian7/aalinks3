var fs = require('fs');
var path = require('path');

function getLocations(){
  console.time("locations");
  // var locations = getFile('data/nodupsLocations.json')
  var locations = getFile('../data/non_geo_globalLocations.json')
  // var locations = getFile('data/globalLocations.json')
  var loc = JSON.parse(locations)
  console.log(`locations found: ${loc.length}`)
  console.timeEnd("locations");
  return loc;
}
function getMeetings(){
  var m = getFile('../data/newglobalMeetings.json')
  // var m = getFile('data/globalMeetings.json')
  var meetings = JSON.parse(m)
  console.log(`meetings found: ${meetings.length}`)
  return meetings;
}
function getRegions(){
  var m = getFile('data/globalRegions.json')
  var regions = JSON.parse(m)
  console.log(`regions found: ${regions.length}`)
  return regions;
}
function getSiteNames(){
  var m = getFile('data/siteNames.json')
  var sites = JSON.parse(m)
  console.log(`sites found: ${sites.length}`)
  return sites;
}

  module.exports.getLocations = getLocations;
  module.exports.getMeetings = getMeetings;
  module.exports.getRegions = getRegions;
  module.exports.getSiteNames = getSiteNames;
  module.exports.distance = distance;
  module.exports.writeFile = writeFile;

  function getFile(f) {
    var dir = path.join(__dirname, f);
    return fs.readFileSync(dir, 'utf8')
  }// end of getFile

  function writeFile(name, data) {
    fs.writeFile(name, data, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(`File ${name} saved successfully!`);
    })
} // end of writeFile
  
  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') { dist = dist * 1.609344 };
    if (unit === 'N') { dist = dist * 0.8684 };
    return dist;
  }
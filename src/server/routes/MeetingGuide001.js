var path = require('path');
var fs = require('fs');

// const home = {lat:44.9270729,lng:-93.4479148};

var { getLocations, getMeetings, distance, getRegions, getSiteNames, writeFile } = require("./scrapeUtil");

var globalLocations = getLocations();
var globalMeetings = getMeetings();

  module.exports = createMeetingGuide;

 function createMeetingGuide(){
  return {
      globalLocations,
      globalMeetings,
      MDmeetings() {
        console.log("create MDmeetings locs len=" + globalLocations.length )
      },
      geofind(miles,homelat,homelng){
        var foundLocations = globalLocations.filter(x => distance(homelat,homelng,x.lat,x.lng) < miles);
        console.log(`MeetingGuide.js foundLocations len=${foundLocations.len}`)
        foundLocations.map(x =>{
          console.log(`MeetingGuide.js foundLocation: ${x.name}`)
        })
        var arrayOfLocIds = foundLocations.map(x => x.id);
        var foundMeetings = globalMeetings.filter(x => arrayOfLocIds.includes(x.locid));
        return foundMeetings.map(x => {
            const loc = foundLocations.find(x2 => x2.id == x.locid);
            return MeetingGuideFormat(x,loc)
          })
      },// end geofind
      meetingSlugs(){
        let slugId = 0;
        let lastSlug = '';
        let slugs = globalMeetings.map((x,i,m) => {
         let n =  uncode(x.name.trim());
         if (n.length == 0){
           n = "anonymous" + slugId++;
         }
         return n;
        });
        slugs = slugs.map(x1 => {return x1.replace(/\s/g, "")})
        slugs = slugs.map(t => t.replace(/[/\\?%*:|"<>']/g, ''))
        // slugs = slugs.map(t => t.toLowerCase().replace(/[/\\?%*:|"<>']/g, ''))
        slugs.sort();
        var id = 0;
        slugs.forEach((x,i,slugs) => {
        // for (var i=0; i<50; i++){
          if (slugs[i] == lastSlug){
            slugId++;
            slugs[i] += '-' + id++;
          } else {
            id = 0;
            lastSlug = slugs[i];
          }
        })
        console.log(`dup slugs = ${slugId}`)
        return slugs.slice(5550,5650);
      }
    }
  };
    
  function MeetingGuideFormat(x,loc){
      // parse address
      if (typeof loc.address == "undefined"){
        loc.address = 'notfound,notfound,notfound,notfound,notfound'
      }
      var a = loc.address.split(','); 
      var s = a[2].trim().split(' ');
  return {
    // "_id": x.id,
    "name": uncode(x.name),
    // "slug": "it-might-have-been-worse",
    // "updated": "2019-10-01T22:34:04.152Z",
    "day": x.day,
    "time": convertTo24Hour(x.time),
    "time_formatted": x.time,
    "id": x.id,
    "location_id": x.locid,
    "location": uncode(loc.name),
    "address": a[0] ? a[0] : 'notfound',
    "city": a[1] ? a[1] : 'notfound',
    "state": s[0] ? s[0] : 'notfound',
    "postal_code": s[1] ? s[1] : 'notfound',
    "country": a[3] ? a[3] : 'notfound',
    "location_notes": "",
    "location_updated": loc.updated,
    // "__v": 0,
    "loc": {
      "type": "Point",
      "coordinates": [
        loc.lng,
        loc.lat
      ]
    },
    "types": x.types
    }
}
function convertTo24Hour(time) {
  if (time == "Noon"){
    return "12:00";
  }
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('am') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('pm')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(am|pm)/, '');
}

function uncode(value) {
  var x = value.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#039;/g, "'");
  return x;
};
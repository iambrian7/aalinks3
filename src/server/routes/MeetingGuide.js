var path = require('path');
var fs = require('fs');

var outdir = process.cwd();
const outputDir = '../test';
const mypath = path.resolve(`${outdir}/test/newLocations.json`);
  console.log(`addMeeting: path=${mypath}`)
// const home = {lat:44.9270729,lng:-93.4479148};

var { getLocations, getMeetings, distance, getRegions, getSiteNames, writeFile, getFile } = require("./scrapeUtil");

var globalLocations = getLocations();
var globalMeetings = getMeetings();

// var slugToId = {};
// var idToSlug = {};
console.time('mapSlugs')
var [slugToId, idToSlug] = mapSlugs(globalLocations);
// apply slugs to locations
const locations = globalLocations.map(x => {
  x.slug = idToSlug[x.id];
  return x;
})
var [slugToId, idToSlug] = mapSlugs(globalMeetings);
// apply slugs to locations
const meetings = globalMeetings.map(x => {
  x.slug = idToSlug[x.id];
  return x;
})
console.timeEnd('mapSlugs')
console.log(`mapped locations: ${JSON.stringify(locations.slice(0,1), null, 3)}`)
console.log(`mapped meetings: ${JSON.stringify(meetings.slice(0,1), null, 3)}`)

  module.exports = createMeetingGuide;

  function mapSlugs(list){
    const slugs = getSlugs(list);
    var slugId = {};
    var idSlug = {};
    slugs.forEach(x => {
      slugId[x.name] = x.id;
      idSlug[x.id] = x.name;
    });
    return [slugId,idSlug]
  }
 function createMeetingGuide(){
  return {
      globalLocations,
      globalMeetings,
      locations,
      meetings,
      MDmeetings() {
        console.log("create MDmeetings locs len=" + globalLocations.length )
      },
      addMeeting(meeting){
        

        console.log(`MeetingGuide.js: addMeeting= ${JSON.stringify(meeting, null, 3)}`)
        // create location
        const locId = locations[locations.length-1].id + 1;
        console.log(`globalLocations: len=${locations.length} last id=${locId}`)
        const meetingId = meetings[meetings.length-1].id + 1;
        console.log(`globalMeetingss: len=${meetings.length} last id=${meetingId}`);
        let loc = meeting.location;
          var newloc = {
            "id":locId,
            "name": loc.name,
            "siteId": "new_meeting",
            "lat": Math.round(loc.lat*1000) / 1000 ,   // limit to 3 decimals
            "lng":  Math.round(loc.lng*1000) / 1000 , // limit to 3 decimals
            "address": loc.mapped_address
          }
        // get addedLocations 
        let addedLocations;
        // const path = `${outputDir}/newLocations.json`;
        console.log(`addMeeting: path=${mypath}`)

        try {
         

          fs.accessSync(`${outdir}\\test`, fs.constants.R_OK | fs.constants.W_OK);
          
         
          addedLocations = JSON.parse(fs.readFileSync(mypath, 'utf8'))
          // addedLocations = JSON.parse(getFile(mypath))
          console.log('can read/write');
        } catch (err) {
          addedLocations = [];
          console.error('no access!');
        }


        //  if (fs.existsSync(path)) {
        //    console.log(`${path} exists****************`)
        //   } else {
        //     console.log(`${path} does not exist****************`)

        // }
        // check for duplicate locations
        const found = addedLocations.find(x => x.id = newloc.id);
        if (found){
          console.log(`dup location found=${newloc.id}`)
        } else {
          console.log(`added location =${newloc.id}`)

          addedLocations.push(newloc);
          writeFile(mypath, JSON.stringify(addedLocations))
        }







      },
      findMeetings(foundLocations){
        var arrayOfLocIds = foundLocations.map(x => x.id);
        var foundMeetings = globalMeetings.filter(x => arrayOfLocIds.includes(x.locid));
        return foundMeetings;
      },
      slugFind(slug){
        var meeting = meetings.find(x => x.slug == slug)
        return meeting;
      },
      format(meeting,location){
        return MeetingGuideFormat(meeting,location)
      },
      geofind(miles,homelat,homelng){
        console.log(`MeetingGuide.js: geoFind:`)
        // var test_miles = 2;
        var foundLocations = globalLocations.filter(x => 
          {
            var dist = distance(homelat,homelng,x.lat,x.lng);
            if (dist < miles){
              x.dist = dist; // store dist for dups
           }
           return dist < miles;

          //  return dist < miles;
          });
        // remove duplicate locations i.e. if any location is < .01 
        foundLocations = dups(foundLocations);
        // var myfound = foundLocations.filter(x => x.id == 18422)
        // if (myfound.length > 0){
        //   console.log(JSON.stringify(myfound));

        // }
        console.log(`after dups: foundLocations length= ${foundLocations.length}`)
        var arrayOfLocIds = foundLocations.map(x => x.id);
        // console.log(`after dups: arrayOfLocIds length= ${arrayOfLocIds.length} ${arrayOfLocIds}`)
        var foundMeetings = globalMeetings.filter(x => arrayOfLocIds.includes(x.locid));
        console.log(`after dups: foundMeetings length= ${foundMeetings.length}`)
        return foundMeetings.map(x => {
            const loc = foundLocations.find(x2 => x2.id == x.locid);
            return MeetingGuideFormat(x,loc)
          })
      },// end geofind
    }
  };

  function dups(locations){
    console.log(`find dups in ${locations.length}`)
    // store dist on each location
    // sort by distance
    var distLocs = locations.sort((a,b) => {
      var a1 = a.dist;
      var b1 = b.dist;
      return a1-b1
    })
    // console.log(`locations:sorted: ${JSON.stringify(distLocs.slice(0,4),null,3)}`)
    // remove dups
    // print all below .01
    console.log(`chking for dups locations: ${distLocs.length}`)
    var lastDist = 100;
    // console.log(`sample locations for test: ${JSON.stringify(distLocs.slice(0,11),null,3)}`);
    distLocs.forEach((x,i) => {
      if (i > 0){
        if (Math.abs(x.dist - lastDist)  < 0.001){
          // console.log(`Dup found: dist < .01 num=${i}.  lastDist= ${lastDist} *** ${x.dist}`)
          // console.log(`dist < .01 lastDist= ${lastDist} *** ${JSON.stringify(x,null,3)}`)
          x.dup = true;
        } else {
          x.dup = false;
        }
      }
      lastDist = x.dist;
    })
    var dupsFound = distLocs.filter(x => x.dup);

    console.log(`ck dist on found locations: ${dupsFound.length}`)
    // console.log(`ck dist on found locations: ${JSON.stringify(dupsFound)}`)
    
    // console.log(`ck dist on found locations: ${JSON.stringify(locations[1])}`)

    var foundid = []
    distLocs = distLocs.sort((a,b) => {
      var a1 = a.lat;
      var b1 = b.lat;
      return a1-b1
    })
    console.log(`dups: before removing dups len=${distLocs.length}`);
    distLocs = distLocs.filter((x,i,arr) => !x.dup)
    console.log(`dups: after removing dups returning len=${distLocs.length}`);
    return distLocs;
  }

  function getSlugs(list){
    let slugId = 0;
    let lastSlug = '';
    let slugs = list.map((x,i,m) => {
      let n =  uncode(x.name.trim());
      if (n.length == 0){
        n = "anonymous" + slugId++;
      }
      n = n.replace(/[/\\?%*:|"<>',+#;&\s]/g, '');
      if (!isNaN(n) & n.length > 0){
        n = `n${n}`;
      }
      return {name:n,id:x.id}
      });
    slugs.sort((a,b) => {
      var a1 = a.name
      var b1 = b.name
      if (a1 > b1) return 1;
      if (a1 < b1) return -1
      return 0
    });
    var id = 0;
    slugs.forEach((x,i,slugs) => {
      if (slugs[i].name == lastSlug){
        slugId++;
        slugs[i].name += '-' + id++;
      } else {
        id = 0;
        lastSlug = slugs[i].name;
      }
    })
    return slugs;
    // return slugs.slice(5550,5560);
  }
    
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
    "slug": x.slug,
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
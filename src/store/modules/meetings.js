import axios from 'axios'

// import MeetingService from '@/services/MeetingService'

function mileLimit(m,mileMax,lat,lng){
  // console.log("mileLimit-lat:" + this.lat + " lng:" + this.lng)
  // console.log("meeting  -lat:" + m.loc.coordinates[1] + " lng:" + m.loc.coordinates[0])
  // console.log(`mileLimit:distance = ${distance(lat,lng,m.loc.coordinates[1],m.loc.coordinates[0])} for ${m.name}`)
   return (mileMax > distance(lat,lng,m.loc.coordinates[1],m.loc.coordinates[0])) 
 }


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

export default {
  state: {
    testcnt: 0,
    meetings: [],
    meeting: null,
    newLocation: {"name":"Turning Point","lat":30.225,"lng":-92.011,"address":"210 Eighth St, Lafayette, LA 70501, USA"},
    filters: {
      day: 0,
      picked: '',
      mileMax: 2,
      startMiles: 50,
      lat: 44.92707,
      lng: -93.44791
      // home: {lat:44.9270729,lng:-93.4479148},
    },
    startMiles: 50,
    lat: 44.92707,
    lng: -93.44791,
    home: {
      lat: 44.917042,
      lng: -93.443947,
      address: '12913 Pioneer Rd.',
      city: 'Minnetonka',
      state: 'MN'
    },
    viewMeeting: null,
    selectedMeeting: null,
    addMeeting: null,
    locations: [],
    dupLocations: [],
    dupLocation: null
  },
  getters: {
    getDupLocation: state => {
      console.log(`getters: getDupLocation = ${state.dupLocation}`)
      if (state.dupLocation){
        return state.dupLocation
      } else {
        return {name: 'location not defined'}
      }
    },
    getDupLocations: state => {
      return state.dupLocations
    },
    getLocation: (state) => (location) => {
      var newMeetings = state.meetings.filter(x => {
        return (0.1 > distance(location.lat,location.lng,x.loc.coordinates[1],x.loc.coordinates[0])) 
      })
      // console.log(`store: getLocation: found ${newMeetings.length}`)
      return newMeetings

    },
  
    getLocationMeetings: (state) => (id) => {
      var newMeetings = state.meetings.filter(x => x.location_id == id);
      // console.log(`getLocationMeetings: found meetins with locid=${id}`)
      // console.log(`getLocationMeetings: newMeetings len = ${newMeetings.length}`)
      var loc = {};
      // get all meetings at locid
      newMeetings.forEach(function(m){
                if (!loc[m.location_id]){
                    loc[m.location_id] = {
                      location: m.location,
                      address: m.address,
                      city: m.city,
                      state: m.state,
                      postal_code: m.postal_code,
                      loc : m.loc,
                      meetings: []
                    } // add this location data 
                 }
                var meeting = {
                  name: m.name,
                  slug: m.slug,
                  day : m.day,
                  time : m.time,
                  time_formatted: m.time_formatted,
                  types: m.types,
                  id: m.id
                }
                loc[m.location_id].meetings.push(meeting) 
        })// end of new
        // console.log(`getLocationMeetings: found at ${JSON.stringify(loc,null,3)}`)

        return loc;
    },
    getAMeeting: state => {
      return state.meeting
    },
    getSelectedMeeting: state => {
      return state.selectedMeeting
    },
    getMileMax: state => {
      return state.filters.mileMax
    },
    getViewMeeting: state => {
      return state.viewMeeting
    },
    getAllMeetings: state => {
      return state.meetings
    },
    getAllLocations: state => {
      // console.log(`getAllLocations: ${state.locations.length}`)
      return state.locations
    },
    getMeetingById: (state) => (id) => {
      return state.meetings.find(x => x.id === id)
    },
    getFilteredMeetings: (state) => {
    // getFilteredMeetings: (state) => (options) => {
    // debugger
    // console.log(`getFilteredMeetings: ${state.meetings.length}`)
    var day = state.filters.day //|| 7
    var picked = state.filters.picked
    var mileMax = state.filters.mileMax
    
    var lat = state.filters.lat
    var lng = state.filters.lng
    var cked = false;
    var newMeetings = state.meetings.filter(function(m){
      cked = ((mileLimit(m,mileMax,lat,lng)) &&
      (day == 7 || day == m.day) &&
      (!picked || m.types.includes(picked))
      )
      // console.log(cked + "  picked=" + picked + "  " + m.name )
      return cked;
    })
    // console.log(`getFilteredMeetings:newMeetings ${newMeetings.length}`)
    return newMeetings
  }
},
  mutations: {
    testcnt: (state, payload) => {
      state.testcnt = payload;
    },
    getAMeeting: (state, meeting) => {
      state.meeting = meeting
    },
    getAllMeetings: (state, meetings) => {
      state.meetings = meetings
    },
    setOptions: (state, options) => {
      state.filters.day = options.day
      state.filters.picked = options.picked
      state.filters.mileMax = options.mileMax
      state.filters.lat = options.home.lat
      state.filters.lng = options.home.lng
    },
    setViewMeeting: (state, meeting ) => {
      state.viewMeeting = meeting
    },
    getDupLocations: (state, locations ) => {
      state.dupLocations = locations
    },
    getDupLocationId: (state, location ) => {
      state.dupLocation = location
    },
    locations: (state, loc ) => {
      state.locations = loc;
    },
    setSelectedMeeting: (state, meeting ) => {
      state.selectedMeeting = meeting
    },
    addMeeting: (state, meeting ) => {
      state.addMeeting = meeting
    },
    changeMileMax: (state , miles ) => {
      state.filters.mileMax = miles
    },
  },
  actions: {
    getAllMeetings: async ({ commit, state }) => {
      
 //     console.log(`store:axios:getAllMeetings: `)
     // const home = {lat:44.9270729,lng:-93.4479148};
      // var uri = `/api/meetingsx/?miles=${5}&lat=${home.lat}&lng=${home.lng}`;
      var uri = `/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`;
      var response = await axios.get(uri);

    //  const response = await fetch(uri, {
    //     // body: JSON.stringify(data), // must match 'Content-Type' header
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     },
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //   })
    //   const json = await response.json();
   const json = await response.data;



      // console.log(`getting: http://localhost:8086/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`)
      
      // var res = await axios.get(`http://localhost:8086/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`)
  
      // commit('getAllMeetings', res.data)
      commit('getAllMeetings', json)
    },
    getDupLocations: async ({ commit, state }) => {
      
      var res = await axios.get(`http://localhost:8086/api/locations/`)
      //console.log(`store:axios:getDupLocation: len=: ${res.data.length}`)
  
      commit('getDupLocations', res.data)
    },
    getDupLocationId: async ({ commit }, id ) => {
  //    console.log(`store:meetings:getDupLocationId: ${id}`)
      var res = await axios.get(`http://localhost:8086/api/locations/${id}`)
      
  //    console.log(`store:from axios:getDupLocationId: ${id}`)
      commit('getDupLocationId', res.data)
    },
    getAMeeting: async ({ commit, state }) => {
      // var res = await axios.get(`/api/meetingsx`)
      var res = await axios.get(`http://localhost:8086/meeting/squadx`)
  
      commit('getAMeeting', res.data)
    },
    setViewMeeting: ({ commit }, meeting ) => {
      commit('setViewMeeting', meeting)
    },
    setOptions: ({ commit }, options ) => {
      commit('setOptions', options)
    },
    changeMileMax: ({ commit }, miles ) => {
    //  console.log(`changeMileMax: ${miles}`)
      commit('changeMileMax', miles)
    },
    setSelectedMeeting: ({ commit }, meeting ) => {
      commit('setSelectedMeeting', meeting)
    },
    locations: ({ commit }, loc ) => {
      commit('locations', loc)
    },
    async addMeeting ({ commit },meeting) {
      // see: C:\Users\bkc\Dropbox\2019Projects\new-boilerplate\client2\src\store\index.js

      // var lunches = (await LunchService.index()).data

      //////////  comment out for bug  ///////////////////
      //////////  comment out for bug  ///////////////////
      // console.log(` store:addMeeting=${JSON.stringify(meeting,null,3)}`);
      //  commit('addMeeting',  (await MeetingService.post(meeting)).data)
      //////////  comment out for bug  ///////////////////
      //////////  comment out for bug  ///////////////////
      //////////  comment out for bug  ///////////////////
     },
  }
}
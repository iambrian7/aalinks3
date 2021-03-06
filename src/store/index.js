import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

function getAddressFromLatLng(){
  // from https://stackoverflow.com/questions/17603738/convert-latitude-longitude-to-address
  //
    var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);    // turn coordinates into an object          
    geocoder.geocode({'latLng': location}, function (results, status) {
        if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
            var add=results[0].formatted_address;         // if address found, pass to processing function
            document.write(add);
        }
    })
}

function mileLimit(m,mileMax,lat,lng){
  // console.log("mileLimit-lat:" + this.lat + " lng:" + this.lng)
  // console.log("meeting  -lat:" + m.loc.coordinates[1] + " lng:" + m.loc.coordinates[0])
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

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    meetings: [],
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
    viewMeeting: null,
    selectedMeeting: null,
    activetab: 1,
    stripeKey: null
  },
  //showing things, not mutating state
  getters: {
    // tripleCounter: state => {
    //   return state.counter * 3;
    // }
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
    getMeetingById: (state) => (id) => {
      return state.meetings.find(x => x.id === id)
    },
    getFilteredMeetings: (state) => {
    // getFilteredMeetings: (state) => (options) => {
    // debugger
    var day = state.filters.day //|| 7
    var picked = state.filters.picked
    var mileMax = state.filters.mileMax

    var lat = state.filters.lat
    var lng = state.filters.lng
    console.log(`state.meetings len=${state.meetings.length}`)
    var newMeetings = state.meetings.filter(function(m){
      console.log(`.......m.name = ${m.name}`)
      return ((mileLimit(m,mileMax,lat,lng)) &&
                (day == 7 || day == m.day) &&
              (!picked || m.types.includes(picked))
                )
     })
     console.log(`getFilteredMeetings len=${newMeetings.length}`)
     return newMeetings
    }
  },
  mutations: {
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
    setSelectedMeeting: (state, meeting ) => {
      state.selectedMeeting = meeting
    },
    changeMileMax: (state , miles ) => {
      state.filters.mileMax = miles
    },
    getStripeKey: (state , key ) => {
      state.stripeKey = key
    },

  }, 
  //commits the mutation, it's asynchronous
  actions: {
    getStripeKey({commit, state}) {
      return axios.get(`http://localhost:8086/stripekey`)
        .then(res => {
          commit('getStripeKey', res.data.publishableKey);
        })
    },
    getAllMeetings: async ({ commit, state }) => {

      // ckBirds: async function(){
        const home = {lat:44.9270729,lng:-93.4479148};
         var uri = `/api/meetingsx/?miles=${5}&lat=${home.lat}&lng=${home.lng}`;
        const response = await fetch(uri, {
        // body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      })
      const json = await response.json();
      commit('getAllMeetings', json);
      // this.meetings = json;

      // commit('getAllMeetings', res.data)
    },
    setViewMeeting: ({ commit }, meeting ) => {
      commit('setViewMeeting', meeting)
    },
    changeMileMax: ({ commit }, miles ) => {
      commit('changeMileMax', miles)
    },
    setSelectedMeeting: ({ commit }, meeting ) => {
      commit('setSelectedMeeting', meeting)
    },
  }
});

import Vue from 'vue'
import Vuex from 'vuex'


// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import meetings from './modules/meetings';
import stripe from './modules/stripe';
Vue.use(Vuex)



const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    meetings,
    stripe
  },
  state: {
    // meetings: [],
    // meeting: null,
    // newLocation: {"name":"Turning Point","lat":30.225,"lng":-92.011,"address":"210 Eighth St, Lafayette, LA 70501, USA"},
    // filters: {
    //   day: 0,
    //   picked: '',
    //   mileMax: 2,
    //   startMiles: 50,
    //   lat: 44.92707,
    //   lng: -93.44791
    //   // home: {lat:44.9270729,lng:-93.4479148},
    // },
    // startMiles: 50,
    // lat: 44.92707,
    // lng: -93.44791,
    // viewMeeting: null,
    // selectedMeeting: null,
    // addMeeting: null,
    activetab: 1,
    // stripeKey: null
  },
  //showing things, not mutating state
  getters: {
    // tripleCounter: state => {
    //   return state.counter * 3;
    // }
    // getLocationMeetings: (state) => (id) => {
    //   var newMeetings = state.meetings.filter(x => x.location_id == id);
    //   console.log(`getLocationMeetings: found meetins with locid=${id}`)
    //   console.log(`getLocationMeetings: newMeetings len = ${newMeetings.length}`)
    //   var loc = {};
    //   // get all meetings at locid
    //   newMeetings.forEach(function(m){
    //             if (!loc[m.location_id]){
    //                 loc[m.location_id] = {
    //                   location: m.location,
    //                   address: m.address,
    //                   city: m.city,
    //                   state: m.state,
    //                   postal_code: m.postal_code,
    //                   loc : m.loc,
    //                   meetings: []
    //                 } // add this location data 
    //              }
    //             var meeting = {
    //               name: m.name,
    //               slug: m.slug,
    //               day : m.day,
    //               time : m.time,
    //               time_formatted: m.time_formatted,
    //               types: m.types,
    //               id: m.id
    //             }
    //             loc[m.location_id].meetings.push(meeting) 
    //     })// end of new
    //     console.log(`getLocationMeetings: found at ${JSON.stringify(loc,null,3)}`)

    //     return loc;
    // },
    // getAMeeting: state => {
    //   return state.meeting
    // },
    // getSelectedMeeting: state => {
    //   return state.selectedMeeting
    // },
    // getMileMax: state => {
    //   return state.filters.mileMax
    // },
    // getViewMeeting: state => {
    //   return state.viewMeeting
    // },
    // getAllMeetings: state => {
    //   return state.meetings
    // },
    // getMeetingById: (state) => (id) => {
    //   return state.meetings.find(x => x.id === id)
    // },
    // getFilteredMeetings: (state) => {
    // // getFilteredMeetings: (state) => (options) => {
    // // debugger
    // var day = state.filters.day //|| 7
    // var picked = state.filters.picked
    // var mileMax = state.filters.mileMax

    // var lat = state.filters.lat
    // var lng = state.filters.lng
    //   var newMeetings = state.meetings.filter(function(m){
    //     return ((mileLimit(m,mileMax,lat,lng)) &&
    //              (day == 7 || day == m.day) &&
    //             (!picked || m.types.includes(picked))
    //              )
    //  })
    //  return newMeetings
    // }
  },
  mutations: {
    // getAMeeting: (state, meeting) => {
    //   state.meeting = meeting
    // },
    // getAllMeetings: (state, meetings) => {
    //   state.meetings = meetings
    // },
    // setOptions: (state, options) => {
    //   state.filters.day = options.day
    //   state.filters.picked = options.picked
    //   state.filters.mileMax = options.mileMax
    //   state.filters.lat = options.home.lat
    //   state.filters.lng = options.home.lng
    // },
    // setViewMeeting: (state, meeting ) => {
    //   state.viewMeeting = meeting
    // },
    // setSelectedMeeting: (state, meeting ) => {
    //   state.selectedMeeting = meeting
    // },
    // addMeeting: (state, meeting ) => {
    //   state.addMeeting = meeting
    // },
    // changeMileMax: (state , miles ) => {
    //   state.filters.mileMax = miles
    // },
    getStripeKey: (state , key ) => {
      state.stripeKey = key
    },

  }, 
  //commits the mutation, it's asynchronous
  actions: {
    // getStripeKey({commit, state}) {
    //   return axios.get(`http://localhost:8086/stripekey`)
    //     .then(res => {
    //       commit('getStripeKey', res.data.publishableKey);
    //     })
    // },
    // getAllMeetings: async ({ commit, state }) => {
    //   ///////////////  get meetings from server on DigitalOcean acces is mongodb getting only ~1000 meetings potiental
    //   ///////////////  get meetings from server on DigitalOcean acces is mongodb getting only ~1000 meetings potiental

    //   // axios.get("https://moonstrider.com/meetings/?miles=40")
      
    //   ///////////////  get meetings from server on DigitalOcean acces is mongodb getting only ~1000 meetings potiental
    //   ///////////////  get meetings from server on DigitalOcean acces is mongodb getting only ~1000 meetings potiental
    //   ///////////////  get meetings from server on DigitalOcean acces is mongodb getting only ~1000 meetings potiental
      
      
    //   /////////////  get meetings from file in server
    //   /////////////  get meetings from file in server
    //   console.log(`getting: http://localhost:8086/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`)
      
    //   var res = await axios.get(`http://localhost:8086/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`)
    //   // axios.get(`http://localhost:8086/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`)
      
    //   /////////////  get meetings from file in server
    //   /////////////  get meetings from file in server
    //   /////////////  get meetings from file in server
      
    //   ////////////   get meetings from mongodb (1047 max)
    //   ////////////   get meetings from mongodb (1047 max)
      
    //   // axios.get(`http://localhost:8086/api/meetings/?miles=${state.startMiles}&lat=${state.lat}&lng=${state.lng}`)
      
    //   ////////////   get meetings from mongodb (1047 max)
    //   ////////////   get meetings from mongodb (1047 max)
    //   ////////////   get meetings from mongodb (1047 max)
    //   // console.log(`gotAllMeetings: ${JSON.stringify(res.data[0],null,3)}`)
    //   commit('getAllMeetings', res.data)
    // },
    // getAMeeting: async ({ commit, state }) => {
      
    //   var res = await axios.get(`http://localhost:8086/meeting/squadx`)
  
    //   commit('getAMeeting', res.data)
    // },
    // setViewMeeting: ({ commit }, meeting ) => {
    //   commit('setViewMeeting', meeting)
    // },
    // setOptions: ({ commit }, options ) => {
    //   commit('setOptions', options)
    // },
    // changeMileMax: ({ commit }, miles ) => {
    //   commit('changeMileMax', miles)
    // },
    // setSelectedMeeting: ({ commit }, meeting ) => {
    //   commit('setSelectedMeeting', meeting)
    // },
    // async addMeeting ({ commit },meeting) {
    //   // see: C:\Users\bkc\Dropbox\2019Projects\new-boilerplate\client2\src\store\index.js

    //   // var lunches = (await LunchService.index()).data
    //   console.log(` store:addMeeting=${JSON.stringify(meeting,null,3)}`);
    //    commit('addMeeting',  (await MeetingService.post(meeting)).data)
    //  },
  }
});
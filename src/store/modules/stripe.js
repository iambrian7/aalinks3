import axios from 'axios';

export default {
  state: {
    stripeKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
  },
  getters: {},
  mutations: {
    getStripeKey: (state , key ) => {
      state.stripeKey = key
    },
  },
  actions: {
    // getAllMeetings: async ({ commit, state }) => {
    //   var uri = `/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`;
    //   var response = await axios.get(uri);
    //   const json = await response.data;
    //   commit('getAllMeetings', json)
    // },
    getStripeKey({commit, state}) {
      var k = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;
      console.log(`getStripeKey=${k}`);

      // var uri = `/api/meetingsx/?miles=${state.startMiles}&lat=${state.filters.lat}&lng=${state.filters.lng}`;
      // return axios.get(`http://localhost:8086/stripekey`)
      //   .then(res => {
      //     commit('getStripeKey', res.data.publishableKey);
      //   })
    },
  },
}
import axios from 'axios';

export default {
  state: {
    stripeKey: null
  },
  getters: {},
  mutations: {
    getStripeKey: (state , key ) => {
      state.stripeKey = key
    },
  },
  actions: {
    getStripeKey({commit, state}) {
      return axios.get(`http://localhost:8086/stripekey`)
        .then(res => {
          commit('getStripeKey', res.data.publishableKey);
        })
    },
  },
}
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import addCategory from './addCategory'
import getCategories from './getCategories'
import records from './records'
import cardTypes from './cardTypes'
import cardFields from './cardFields'
import cardTypesToFields from './cardTypesToFields'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error(state) {
      return state.error
    }
  },
  actions: {
    async fetchCurrency(context) {
      const key = process.env.VUE_APP_FREECURRENCY
      const currency = await fetch(`https://free.currconv.com/api/v7/convert?apiKey=${key}&q=RUB_USD,RUB_EUR&compact=n`)
      return currency.json();
    },
    async getRoomPayments(context) {
      let RoomPayments = await fetch(`http://editor.b2b.playflow.io/API/GET/room_payment.php`)
      return RoomPayments.json();
    }
  },
  modules: {
    auth, info, addCategory, getCategories, records, cardTypes, cardFields, cardTypesToFields
  }
})

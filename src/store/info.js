import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo(context) {
      try {
        const uid = await context.dispatch('getUID');
        const info =  (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        // console.log(info);
        context.commit('setInfo', info)
      } catch (error) {
        throw error
      }
    },
    async updateInfo(context, {newBill}){
      try {
        let uid = await context.dispatch('getUID')
        const newInfo = {
          ...context.getters.info,
          bill: newBill
        }
        let newCat = await firebase.database().ref(`users/${uid}`).child('info').update(newInfo)
        context.commit('setInfo',newInfo);
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    }
  },
  getters: {
    // info :  s => s.info
    info(state) {
      return state.info
    }
  }
}

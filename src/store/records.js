import firebase from 'firebase/app'

export default {
  actions: {
    async addRec(context, recData) {
      try {
        let uid=await context.dispatch('getUID');
        let newRecKey = await firebase.database().ref(`users/${uid}/records`).push(recData)
        return newRecKey;
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    },
    async getRecords(context) {
      try {
        let uid = await context.dispatch('getUID')
        // console.log(uid);
        let records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {}
        console.log(records);
        let map1 = Object.keys(records).map(key => ({...records[key],id:key}) )
        // console.log(map1);
        return map1
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    },
    async getRecordByID(context, id) {
      try {
        let uid = await context.dispatch('getUID')
        let record = (await firebase.database().ref(`users/${uid}/records`).child(id).once('value')).val() || {}
        let map1 = {...record, id}
        return map1
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    }
  }
}

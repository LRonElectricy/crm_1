import firebase from 'firebase/app'

export default {
  actions: {
    async getCategories(context) {
      try {
        let uid = await context.dispatch('getUID')
        let categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}
        let map1 = Object.keys(categories).map(key => ({...categories[key],id:key}) )
        return map1
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    },
    async getCategoryByID(context, id) {
      try {
        let uid = await context.dispatch('getUID')
        let category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {}
        let map1 = {...category, id}
        return map1
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    }
  }
}

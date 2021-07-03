import firebase from 'firebase/app'

export default {
  actions: {
    async addCategory(context, { title, limit }) {
      try {
        let uid = await context.dispatch('getUID')
        // console.log(uid);
        let newCat = await firebase.database().ref(`users/${uid}/categories`).push({
          title,
          limit
        })
        return { title, limit, id: newCat.key }
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    },
    async updateCategorie(context, { title, limit, id }) {
      try {
        let uid = await context.dispatch('getUID')
        // console.log(uid);
        let newCat = await firebase.database().ref(`users/${uid}/categories`).child(id).update({
          title,
          limit
        })
        // return { title, limit, id: newCat.key }
      } catch (error) {
        context.commit('setError', error);
        throw error;
      }
    }
  }
}

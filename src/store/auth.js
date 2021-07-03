import axios from 'axios'
import firebase from 'firebase/app'
import router from '@/router'

export default {
  state: {
    USER: null
  },
  getters: {
    USER(state) {
      return state.USER
    }
  },
  mutations: {
    setUSER(state, USER) {
      state.USER = USER
    }
  },
  actions: {
    async login(context, { email, password }) {
      try {
        let user = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/Login.php?email=${email}&password=${password}`).then(function (response) {
          return response.data
        })
        localStorage.setItem('ROOM_ID', user.content.id);
        // console.log(user);
        context.commit('setUSER', user.content)
        // return user.content;
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async sessionLogin(context) {
      try {
        // console.log(localStorage.getItem('ROOM_ID'));
        let user = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/Login.php?ROOM_ID=${localStorage.getItem('ROOM_ID')}`).then(function (response) {
          return response.data
        })
        context.commit('setUSER', user.content)
      } catch (error) {
        context.commit('setError', error)
        throw error
      }
    },
    async logout(context) {
      localStorage.removeItem('ROOM_ID');
      // await firebase.auth().signOut();
      // context.commit('clearInfo');
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUID')
        await firebase.database().ref(`users/${uid}/info`).set({
          bill: 10000,
          name: name
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateUser(context, { email, password, firs_name, last_name,role }){
      try {
        let user = await axios.get(`http://editor.b2b.playflow.io/API_CRM/SET/UpdateSetUser.php?email=${email}&password=${password}&first_name=${firs_name}&last_name=${last_name}&role=${role}&id=${localStorage.getItem('ROOM_ID')}`).then(function (response) {
          return response.data
        })
        if(context.getters.USER.email !== email || context.getters.USER.password !== password){
          await context.dispatch('logout')
          router.push("/login?message=logout");
        }
        await context.dispatch('sessionLogin')
      } catch (error) {
        context.commit('setError', error)
        throw error
      }
    },
    getUID() {
      const uid = firebase.auth().currentUser
      return uid ? uid.uid : null
    }
  }
}

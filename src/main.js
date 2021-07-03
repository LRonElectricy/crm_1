import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'

import messagePlugin from '@/utils/message_plugin'

import Preloader from '@/components/app/Preloader'
import Linear from '@/components/app/Linear'

import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/filters/date-filter'
import currencyFilter from '@/filters/currency-filter'

import Tooltip from '@/directives/tooltip'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.component('Preloader',Preloader)
Vue.component('Linear',Linear)
Vue.component('Paginate', Paginate)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip',Tooltip)


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyCLgMrR2nVs9rkQijvGfNGCbxs6HD5Etis",
  authDomain: "crm-learn-1.firebaseapp.com",
  projectId: "crm-learn-1",
  storageBucket: "crm-learn-1.appspot.com",
  messagingSenderId: "434968638416",
  appId: "1:434968638416:web:036ad00ca8f437ebc4ffd5",
  measurementId: "G-SP5SF5V3J4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

let app;
// firebase.auth().onAuthStateChanged(() => {
store.dispatch("sessionLogin").then(function(response) {
  // if(!store.getters.USER){
    if (!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    }
  // }
})
  
  
    

// })


// app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

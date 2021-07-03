import axios from 'axios'
// import firebase from 'firebase/app'
// import router from '@/router'

export default {
  actions: {
    async getAllFieldTypes(context) {
      try {
        let ret2 = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/TableByName.php?tableName=type_of_field_types`).then(function (response) {
          let CartFieldsTypes_tmp = response.data;
        })
        context.commit('setAllCartFields', ret);
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
  }
}

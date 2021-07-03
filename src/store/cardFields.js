import axios from 'axios'
// import firebase from 'firebase/app'
// import router from '@/router'

export default {
  state: {
    AllCartFields: null,
    AllCartFieldsTypes: null
  },
  getters: {
    AllCartFields(state) {
      return state.AllCartFields
    },
    AllCartFieldsTypes(state) {
      return state.AllCartFieldsTypes
    }
  },
  mutations: {
    setAllCartFields(state, AllCartFields) {
      state.AllCartFields = AllCartFields
    },
    updateCartFields(state, newCard) {
      // state.AllCartFields.find((card) => card.id === newCard.id).name = newCard.name;
    },
    setAllCartFieldsTypes(state, AllCartFieldsTypes) {
      state.AllCartFieldsTypes = AllCartFieldsTypes
    },
  },
  actions: {
    async getAllFieldTypes(context) {
      try {
        let ret2 = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/TableByName.php?tableName=type_of_field_types`).then(function (response) {
          let CartFieldsTypes_tmp = response.data.content;
          return (Object.keys(CartFieldsTypes_tmp).map(key => ({ ...CartFieldsTypes_tmp[key], id: key })));
        })
        context.commit('setAllCartFieldsTypes', ret2);
        let ret = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/TableByName.php?tableName=field_types`).then(function (response) {
          let AllCardTypes_tmp = response.data.content;
          return (Object.keys(AllCardTypes_tmp).map(key => ({ ...AllCardTypes_tmp[key], id: key })));
        })
        context.commit('setAllCartFields', ret);
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async updateCardField(context, newCard) {
      try {
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/UpdateCommon.php?key=1&querry=\`field_types\` SET \`name\` = '${newCard.name}', \`type\` = '${newCard.type}', \`value\` = '${newCard.value}' WHERE \`field_types\`.\`id\`=${newCard.id}`).then(function (response) {
          })
        // context.commit('setAllCartFields', newCard)
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async addCardField(context, newCard) {
      try {
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/InsertInto.php?key=1&querry=\`field_types\` (\`name\`, \`type\`, \`value\`) VALUES ('${newCard.name}','${newCard.type}','${newCard.value}')`).then(function (response) {
        })
        context.dispatch('getAllFieldTypes');
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async deletCardField(context, Card) {
      try {
        console.log("deleting card! "+Card.name);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/DeletFrom.php?key=1&querry=\`field_types\` WHERE id='${Card.id}'`).then(function (response) {
        })
        context.dispatch('getAllFieldTypes');
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    }
  }
}

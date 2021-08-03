import axios from 'axios'
// import firebase from 'firebase/app'
// import router from '@/router'

export default {
  state: {
    AllCardTypesToFields: null
  },
  getters: {
    AllCardTypesToFields(state) {
      return state.AllCardTypesToFields
    }
  },
  mutations: {
    setCardTypesToFields(state, AllCardTypesToFields) {
      state.AllCardTypesToFields = AllCardTypesToFields
    },
    updateCardTypesToFields(state, newCard) {
      state.AllCardTypesToFields.find((type) => type.id === newCard.id).field_types = newCard.field_types;
    }
  },
  actions: {
    async AllCardTypesToFields(context) {
      try {
        let ret = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/TableByName.php?tableName=card_types_to_field_types`).then(function (response) {
          let AllCardTypesToFields_tmp = response.data.content;
          // console.log(AllCardTypes);
          // console.log(Object.keys(AllCardTypes).map(key => ({ ...AllCardTypes[key], id: key })));
          return (Object.keys(AllCardTypesToFields_tmp).map(key => ({ ...AllCardTypesToFields_tmp[key], id: key })));
        })
        // localStorage.setItem('ROOM_ID', user.content.id);
        // console.log(user);
        context.commit('setCardTypesToFields', ret);
        // return ret;
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    // async updateCardType(context, newCard) {
    //   try {
    //     console.log(newCard);
    //     let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/UpdateSetOneVal.php?tableName=card_types&keyName=name&valName=${newCard.name}&keyNameTarget=id&valNameTarget=${newCard.id}`).then(function (response) {
    //     })
    //     context.commit('updateCardType', newCard)
    //   } catch (error) {
    //     console.log(error);
    //     context.commit('setError', error)
    //     throw error
    //   }
    // },
    async addCardTypeToField(context, newCard) {
      try {
        console.log("adding new addCardTypeToField!");
        // console.log(`https://editor.b2b.playflow.io/API_CRM/SET/InsertInto.php?key=1&querry=\`card_types_to_field_types\` (\`card_types\`, \`field_types\`) VALUES ('${newCard.card}','${newCard.field}')`);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/InsertInto.php?key=1&querry=\`card_types_to_field_types\` (\`card_types\`, \`field_types\`) VALUES ('${newCard.card}','${newCard.field}')`).then(function (response) {
        })
        context.dispatch('AllCardTypesToFields');
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async deletCardTypeToField(context, Card) {
      try {
        console.log("deleting card! "+Card.name);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/DeletFrom.php?key=1&querry=\`card_types_to_field_types\` WHERE id='${Card.id}'`).then(function (response) {
        })
        context.dispatch('AllCardTypesToFields');
        ;
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    }
  }
}

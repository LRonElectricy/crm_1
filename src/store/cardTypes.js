import axios from 'axios'
// import firebase from 'firebase/app'
// import router from '@/router'

export default {
  state: {
    AllCardTypes: null
  },
  getters: {
    AllCardTypes(state) {
      return state.AllCardTypes
    }
  },
  mutations: {
    setAllCardTypes(state, AllCardTypes) {
      state.AllCardTypes = AllCardTypes
    },
    updateCardType(state, newCard) {
      state.AllCardTypes.find((card) => card.id === newCard.id).name = newCard.name;
    }
  },
  actions: {
    async getAllCardTypes(context) {
      try {
        let ret = await axios.get(`http://editor.b2b.playflow.io/API_CRM/GET/TableByName.php?tableName=card_types`).then(function (response) {
          let AllCardTypes_tmp = response.data.content;
          // console.log(AllCardTypes);
          // console.log(Object.keys(AllCardTypes).map(key => ({ ...AllCardTypes[key], id: key })));
          return (Object.keys(AllCardTypes_tmp).map(key => ({ ...AllCardTypes_tmp[key], id: key })));
        })
        // localStorage.setItem('ROOM_ID', user.content.id);
        // console.log(user);
        context.commit('setAllCardTypes', ret);
        // return ret;
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async updateCardType(context, newCard) {
      try {
        console.log(newCard);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/UpdateSetOneVal.php?tableName=card_types&keyName=name&valName=${newCard.name}&keyNameTarget=id&valNameTarget=${newCard.id}`).then(function (response) {
        })
        context.commit('updateCardType', newCard)
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async addCardType(context, newCard) {
      try {
        console.log("adding new card!"+newCard);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/InsertInto.php?key=1&querry=\`card_types\` (\`name\`) VALUES ('${newCard}')`).then(function (response) {
        })
        context.dispatch('getAllCardTypes');
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    },
    async deletCardType(context, Card) {
      try {
        console.log("deleting card! "+Card.name);
        let ret = await axios.get(`https://editor.b2b.playflow.io/API_CRM/SET/DeletFrom.php?key=1&querry=\`card_types\` WHERE id='${Card.id}'`).then(function (response) {
        })
        context.dispatch('getAllCardTypes');
      } catch (error) {
        console.log(error);
        context.commit('setError', error)
        throw error
      }
    }
  }
}

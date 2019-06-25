import Vue from 'vue'

const state = {

    builders: {

      'Home Builder Homes' : {

        locations: {

          'Corporate': {
            address: '123 Head Office Street\rCity, TX',
            phone: '000.000.0000',
          },

          'The Valley': {
            address: '456 Model Road\rCity, TX',
            phone: '987.654.3210',
          },
        },

        fileLocations: '~Templates/Builders/HomeBuilderHomes/',

        signTypes: {

          'AVAILABLE': {

              phonenumber: '',
              frame: '',
              doubleFaced: false,
          }, 
        },

      },
    },
  }
 
const mutations = {

    updateBuilder (state, payload) {
    
        Object.assign(state.orders[payload.name], payload.updates);
    },

    deleteBuilder (state, name) {
        Vue.delete(state.builders, name);
    },

}

const actions = {

    deleteBuilder({ commit }, name){

        commit('deleteBuilder', name);

    },

    updateOrder ({ commit }, payload) {

        commit('updateBuilder', payload);
    
    },
}

const getters = {

    builders: (state) => {
        return state.builders
    },

    locations: (state, key) => {
      return state.builders[key].locations;
    },
    
    types: (state, key) => {
      return state.builders[key].signTypes;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
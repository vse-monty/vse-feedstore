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
      },
    },
  }
 
const mutations = {

  addBuilder (state, payload) {

    let temp = {

      locations: {

        'Corporate': {
          address: 'TBD',
          phone: '000.000.0000',
        }
      },

      fileLocations: `~Templates/Builders/'${payload}'/`,
    };

    Vue.set(state.builders, payload, temp);  
  },

  updateBuilder (state, payload) {
  
      Object.assign(state.builders[payload.name], payload.updates);
  },
  

  deleteBuilder (state, name) {
      Vue.delete(state.builders, name);
  },

}

const actions = {

    deleteBuilder({ commit }, name){

        commit('deleteBuilder', name);

    },

    updateBuilder ({ commit }, payload) {

        commit('updateBuilder', payload);
    
    },
    
    addBuilder ({ commit }, payload) {

        commit('addBuilder', payload);
    
    },
}

const getters = {

    builders: (state) => {
        return state.builders
    },

    locations: (state, key) => {
      return state.builders[key].locations;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
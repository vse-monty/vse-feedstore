import Vue from 'vue'
import { uid } from 'quasar' 

const state = {

    orders: {

      // 'id1' : {
      //   orderNumber: '110001',
      //   customer:    'Home Builder Homes',
      //   subdivision: 'Corporate',
      //   type:        'Available',
      //   qty:         '500',
      // },

      // 'id2' : {
      //   orderNumber: '110002',
      //   customer:    'Home Builder Homes',
      //   subdivision: 'Corporate',
      //   type:        'Sold',
      //   qty:         '450',
      // },

      // 'id3' : {
      //   orderNumber: '110003',
      //   customer:    'Home Builder Homes',
      //   subdivision: 'The Valley',
      //   type:        'Development Sign',
      //   qty:         '1',
      // },
    }

  }
 
const mutations = {

    updateOrder (state, payload) {
    
        Object.assign(state.orders[payload.id], payload.updates);
    },

    deleteOrder (state, id) {
        Vue.delete(state.orders, id);
    },

    addOrder (state, payload) {
      Vue.set(state.orders, payload.id, payload.order);
    }

}

const actions = {

    deleteOrder({ commit }, id){

        commit('deleteOrder', id);

    },

    updateOrder ({ commit }, payload) {

        commit('updateOrder', payload);
    
    },

    addOrder ({ commit }, order) {
      let id = uid();
      let clone = Object.assign({}, order);
      let payload = {
        id: id,
        order: clone
      }
      commit('addOrder', payload)
    },
}

const getters = {

    orders: (state) => {
        return state.orders
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
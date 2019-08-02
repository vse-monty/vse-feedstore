import Vue from 'vue'
import { uid } from 'quasar' 

const state = {

    orders: {}

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
    },

    sendOrder (state, id){
      Vue.$socket.emit('order', JSON.stringify(state.orders[id]));
      Vue.delete(state.orders, id);
    },

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

    sendOrder ({ commit }, id) {

      commit('sendOrder', id);
    }
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
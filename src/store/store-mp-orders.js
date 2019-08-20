import Vue from 'vue'

const state = {

  
  orders: {
    '123456': {
      
      shared: {
        artist: 'DAVE',
        orderNumber: '123456',
        customer: 'Home Builder Homes',
        subdivision: 'The Valley',
      
        orderDate: null,
        artDate: null,
      },

      pages: {

        '1': {
          address: '123 Street\\nPlace, TX',
          quantity: 40,
          type: 'Lot Signs',
          
          same_face: false,
          double_face: true,

          file_art: 'C:\\Art\\art_front.ai',
          file_art_back: 'C:\\Art\\art_back.ai',
          file_proof: 'C:\\Proofs\\the_proof.ai',

          total_vars: [{
            name: 'phoneNumber',
            type: 'text'
          }],
          vars_vals: [{
            name: 'phoneNumber',
            value: '000.000.0000'
          }],
        },

        '2': {
          address: 'NEC Street & Road\\nPlace, TX',
          quantity: 1,
          type: 'Development',
          
          same_face: true,
          double_face: false,

          file_art: 'C:\\Art\\4x8.ai',
          file_art_back: null,
          file_proof: 'C:\\Proofs\\4x8_proof.ai',

          total_vars: [],
          vars_vals: [],
        },
      }
    },
  }

  }
 
const mutations = {

    addOrder (state, payload) {

      Vue.set(state.orders, payload.id, payload.order);
    },

    deleteOrder (state, id) {

      Vue.delete(state.orders, id);
    },

    updateOrder (state, payload) {

      Object.assign(state.orders[payload.id], payload.updates);
    },

    clearOrders (state) {

      let orders = Object.keys(state.orders);
      
      for(let i = 0; i < orders.length; i++){

        Vue.delete(state.orders, orders[i]);
      }
    },
}

const actions = {


    addOrder ({ commit }, order) {

      let id = order.orderNumber;
      let clone = Object.assign({}, order);
      let payload = {
        id: id,
        order: clone
      }

      commit('addOrder', payload);
    },

    deleteOrder ({ commit }, id) {
      
      commit('deleteOrder', id);
    },

    updateOrder ({ commit }, payload) {
      
      commit('updateOrder', payload);
    },

    clearOrders ({ commit }) {

      commit('clearOrders');
    },
}

const getters = {

    mp_orders: (state) => {
        return state.orders
    },

    mp_order: (state) => (id) => {

      return state.orders[id]
    },

    pages: (state) => (id) => {

      return state.orders[id].pages
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
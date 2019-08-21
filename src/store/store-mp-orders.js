import Vue from 'vue'

const state = {

  
  orders: {

    '123456': {
      
      artist: 'DAVE',
      orderNumber: '123456',
      customer: 'Home Builder Homes',
      subdivision: 'The Valley',
    
      orderDate: null,
      artDate: null,
    

      pages: [

        {
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

        {
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
      ]
    },
  }
}
 
const mutations = {

    AddOrder (state, payload) {

      Vue.set(state.orders, payload.id, payload.order);
    },

    DeleteOrder (state, id) {

      Vue.delete(state.orders, id);
    },

    UpdateOrder (state, payload) {

      Object.assign(state.orders[payload.id], payload.updates);
    },

    ClearOrders (state) {

      let orders = Object.keys(state.orders);
      
      for(let i = 0; i < orders.length; i++){

        Vue.delete(state.orders, orders[i]);
      }
    },

    DeletePage (state, payload) {

      let order = state.orders[payload.id];
      
      if(order){
        
        let pages = order.pages;
            pages.splice(payload.pg, 1);
      }
    }
}

const actions = {


    AddOrder ({ commit }, order) {

      console.log('mp-orders store: addOrder()')
      console.log(order);

      let id = order.orderNumber;
      let clone = Object.assign({}, order);
      let payload = {
        id: id,
        order: clone
      }

      commit('AddOrder', payload);
    },

    DeleteOrder ({ commit }, id) {
      
      commit('DeleteOrder', id);
    },

    UpdateOrder ({ commit }, payload) {
      
      commit('UpdateOrder', payload);
    },

    ClearOrders ({ commit }) {

      commit('ClearOrders');
    },

    DeletePage ({ commit }, payload) {

      commit('DeletePage', payload);
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
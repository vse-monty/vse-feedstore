import Vue from 'vue'

const state = {

    shared: {

      artist: 'DAVE',
      artDate: null,
      orderDate: null,
      customer: null,
      type: null,

      file_art: null,
      file_art_back: null,
      file_proof: null,

      double_face: false,
      same_face: true,

      totalVariables: [],
    },

    orders: {}

  }
 
const mutations = {

    updateBatch (state, payload) {

      Object.assign(state.shared, payload);
    },

    addOrder (state, payload) {

      Vue.set(state.orders, payload.id, payload.order);
    },

    deleteOrder (state, order_number) {

      Vue.delete(state.orders, order_number);
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

    sendAll (state) {
      let orders = [];
      let keys = Object.keys(state.orders);
      let length = keys.length; 
    
      for(let i = 0; i < length; i++){

        let current = {};
        Object.assign(current, state.shared, state.orders[keys[i]]);
        orders.push(current);
      }

      console.log('batch');

      this.$socket.emit('batch', JSON.stringify(orders));

    //   {

    //     artist: 'DAVE',
    //       artDate: null,
    //         orderDate: null,
    //           customer: null,
    //             type: null,

    //               file_art: null,
    //                 file_art_back: null,
    //                   file_proof: null,

    //                     double_face: false,
    //                       same_face: true,

    //                         totalVariables: [],
    // }
      //Vue.delete(state.orders, id);
    }
}

const actions = {

    updateBatch ({ commit }, payload){

      console.log('update-batch-vuex');
      console.log(payload);

      commit('updateBatch', payload);
    },

    addOrder ({ commit }, order) {
      console.log('add-batch-order-vuex');

      let id = order.orderNumber;
      let clone = Object.assign({}, order);
      let payload = {
        id: id,
        order: clone
      }
      console.log(payload);
      commit('addOrder', payload);
    },

    deleteOrder ({ commit }, order_number) {
      
      console.log('delete-batch-order-vuex');
      commit('deleteOrder', order_number);
    },

    updateOrder ({ commit }, payload) {
      
      console.log('update-batch-order-vuex');
      commit('updateOrder', payload);
    },

    clearOrders ({ commit }) {

      commit('clearOrders');
    },

    sendAll ({ commit }) {

      commit('sendAll');
    }
}

const getters = {

    batch: (state) => {
        return state
    },

    batch_shared: (state) => {
        return state.shared
    },

    batch_orders: (state) => {
      return state.orders
    },

    batch_order: (state) => (id) => {

      return state.orders[id]
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
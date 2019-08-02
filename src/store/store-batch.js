import Vue from 'vue'
import { cpus } from 'os';

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

    clearShared (state) {

      let obj =  {
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

        totalVariables: [] };
        
        Object.assign(state.shared, obj);
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

      this.$socket.emit('batch', JSON.stringify(orders));
    }
}

const actions = {

    updateBatch ({ commit }, payload){

      commit('updateBatch', payload);
    },

    addOrder ({ commit }, order) {

      let id = order.orderNumber;
      let clone = Object.assign({}, order);
      let payload = {
        id: id,
        order: clone
      }

      commit('addOrder', payload);
    },

    deleteOrder ({ commit }, order_number) {
      
      commit('deleteOrder', order_number);
    },

    updateOrder ({ commit }, payload) {
      
      commit('updateOrder', payload);
    },

    clearOrders ({ commit }) {

      commit('clearOrders');
    },

    clearShared({ commit }) {

      commit('clearShared');
    },

    clearBatch ({ commit }) {

      commit('clearOrders');
      commit('clearShared');
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
import Vue from 'vue'
import { LocalStorage } from 'quasar'

const state = {

  
  orders: {
  },

  last_order: null,
}
 
const mutations = {

    AddOrder (state, payload) {

      state.last_order = payload.id
      Vue.set(state.orders, payload.id, payload.order)
    },

    DeleteOrder (state, id) {

      if (state.last_order == id) { state.last_order = null }

      Vue.delete(state.orders, id)
    },

    UpdateOrder (state, payload) {

      Object.assign(state.orders[payload.id], payload.updates)
      state.orders[payload.id].pages = [...payload.updates.pages]
    },

    ClearOrders (state) {

      let orders = Object.keys(state.orders)
      
      for(let i = 0; i < orders.length; i++){

        Vue.delete(state.orders, orders[i])
      }

      state.last_order = null;
    },

    DeletePage (state, payload) {

      let order = state.orders[payload.id]
      
      if(order){
        
        let pages = order.pages;
            pages.splice(payload.pg, 1)
      }
    },

    SaveOrders (state) {

      LocalStorage.set('orders', state.orders)
    },

    LoadOrders (state, orders) {

      state.orders = this.$_.cloneDeep(orders)
    }
}

const actions = {


    AddOrder ({ commit }, order) {

      let id = order.order_number
      let clone = Object.assign({}, order)
      let payload = {
        id: id,
        order: clone
      }

      commit('AddOrder', payload)
    },

    DeleteOrder ({ commit }, id) {
      
      commit('DeleteOrder', id)
    },

    UpdateOrder ({ commit }, payload) {
      
      commit('UpdateOrder', payload)
    },

    ClearOrders ({ commit }) {

      commit('ClearOrders')
    },

    DeletePage ({ commit }, payload) {

      commit('DeletePage', payload)
    },

    SaveOrders ({ commit }) {

      commit('SaveOrders')
    },

    LoadOrders ({ commit }) {

      let orders = LocalStorage.getItem('orders')
      if(orders){
        commit('LoadOrders', orders)
      }
    }
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
    },

    last_order: (state) => {

      return state.last_order ? state.orders[state.last_order] : null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
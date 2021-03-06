import Vue from 'vue'
import Vuex from 'vuex'

import mp_orders from './store-mp-orders.js'
import settings from './store-settings.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      mp_orders,
      settings,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}

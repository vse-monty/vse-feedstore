import Vue from 'vue'
import Vuex from 'vuex'

import orders from './store-orders.js'
import batches from './store-batch.js'
import settings from './store-settings.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      orders,
      batches,
      settings,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}

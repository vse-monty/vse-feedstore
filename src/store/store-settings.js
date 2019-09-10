import Vue from 'vue'
import { LocalStorage } from 'quasar'

const state = {

    settings: {

      working: null,
      print: null,
      illustrator: 'C:\\Program Files\\Adobe\\Adobe Illustrator CC 2019\\Support Files\\Contents\\Windows',
      templates: null,
    }
  }
 
const mutations = {

    setIllustrator (state, path) {

      state.settings.illustrator = path
    },

    setWorking (state, path) {

      state.settings.working = path
    },

    setTemplates (state, path) {

      state.settings.templates = path
    },

    setPrint (state, path) {

      state.settings.print = path
    },

    saveSettings (state) {

      LocalStorage.set('settings', state.settings)
      this.$socket.emit('illustrator.settings', JSON.stringify(state.settings));
    },

    loadSettings (state, settings) {

      Object.assign(state.settings, settings)
    }
}

const actions = {

    setIllustrator ({ commit, dispatch }, path) {

      commit('setIllustrator', path)
      dispatch('saveSettings')
    },

    setWorking ({ commit, dispatch }, path) {

      commit('setWorking', path)
      dispatch('saveSettings')
    },

    setTemplates ({ commit, dispatch }, path) {

      commit('setTemplates', path)
      dispatch('saveSettings')
    },

    setPrint ({ commit, dispatch }, path) {

      commit('setPrint', path)
      dispatch('saveSettings')
    },

    saveSettings ({ commit }) {

      commit('saveSettings')
    },

    loadSettings ({ commit }) {

      let settings = LocalStorage.getItem('settings')
      if(settings){

        commit('loadSettings', settings)
      }
    }
}

const getters = {

    settings: (state) => {
        return state.settings
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
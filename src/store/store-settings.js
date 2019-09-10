import Vue from 'vue'
import { LocalStorage } from 'quasar'

const state = {

    settings: {

      working: null,
      print: null,
      illustrator: 'C:\\Program Files\\Adobe\\Adobe Illustrator CC 2019\\Support Files\\Contents\\Windows',
      templates: null,
      art_templates: null,
      show_pdf: true,
      launch_illy: false,
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

    setArtTemplates (state, path) {

      state.settings.art_templates = path
    },

    setPrint (state, path) {

      state.settings.print = path
    },

    setShowPDF (state, val) {

      state.settings.show_pdf = val
    },

    setLaunchIllustrator (state, val) {

      state.settings.launch_illy = val
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

    setArtTemplates ({ commit, dispatch }, path) {

      commit('setArtTemplates', path)
      dispatch('saveSettings')
    },

    setPrint ({ commit, dispatch }, path) {

      commit('setPrint', path)
      dispatch('saveSettings')
    },

    setShowPDF ({ commit, dispatch }, val) {

      commit('setShowPDF', val)
      dispatch('saveSettings')
    },

    setLaunchIllustrator ({ commit, dispatch }, val) {

      commit('setLaunchIllustrator', val)
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
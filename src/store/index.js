import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    list
  },
  getters
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import { carStore } from "./car.store";
import { userStore } from "./user.store";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    carStore,
    userStore
  }
})

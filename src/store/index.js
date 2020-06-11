import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
  state:state,
  mutations:mutations,
  actions:actions,
  getters:getters
  // // state用于保存全局共享的数据
  // state: {
  //   isFullScreen:false
  // },
  // // mutations用于保存修改全局共享的数据方法
  // mutations: {
  //   changeFullScreen(state,flag){
  //     state.isFullScreen = flag
  //   }
  // },
  // // actions用于保存触发mutations中保存方法的方法
  // actions: {
  //   setFullScreen({commit},flag){
  //     commit('changeFullScreen',flag)
  //   }
  // },
  // // getters专门用于获取全局共享的数据
  // getters: {
  //   isFullScreen(state){
  //     return state.isFullScreen
  //   }
  // }
})
// 在ui界面中，通过dispatch触发actions中的方法，在actions中，通过commit触发mutations中的方法，在mutations中拿到state，就可以修改全局共享的数据
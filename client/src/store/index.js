import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    addPlayer(state , name){
      state.players.push(new Player(name))
    },
    removePlayer(state , i){
      state.players.array.splice(i, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})

class Player{
  name
  constructor(name){
    this.name = name;
  }

}

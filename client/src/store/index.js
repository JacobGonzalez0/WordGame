import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    players: [],
    currentPlayer: 0,
    previousWords: [],
    lastWord: ""
  }
}


export default new Vuex.Store({
  state: {
    players: [],
    currentPlayer: 0,
    previousWords: [],
    lastWord: ""
  },
  mutations: {
    setState (state, newState ){
      Object.assign(state, newState)
    },
    resetState (state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, getDefaultState())
    },
    addPlayer(state , name){
      if(state.players.length == 8){
        return;
      }
      state.players.push(new Player(name))
    },
    addWord(state , word){
      state.lastWord = word;
      state.previousWords.unshift(word)
    },
    removePlayer(state , i){
      state.players.array.splice(i, 1);
    },
    nextPlayer(state){
      state.currentPlayer++
      if(state.currentPlayer == state.players.length){
        state.currentPlayer = 0;
      }
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

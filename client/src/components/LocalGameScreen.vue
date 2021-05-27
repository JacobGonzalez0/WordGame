<template>
  <div class="container-fluid" >
    
    <div class="row justify-content-center align-content-center mx-0 mx-sm-4 rounded gameborder game-box" >
            <div class="col-6">
                <input v-model="word" type="text" class="form-control my-2" placeholder="Add your word">
                <button @click.prevent="check" class="btn btn-primary my-2" >Submit</button>
                <h4>
                    Used words
                </h4>
                <ul id="used" class="list-group used-word my-2" style="">
                  <li class="list-group-item" v-for="word in previousWords" :key="word">
                    {{word}}
                  </li>
                </ul>
            </div>
            
        </div>

        <PlayerBox />
    <PlayerContainer v-bind:players="players" />
    <PlayerContainer bottom="true" v-bind:players="players" />

  </div>
</template>

<script>
import PlayerContainer from './PlayerContainer';
import PlayerBox from './PlayerBox';
import validWords from '../dictionary';

export default {
  name: 'LocalGameScreen',
  props: {
    msg: String,
  },
  data() {

    return {
      name: "",
      word: "",
      playerSlots: []
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    },
    previousWords() {
      return this.$store.state.previousWords
    },
    lastWord() {
      return this.$store.state.lastWord
    },
    currentPlayer() {
      return this.$store.state.currentPlayer
    }
    
  },
  components: {
    "PlayerContainer" : PlayerContainer,
    "PlayerBox" : PlayerBox
  },
  mounted: function(){
    this.$store.commit('addPlayer',"Player 1");
  },
  updated: function(){
    if(this.currentPlayer == 0){
      document.getElementById("firstPlayer").classList.add("bg-primary")
      document.getElementById("firstPlayer").classList.add("fw-bold")
      document.getElementById("firstPlayer").classList.add("text-white")
    }

    let topPlayerContainers = document.getElementById("topPlayers")
    let bottomPlayerContainers = document.getElementById("bottomPlayers")
    this.playerSlots = Array.from(topPlayerContainers.children).concat(Array.from(bottomPlayerContainers.children))
    
  },
  methods: {

    check: function(){
        const used = document.getElementById("used");
        let checkWord = validWords.find(valid => valid == this.word.toUpperCase());
        let validChange = 0;

        if(!checkWord){
            this.$toast.error("The word is invalid");
            return
        }

        //checks to see how many letters changed
        Array.from(checkWord).forEach( current => {
            Array.from(this.lastWord).forEach( last => {
                if(current == last){
                    validChange++;
                }
            })
        })
        

        if( checkWord && this.lastWord == "" || checkWord && validChange >= this.lastWord.length - 1){

            let listCheck = false;

            if(checkWord == this.lastWord){
                this.$toast.error("The word is matches the last word")
                return;
            }else{
                this.previousWords.forEach(( pWord , i) =>{
                    if(pWord == checkWord){
                        this.$toast.error("The word was already used! Game over!")
                        used.children[i].classList.add("bg-danger")
                        used.children[i].classList.add("fw-bold")
                        used.children[i].classList.add("text-white")
                        listCheck = true
                    }
                })
            }

            if(listCheck){
                return;
            }

            this.$store.commit('addWord', checkWord);
            this.$store.commit('nextPlayer');

            console.log(this.currentPlayer)
            console.log(this.playerSlots)
            this.playerSlots.forEach( player =>{
              player.classList.remove("bg-primary")
              player.classList.remove("fw-bold")
              player.classList.remove("text-white")
            })

            if(this.playerSlots[this.currentPlayer]){
              this.playerSlots[this.currentPlayer].classList.add("bg-primary")
              this.playerSlots[this.currentPlayer].classList.add("fw-bold")
              this.playerSlots[this.currentPlayer].classList.add("text-white")
            }
            

            this.word = ""
        }else{
            this.$toast.error("The word is invalid")
        }
    },
  }
}


</script>

<style scoped>
  .game-box{
    min-height:60vh
  }
  .used-word{
    max-height: 30vh; 
    overflow-y: scroll;
  }
  .gameborder{
    color:white;
    background: linear-gradient(#00000036, #00000036) ,url(/bg-purple.png)  ;
    border:white 3px solid;
    box-shadow:
    inset 0 0 5px rgb(255, 255, 255),      /* inner white */
    inset 3px 0 3px rgb(163, 0, 255),   /* inner left magenta short */
    inset -3px 0 3px #334fff,  /* inner right cyan short */
    inset 3px 0 3px rgb(163, 0, 255),  /* inner left magenta broad */
    inset -3px 0 3px #334fff, /* inner right cyan broad */
    0 0 10px rgb(255, 255, 255),            /* outer white */
    -3px 0 3px rgb(163, 0, 255),        /* outer left magenta */
    3px 0 3px #234fff;         /* outer right cyan */
  }
</style>

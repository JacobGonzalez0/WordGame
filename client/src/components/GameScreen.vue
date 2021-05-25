<template>
  <div class="container-fluid" >
    
    <div>
      <input type="text" placeholder="name" v-model="name" />
      <button @click.prevent="addPlayer"  >Add player</button>
    </div>
    <div class="row justify-content-center align-content-center" style="height:80vh">
            <div class="col-6">
                <input v-model="word" type="text" class="form-control my-2">
                <button @click.prevent="check" class="btn btn-primary my-2" >Submit</button>
                <h4>
                    Used words
                </h4>
                <ul id="used" class="list-group  my-2" style="max-height: 30vh; overflow-y: scroll;">
                  <li class="list-group-item" v-for="word in previousWords" :key="word">
                    {{word}}
                  </li>
                </ul>
            </div>
            
        </div>
    <PlayerContainer v-bind:players="players" />
    <PlayerContainer bottom="true" v-bind:players="players" />

  </div>
</template>

<script>
import PlayerContainer from './PlayerContainer';
import validWords from '../dictionary'

export default {
  name: 'GameScreen',
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
    PlayerContainer
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
    addPlayer: function(){
      this.$store.commit('addPlayer',this.name);
      
      
 
    },
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

</style>

<template>
  <div>
    
    <div>
      <input type="text" placeholder="name" :value="name"/>
      <button >Add player</button>
    </div>
    <PlayerContainer v-bind:players="players" />
    <PlayerContainer bottom="true" v-bind:players="players" />

  </div>
</template>

<script>
import PlayerContainer from './PlayerContainer';

export default {
  name: 'GameScreen',
  props: {
    msg: String,
  },
  data() {
    return {
      name: ""
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    }
  },
  components: {
    PlayerContainer
  },
  mounted: function(){
    this.$store.commit('addPlayer',"test");
    this.$store.commit('addPlayer',"Dudebro");
    this.$store.commit('addPlayer',"SickMan");
    this.$store.commit('addPlayer',"Nice");
  },
  methods: {
    addPlayer: () => {

    }
  }
}


</script>

<style scoped>

</style>

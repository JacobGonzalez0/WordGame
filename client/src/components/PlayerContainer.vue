<template>
    <div>
        <div v-if="bottom" class="position-fixed top-0 d-flex w-100 flex-row justify-content-between">
            <div v-if="players[0]" class="player p-3 mx-2 ">
                {{players[0].name}}
            </div>

            <div v-if="players[1]" class="player p-3 mx-2 ">
                {{players[1].name}}
            </div>
            
            <div v-if="players[2]" class="player p-3 mx-2 ">
                {{players[2].name}}
            </div>

            <div v-if="players[3]" class="player p-3 mx-2 ">
                {{players[3].name}}
            </div>
        </div>

        <div v-if="!bottom" class="position-fixed bottom-0 d-flex w-100 flex-row justify-content-between">
            <div v-if="players[4]" class="player p-3 mx-2 ">
                {{players[4].name}} 
            </div>

            <div v-if="players[5]" class="player p-3 mx-2 ">
                {{players[5].name}}
            </div>

            <div v-if="players[6]" class="player p-3 mx-2 ">
                {{players[6].name}}
            </div>

            <div v-if="players[7]" class="player p-3 mx-2 ">
                {{players[7].name}}
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'PlayerContainer',
  props: ['players', 'bottom']
  ,
  data: function () {
    return {
      
    }
  },
  beforeMount: function(){
     
  }
}

</script>

<style scoped>

</style>

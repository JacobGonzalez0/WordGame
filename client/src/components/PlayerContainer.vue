<template>
    <span >
        <div v-if="bottom" id="topPlayers" class="position-fixed top-0 d-flex w-100 flex-row justify-content-around">
            <div id="firstPlayer" v-if="players[0]" class="player rounded-bottom p-3 mx-2 bg-player">
                {{players[0].name}}
            </div>

            <div v-if="players[1]" class="player p-3 mx-2 rounded-bottom bg-player">
                {{players[1].name}}
            </div>
            
            <div v-if="players[2]" class="player p-3 mx-2 rounded-bottom bg-player">
                {{players[2].name}}
            </div>

            <div v-if="players[3]" class="player p-3 mx-2 rounded-bottom bg-player">
                {{players[3].name}}
            </div>
        </div>

        <div v-if="!bottom" id="bottomPlayers" class="position-fixed bottom-0 d-flex w-100 flex-row justify-content-around">
            <div v-if="players[4]" class="player p-3 mx-2 rounded-top bg-player">
                {{players[4].name}} 
            </div>

            <div v-if="players[5]" class="player p-3 mx-2 rounded-top bg-player">
                {{players[5].name}}
            </div>

            <div v-if="players[6]" class="player p-3 mx-2 rounded-top bg-player">
                {{players[6].name}}
            </div>

            <div v-if="players[7]" class="player p-3 mx-2 rounded-top bg-player">
                {{players[7].name}}
            </div>
        </div>
    </span>
  
</template>

<script>
export default {
  name: 'PlayerContainer',
  props: ['players', 'bottom'],
}

</script>

<style scoped>
    #topPlayers{
        color:white;
    }
    #bottomPlayers{
        color:white;
    }
    .bg-player{
        width:8rem;

        background: rgba(0, 0, 0, 0.419)
    }
</style>

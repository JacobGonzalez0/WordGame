<template>

    <div>
        <button type="button" class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#PlayerBox">
            Add player
        </button>

        <div class="modal fade" id="PlayerBox" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="row" >
                        <div class="d-flex flex-row justify-content-around align-items-center p-3">
                            <h5 class="">
                            Enter player name
                            </h5>
                            <button class="btn btn-danger" data-bs-dismiss="modal">Close X</button>
                        </div>
                        
                        <div class="col-10 d-flex flex-row m-auto py-2 ">
                            <div class="col-6 p-2">
                            <input type="text" placeholder="name" v-model="name" class=" form-control"/>
                            </div>
                            <button @click.prevent="addPlayer" class="btn btn-primary col-6 m-2" >Add player</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'PlayerBox',
        methods: {
            addPlayer: function(){
                this.$store.commit('addPlayer',this.name);   
            }
        }
    }
</script>
<template>
  <div id="app" >
    <img src="/Logo.png" class="logo p-2 my-2" />
     <router-view>
     </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
.logo{
  width:200px
}
body{
    background: linear-gradient(#7912a241, #7912a241) ,url(/bg-purple.png)
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

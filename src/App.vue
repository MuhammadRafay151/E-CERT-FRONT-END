<template>
  <div id="app">
    <navbar id="nav"  />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    
  </div>
</template>
<script>
import navbar from '@/components/navbar';
export default {
  components: {
 
    navbar,
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



#nav a.router-link-exact-active {
  color:#46b7de;
  
}
</style>

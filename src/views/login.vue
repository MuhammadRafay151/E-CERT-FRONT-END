<template>
  <div class="container vh-100 ">
    <div class="row h-100 ">
      <div class="col d-flex justify-content-center align-self-center ">
        <login />
       
      </div>
    
    </div>
    
  </div>
  
</template>

<script>
// @ is an alias to /src
import login from "../components/login";


export default {
  name: "Home",
  components: {
    login
  },
 
  
};
</script>

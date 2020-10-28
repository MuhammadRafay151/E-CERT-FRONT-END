<template>
 <div class="container vh-100 ">
    <div class="row h-100 ">
      <div class="col d-flex justify-content-center align-self-center ">
       <register/>
       
      </div>
    
    </div>
    
  </div>

</template>
<script>
import register from "../components/registeration";
export default {
  name: "signup",
  components: {
    register
  },
  data: function() {
    return {};
  }
};
</script>
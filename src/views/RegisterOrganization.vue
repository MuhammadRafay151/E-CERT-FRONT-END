<template>
  <div class="container vh-100">
    <div class="row h-100">
      <div class="col d-flex justify-content-center align-self-center">
        <Register />
      </div>
    </div>
  </div>
</template>
<script>
import Register from "../components/RegisterOrganization";
export default {
  name: "RegisterOrganization",
  components: { Register },
  
};
</script>
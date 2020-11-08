<template>
  <div class="home" style="margin-top:120px">
     <!-- <b-overlay show no-wrap rounded="sm"  >
          <template #overlay>
        <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        
          <p id="cancel-label">Processing...</p>
        
        </div>
      </template>
        </b-overlay> -->
   <h1>HOME</h1>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";
export default {
  name: "Home",
 
  computed: { ...mapState("user_state",["user"]), }
};
</script>

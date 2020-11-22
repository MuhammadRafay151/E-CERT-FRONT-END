<template>
  <div class="row">
    <div class="col">
      <div class="shadow p-5  ">
  
        <h3 style=" text-decoration: underline ">Certificate Count</h3>
        <div class="form-group text-left mt-5">
          <label >Enter Count</label>
          <input 
          type="text" 
          class="form-control"
          v-model="certcount.count"
          placeholder="Count"
          />
        </div>
        <button
          type="submit"
          @click="AddCount"
          class="btn btn-dark btn-block mt-5"
        >
          <span>Add Count</span>
        </button>
       
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddCertCount",
  data: function() {
    
    return {
      certcount: {
        Org_Id:null,
        count:null,
      },
     
    };
    
  },
  validations: {
    certcount: {
      Org_Id: { required },
      count: { required },
    },
  },
  methods: {
    AddCount() {
      this.certcount.Org_Id=this.$parent.id
      this.$store.dispatch("certcount_state/AddCount",this.certcount);
      location.reload();
    },
    
  }
};
</script>
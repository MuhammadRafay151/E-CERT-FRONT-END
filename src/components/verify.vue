<template>
  <div class="row">
    <div class="col">
      <div class="shadow p-5  ">
        <h3 style=" text-decoration: underline ">Certificate Verification</h3>
        <div class="form-group text-left mt-5">
          <label >Enter code</label>
          <input type="text" class="form-control " placeholder="eg. cert02136" />
        </div>
        <button
          type="submit"
          v-on:click="send"
          class="btn btn-dark btn-block mt-5"
        >
          <span v-if="!show">Verify</span>
          <span v-if="show">
            <b-spinner small type="grow"></b-spinner>verifying...
          </span>
        </button>
       <sub>Forgot certificates? <router-link to="/forgetcertificate">click here</router-link> </sub>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "verify",
  data: function() {
    return {
      show: false,
     
    };
  },
  methods: {
    send() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
     this.$emit('myEvent',1)
      }, 1000);
    }
  }
};
</script>
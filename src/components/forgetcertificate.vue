<template>
  <div class="row">
    <div class="col">
      <div class="shadow p-5  ">
        <h3 style=" text-decoration: underline ">Forget Certificate</h3>
        <div class="form-group text-left mt-5">
          <label for="exampleInputEmail1">Enter Email</label>
          <input type="text" class="form-control " placeholder="xyz@gmail.com" />
        </div>
        <button
          type="submit"
          v-on:click="send"
          class="btn btn-dark btn-block mt-5"
        >
          <span v-if="!show">Send Details</span>
          <span v-if="show">
            <b-spinner small type="grow"></b-spinner>Sending details...
          </span>
        </button>
        <b-alert
          class="mt-1"
          v-model="showDismissibleAlert"
          variant="light"
          dismissible
        >
          We have mailed your certificates register against this email hope this
          will help you
        </b-alert>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetcertificate",
  data: function() {
    return {
      show: false,
      showDismissibleAlert: false,
      pagetitle: "Register Issuer"
    };
  },
  methods: {
    send() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
        this.showDismissibleAlert = true;
      }, 1000);
    }
  }
};
</script>
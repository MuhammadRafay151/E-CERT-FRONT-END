<template>
  <div class="row">
    <div class="col">
      <div class="shadow p-5">
        <h3 style="text-decoration: underline">Forget Certificate</h3>
        <div class="form-group text-left mt-5">
          <label for="exampleInputEmail1">Enter Email</label>
          <input
            type="text"
            class="form-control"
            placeholder="xyz@gmail.com"
            v-model="$v.email.$model"
          />
          <sub class="text-danger" v-if="!$v.email.required && $v.email.$error"
            >Email is required</sub
          >
          <sub class="text-danger" v-if="!$v.email.email && $v.email.$error"
            >Email is required</sub
          >
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
          {{ msg }}
        </b-alert>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import GlobalNotification from "../js/GlobalNotification";
export default {
  name: "forgetcertificate",
  mixins: [GlobalNotification],
  data: function () {
    return {
      show: false,
      showDismissibleAlert: false,
      email: "",
      msg: "",
    };
  },
  methods: {
    send() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show = true;
        this.$store
          .dispatch("cert_state/ForgetCertificate", { email: this.email })
          .then((res) => {
            this.email = "";
            this.$nextTick(() => {
              this.$v.$reset();
            });
            this.show = false;
            this.showDismissibleAlert = true;
            this.msg = res;
          })
          .catch((err) => {
            this.GlobalNotify(err, false);
          });
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
};
</script>
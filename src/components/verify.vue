<template>
  <div class="row">
    <div class="col">
      <b-overlay :show="loading" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <b-spinner
              v-if="spinner"
              style="width: 3rem; height: 3rem"
              label="Large Spinner"
            ></b-spinner>
            <b-icon
              v-else
              icon="exclamation-circle-fill"
              font-scale="2"
              variant="danger"
            ></b-icon>
            <p id="cancel-label">{{ loading_text }}</p>
          </div>
        </template>
        <div class="shadow p-5">
          <h3 style="text-decoration: underline">Certificate Verification</h3>
          <div class="form-group text-left mt-5">
            <label>Enter code</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.code.$model"
              placeholder="24 digit code "
            />
            <sub
              class="text-danger"
              v-if="
                $v.code.$error && (!$v.code.maxLength || !$v.code.minLength)
              "
              >Invalid code enter 24 digit code eg.
              5fd8fbb59a68f82540a88790</sub
            >
            <sub class="text-danger" v-if="$v.code.$error && !$v.code.required"
              >This field is required</sub
            >
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

          <sub
            >Forgot certificates?
            <router-link to="/forgetcertificate">click here</router-link>
          </sub>
          <b-alert
            class="mt-1"
            v-model="showDismissibleAlert"
            variant="danger"
            dismissible
          >
            The certificate doesnot exist
          </b-alert>
        </div>
      </b-overlay>
    </div>
  </div>
</template>
<script>
import { maxLength, minLength, required } from "vuelidate/lib/validators";
import loader from "../js/loader";
export default {
  name: "verify",
  mixins: [loader],
  data: function () {
    return {
      show: false,
      code: "",
      showDismissibleAlert: false,
    };
  },
  methods: {
    send() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show_loader("Verifying...");
        this.$store
          .dispatch("cert_state/VerifyCertificate", this.code)
          .then(() => {
            this.Hide_loader();
            this.$emit("ShowView");
          })
          .catch((err) => {
            if (err.response && err.response.status == 404) {
              this.showDismissibleAlert = true;
              this.Hide_loader();
            } else {
              this.show_error(err);
            }
          });
      }
    },
  },
  validations: {
    code: { required, minLength: minLength(24), maxLength: maxLength(24) },
  },
};
</script>
<template>
  <div>
    <b-overlay :show="loading" rounded="sm" no-wrap>
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
    </b-overlay>
    <div class="form-group" v-if="!reset">
      <label><sup class="text-danger">*</sup>Current Password</label>
      <input
        type="password"
        class="form-control"
        v-model.trim="$v.ChPass.current.$model"
      />
      <sub
        class="text-danger"
        v-if="!$v.ChPass.current.required && $v.ChPass.current.$error"
        >required</sub
      >
    </div>
    <div class="form-group">
      <label><sup class="text-danger">*</sup>New Password</label>
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          v-model.trim="$v.ChPass.new.$model"
          ref="p1"
        />
        <div class="input-group-prepend">
          <div class="input-group-text">
            <b-icon
              icon="eye-fill"
              style="cursor: pointer"
              v-on:mousedown="show_password"
              v-on:mouseup="hide_password"
            >
            </b-icon>
          </div>
        </div>
      </div>

      <sub
        class="text-danger"
        v-if="!$v.ChPass.new.required && $v.ChPass.new.$error"
        >required</sub
      >
    </div>
    <div class="form-group">
      <label><sup class="text-danger">*</sup>Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-model.trim="$v.ChPass.confirm.$model"
      />
      <sub
        class="text-danger"
        v-if="!$v.ChPass.confirm.sameAsPassword && $v.ChPass.confirm.$error"
        >Passwords must be identical.</sub
      >
    </div>
    <button
      class="btn btn-wb btn-block"
      v-on:click="
        () => {
          reset ? ResetPassword() : changepassword();
        }
      "
    >
      {{ reset ? "Reset Password" : "Change Password" }}
    </button>
  </div>
</template>
<script>
import { required, sameAs } from "vuelidate/lib/validators";
import loader from "../js/loader";
export default {
  name: "Password",
  mixins: [loader],
  props: { reset: Boolean },
  data: () => {
    return {
      ChPass: { current: "", new: "", confirm: "" },
    };
  },
  validations() {
    if (!this.reset) {
      return {
        ChPass: {
          current: {
            required,
          },
          new: {
            required,
          },
          confirm: {
            sameAsPassword: sameAs("new"),
          },
        },
      };
    } else {
      return {
        ChPass: {
          new: {
            required,
          },
          confirm: {
            sameAsPassword: sameAs("new"),
          },
        },
      };
    }
  },
  methods: {
    changepassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show_loader("Updating Password...");
        this.$store
          .dispatch("user_state/ChangePassword", this.ChPass)
          .then(() => {
            this.show_loader("Signing out...");
            this.$store.dispatch("user_state/signout").then(() => {
              this.Hide_loader();
              this.$emit("done");
              this.$router.push("/");
            });
          })
          .catch((err) => {
            this.dismissible_error(err.response.data);
          });
      }
    },
    ResetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show_loader("Resetting Password...");
        this.$store
          .dispatch("user_state/ResetPassword", {
            token: this.$route.query.token,
            ...this.ChPass,
          })
          .then(() => {
            this.Hide_loader();
            this.ChPass = { current: "", new: "", confirm: "" };
            this.$emit("done");
            this.$router.push("/login");
          })
          .catch((err) => {
            if ("response" in err) this.dismissible_error(err.response.data);
            else this.dismissible_error(err);
          });
      }
    },
    show_password() {
      this.$refs.p1.type = "text";
    },
    hide_password() {
      this.$refs.p1.type = "password";
    },
  },
};
</script>